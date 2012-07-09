d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90,
      radians = degrees * d3_geo_radians,
      arc = d3.geo.greatArc().source(origin).target(d3_identity),
      clipOrigin,
      x0 = 0,
      y0 = 0,
      sy0 = 0,
      cy0 = 1;

  function circle() {
    // TODO render a circle as a Polygon
  }

  function visible(point) {
    return distance(point) < radians;
  }

  circle.clip = function(d) {
    if (typeof origin === "function") arc.source(origin.apply(this, arguments));
    // Cache origin in Cartesian coordinates for computing relative angles.
    clipOrigin = [0, 0, 0];
    clipOrigin = cartesian(arc.source());
    x0 = origin[0] * d3_geo_radians;
    cy0 = Math.cos(y0 = origin[1] * d3_geo_radians);
    sy0 = Math.sin(y0);
    return clipType(d) || null;
  };

  var clipType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features.map(clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },

    Feature: function(o) {
      var geometry = clipType(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },

    Point: function(o) {
      return visible(o.coordinates) && o;
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates.filter(visible);
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates
      };
    },

    LineString: function(o) {
      var coordinates = clipLine(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.type = "MultiLineString", o.coordinates = coordinates, o);
    },

    MultiLineString: function(o) {
      var coordinates = d3.merge(o.coordinates.map(clipLine).filter(function(d) { return d.length; }));
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    Polygon: function(o) {
      var coordinates = clipPolygon(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.type = "MultiPolygon", o.coordinates = coordinates, o);
    },

    MultiPolygon: function(o) {
      var coordinates = d3.merge(o.coordinates.map(clipPolygon));
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }

  });

  function clipLine(coordinates) {
    var segments = [],
        inside = visible(coordinates[0]),
        tmp;
    for (var i = 1, j = 0, n = coordinates.length; i < n; i++) {
      var point = coordinates[i],
          v = visible(point);
      if (v !== inside) {
        inside = v;
        var point0 = coordinates[i - 1],
            d0 = distance(point0),
            d1 = distance(point);
        if (inside) {
          // outside going in
          tmp = d3_geo_greatArcInterpolate(point0, point)((radians - d0) / (d1 - d0));
        } else {
          // inside going out
          var segment = coordinates.slice(j, i);
          if (tmp) segment.unshift(tmp);
          tmp = null;
          segment.push(d3_geo_greatArcInterpolate(point0, point)((radians - d0) / (d1 - d0)));
          segments.push(segment);
        }
        j = i;
      }
    }
    if (inside && j < i) {
      var segment = coordinates.slice(j, i);
      if (tmp) segment.unshift(tmp);
      segments.push(segment);
    }
    return segments;
  }

  // Returns an array of polygons. Each polygon is an array of rings. The first
  // ring is the exterior, subsequent rings are holes.
  function clipPolygon(coordinates) {
    var polygons = [],
        ring = [],
        unvisited = 0, // number of unvisited entering intersections
        intersections = [];
    // Clip each ring into segments.
    var segments = [];
    coordinates.forEach(function(ring) {
      var ringSegments = clipLine(ring);
      // Since these are closed rings, we join segments if necessary.
      var n = ringSegments.length;
      if (n > 1) {
        var firstSegment = ringSegments[0],
            lastSegment = ringSegments[n - 1],
            p0 = firstSegment[0],
            p1 = lastSegment[lastSegment.length - 1];
        if (p0[0] === p1[0] && p0[1] === p1[1]) {
          ringSegments.shift();
          ringSegments.pop();
          ringSegments.push(lastSegment.concat(firstSegment));
        }
      }
      segments = segments.concat(ringSegments);
    });
    // Create a circular linked list using the intersected segment start and
    // end points, sorted by relative angles.
    segments.forEach(function(segment) {
      var p0 = segment[0],
          p1 = segment[segment.length - 1];
      if (p0[0] !== p1[0] || p0[1] !== p1[1]) {
        var b = {xyz: cartesian(p1)},
            a = {xyz: cartesian(p0), points: segment, other: b};
        intersections.push(a, b);
        unvisited++;
      } else {
        // TODO attach subsumed holes to the correct Polygons. For now, we can
        // add these as separate Polygons, since typically we draw everything
        // as a subpath in SVG so it doesn't matter if the holes don't match
        // their polygons. This would be done by calculating some kind of
        // winding number.
        polygons.push([segment]);
      }
    });
    if (!unvisited) return polygons;
    var reference = intersections[0].xyz;
    intersections.forEach(function(intersection, i) {
      intersection.angle = angle(intersection.xyz, reference);
    });
    intersections.sort(function(a, b) {
      return a.angle - b.angle;
    });
    for (var i = 0; i < intersections.length; i++) {
      intersections[i].next = intersections[(i + 1) % intersections.length];
    }
    var start = intersections[0],
        origin = arc.source();
    while (unvisited) {
      // Look for unvisited entering intersections.
      while (start.visited || !start.other) start = start.next;
      var intersection = start;
      // TODO interpolate along non-great circles where necessary.
      do {
        intersection.visited = true;
        if (ring.length) ring = ring.concat(arc.source(ring[ring.length - 1])(intersection.points[0]).coordinates);
        ring = ring.concat(intersection.points);
        intersection = intersection.other.next;
        unvisited--;
      } while (intersection !== start);
      if (ring.length) {
        polygons.push([ring.concat(arc.source(ring[ring.length - 1])(ring[0]).coordinates)]);
        ring = [];
      }
      start = start.next;
    }
    arc.source(origin);
    return polygons;
  }

  // Distance from the origin to a point. Copied from d3.geo.greatArc for
  // speed.
  function distance(point) {
    var x1 = point[0] * d3_geo_radians,
        y1 = point[1] * d3_geo_radians;
    return Math.acos(Math.max(-1, Math.min(1, sy0 * Math.sin(y1) + cy0 * Math.cos(y1) * Math.cos(x1 - x0))));
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]];
  }

  function magnitude(d) {
    return Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  }

  function normalize(d) {
    var l = magnitude(d);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }

  // Signed angle of one line relative to another.
  function angle(a, b) {
    normalize(a);
    normalize(b);
    var c = cross(a, b),
        angle = Math.atan2(magnitude(c), dot(a, b));
    return dot(c, clipOrigin) < 0 ? -angle : angle;
  }

  // Convert to Cartesian 3-space, relative to clip origin.
  function cartesian(point) {
    var p0 = point[0] * d3_geo_radians,
        p1 = point[1] * d3_geo_radians,
        c1 = Math.cos(p1),
        x = c1 * Math.cos(p0) - clipOrigin[0],
        y = c1 * Math.sin(p0) - clipOrigin[1],
        z = Math.sin(p1) - clipOrigin[2];
    return [x, y, z];
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    if (typeof origin !== "function") arc.source(origin);
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    radians = (degrees = +x) * d3_geo_radians;
    return circle;
  };

  return d3.rebind(circle, arc, "precision");
}

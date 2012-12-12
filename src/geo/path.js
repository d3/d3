// TODO fallback for projections that don't implement point, polygon? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_pathCircle(pointRadius),
      projection = d3.geo.albersUsa(),
      bounds,
      buffer = [],
      context;

  function path(object) {
    var result = null;
    if (object != result) {
      if (typeof pointRadius === "function") pointCircle = d3_geo_pathCircle(pointRadius.apply(this, arguments));
      object = projection.object(object);
      if (object) (context ? contextType : pathType)(object);
      if (buffer.length) result = buffer.join(""), buffer = [];
    }
    return result;
  }

  var contextType = d3_geo_type({
    point: function(coordinates) {
      context.point(coordinates[0], coordinates[1]);
    },
    line: function(coordinates) {
      if (!(n = coordinates.length)) return;
      var n,
          i = 0,
          point = coordinates[0];
      context.moveTo(point[0], point[1]);
      while (++i < n) context.lineTo((point = coordinates[i])[0], point[1]);
    },
    polygon: function(coordinates) {
      var n = coordinates.length,
          i = -1,
          m,
          j,
          ring,
          point;
      while (++i < n) {
        ring = coordinates[i];
        if ((m = ring.length - 1) < 1) continue;
        point = ring[0];
        context.moveTo(point[0], point[1]);
        for (j = 0; ++j < m;) {
          context.lineTo((point = ring[j])[0], point[1]);
        }
        context.closePath();
      }
    }
  });

  var pathType = d3_geo_type({
    point: function(coordinates) {
      buffer.push("M", coordinates, pointCircle);
    },
    line: function(coordinates) {
      buffer.push("M", coordinates.join("L"));
    },
    polygon: function(coordinates) {
      var i = -1, n = coordinates.length;
      while (++i < n) this.line(coordinates[i]), buffer.push("Z");
    }
  });

  path.area = d3_geo_type({
    Feature: function(feature) { return areaType.geometry(feature.geometry); },
    FeatureCollection: function(collection) { return d3.sum(collection.features, areaType.Feature); },
    GeometryCollection: function(collection) { return d3.sum(collection.geometries, areaType.geometry); },
    LineString: d3_zero,
    MultiLineString: d3_zero,
    MultiPoint: d3_zero,
    MultiPolygon: objectArea,
    Point: d3_zero,
    Polygon: objectArea,
    Sphere: objectArea
  });

  // For object types Polygon, MultiPolygon and Sphere only.
  function objectArea(o) {
    o = projection.object(o);
    return o
        ? o.type === "Polygon" ? polygonArea(o.coordinates)
        : d3.sum(o.coordinates, polygonArea)
        : 0;
  }

  function polygonArea(polygon) {
    return Math.abs(d3.sum(polygon, ringArea));
  }

  function ringArea(ring) {
    return d3.geom.polygon(ring).area();
  }

  path.bounds = function(object) {
    return (bounds || (bounds = d3_geo_bounds(projection)))(object);
  };

  path.centroid = function(object) {
    return (object = projection.object(object)) ? centroidType(object) : null;
  };

  var centroidType = d3_geo_type({
    FeatureCollection: d3_noop,
    GeometryCollection: d3_noop,

    MultiLineString: weightedCentroid(function(line) {
      var n = line.length,
          i = 0,
          p = line[0],
          x0 = p[0],
          y0 = p[1],
          x,
          y,
          z = 0,
          cx = 0,
          cy = 0,
          dx,
          dy,
          δ;
      while (++i < n) {
        p = line[i];
        x = p[0];
        y = p[1];
        dx = x - x0;
        dy = y - y0;
        z += δ = Math.sqrt(dx * dx + dy * dy);
        cx += δ * (x0 + x) / 2;
        cy += δ * (y0 + y) / 2;
        x0 = x;
        y0 = y;
      }
      return [cx, cy, z];
    }),

    Point: function(point) { return point.coordinates; },

    MultiPoint: weightedCentroid(function(point) {
      return [point[0], point[1], 1];
    }),

    Polygon: weightedCentroid(ringCentroid),

    MultiPolygon: weightedCentroid(function(polygon) {
      var x = 0,
          y = 0,
          z = 0,
          centroid;
      for (var i = 0, n = polygon.length; i < n; ++i) {
        centroid = ringCentroid(polygon[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x, y, z];
    })
  });

  function ringCentroid(ring) {
    var n = ring.length,
        i = 0,
        p = ring[0],
        x0 = p[0],
        y0 = p[1],
        x,
        y,
        z = 0,
        cx = 0,
        cy = 0,
        δ;
    while (++i < n) {
      p = ring[i];
      x = p[0];
      y = p[1];
      δ = y0 * x - x0 * y;
      z += δ * 3;
      cx += δ * (x0 + x);
      cy += δ * (y0 + y);
      x0 = x;
      y0 = y;
    }
    return [cx, cy, z];
  }

  function weightedCentroid(f) {
    return function(o) {
      var coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1,
          n = coordinates.length;
      while (++i < n) {
        centroid = f(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return z ? [x / z, y / z] : null;
    };
  }

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projection = _;
    bounds = null;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    context = _;
    return path;
  };

  path.pointRadius = function(x) {
    if (!arguments.length) return pointRadius;
    if (typeof x === "function") pointRadius = x;
    else pointCircle = d3_geo_pathCircle(pointRadius = +x);
    return path;
  };

  return path;
};

function d3_geo_pathCircle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

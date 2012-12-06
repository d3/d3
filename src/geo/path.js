// TODO fallback for projections that don't implement point, polygon? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_pathCircle(pointRadius),
      projection = d3.geo.albersUsa(),
      bounds,
      buffer = [];

  var bufferContext = {
    point: function(x, y) { buffer.push("M", x, ",", y, pointCircle); },
    moveTo: function(x, y) { buffer.push("M", x, ",", y); },
    lineTo: function(x, y) { buffer.push("L", x, ",", y); },
    closePath: function() { buffer.push("Z"); }
  };

  var context = bufferContext;

  function path(object) {
    var result = null;
    if (object != result) {
      if (typeof pointRadius === "function") pointCircle = d3_geo_pathCircle(pointRadius.apply(this, arguments));
      pathType.object(object);
      if (buffer.length) result = buffer.join(""), buffer = [];
    }
    return result;
  }

  var pathType = d3_geo_type({
    line: function(coordinates) { projection.line(coordinates, context); },
    polygon: function(coordinates) { projection.polygon(coordinates, context); },
    point: function(coordinates) { projection.point(coordinates, context); },
    Sphere: function() { projection.sphere(context); }
  });

  var areaType = d3_geo_type({
    Feature: function(feature) { return areaType.geometry(feature.geometry); },
    FeatureCollection: function(collection) { return d3.sum(collection.features, areaType.Feature); },
    GeometryCollection: function(collection) { return d3.sum(collection.geometries, areaType.geometry); },
    LineString: d3_zero,
    MultiLineString: d3_zero,
    MultiPoint: d3_zero,
    MultiPolygon: function(multiPolygon) { return d3.sum(multiPolygon.coordinates, polygonArea); },
    Point: d3_zero,
    Polygon: function(polygon) { return polygonArea(polygon.coordinates); },
    Sphere: sphereArea
  });

  function ringArea(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  function polygonArea(coordinates) {
    return ringArea(coordinates[0]) - d3.sum(coordinates.slice(1), ringArea);
  }

  function sphereArea() {
    var ring = [];
    function lineTo(x, y) { ring.push([x, y]); }
    projection.sphere({
      moveTo: lineTo,
      lineTo: lineTo,
      closePath: d3_noop
    });
    return Math.abs(d3.geom.polygon(ring).area());
  }

  path.area = function(object) { return areaType.object(object); };

  var centroidType = d3_geo_type({
    Feature: function(feature) { return centroidType.geometry(feature.geometry); },
    LineString: d3_geo_pathCentroid1(lineCentroid),
    MultiLineString: d3_geo_pathCentroid2(lineCentroid),
    MultiPoint: d3_geo_pathCentroid2(pointCentroid),
    MultiPolygon: d3_geo_pathCentroid3(ringCentroid),
    Point: d3_geo_pathCentroid1(pointCentroid),
    Polygon: d3_geo_pathCentroid2(ringCentroid),
    Sphere: sphereCentroid
  });

  function pointCentroid(centroid, point) {
    point = projection(point);
    centroid[0] += point[0];
    centroid[1] += point[1];
    return 1;
  }

  function lineCentroid(centroid, line) {
    if (!(n = line.length)) return 0;
    var n,
        point = projection(line[0]),
        x0 = point[0],
        y0 = point[1],
        x1,
        y1,
        dx,
        dy,
        i = 0,
        δ,
        z = 0;
    while (++i < n) {
      point = projection(line[i]);
      x1 = point[0];
      y1 = point[1];
      dx = x1 - x0;
      dy = y1 - y0;
      z += δ = Math.sqrt(dx * dx + dy * dy);
      centroid[0] += δ * (x0 + x1) / 2;
      centroid[1] += δ * (y0 + y1) / 2;
      x0 = x1;
      y0 = y1;
    }
    return z;
  }

  function ringCentroid(centroid, ring, i) {
    var polygon = d3.geom.polygon(ring.map(projection)),
        area = polygon.area(),
        point = polygon.centroid(area < 0 ^ i > 0 ? (area *= -1, 1) : -1);
    centroid[0] += point[0];
    centroid[1] += point[1];
    return area * 6;
  }

  function sphereCentroid() {
    var ring = [];
    function lineTo(x, y) { ring.push([x, y]); }
    projection.sphere({
      moveTo: lineTo,
      lineTo: lineTo,
      closePath: d3_noop
    });
    return d3.geom.polygon(ring).centroid();
  }

  path.bounds = function(object) {
    return (bounds || (bounds = d3_geo_bounds(projection)))(object);
  };

  path.centroid = function(object) {
    return centroidType.object(object);
  };

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projection = _;
    bounds = null;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context === bufferContext ? null : context;
    context = _;
    if (context == null) context = bufferContext;
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

function d3_geo_pathCentroid1(weightedCentroid) {
  return function(line) {
    var centroid = [0, 0], z = weightedCentroid(centroid, line.coordinates, 0);
    return z ? (centroid[0] /= z, centroid[1] /= z, centroid) : null;
  };
}

function d3_geo_pathCentroid2(weightedCentroid) {
  return function(polygon) {
    for (var centroid = [0, 0], z = 0, rings = polygon.coordinates, i = 0, n = rings.length; i < n; ++i) {
      z += weightedCentroid(centroid, rings[i], i);
    }
    return z ? (centroid[0] /= z, centroid[1] /= z, centroid) : null;
  }
}

function d3_geo_pathCentroid3(weightedCentroid) {
  return function(multiPolygon) {
    for (var centroid = [0, 0], z = 0, polygons = multiPolygon.coordinates, i = 0, n = polygons.length; i < n; ++i) {
      for (var rings = polygons[i], j = 0, m = rings.length; j < m; ++j) {
        z += weightedCentroid(centroid, rings[j], j);
      }
    }
    return z ? (centroid[0] /= z, centroid[1] /= z, centroid) : null;
  }
}

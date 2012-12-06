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

  var area,
      centroidWeight,
      x00, y00,
      x0, y0,
      cx, cy;

  var areaContext = {
    point: d3_noop,
    moveTo: moveTo,
    lineTo: function(x, y) { area += y0 * x - x0 * y; x0 = x; y0 = y; },
    closePath: closePath
  };

  var lineCentroidContext = {
    point: function(x, y) { cx += x; cy += y; ++centroidWeight; },
    moveTo: moveTo,
    lineTo: function(x, y) {
      var dx = x - x0,
          dy = y - y0,
          δ = Math.sqrt(dx * dx + dy * dy);
      centroidWeight += δ;
      cx += δ * (x0 + x) / 2;
      cy += δ * (y0 + y) / 2;
      x0 = x;
      y0 = y;
    },
    closePath: closePath
  };

  var polygonCentroidContext = {
    point: d3_noop,
    moveTo: moveTo,
    lineTo: function(x, y) {
      var δ = y0 * x - x0 * y;
      centroidWeight += δ * 3;
      cx += δ * (x0 + x);
      cy += δ * (y0 + y);
      x0 = x;
      y0 = y;
    },
    closePath: closePath
  };

  function moveTo(x, y) { x00 = x0 = x; y00 = y0 = y; }
  function closePath() { this.lineTo(x00, y00); }

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

  function polygonArea(coordinates) {
    area = 0;
    projection.polygon(coordinates, areaContext);
    return Math.abs(area) / 2;
  }

  function sphereArea() {
    area = 0;
    projection.sphere(areaContext);
    return Math.abs(area) / 2;
  }

  path.area = function(object) { return areaType.object(object); };

  var centroidType = d3_geo_type({
    Feature: function(feature) { return centroidType.geometry(feature.geometry); },

    LineString: weightedCentroid(function(lineString) {
      projection.line(lineString.coordinates, lineCentroidContext);
    }),

    MultiLineString: weightedCentroid(function(multiLineString) {
      var coordinates = multiLineString.coordinates, i = -1, n = coordinates.length;
      while (++i < n) projection.line(coordinates[i], lineCentroidContext);
    }),

    MultiPoint: weightedCentroid(function(multiPoint) {
      var coordinates = multiPoint.coordinates, i = -1, n = coordinates.length;
      while (++i < n) projection.point(coordinates[i], lineCentroidContext);
    }),

    MultiPolygon: weightedCentroid(function(multiPolygon) {
      var coordinates = multiPolygon.coordinates, i = -1, n = coordinates.length;
      while (++i < n) projection.polygon(coordinates[i], polygonCentroidContext);
    }),

    Point: weightedCentroid(function(point) {
      projection.point(point.coordinates, lineCentroidContext);
    }),

    Polygon: weightedCentroid(function(polygon) {
      projection.polygon(polygon.coordinates, polygonCentroidContext);
    }),

    Sphere: weightedCentroid(function() { projection.sphere(polygonCentroidContext); })
  });

  function weightedCentroid(f) {
    return function() {
      centroidWeight = cx = cy = 0;
      f.apply(this, arguments);
      return centroidWeight ? [cx / centroidWeight, cy / centroidWeight] : null;
    };
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

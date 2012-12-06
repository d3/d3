// TODO fallback for projections that don't implement point, polygon? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_pathCircle(pointRadius),
      projection = d3.geo.albersUsa(),
      bounds,
      buffer = [],
      array,
      arrays = [];

  var bufferContext = {
    point: function(x, y) { buffer.push("M", x, ",", y, pointCircle); },
    moveTo: function(x, y) { buffer.push("M", x, ",", y); },
    lineTo: function(x, y) { buffer.push("L", x, ",", y); },
    closePath: function() { buffer.push("Z"); }
  };

  // TODO replace with areaContext, centroidContext to avoid buffering
  var arrayContext = {
    point: function(x, y) { arrays.push([x, y]); },
    moveTo: function(x, y) { arrays.push(array = [[x, y]]); },
    lineTo: function(x, y) { array.push([x, y]); },
    closePath: function() { array.push(array[0]); }
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
    return d3.geom.polygon(coordinates).area();
  }

  function polygonArea(coordinates) {
    projection.polygon(coordinates, arrayContext);
    var area = Math.abs(d3.sum(arrays, ringArea));
    array = null;
    arrays = [];
    return area;
  }

  function sphereArea() {
    projection.sphere(arrayContext);
    var area = Math.abs(ringArea(array));
    array = null;
    arrays = [];
    return area;
  }

  path.area = function(object) { return areaType.object(object); };

  var centroidType = d3_geo_type({
    Feature: function(feature) { return centroidType.geometry(feature.geometry); },
    LineString: d3_geo_pathCentroid1(lineCentroid),
    MultiLineString: d3_geo_pathCentroid2(lineCentroid),
    MultiPoint: d3_geo_pathCentroid2(pointCentroid),
    MultiPolygon: d3_geo_pathCentroid2(polygonCentroid),
    Point: d3_geo_pathCentroid1(pointCentroid),
    Polygon: d3_geo_pathCentroid1(polygonCentroid),
    Sphere: sphereCentroid
  });

  function pointCentroid(centroid, point) {
    projection.point(point, arrayContext);
    array = null;
    if (arrays.length) {
      point = arrays[0];
      centroid[0] += point[0];
      centroid[1] += point[1];
      arrays = [];
      return 1;
    }
    return 0;
  }

  function lineCentroid(centroid, line) {
    projection.line(line, arrayContext);
    array = d3.merge(arrays);
    if (!(n = array.length)) return 0;
    var n,
        point = array[0],
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
      point = array[i];
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
    array = null;
    arrays = [];
    return z;
  }

  function polygonCentroid(centroid, polygon) {
    projection.polygon(polygon, arrayContext);
    for (var i = 0, area = 0, n = arrays.length; i < n; ++i) {
      var p = d3.geom.polygon(arrays[i]),
          a = p.area(),
          point = p.centroid(-1);
      centroid[0] += point[0];
      centroid[1] += point[1];
      area += a;
    }
    array = null;
    arrays = [];
    return area * 6;
  }

  function sphereCentroid() {
    projection.sphere(arrayContext);
    var centroid = d3.geom.polygon(array).centroid();
    array = null;
    arrays = [];
    return centroid;
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

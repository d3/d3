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
    point: function(coordinates) { projection.point(coordinates, context); }
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
    Polygon: function(polygon) { return polygonArea(polygon.coordinates); }
  });

  function ringArea(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  function polygonArea(coordinates) {
    return ringArea(coordinates[0]) - d3.sum(coordinates.slice(1), ringArea);
  }

  path.area = function(object) { return areaType.object(object); };

  var centroidType = d3_geo_type({
    Feature: function(feature) { return centroidType.geometry(feature.geometry); },
    FeatureCollection: function(collection) {
      return centroidType.GeometryCollection({geometries: collection.features.map(function(feature) { return feature.geometry; }) });
    },
    GeometryCollection: function(collection) {
      var geometries = collection.geometries,
          dimensions = geometries.map(d3_geo_pathDimension),
          dimension = d3.max(dimensions),
          coordinates = [];
      for (var i = 0, n = geometries.length, o; i < n; i++) {
        if (dimensions[i] !== dimension) continue;
        o = geometries[i];
        if (/^Multi/.test(o.type)) coordinates = coordinates.concat(o.coordinates);
        else coordinates.push(o.coordinates);
      }
      return coordinates.length
          ? centroidType["Multi" + (dimension === 0 ? "Point" : dimension === 1 ? "LineString" : "Polygon")]({coordinates: coordinates})
          : null;
    },
    LineString: d3_geo_pathSingleCentroid(lineCentroid),
    MultiLineString: d3_geo_pathMultiCentroid(lineCentroid),
    MultiPoint: d3_geo_pathMultiCentroid(pointCentroid),
    MultiPolygon: d3_geo_pathMultiCentroid(polygonCentroid),
    Point: d3_geo_pathSingleCentroid(pointCentroid),
    Polygon: d3_geo_pathSingleCentroid(polygonCentroid)
  });

  function pointCentroid(coordinates) {
    coordinates = projection(coordinates);
    coordinates.push(1);
    return coordinates;
  }

  function lineCentroid(coordinates) {
    if (!(n = coordinates.length)) return null;
    var n,
        point = projection(coordinates[0]),
        x0 = point[0],
        y0 = point[1],
        x1,
        y1,
        dx,
        dy,
        x = 0,
        y = 0,
        z = 0,
        i = 0,
        δ;
    while (++i < n) {
      x1 = (point = projection(coordinates[i]))[0];
      y1 = point[1];
      dx = x1 - x0;
      dy = y1 - y0;
      z += δ = Math.sqrt(dx * dx + dy * dy);
      x += δ * (x0 + x1) / 2;
      y += δ * (y0 + y1) / 2;
      x0 = x1;
      y0 = y1;
    }
    return z ? [x, y, z] : null; // weighted centroid
  }

  function polygonCentroid(coordinates) {
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
      area = polygon.area();
      centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
      x -= centroid[0];
      y -= centroid[1];
      z -= area;
    }
    return z ? [x, y, 6 * z] : null; // weighted centroid
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

var d3_geo_pathDimensionByType = {
  Point: 0,
  MultiPoint: 0,
  LineString: 1,
  MultiLineString: 1,
  Polygon: 2,
  MultiPolygon: 2
};

function d3_geo_pathDimension(o) {
  return d3_geo_pathDimensionByType[o.type];
}

function d3_geo_pathCircle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

function d3_geo_pathSingleCentroid(weightedCentroid) {
  return function(o) {
    var centroid = weightedCentroid(o.coordinates);
    return centroid ? [centroid[0] / centroid[2], centroid[1] / centroid[2]] : null;
  };
}

function d3_geo_pathMultiCentroid(weightedCentroid) {
  return function(o) {
    var coordinates = o.coordinates,
        centroid,
        x = 0,
        y = 0,
        z = 0,
        i = -1, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      centroid = weightedCentroid(coordinates[i]);
      if (centroid != null) {
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
    }
    return z ? [x / z, y / z] : null;
  }
}

// TODO restore path.area, path.centroid
// TODO fallback for projections that don't implement point, line, ring? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_path_circle(pointRadius),
      projection = d3.geo.albersUsa(),
      context;

  function path(object) {
    if (object == null) return null;
    if (typeof pointRadius === "function") pointCircle = d3_geo_path_circle(pointRadius.apply(this, arguments));
    pathObject(object, context || d3_geo_pathBufferContext);
    return d3_geo_pathBufferContext.buffer();
  }

  function pathObject(object, context) {
    var pathType = pathObjectByType.get(object.type);
    if (pathType) pathType(object, context);
  }

  function pathGeometry(geometry, context) {
    var pathType = pathGeometryByType.get(geometry.type);
    if (pathType) pathType(geometry, context);
  }

  function pathFeature(feature, context) {
    pathGeometry(feature.geometry, context);
  }

  function pathFeatureCollection(collection, context) {
    var features = collection.features, i = -1, n = features.length;
    while (++i < n) pathFeature(features[i], context);
  }

  function pathGeometryCollection(collection, context) {
    var geometries = collection.geometries, i = -1, n = geometries.length;
    while (++i < n) pathGeometry(geometries[i], context);
  }

  function pathLineString(lineString, context) {
    projection.line(lineString.coordinates, context);
  }

  function pathMultiLineString(multiLineString, context) {
    var coordinates = multiLineString.coordinates, i = -1, n = coordinates.length;
    while (++i < n) projection.line(coordinates[i], context);
  }

  function pathMultiPoint(multiPoint, context) {
    var coordinates = multiPoint.coordinates, i = -1, n = coordinates.length;
    while (++i < n) projection.point(coordinates[i], context);
  }

  function pathMultiPolygon(multiPolygon, context) {
    var coordinates = multiPolygon.coordinates, i = -1, n = coordinates.length;
    while (++i < n) {
      var subcoordinates = coordinates[i], j = -1, m = subcoordinates.length;
      while (++j < m) projection.ring(subcoordinates[j], context);
    }
  }

  function pathPoint(point, context) {
    projection.point(point.coordinates, context);
  }

  function pathPolygon(polygon, context) {
    var coordinates = polygon.coordinates, i = -1, n = coordinates.length;
    while (++i < n) projection.ring(coordinates[i], context);
  }

  var pathObjectByType = d3.map({
    Feature: pathFeature,
    FeatureCollection: pathFeatureCollection,
    GeometryCollection: pathGeometryCollection,
    LineString: pathLineString,
    MultiLineString: pathMultiLineString,
    MultiPoint: pathMultiPoint,
    MultiPolygon: pathMultiPolygon,
    Point: pathPoint,
    Polygon: pathPolygon
  });

  var pathGeometryByType = d3.map({
    GeometryCollection: pathGeometryCollection,
    LineString: pathLineString,
    MultiLineString: pathMultiLineString,
    MultiPoint: pathMultiPoint,
    MultiPolygon: pathMultiPolygon,
    Point: pathPoint,
    Polygon: pathPolygon
  });

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projection = _;
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
    else pointCircle = d3_geo_path_circle(pointRadius = +x);
    return path;
  };

  return path;
};

function d3_geo_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

var d3_geo_pathBuffer = [];

var d3_geo_pathBufferContext = {
  moveTo: function(x, y) { d3_geo_pathBuffer.push("M", x, y); },
  lineTo: function(x, y) { d3_geo_pathBuffer.push("L", x, y); },
  closePath: function() { d3_geo_pathBuffer.push("Z"); },
  buffer: function() {
    var _;
    return d3_geo_pathBuffer.length
        ? (_ = d3_geo_pathBuffer.join(""), d3_geo_pathBuffer = [], _)
        : null;
  }
};

  // function polygonArea(coordinates) {
  //   var sum = area(coordinates[0]), // exterior ring
  //       i = 0, // coordinates.index
  //       n = coordinates.length;
  //   while (++i < n) sum -= area(coordinates[i]); // holes
  //   return sum;
  // }

  // function polygonCentroid(coordinates) {
  //   var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
  //       area = polygon.area(),
  //       centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
  //       x = centroid[0],
  //       y = centroid[1],
  //       z = area,
  //       i = 0, // coordinates index
  //       n = coordinates.length;
  //   while (++i < n) {
  //     polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
  //     area = polygon.area();
  //     centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
  //     x -= centroid[0];
  //     y -= centroid[1];
  //     z -= area;
  //   }
  //   return [x, y, 6 * z]; // weighted centroid
  // }

  // var centroidType = path.centroid = d3_geo_type({

  //   // TODO FeatureCollection
  //   // TODO Point
  //   // TODO MultiPoint
  //   // TODO LineString
  //   // TODO MultiLineString
  //   // TODO GeometryCollection

  //   Feature: function(o) {
  //     return centroidType(o.geometry);
  //   },

  //   Polygon: function(o) {
  //     var centroid = polygonCentroid(o.coordinates);
  //     return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
  //   },

  //   MultiPolygon: function(o) {
  //     var area = 0,
  //         coordinates = o.coordinates,
  //         centroid,
  //         x = 0,
  //         y = 0,
  //         z = 0,
  //         i = -1, // coordinates index
  //         n = coordinates.length;
  //     while (++i < n) {
  //       centroid = polygonCentroid(coordinates[i]);
  //       x += centroid[0];
  //       y += centroid[1];
  //       z += centroid[2];
  //     }
  //     return [x / z, y / z];
  //   }

  // });

  // function area(coordinates) {
  //   return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  // }

  // var areaType = path.area = d3_geo_type({

  //   FeatureCollection: function(o) {
  //     var area = 0,
  //         features = o.features,
  //         i = -1, // features.index
  //         n = features.length;
  //     while (++i < n) area += areaType(features[i]);
  //     return area;
  //   },

  //   Feature: function(o) {
  //     return areaType(o.geometry);
  //   },

  //   Polygon: function(o) {
  //     return polygonArea(o.coordinates);
  //   },

  //   MultiPolygon: function(o) {
  //     var sum = 0,
  //         coordinates = o.coordinates,
  //         i = -1, // coordinates index
  //         n = coordinates.length;
  //     while (++i < n) sum += polygonArea(coordinates[i]);
  //     return sum;
  //   },

  //   GeometryCollection: function(o) {
  //     var sum = 0,
  //         geometries = o.geometries,
  //         i = -1, // geometries index
  //         n = geometries.length;
  //     while (++i < n) sum += areaType(geometries[i]);
  //     return sum;
  //   }

  // }, 0);

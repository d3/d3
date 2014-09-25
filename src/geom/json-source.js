import "geom";

// TODO nearly identical to d3.geo.jsonSource

d3.geom.jsonSource = function(sink) {
  return function(object) {
    (object && d3_geom_jsonSourceObjectType.hasOwnProperty(object.type)
        ? d3_geom_jsonSourceObjectType[object.type]
        : d3_geom_jsonSourceGeometry)(object, sink);
  };
};

function d3_geom_jsonSourceGeometry(geometry, sink) {
  if (geometry && d3_geom_jsonSourceGeometryType.hasOwnProperty(geometry.type)) {
    d3_geom_jsonSourceGeometryType[geometry.type](geometry, sink);
  }
}

var d3_geom_jsonSourceObjectType = {
  Feature: function(feature, sink) {
    d3_geom_jsonSourceGeometry(feature.geometry, sink);
  },
  FeatureCollection: function(object, sink) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) d3_geom_jsonSourceGeometry(features[i].geometry, sink);
  }
};

var d3_geom_jsonSourceGeometryType = {
  Sphere: function(object, sink) {
    sink.sphere();
  },
  Point: function(object, sink) {
    object = object.coordinates;
    sink.point(object[0], object[1]);
  },
  MultiPoint: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], sink.point(object[0], object[1]);
  },
  LineString: function(object, sink) {
    d3_geom_jsonSourceLine(object.coordinates, sink, 0);
  },
  MultiLineString: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geom_jsonSourceLine(coordinates[i], sink, 0);
  },
  Polygon: function(object, sink) {
    d3_geom_jsonSourcePolygon(object.coordinates, sink);
  },
  MultiPolygon: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geom_jsonSourcePolygon(coordinates[i], sink);
  },
  GeometryCollection: function(object, sink) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) d3_geom_jsonSourceGeometry(geometries[i], sink);
  }
};

function d3_geom_jsonSourceLine(coordinates, sink, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  sink.lineStart();
  while (++i < n) coordinate = coordinates[i], sink.point(coordinate[0], coordinate[1]);
  sink.lineEnd();
}

function d3_geom_jsonSourcePolygon(coordinates, sink) {
  var i = -1, n = coordinates.length;
  sink.polygonStart();
  while (++i < n) d3_geom_jsonSourceLine(coordinates[i], sink, 1);
  sink.polygonEnd();
}

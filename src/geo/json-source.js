import "../math/trigonometry";
import "geo";

d3.geo.jsonSource = function(sink) {
  return function(object) {
    (object && d3_geo_jsonSourceObjectType.hasOwnProperty(object.type)
        ? d3_geo_jsonSourceObjectType[object.type]
        : d3_geo_jsonSourceGeometry)(object, sink);
  };
};

function d3_geo_jsonSourceGeometry(geometry, sink) {
  if (geometry && d3_geo_jsonSourceGeometryType.hasOwnProperty(geometry.type)) {
    d3_geo_jsonSourceGeometryType[geometry.type](geometry, sink);
  }
}

var d3_geo_jsonSourceObjectType = {
  Feature: function(feature, sink) {
    d3_geo_jsonSourceGeometry(feature.geometry, sink);
  },
  FeatureCollection: function(object, sink) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) d3_geo_jsonSourceGeometry(features[i].geometry, sink);
  }
};

var d3_geo_jsonSourceGeometryType = {
  Sphere: function(object, sink) {
    sink.sphere();
  },
  Point: function(object, sink) {
    object = object.coordinates;
    sink.point(object[0] * d3_radians, object[1] * d3_radians);
  },
  MultiPoint: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], sink.point(object[0] * d3_radians, object[1] * d3_radians);
  },
  LineString: function(object, sink) {
    d3_geo_jsonSourceLine(object.coordinates, sink, 0);
  },
  MultiLineString: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geo_jsonSourceLine(coordinates[i], sink, 0);
  },
  Polygon: function(object, sink) {
    d3_geo_jsonSourcePolygon(object.coordinates, sink);
  },
  MultiPolygon: function(object, sink) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geo_jsonSourcePolygon(coordinates[i], sink);
  },
  GeometryCollection: function(object, sink) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) d3_geo_jsonSourceGeometry(geometries[i], sink);
  }
};

function d3_geo_jsonSourceLine(coordinates, sink, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  sink.lineStart();
  while (++i < n) coordinate = coordinates[i], sink.point(coordinate[0] * d3_radians, coordinate[1] * d3_radians);
  sink.lineEnd();
}

function d3_geo_jsonSourcePolygon(coordinates, sink) {
  var i = -1, n = coordinates.length;
  sink.polygonStart();
  while (++i < n) d3_geo_jsonSourceLine(coordinates[i], sink, 1);
  sink.polygonEnd();
}

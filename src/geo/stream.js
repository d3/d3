import "geo";

d3.geo.stream = function(object, listener) {
  if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
    d3_geo_streamObjectType[object.type](object, listener);
  } else {
    d3_geo_streamGeometry(object, listener);
  }
};

function d3_geo_streamGeometry(geometry, listener) {
  if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
    d3_geo_streamGeometryType[geometry.type](geometry, listener);
  }
}

var d3_geo_streamObjectType = {
  Feature: function(feature, listener) {
    d3_geo_streamGeometry(feature.geometry, listener);
  },
  FeatureCollection: function(object, listener) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
  }
};

var d3_geo_streamGeometryType = {
  Sphere: function(object, listener) {
    listener.sphere();
  },
  Point: function(object, listener) {
    object = object.coordinates;
    listener.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, listener) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
  },
  LineString: function(object, listener) {
    d3_geo_streamLine(object.coordinates, listener, 0);
  },
  MultiLineString: function(object, listener) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
  },
  Polygon: function(object, listener) {
    d3_geo_streamPolygon(object.coordinates, listener);
  },
  MultiPolygon: function(object, listener) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
  },
  GeometryCollection: function(object, listener) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
  }
};

function d3_geo_streamLine(coordinates, listener, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  listener.lineStart();
  while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
  listener.lineEnd();
}

function d3_geo_streamPolygon(coordinates, listener) {
  var i = -1, n = coordinates.length;
  listener.polygonStart();
  while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
  listener.polygonEnd();
}

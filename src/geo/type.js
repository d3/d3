function d3_geo_type(types) {
  for (var type in d3_geo_typeDefaults) {
    if (!(type in types)) {
      types[type] = d3_geo_typeDefaults[type];
    }
  }
  return types;
}

var d3_geo_typeDefaults = {

  Feature: function(feature) {
    this.geometry(feature.geometry);
  },

  FeatureCollection: function(collection) {
    var features = collection.features, i = -1, n = features.length;
    while (++i < n) this.Feature(features[i]);
  },

  GeometryCollection: function(collection) {
    var geometries = collection.geometries, i = -1, n = geometries.length;
    while (++i < n) this.geometry(geometries[i]);
  },

  LineString: function(lineString) {
    this.line(lineString.coordinates);
  },

  MultiLineString: function(multiLineString) {
    var coordinates = multiLineString.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  },

  MultiPoint: function(multiPoint) {
    var coordinates = multiPoint.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  MultiPolygon: function(multiPolygon) {
    var coordinates = multiPolygon.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.polygon(coordinates[i]);
  },

  Point: function(point) {
    this.point(point.coordinates);
  },

  Polygon: function(polygon) {
    this.polygon(polygon.coordinates);
  },

  Sphere: function() {
    this.polygon(null);
  },

  // dispatch for any GeoJSON object type
  object: function(object) {
    return d3_geo_typeObjects.hasOwnProperty(object.type)
        ? this[object.type](object)
        : this.geometry(object);
  },

  // dispatch for any GeoJSON geometry type
  geometry: function(geometry) {
    return d3_geo_typeGeometries.hasOwnProperty(geometry.type)
        ? this[geometry.type](geometry)
        : null;
  },

  // coordinates [x, y]
  point: d3_noop,

  // coordinates [[x1, y1], [x2, y2], …]
  line: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  // coordinates [[[x1, y1], [x2, y2], …], [[x1, y1], [x2, y2], …], …]
  polygon: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  }
};

var d3_geo_typeGeometries = {
  LineString: 1,
  MultiLineString: 1,
  MultiPoint: 1,
  MultiPolygon: 1,
  Point: 1,
  Polygon: 1,
  Sphere: 1
};

var d3_geo_typeObjects = {
  Feature: 1,
  FeatureCollection: 1,
  GeometryCollection: 1
};

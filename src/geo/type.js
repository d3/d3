// TODO optimized path when no object creation is desired?
// TODO return bound object function, rather than a map of types?

function d3_geo_type(types) {
  for (var type in d3_geo_typeDefaults) {
    if (!(type in types)) {
      types[type] = d3_geo_typeDefaults[type];
    }
  }
  return types;
}

var d3_geo_typeDefaults = {

  Feature: function(o) {
    var g = this.geometry(o.geometry);
    return g && (o = Object.create(o), o.geometry = g, o);
  },

  FeatureCollection: function foo(o) {
    var a, f, features = o.features, i = -1, n = features.length;
    while (++i < n) if (f = this.Feature(features[i])) a ? a.push(f) : a = [f];
    return a && (o = Object.create(o), o.features = a, o);
  },

  GeometryCollection: function(o) {
    var a, g, geometries = o.geometries, i = -1, n = geometries.length;
    while (++i < n) if (g = this.geometry(geometries[i])) a ? a.push(g) : a = [g];
    return a && (o = Object.create(o), o.geometries = a, o);
  },

  LineString: function(o) {
    var c = this.line(o.coordinates);
    return c && (o = Object.create(o), o.coordinates = c, o);
  },

  MultiLineString: function(o) {
    var a, c, coordinates = o.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (c = this.line(coordinates[i])) a ? a.push(c) : a = [c];
    return a && (o = Object.create(o), o.coordinates = a, o);
  },

  MultiPoint: function(o) {
    var a, c, coordinates = o.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (c = this.point(coordinates[i])) a ? a.push(c) : a = [c];
    return a && (o = Object.create(o), o.coordinates = a, o);
  },

  MultiPolygon: function(o) {
    var a, c, coordinates = o.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (c = this.polygon(coordinates[i])) a ? a.push(c) : a = [c];
    return a && (o = Object.create(o), o.coordinates = a, o);
  },

  Point: function(o) {
    var c = this.point(o.coordinates);
    return c && (o = Object.create(o), o.coordinates = c, o);
  },

  Polygon: function(o) {
    var c = this.polygon(o.coordinates);
    return c && (o = Object.create(o), o.coordinates = c, o);
  },

  Sphere: d3_noop,

  object: function(o) {
    return d3_geo_typeObjects.hasOwnProperty(o.type)
        ? this[o.type](o)
        : this.geometry(o);
  },

  geometry: function(o) {
    return d3_geo_typeGeometries.hasOwnProperty(o.type)
        ? this[o.type](o)
        : null;
  },

  point: d3_noop,

  line: function(coordinates) {
    var a, c, i = -1, n = coordinates.length;
    while (++i < n) if (c = this.point(coordinates[i])) a ? a.push(c) : a = [c];
    return a;
  },

  polygon: function(coordinates) {
    var a, c, i = -1, n = coordinates.length;
    while (++i < n) if (c = this.line(coordinates[i])) a ? a.push(c) : a = [c];
    return a;
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

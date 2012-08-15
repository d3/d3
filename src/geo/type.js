function d3_geo_type(types, defaultValue) {
  return function(object) {
    return object && types.hasOwnProperty(object.type) ? types[object.type](object) : defaultValue;
  };
}

function d3_geo_typeRecurse(types, defaultValue) {
  var type = d3_geo_type(types, defaultValue),
      defaults = {
    Feature: function(o) { type(o.geometry); },
    FeatureCollection: function(o) {
      for (var a = o.features, i = 0, n = a.length; i < n; i++) {
        type(a[i].geometry);
      }
    },
    GeometryCollection: function(o) {
      for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
        type(a[i]);
      }
    },
    LineString: multiPoint,
    MultiPoint: multiPoint,
    MultiLineString: multiLineString,
    Polygon: multiLineString,
    MultiPolygon: function(o) {
      for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
        type({type: "Polygon", coordinates: a[i]});
      }
    }
  };
  for (var k in defaults) if (!types.hasOwnProperty(k)) types[k] = defaults[k];
  return type;

  function multiPoint(o) {
    for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
      type({type: "Point", coordinates: a[i]});
    }
  }

  function multiLineString(o) {
    for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
      type({type: "LineString", coordinates: a[i]});
    }
  }
}

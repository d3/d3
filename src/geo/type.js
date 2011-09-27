function d3_geo_type(types, defaultValue) {
  return function(object) {
    return object && object.type in types ? types[object.type](object) : defaultValue;
  };
}

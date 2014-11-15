function d3_property_number(object, name, value) {

  object[name] = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : +_, object) : value;
  };

  return function(that, args) {
    return typeof value === "function" ? +value.apply(that, args) : value;
  };
}

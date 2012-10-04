d3.tween = function(b, interpolate) {

  function tweenFunction(d, i, a) {
    var v = b.call(this, d, i);
    return v == null
        ? a != "" && d3_tweenRemove
        : a != v && interpolate(a, v + "");
  }

  function tweenString(d, i, a) {
    return a != b && interpolate(a, b);
  }

  return typeof b === "function" ? tweenFunction
      : b == null ? d3_tweenNull
      : (b += "", tweenString);
};

var d3_tweenRemove = {};

function d3_tweenNull(d, i, a) {
  return a != "" && d3_tweenRemove;
}

function d3_tweenByName(b, name) {
  return d3.tween(b, d3_interpolateByName(name));
}

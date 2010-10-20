d3.log = function() {
  var linear = d3.linear();

  function scale(x) {
    return linear(Math.log(x));
  }

  scale.invert = function(x) {
    return Math.exp(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(Math.exp);
    linear.domain(x.map(Math.log));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  return scale;
};

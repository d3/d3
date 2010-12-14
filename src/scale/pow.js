d3.scale.pow = function() {
  var linear = d3.scale.linear(),
      p = 1,
      b = 1 / p;

  function powp(x) {
    return Math.pow(x, p);
  }

  function powb(x) {
    return Math.pow(x, b);
  }

  function scale(x) {
    return linear(powp(x));
  }

  function tick() {
    return d3.scale.linear().domain(scale.domain());
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  // TODO better tick formatting...
  scale.ticks = function(m) {
    return tick().ticks(m);
  };

  scale.tickFormat = function(m) {
    return tick().tickFormat(m);
  };

  scale.exponent = function(x) {
    if (!arguments.length) return p;
    var domain = scale.domain();
    p = x;
    b = 1 / x;
    return scale.domain(domain);
  };

  return scale;
};

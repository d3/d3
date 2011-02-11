d3.scale.pow = function() {
  var linear = d3.scale.linear(),
      tick = d3.scale.linear(), // TODO better tick formatting...
      p = 1,
      b = 1 / p;

  function powp(x) {
    return x < 0 ? -Math.pow(-x, p) : Math.pow(x, p);
  }

  function powb(x) {
    return x < 0 ? -Math.pow(-x, b) : Math.pow(x, b);
  }

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    tick.domain(x);
    return scale;
  };

  scale.range = d3_rebind(scale, linear.range);
  scale.rangeRound = d3_rebind(scale, linear.rangeRound);
  scale.inteprolate = d3_rebind(scale, linear.interpolate);
  scale.ticks = tick.ticks;
  scale.tickFormat = tick.tickFormat;

  scale.exponent = function(x) {
    if (!arguments.length) return p;
    var domain = scale.domain();
    p = x;
    b = 1 / x;
    return scale.domain(domain);
  };

  return scale;
};

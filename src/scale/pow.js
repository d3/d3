d3.scale.pow = function() {
  var linear = d3.scale.linear(),
      tick = d3.scale.linear(), // TODO better tick formatting...
      exponent = 1,
      powp = Number,
      powb = powp;

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    var pow = (x[0] || x[1]) < 0 ? d3_scale_pown : d3_scale_pow;
    powp = pow(exponent);
    powb = pow(1 / exponent);
    linear.domain(x.map(powp));
    tick.domain(x);
    return scale;
  };

  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);
  scale.ticks = tick.ticks;
  scale.tickFormat = tick.tickFormat;

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    exponent = x;
    return scale.domain(domain);
  };

  return scale;
};

function d3_scale_pow(e) {
  return function(x) {
    return Math.pow(x, e);
  };
}

function d3_scale_pown(e) {
  return function(x) {
    return -Math.pow(-x, e);
  };
}

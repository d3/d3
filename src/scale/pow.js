d3.scale.pow = function() {
  var linear = d3.scale.linear(),
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
    var pow = (x[0] || x[x.length - 1]) < 0 ? d3_scale_pown : d3_scale_pow;
    powp = pow(exponent);
    powb = pow(1 / exponent);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    exponent = x;
    return scale.domain(domain);
  };

  return d3_scale_linearRebind(scale, linear);
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

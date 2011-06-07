d3.scale.log = function() {
  var linear = d3.scale.linear(),
      log = d3_scale_log,
      pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = (x[0] || x[1]) < 0 ? d3_scale_logn : d3_scale_log;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);

  scale.nice = function() {
    var domain = linear.domain().map(pow),
        last = domain.length - 1,
        start = domain[0],
        end = domain[last],
        reverse = end < start,
        min = reverse ? end : start,
        max = reverse ? start : end;
    domain[reverse ? last : 0] = log.floor(min);
    domain[reverse ? 0 : last] = log.ceil(max);
    return scale.domain(domain);
  };

  scale.ticks = function() {
    var d = linear.domain(),
        ticks = [];
    if (d.every(isFinite)) {
      var i = Math.floor(d[0]),
          j = Math.ceil(d[1]),
          u = pow(d[0]),
          v = pow(d[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function() {
    return function(d) { return d.toPrecision(1); };
  };

  return scale;
};

function d3_scale_log(x) {
  return Math.log(x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(-x) / Math.LN10;
}

d3_scale_log.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};

d3_scale_log.floor = function(x) {
  return d3_scale_log.pow(Math.floor(d3_scale_log(x)));
};

d3_scale_logn.floor = function(x) {
  return d3_scale_logn.pow(Math.floor(d3_scale_logn(x)));
};

d3_scale_log.ceil = function(x) {
  return d3_scale_log.pow(Math.ceil(d3_scale_log(x)));
};

d3_scale_logn.ceil = function(x) {
  return d3_scale_logn.pow(Math.ceil(d3_scale_logn(x)));
};

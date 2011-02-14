d3.scale.log = function() {
  var linear = d3.scale.linear(),
      n = false;

  function log(x) {
    return (n ? -Math.log(-x) : Math.log(x)) / Math.LN10;
  }

  function pow(y) {
    return n ? -Math.pow(10, -y) : Math.pow(10, y);
  }

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    n = (x[0] || x[1]) < 0;
    linear.domain(x.map(log));
    return scale;
  };

  scale.range = d3_rebind(scale, linear.range);
  scale.rangeRound = d3_rebind(scale, linear.rangeRound);
  scale.interpolate = d3_rebind(scale, linear.interpolate);

  scale.ticks = function() {
    var d = linear.domain(),
        ticks = [];
    if (d.every(isFinite)) {
      var i = Math.floor(d[0]),
          j = Math.ceil(d[1]),
          u = pow(d[0]),
          v = pow(d[1]);
      if (n) {
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

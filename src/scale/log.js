d3.scale.log = function() {
  var linear = d3.scale.linear();

  function log(x) {
    return Math.log(x) / Math.LN10;
  }

  function pow(y) {
    return Math.pow(10, y);
  }

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    linear.domain(x.map(log));
    return scale;
  };

  scale.range = d3_rebind(scale, linear.range);
  scale.rangeRound = d3_rebind(scale, linear.rangeRound);
  scale.interpolate = d3_rebind(scale, linear.interpolate);

  scale.ticks = function() {
    var d = linear.domain(),
        i = Math.floor(d[0]),
        j = Math.ceil(d[1]),
        ticks = [];
    if (d.every(isFinite)) {
      while (++i <= j) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
      ticks.push(pow(i));
    }
    return ticks;
  };

  scale.tickFormat = function() {
    return function(d) { return d.toPrecision(1); };
  };

  return scale;
};

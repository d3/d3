import "../format/format";
import "linear";
import "nice";
import "scale";

d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, true, [1, 10]);
};

function d3_scale_log(linear, base, positive, domain) {

  function log(x) {
    return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
  }

  function pow(x) {
    return positive ? Math.pow(base, x) : -Math.pow(base, -x);
  }

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    positive = x[0] >= 0;
    linear.domain((domain = x.map(Number)).map(log));
    return scale;
  };

  scale.base = function(_) {
    if (!arguments.length) return base;
    base = +_;
    return scale.domain(domain);
  };

  scale.nice = function() {
    domain = d3_scale_nice(linear.domain(), positive ? Math : d3_scale_logNiceNegative).map(pow);
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(domain),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(log(extent[0])),
          j = Math.ceil(log(extent[1])),
          u = extent[0],
          v = extent[1],
          n = base % 1 ? 2 : base;
      if (positive) {
        for (; i < j; i++) for (var k = 1; k < n; k++) ticks.push(Math.pow(base, i) * k);
        ticks.push(Math.pow(base, i));
      } else {
        ticks.push(-Math.pow(base, -i));
        for (; i++ < j;) for (var k = n - 1; k > 0; k--) ticks.push(-Math.pow(base, -i) * k);
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (!arguments.length) return d3_scale_logFormat;
    if (arguments.length < 2) format = d3_scale_logFormat;
    else if (typeof format !== "function") format = d3.format(format);
    var k = Math.max(.1, n / scale.ticks().length),
        f = positive ? (e = 1e-12, Math.ceil) : (e = -1e-12, Math.floor),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) <= k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), base, positive, domain);
  };

  return d3_scale_linearRebind(scale, linear);
}

var d3_scale_logFormat = d3.format(".0e"),
    d3_scale_logNiceNegative = {floor: function(x) { return -Math.ceil(-x); }, ceil: function(x) { return -Math.floor(-x); }};

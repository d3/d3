d3.layout.histogram = function() {
  var frequency = true,
      value = Number,
      ticksFunction = d3_layout_histogramTicks;

  function histogram(data, i) {
    var x = data.map(value),
        bins = [],
        bin,
        ticks = ticksFunction.call(this, data, i),
        i = -1,
        n = x.length,
        m = ticks.length - 1,
        k = frequency ? 1 / n : 1;

    // Initialize the bins.
    while (++i < m) {
      bin = bins[i] = [];
      bin.dx = ticks[i + 1] - (bin.x = ticks[i]);
      bin.y = 0;
    }

    // Count the number of samples per bin.
    i = -1; while(++i < n) {
      bin = bins[d3.bisect(ticks, x[i], 0, m - 1)];
      bin.y += k;
      bin.push(data[i]);
    }

    return bins;
  }

  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = !!x;
    return histogram;
  };

  histogram.ticks = function(x) {
    if (!arguments.length) return ticksFunction;
    ticksFunction = d3.functor(x);
    return histogram;
  };

  histogram.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return histogram;
  };

  return histogram;
};

function d3_layout_histogramTicks(x) {
  return d3.scale.linear().domain(x).ticks(10);
}

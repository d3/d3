d3.layout.histogram = function() {
  var frequency = true,
      value = Number,
      ticksFunction = d3_layout_histogramTicks;

  function histogram(data, i) {
    var x = data.map(value), bins = [];

    // Initialize default ticks.
    var ticks = ticksFunction.call(this, data, i);

    // Initialize the bins.
    for (var i = 0; i < ticks.length - 1; i++) {
      var bin = bins[i] = [];
      bin.x = ticks[i];
      bin.dx = ticks[i + 1] - ticks[i];
      bin.y = 0;
    }

    // Count the number of samples per bin.
    for (var i = 0; i < x.length; i++) {
      var j = d3_layout_histogramSearchIndex(ticks, x[i]) - 1,
          bin = bins[Math.max(0, Math.min(bins.length - 1, j))];
      bin.y++;
      bin.push(data[i]);
    }

    // Convert frequencies to probabilities.
    if (!frequency) for (var i = 0; i < bins.length; i++) {
      bins[i].y /= x.length;
    }

    return bins;
  }

  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = Boolean(x);
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

// Performs a binary search on a sorted array.
// Returns the index of the value if found, otherwise -(insertion point) - 1.
// The insertion point is the index at which value should be inserted into the
// array for the array to remain sorted.
function d3_layout_histogramSearch(array, value) {
  var low = 0, high = array.length - 1;
  while (low <= high) {
    var mid = (low + high) >> 1, midValue = array[mid];
    if (midValue < value) low = mid + 1;
    else if (midValue > value) high = mid - 1;
    else return mid;
  }
  return -low - 1;
}

function d3_layout_histogramSearchIndex(array, value) {
  var i = d3_layout_histogramSearch(array, value);
  return (i < 0) ? (-i - 1) : i;
}

function d3_layout_histogramTicks(x) {
  return d3.scale.linear().domain(x).ticks(10);
}

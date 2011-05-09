// http://exploringdata.net/den_trac.htm
d3.stats.kde = function() {
  var kernel = d3.stats.kernel.epanechnikov,
      sample = [],
      scale = 1;

  function kde(points) {
    return points.map(function(x) {
      var i = -1,
          y = 0,
          n = sample.length;
      while (++i < n) {
        y += kernel((x - sample[i]) / scale);
      }
      return [x, y / scale / n];
    });
  }

  kde.kernel = function(x) {
    if (!arguments.length) return kernel;
    kernel = x;
    return kde;
  };

  kde.sample = function(x) {
    if (!arguments.length) return sample;
    sample = x;
    return kde;
  };

  kde.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return kde;
  };

  return kde;
};

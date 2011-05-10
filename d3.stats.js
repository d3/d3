(function(){d3.stats = {};
// Bandwidth selectors for Gaussian kernels.
// Based on R's implementations in `stats.bw`.
d3.stats.bandwidth = {

  // Silverman, B. W. (1986) Density Estimation. London: Chapman and Hall.
  nrd0: function(x) {
    var hi = Math.sqrt(d3.stats.variance(x));
    if (!(lo = Math.min(hi, d3.stats.iqr(x) / 1.34)))
      (lo = hi) || (lo = Math.abs(x[1])) || (lo = 1);
    return .9 * lo * Math.pow(x.length, -.2);
  },

  // Scott, D. W. (1992) Multivariate Density Estimation: Theory, Practice, and
  // Visualization. Wiley.
  nrd: function(x) {
    var r = d3.stats.quantiles(x, [.25, .75]),
        h = (r[1] - r[0]) / 1.34;
    return 1.06 * Math.min(Math.sqrt(d3.stats.variance(x)), h)
      * Math.pow(x.length, -1/5);
  }
};
// See <http://en.wikipedia.org/wiki/Kernel_(statistics)>.
d3.stats.kernel = {
  uniform: function(u) {
    if (u <= 1 && u >= -1) return .5;
    return 0;
  },
  triangular: function(u) {
    if (u <= 1 && u >= -1) return 1 - Math.abs(u);
    return 0;
  },
  epanechnikov: function(u) {
    if (u <= 1 && u >= -1) return .75 * (1 - u * u);
    return 0;
  },
  quartic: function(u) {
    if (u <= 1 && u >= -1) {
      var tmp = 1 - u * u;
      return (15 / 16) * tmp * tmp;
    }
    return 0;
  },
  triweight: function(u) {
    if (u <= 1 && u >= -1) {
      var tmp = 1 - u * u;
      return (35 / 32) * tmp * tmp * tmp;
    }
    return 0;
  },
  gaussian: function(u) {
    return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * u * u);
  },
  cosine: function(u) {
    if (u <= 1 && u >= -1) return Math.PI / 4 * Math.cos(Math.PI / 2 * u);
    return 0;
  }
};
// http://exploringdata.net/den_trac.htm
d3.stats.kde = function() {
  var kernel = d3.stats.kernel.gaussian,
      sample = [],
      bandwidth = d3.stats.bandwidth.nrd;

  function kde(points, i) {
    var bw = bandwidth.call(this, sample);
    return points.map(function(x) {
      var i = -1,
          y = 0,
          n = sample.length;
      while (++i < n) {
        y += kernel((x - sample[i]) / bw);
      }
      return [x, y / bw / n];
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

  kde.bandwidth = function(x) {
    if (!arguments.length) return bandwidth;
    bandwidth = d3.functor(x);
    return kde;
  };

  return kde;
};
d3.stats.iqr = function(x) {
  var quartiles = d3.stats.quantiles(x, [.25, .75]);
  return quartiles[1] - quartiles[0];
};
d3.stats.mean = function(x) {
  var s = 0,
      n = x.length,
      i = -1;
  while (++i < n) s += x[i];
  return s / n;
}
d3.stats.quantiles = function(d, quantiles) {
  d = d.sort(d3.ascending);
  var n = d.length;
  return quantiles.map(function(q) {
    q *= n;
    return ~~q === q ? (d[q] + d[q + 1]) / 2 : d[Math.round(q)];
  });
};
// TODO: replace with more stable algorithm.
// Sample variance.
d3.stats.variance = function(x) {
  var mean = d3.stats.mean(x),
      n = x.length,
      i = -1,
      s = 0;
  while (++i < n) {
    var v = x[i] - mean;
    s += v * v;
  }
  return s / (n - 1);
};
})()
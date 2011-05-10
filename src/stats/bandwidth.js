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

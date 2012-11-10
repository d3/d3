d3.random = {
  normal: function(mu, sigma) {
    var n = arguments.length;
    if (n < 2) sigma = 1;
    if (n < 1) mu = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mu + sigma * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  },
  logNormal: function(mu, sigma) {
    var n = arguments.length;
    if (n < 2) sigma = 1;
    if (n < 1) mu = 0;
    var random = d3.random.normal();
    return function() {
      return Math.exp(mu + sigma * random());
    };
  },
  irwinHall: function(m) {
    return function() {
      for (var s = 0, j = 0; j < m; j++) s += Math.random();
      return s / m;
    };
  }
};

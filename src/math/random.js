d3.random = {
  normal: function(µ, σ) {
    var n = arguments.length;
    if (n < 2) σ = 1;
    if (n < 1) µ = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  },
  logNormal: function() {
    var random = d3.random.normal.apply(d3, arguments);
    return function() {
      return Math.exp(random());
    };
  },
  bates: function(m) {
    var random = d3.random.irwinHall(m);
    return function() {
      return random() / m;
    };
  },
  irwinHall: function(m) {
    return function() {
      for (var s = 0, j = 0; j < m; j++) s += Math.random();
      return s;
    };
  }
};

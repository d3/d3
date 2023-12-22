import defaultSource from "./defaultSource.js";
import binomial from "./binomial.js";
import gamma from "./gamma.js";

export default (function sourceRandomPoisson(source) {
  var G = gamma.source(source),
      B = binomial.source(source);

  function randomPoisson(lambda) {
    return function() {
      var acc = 0, l = lambda;
      while (l > 16) {
        var n = Math.floor(0.875 * l),
            t = G(n)();
        if (t > l) return acc + B(n - 1, l / t)();
        acc += n;
        l -= t;
      }
      for (var s = -Math.log1p(-source()), k = 0; s <= l; ++k) s -= Math.log1p(-source());
      return acc + k;
    };
  }

  randomPoisson.source = sourceRandomPoisson;

  return randomPoisson;
})(defaultSource);

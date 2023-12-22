import defaultSource from "./defaultSource.js";
import beta from "./beta.js";
import geometric from "./geometric.js";

export default (function sourceRandomBinomial(source) {
  var G = geometric.source(source),
      B = beta.source(source);

  function randomBinomial(n, p) {
    n = +n;
    if ((p = +p) >= 1) return () => n;
    if (p <= 0) return () => 0;
    return function() {
      var acc = 0, nn = n, pp = p;
      while (nn * pp > 16 && nn * (1 - pp) > 16) {
        var i = Math.floor((nn + 1) * pp),
            y = B(i, nn - i + 1)();
        if (y <= pp) {
          acc += i;
          nn -= i;
          pp = (pp - y) / (1 - y);
        } else {
          nn = i - 1;
          pp /= y;
        }
      }
      var sign = pp < 0.5,
          pFinal = sign ? pp : 1 - pp,
          g = G(pFinal);
      for (var s = g(), k = 0; s <= nn; ++k) s += g();
      return acc + (sign ? k : nn - k);
    };
  }

  randomBinomial.source = sourceRandomBinomial;

  return randomBinomial;
})(defaultSource);

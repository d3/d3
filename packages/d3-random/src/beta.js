import defaultSource from "./defaultSource.js";
import gamma from "./gamma.js";

export default (function sourceRandomBeta(source) {
  var G = gamma.source(source);

  function randomBeta(alpha, beta) {
    var X = G(alpha),
        Y = G(beta);
    return function() {
      var x = X();
      return x === 0 ? 0 : x / (x + Y());
    };
  }

  randomBeta.source = sourceRandomBeta;

  return randomBeta;
})(defaultSource);

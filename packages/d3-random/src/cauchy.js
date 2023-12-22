import defaultSource from "./defaultSource.js";

export default (function sourceRandomCauchy(source) {
  function randomCauchy(a, b) {
    a = a == null ? 0 : +a;
    b = b == null ? 1 : +b;
    return function() {
      return a + b * Math.tan(Math.PI * source());
    };
  }

  randomCauchy.source = sourceRandomCauchy;

  return randomCauchy;
})(defaultSource);

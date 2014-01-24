import "../math/number";

d3.weightedMean = function(array, weights) {
  var n = array.length,
    a,
    b,
    w = 0,
    t = 0,
    i = -1;
    if (arguments.length === 2) {
      while (++i < n) if (d3_number(a = array[i]) && d3_number(b = weights[i])) {
        w = w * (t / (t + b)) + a * (b / (t + b));
        t += b;
      }
    }
    return t ? w : undefined;
}

d3.variance = function(array, f) {
  var n   = array.length;
  if(n < 1) return NaN;
  var mean = d3.mean(array),
      a,
      sd   = 0,
      i    = -1,
      j    = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])){ sd += Math.pow(a - mean, 2); ++j; }
  } else {
    while (++i < n) array[i] = f.call(array, array[i], i);
    return d3.variance(array);
  }
  return j ? parseFloat(sd) * 1/(j - 1) : undefined;
};

d3.pairs = function(array) {
  var pairs = [], i = 0, n = array.length, p0, p1 = array[i];
  while (++i < n) pairs.push([p0 = p1, p1 = array[i]]);
  return pairs;
};

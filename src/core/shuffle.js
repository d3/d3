d3.shuffle = function(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
};

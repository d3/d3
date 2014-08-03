d3.shuffle = function(array, i0, i1) {
	i1 = i1 | array.length;
	i0 = i0 < i1 ? i0 : 0;
	var m = i1 - i0, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
  	t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
  }
  return array;
};

d3.shuffle = function(array, i0, i1) {
  if ( i0 < 0 | i1 < 0 ) return undefined;
  if ( i1 === 0 || i0 >= array.length || i0 > i1 ) return array;
  i1 = i1 || array.length;
  i0 = i0 <= i1 ? i0 : 0;
  var m = Math.min(array.length, i1 - i0), t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
  }
  return array;
};

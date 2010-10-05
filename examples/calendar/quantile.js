function quantile(array, n) {
  var thresholds = [],
      i = 0;
      k = (array.length - 1) / n;

  array.sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; });
  thresholds[0] = array[0];
  while (++i < n) thresholds[i] = array[~~(i * k)];

  function quantile(value) {
    if (isNaN(value = +value)) return NaN;
    var low = 0, high = n - 1;
    while (low <= high) {
      var mid = (low + high) >> 1, midValue = thresholds[mid];
      if (midValue < value) low = mid + 1;
      else if (midValue > value) high = mid - 1;
      else return mid;
    }
    return high < 0 ? 0 : high;
  }

  return quantile;
}

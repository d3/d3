function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      n = domain.length;

  while (++j < n) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  function search(x) {
    var low = 1, high = domain.length - 2;
    while (low <= high) {
      var mid = (low + high) >> 1, midValue = domain[mid];
      if (midValue < x) low = mid + 1;
      else if (midValue > x) high = mid - 1;
      else return mid;
    }
    return low - 1;
  }

  return function(x) {
    var j = search(x);
    return i[j](u[j](x));
  };
}

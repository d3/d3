import "../arrays/bisect";

function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var k = Math.min(domain.length, range.length),
      u = new Array(k),
      i = new Array(k),
      j = k;

  // Handle descending domains.
  if (domain[--k] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (j--) {
    u[j] = uninterpolate(domain[j - 1], domain[j]);
    i[j] = interpolate(range[j - 1], range[j]);
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, k) - 1;
    return i[j](u[j](x));
  };
}

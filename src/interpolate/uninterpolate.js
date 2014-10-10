function d3_uninterpolateNumber(a, b) {
  if ((b -= a = +a) === 0) b = Infinity;
  return function(x) { return (x - a) / b; };
}

function d3_uninterpolateClamp(a, b) {
  if ((b -= a = +a) === 0) b = Infinity;
  return function(x) { return Math.max(0, Math.min(1, (x - a) / b)); };
}

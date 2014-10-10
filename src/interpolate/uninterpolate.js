function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) || Infinity;
  return function(x) { return (x - a) / b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) || Infinity;
  return function(x) { return Math.max(0, Math.min(1, (x - a) / b)); };
}

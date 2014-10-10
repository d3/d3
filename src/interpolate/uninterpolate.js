import "../core/zero";

function d3_uninterpolateNumber(a, b) {
  return (b -= a = +a) === 0
      ? d3_zero
      : function(x) { return (x - a) / b; };
}

function d3_uninterpolateClamp(a, b) {
  return (b -= a = +a) === 0
      ? d3_zero
      : function(x) { return Math.max(0, Math.min(1, (x - a) / b)); };
}

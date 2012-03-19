d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : b >= b || b <= b ? -1 : 1;
};

d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : a >= a || a <= a ? -1 : 1;
};

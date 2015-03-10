function d3_number(x) {
  return x === null ? NaN : +x;
}

function d3_numeric(x) {
  return !isNaN(x);
}

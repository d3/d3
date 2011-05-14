d3.vector.cross = function(a, b) {
  // TODO how to handle non-3D vectors?
  // TODO handle 7D vectors?
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
};

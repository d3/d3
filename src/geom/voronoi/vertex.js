function d3_geom_voronoiVertexOrder(a, b) {
  return b[1] - a[1] || b[0] - a[0];
}

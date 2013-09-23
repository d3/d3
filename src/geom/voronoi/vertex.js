function d3_geom_voronoiVertex(x, y) {
  this.x = x;
  this.y = y;
}

function d3_geom_voronoiCreateVertex(x, y) {
  return new d3_geom_voronoiVertex(x, y);
}

function d3_geom_voronoiVertexOrder(a, b) {
  return b.y - a.y || b.x - a.x;
}

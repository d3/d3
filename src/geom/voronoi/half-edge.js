function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge.va,
      vb = edge.vb;
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite[1] - lSite[1], rSite[0] - lSite[0])
      : edge.lSite === lSite ? Math.atan2(vb[0] - va[0], va[1] - vb[1])
      : Math.atan2(va[0] - vb[0], vb[1] - va[1]);
};

d3_geom_voronoiHalfEdge.prototype.getStartpoint = function() {
  return this.edge.lSite === this.site ? this.edge.va : this.edge.vb;
};

d3_geom_voronoiHalfEdge.prototype.getEndpoint = function() {
  return this.edge.lSite === this.site ? this.edge.vb : this.edge.va;
};

function d3_geom_voronoiHalfEdgeOrder(a, b) {
  return b.angle - a.angle;
}

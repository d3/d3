function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge.a,
      vb = edge.b;
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite[1] - lSite[1], rSite[0] - lSite[0])
      : edge.l === lSite ? Math.atan2(vb[0] - va[0], va[1] - vb[1])
      : Math.atan2(va[0] - vb[0], vb[1] - va[1]);
};

d3_geom_voronoiHalfEdge.prototype.getStartpoint = function() {
  return this.edge.l === this.site ? this.edge.a : this.edge.b;
};

d3_geom_voronoiHalfEdge.prototype.getEndpoint = function() {
  return this.edge.l === this.site ? this.edge.b : this.edge.a;
};

function d3_geom_voronoiHalfEdgeOrder(a, b) {
  return b.angle - a.angle;
}

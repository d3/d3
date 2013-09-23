function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge.va,
      vb = edge.vb;
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x)
      : edge.lSite === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y)
      : Math.atan2(va.x - vb.x, vb.y - va.y);
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

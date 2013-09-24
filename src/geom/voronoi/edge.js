function d3_geom_voronoiEdge(lSite, rSite) {
  this.l = lSite;
  this.r = rSite;
  this.a = this.b = null; // for border edges
}

function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, rSite);
  d3_geom_voronoiEdges.push(edge);
  if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
  if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
  d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
  d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
  return edge;
}

function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, null);
  edge.a = va;
  edge.b = vb;
  d3_geom_voronoiEdges.push(edge);
  return edge;
}

function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
  if (!edge.a && !edge.b) {
    edge.a = vertex;
    edge.l = lSite;
    edge.r = rSite;
  } else if (edge.l === rSite) {
    edge.b = vertex;
  } else {
    edge.a = vertex;
  }
}

function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge.a,
      vb = edge.b;
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x)
      : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y)
      : Math.atan2(va.x - vb.x, vb.y - va.y);
};

d3_geom_voronoiHalfEdge.prototype = {
  start: function() { return this.edge.l === this.site ? this.edge.a : this.edge.b; },
  end: function() { return this.edge.l === this.site ? this.edge.b : this.edge.a; }
};

function d3_geom_voronoiEdge(lSite, rSite) {
  this.l = lSite;
  this.r = rSite;
  this[0] = this[1] = null; // for border edges
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
  edge[0] = va;
  edge[1] = vb;
  d3_geom_voronoiEdges.push(edge);
  return edge;
}

function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.l = lSite;
    edge.r = rSite;
  } else if (edge.l === rSite) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
  var va = edge[0],
      vb = edge[1];
  this.edge = edge;
  this.site = lSite;
  this.angle = rSite ? Math.atan2(rSite[1] - lSite[1], rSite[0] - lSite[0])
      : edge.l === lSite ? Math.atan2(vb[0] - va[0], va[1] - vb[1])
      : Math.atan2(va[0] - vb[0], vb[1] - va[1]);
};

d3_geom_voronoiHalfEdge.prototype = {
  start: function() { return this.edge[+(this.edge.l !== this.site)]; },
  end: function() { return this.edge[+(this.edge.l === this.site)]; }
};

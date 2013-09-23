function d3_geom_voronoiEdge(lSite, rSite) {
  this.lSite = lSite;
  this.rSite = rSite;
  this.va = this.vb = null; // for border edges
}

function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, rSite);
  d3_geom_voronoiEdges.push(edge);
  if (va) d3_geom_voronoiSetEdgeStartpoint(edge, lSite, rSite, va);
  if (vb) d3_geom_voronoiSetEdgeEndpoint(edge, lSite, rSite, vb);
  d3_geom_voronoiCells[lSite.i].halfEdges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
  d3_geom_voronoiCells[rSite.i].halfEdges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
  return edge;
}

function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
  var edge = new d3_geom_voronoiEdge(lSite, null);
  edge.va = va;
  edge.vb = vb;
  d3_geom_voronoiEdges.push(edge);
  return edge;
}

function d3_geom_voronoiSetEdgeStartpoint(edge, lSite, rSite, vertex) {
  if (!edge.va && !edge.vb) {
    edge.va = vertex;
    edge.lSite = lSite;
    edge.rSite = rSite;
  } else if (edge.lSite === rSite) {
    edge.vb = vertex;
  } else {
    edge.va = vertex;
  }
}

function d3_geom_voronoiSetEdgeEndpoint(edge, lSite, rSite, vertex) {
  d3_geom_voronoiSetEdgeStartpoint(edge, rSite, lSite, vertex);
}

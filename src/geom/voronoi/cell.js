function d3_geom_voronoiCell(site) {
  this.site = site;
  this.halfEdges = [];
}

d3_geom_voronoiCell.prototype.prepare = function() {
  var halfEdges = this.halfEdges,
      iHalfEdge = halfEdges.length,
      edge;

  while (iHalfEdge--) {
    edge = halfEdges[iHalfEdge].edge;
    if (!edge.vb || !edge.va) halfEdges.splice(iHalfEdge, 1);
  }

  halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
  return halfEdges.length;
};

function d3_geom_voronoiCloseCells(bbox) {
  var xl = bbox.xl,
      xr = bbox.xr,
      yt = bbox.yt,
      yb = bbox.yb,
      cells = d3_geom_voronoiCells,
      iCell = cells.length,
      cell,
      iLeft,
      iRight,
      halfEdges,
      nHalfEdges,
      edge,
      startpoint,
      endpoint,
      va,
      vb;

  while (iCell--) {
    cell = cells[iCell];
    if (!cell.prepare()) continue;
    halfEdges = cell.halfEdges;
    nHalfEdges = halfEdges.length;
    iLeft = 0;
    while (iLeft < nHalfEdges) {
      iRight = (iLeft + 1) % nHalfEdges;
      endpoint = halfEdges[iLeft].getEndpoint();
      startpoint = halfEdges[iRight].getStartpoint();
      if (Math.abs(endpoint.x - startpoint.x) > ε || Math.abs(endpoint.y - startpoint.y) > ε) {
        va = endpoint;
        if (Math.abs(endpoint.x - xl) < ε && yb - endpoint.y > ε) {
          vb = d3_geom_voronoiCreateVertex(xl, Math.abs(startpoint.x - xl) < ε ? startpoint.y : yb);
        } else if (Math.abs(endpoint.y - yb) < ε && xr - endpoint.x > ε) {
          vb = d3_geom_voronoiCreateVertex(Math.abs(startpoint.y - yb) < ε ? startpoint.x : xr, yb);
        } else if (Math.abs(endpoint.x - xr) < ε && endpoint.y - yt > ε) {
          vb = d3_geom_voronoiCreateVertex(xr, Math.abs(startpoint.x - xr) < ε ? startpoint.y : yt);
        } else if (Math.abs(endpoint.y - yt) < ε && endpoint.x - xl > ε) {
          vb = d3_geom_voronoiCreateVertex(Math.abs(startpoint.y - yt) < ε ? startpoint.x : xl, yt);
        }
        edge = d3_geom_voronoiCreateBorderEdge(cell.site, va, vb);
        halfEdges.splice(iLeft + 1, 0, new d3_geom_voronoiHalfEdge(edge, cell.site, null));
        nHalfEdges = halfEdges.length;
      }
      iLeft++;
    }
  }
}

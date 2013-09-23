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
    if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
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
      if (Math.abs(endpoint[0] - startpoint[0]) > ε || Math.abs(endpoint[1] - startpoint[1]) > ε) {
        va = endpoint;
        if (Math.abs(endpoint[0] - xl) < ε && yb - endpoint[1] > ε) {
          vb = [xl, Math.abs(startpoint[0] - xl) < ε ? startpoint[1] : yb];
        } else if (Math.abs(endpoint[1] - yb) < ε && xr - endpoint[0] > ε) {
          vb = [Math.abs(startpoint[1] - yb) < ε ? startpoint[0] : xr, yb];
        } else if (Math.abs(endpoint[0] - xr) < ε && endpoint[1] - yt > ε) {
          vb = [xr, Math.abs(startpoint[0] - xr) < ε ? startpoint[1] : yt];
        } else if (Math.abs(endpoint[1] - yt) < ε && endpoint[0] - xl > ε) {
          vb = [Math.abs(startpoint[1] - yt) < ε ? startpoint[0] : xl, yt];
        }
        edge = d3_geom_voronoiCreateBorderEdge(cell.site, va, vb);
        halfEdges.splice(iLeft + 1, 0, new d3_geom_voronoiHalfEdge(edge, cell.site, null));
        nHalfEdges = halfEdges.length;
      }
      iLeft++;
    }
  }
}

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
      start,
      end,
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
      end = halfEdges[iLeft].end();
      start = halfEdges[iRight].start();
      if (Math.abs(end[0] - start[0]) > ε || Math.abs(end[1] - start[1]) > ε) {
        va = end;
        if (Math.abs(end[0] - xl) < ε && yb - end[1] > ε) {
          vb = [xl, Math.abs(start[0] - xl) < ε ? start[1] : yb];
        } else if (Math.abs(end[1] - yb) < ε && xr - end[0] > ε) {
          vb = [Math.abs(start[1] - yb) < ε ? start[0] : xr, yb];
        } else if (Math.abs(end[0] - xr) < ε && end[1] - yt > ε) {
          vb = [xr, Math.abs(start[0] - xr) < ε ? start[1] : yt];
        } else if (Math.abs(end[1] - yt) < ε && end[0] - xl > ε) {
          vb = [Math.abs(start[1] - yt) < ε ? start[0] : xl, yt];
        }
        edge = d3_geom_voronoiCreateBorderEdge(cell.site, va, vb);
        halfEdges.splice(iLeft + 1, 0, new d3_geom_voronoiHalfEdge(edge, cell.site, null));
        nHalfEdges = halfEdges.length;
      }
      iLeft++;
    }
  }
}

function d3_geom_voronoiHalfEdgeOrder(a, b) {
  return b.angle - a.angle;
}

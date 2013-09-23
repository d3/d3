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

function d3_geom_voronoiCloseCells(extent) {
  var x0 = extent[0][0],
      x1 = extent[1][0],
      y0 = extent[0][1],
      y1 = extent[1][1],
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
        if (Math.abs(end[0] - x0) < ε && y1 - end[1] > ε) {
          vb = [x0, Math.abs(start[0] - x0) < ε ? start[1] : y1];
        } else if (Math.abs(end[1] - y1) < ε && x1 - end[0] > ε) {
          vb = [Math.abs(start[1] - y1) < ε ? start[0] : x1, y1];
        } else if (Math.abs(end[0] - x1) < ε && end[1] - y0 > ε) {
          vb = [x1, Math.abs(start[0] - x1) < ε ? start[1] : y0];
        } else if (Math.abs(end[1] - y0) < ε && end[0] - x0 > ε) {
          vb = [Math.abs(start[1] - y0) < ε ? start[0] : x0, y0];
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

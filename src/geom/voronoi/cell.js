import "../../math/abs";

function d3_geom_voronoiCell(site) {
  this.site = site;
  this.edges = [];
}

d3_geom_voronoiCell.prototype.prepare = function() {
  var halfEdges = this.edges,
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
      x2,
      y2,
      x3,
      y3,
      cells = d3_geom_voronoiCells,
      iCell = cells.length,
      cell,
      iHalfEdge,
      halfEdges,
      nHalfEdges,
      start,
      end;

  while (iCell--) {
    cell = cells[iCell];
    if (!cell || !cell.prepare()) continue;
    halfEdges = cell.edges;
    nHalfEdges = halfEdges.length;
    iHalfEdge = 0;
    while (iHalfEdge < nHalfEdges) {
      end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
      start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
      if (abs(x3 - x2) > epsilon || abs(y3 - y2) > epsilon) {
        halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end,
            abs(x3 - x0) < epsilon && y1 - y3 > epsilon ? {x: x0, y: abs(x2 - x0) < epsilon ? y2 : y1}
            : abs(y3 - y1) < epsilon && x1 - x3 > epsilon ? {x: abs(y2 - y1) < epsilon ? x2 : x1, y: y1}
            : abs(x3 - x1) < epsilon && y3 - y0 > epsilon ? {x: x1, y: abs(x2 - x1) < epsilon ? y2 : y0}
            : abs(y3 - y0) < epsilon && x3 - x0 > epsilon ? {x: abs(y2 - y0) < epsilon ? x2 : x0, y: y0}
            : null), cell.site, null));
        ++nHalfEdges;
      }
    }
  }
}

function d3_geom_voronoiHalfEdgeOrder(a, b) {
  return b.angle - a.angle;
}

import "../clip-line";

function d3_geom_voronoiClipEdges(extent) {
  var edges = d3_geom_voronoiEdges,
      clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]),
      i = edges.length,
      e;
  while (i--) {
    e = edges[i];
    if (!d3_geom_voronoiConnectEdge(e, extent)
        || !clip(e.a, e.b)
        || (abs(e.a[0] - e.b[0]) < ε && abs(e.a[1] - e.b[1]) < ε)) {
      e.a = e.b = null;
      edges.splice(i, 1);
    }
  }
}

function d3_geom_voronoiConnectEdge(edge, extent) {
  var vb = edge.b;
  if (vb) return true;

  var va = edge.a,
      x0 = extent[0][0],
      x1 = extent[1][0],
      y0 = extent[0][1],
      y1 = extent[1][1],
      lSite = edge.l,
      rSite = edge.r,
      lx = lSite[0],
      ly = lSite[1],
      rx = rSite[0],
      ry = rSite[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry !== ly) {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
  }

  if (fm == null) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!va) va = [fx, y0];
      else if (va[1] >= y1) return;
      vb = [fx, y1];
    } else {
      if (!va) va = [fx, y1];
      else if (va[1] < y0) return;
      vb = [fx, y0];
    }
  } else if (fm < -1 || fm > 1) {
    if (lx > rx) {
      if (!va) va = [(y0 - fb) / fm, y0];
      else if (va[1] >= y1) return;
      vb = [(y1 - fb) / fm, y1];
    } else {
      if (!va) va = [(y1 - fb) / fm, y1];
      else if (va[1] < y0) return;
      vb = [(y0 - fb) / fm, y0];
    }
  } else {
    if (ly < ry) {
      if (!va) va = [x0, fm * x0 + fb];
      else if (va[0] >= x1) return;
      vb = [x1, fm * x1 + fb];
    } else {
      if (!va) va = [x1, fm * x1 + fb];
      else if (va[0] < x0) return;
      vb = [x0, fm * x0 + fb];
    }
  }

  edge.a = va;
  edge.b = vb;
  return true;
}

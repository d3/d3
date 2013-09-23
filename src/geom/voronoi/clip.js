function d3_geom_voronoiClipEdges(extent) {
  var edges = d3_geom_voronoiEdges,
      i = edges.length,
      e;
  while (i--) {
    e = edges[i];
    if (!d3_geom_voronoiConnectEdge(e, extent)
        || !d3_geom_voronoiClipEdge(e, extent)
        || (Math.abs(e.a[0] - e.b[0]) < ε && Math.abs(e.a[1] - e.b[1]) < ε)) {
      e.a = e.b = null;
      edges.splice(i, 1);
    }
  }
}

function d3_geom_voronoiClipEdge(edge, extent) {
  var ax = edge.a[0],
      ay = edge.a[1],
      bx = edge.b[0],
      by = edge.b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      q,
      r;

  q = ax - extent[0][0];
  if (!dx && q < 0) return;
  r = -q / dx;
  if (dx < 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  }

  q = extent[1][0] - ax;
  if (!dx && q < 0) return;
  r = q / dx;
  if (dx < 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  }

  q = ay - extent[0][1];
  if (!dy && q < 0) return;
  r = -q / dy;
  if (dy < 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  }

  q = extent[1][1] - ay;
  if (!dy && q < 0) return;
  r = q / dy;
  if (dy < 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  }

  if (t0 > 0) edge.a = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge.b = [ax + t1 * dx, ay + t1 * dy];
  return true;
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

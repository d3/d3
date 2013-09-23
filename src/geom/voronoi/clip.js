function d3_geom_voronoiClipEdges(bbox) {
  var edges = d3_geom_voronoiEdges,
      i = edges.length,
      e;
  while (i--) {
    e = edges[i];
    if (!d3_geom_voronoiConnectEdge(e, bbox)
        || !d3_geom_voronoiClipEdge(e, bbox)
        || (Math.abs(e.va[0] - e.vb[0]) < ε && Math.abs(e.va[1] - e.vb[1]) < ε)) {
      e.va = e.vb = null;
      edges.splice(i, 1);
    }
  }
}

function d3_geom_voronoiClipEdge(edge, bbox) {
  var ax = edge.va[0],
      ay = edge.va[1],
      bx = edge.vb[0],
      by = edge.vb[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      q,
      r;

  q = ax - bbox.xl;
  if (!dx && q < 0) return;
  r = -q / dx;
  if (dx < 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  }

  q = bbox.xr - ax;
  if (!dx && q < 0) return;
  r = q / dx;
  if (dx < 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  }

  q = ay - bbox.yt;
  if (!dy && q < 0) return;
  r = -q / dy;
  if (dy < 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  }

  q = bbox.yb - ay;
  if (!dy && q < 0) return;
  r = q / dy;
  if (dy < 0) {
    if (r > t1) return;
    else if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    else if (r < t1) t1 = r;
  }

  if (t0 > 0) edge.va = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge.vb = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function d3_geom_voronoiConnectEdge(edge, bbox) {
  var vb = edge.vb;
  if (vb) return true;

  var va = edge.va,
      xl = bbox.xl,
      xr = bbox.xr,
      yt = bbox.yt,
      yb = bbox.yb,
      lSite = edge.lSite,
      rSite = edge.rSite,
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
    if (fx < xl || fx >= xr) return;
    if (lx > rx) {
      if (!va) va = [fx, yt];
      else if (va[1] >= yb) return;
      vb = [fx, yb];
    } else {
      if (!va) va = [fx, yb];
      else if (va[1] < yt) return;
      vb = [fx, yt];
    }
  } else if (fm < -1 || fm > 1) {
    if (lx > rx) {
      if (!va) va = [(yt - fb) / fm, yt];
      else if (va[1] >= yb) return;
      vb = [(yb - fb) / fm, yb];
    } else {
      if (!va) va = [(yb - fb) / fm, yb];
      else if (va[1] < yt) return;
      vb = [(yt - fb) / fm, yt];
    }
  } else {
    if (ly < ry) {
      if (!va) va = [xl, fm * xl + fb];
      else if (va[0] >= xr) return;
      vb = [xr, fm * xr + fb];
    } else {
      if (!va) va = [xr, fm * xr + fb];
      else if (va[0] < xl) return;
      vb = [xl, fm * xl + fb];
    }
  }

  edge.va = va;
  edge.vb = vb;
  return true;
}

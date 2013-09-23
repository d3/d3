function d3_geom_voronoiClipEdges(bbox) {
  var edges = d3_geom_voronoiEdges,
      i = edges.length,
      e;
  while (i--) {
    e = edges[i];
    if (!d3_geom_voronoiConnectEdge(e, bbox)
        || !d3_geom_voronoiClipEdge(e, bbox)
        || (Math.abs(e.va.x - e.vb.x) < ε && Math.abs(e.va.y - e.vb.y) < ε)) {
      e.va = e.vb = null;
      edges.splice(i, 1);
    }
  }
}
    
function d3_geom_voronoiClipEdge(edge, bbox) {
  var ax = edge.va.x,
      ay = edge.va.y,
      bx = edge.vb.x,
      by = edge.vb.y,
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

  if (t0 > 0) edge.va = d3_geom_voronoiCreateVertex(ax + t0 * dx, ay + t0 * dy);
  if (t1 < 1) edge.vb = d3_geom_voronoiCreateVertex(ax + t1 * dx, ay + t1 * dy);
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
      lx = lSite.x,
      ly = lSite.y,
      rx = rSite.x,
      ry = rSite.y,
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
      if (!va) va = d3_geom_voronoiCreateVertex(fx, yt);
      else if (va.y >= yb) return;
      vb = d3_geom_voronoiCreateVertex(fx, yb);
    } else {
      if (!va) va = d3_geom_voronoiCreateVertex(fx, yb);
      else if (va.y < yt) return;
      vb = d3_geom_voronoiCreateVertex(fx, yt);
    }
  } else if (fm < -1 || fm > 1) {
    if (lx > rx) {
      if (!va) va = d3_geom_voronoiCreateVertex((yt - fb) / fm, yt);
      else if (va.y >= yb) return;
      vb = d3_geom_voronoiCreateVertex((yb - fb) / fm, yb);
    } else {
      if (!va) va = d3_geom_voronoiCreateVertex((yb - fb) / fm, yb);
      else if (va.y < yt) return;
      vb = d3_geom_voronoiCreateVertex((yt - fb) / fm, yt);
    }
  } else {
    if (ly < ry) {
      if (!va) va = d3_geom_voronoiCreateVertex(xl, fm*xl+fb);
      else if (va.x >= xr) return;
      vb = d3_geom_voronoiCreateVertex(xr, fm*xr+fb);
    } else {
      if (!va) va = d3_geom_voronoiCreateVertex(xr, fm*xr+fb);
      else if (va.x < xl) return;
      vb = d3_geom_voronoiCreateVertex(xl, fm*xl+fb);
    }
  }

  edge.va = va;
  edge.vb = vb;
  return true;
}

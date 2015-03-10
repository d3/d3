import "../../math/abs";
import "../clip-line";

function d3_geom_voronoiClipEdges(extent) {
  var edges = d3_geom_voronoiEdges,
      clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]),
      i = edges.length,
      e;
  while (i--) {
    e = edges[i];
    if (!d3_geom_voronoiConnectEdge(e, extent)
        || !clip(e)
        || (abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε)) {
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
      lx = lSite.x,
      ly = lSite.y,
      rx = rSite.x,
      ry = rSite.y,
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!va) va = {x: fx, y: y0};
      else if (va.y >= y1) return;
      vb = {x: fx, y: y1};
    } else {
      if (!va) va = {x: fx, y: y1};
      else if (va.y < y0) return;
      vb = {x: fx, y: y0};
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!va) va = {x: (y0 - fb) / fm, y: y0};
        else if (va.y >= y1) return;
        vb = {x: (y1 - fb) / fm, y: y1};
      } else {
        if (!va) va = {x: (y1 - fb) / fm, y: y1};
        else if (va.y < y0) return;
        vb = {x: (y0 - fb) / fm, y: y0};
      }
    } else {
      if (ly < ry) {
        if (!va) va = {x: x0, y: fm * x0 + fb};
        else if (va.x >= x1) return;
        vb = {x: x1, y: fm * x1 + fb};
      } else {
        if (!va) va = {x: x1, y: fm * x1 + fb};
        else if (va.x < x0) return;
        vb = {x: x0, y: fm * x0 + fb};
      }
    }
  }

  edge.a = va;
  edge.b = vb;
  return true;
}

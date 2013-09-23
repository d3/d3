function d3_geom_voronoiBeach() {
  d3_geom_voronoiRedBlackNode.call(this);
  this.edge =
  this.site =
  this.circle = null;
}

function d3_geom_voronoiCreateBeach(site) {
  var beach = d3_geom_voronoiBeachJunkyard.pop();
  if (!beach) beach = new d3_geom_voronoiBeach;
  beach.site = site;
  return beach;
}

function d3_geom_voronoiDetachBeach(beach) {
  d3_geom_voronoiDetachCircle(beach);
  d3_geom_voronoiBeaches.remove(beach);
  d3_geom_voronoiBeachJunkyard.push(beach);
}

function d3_geom_voronoiRemoveBeach(beach) {
  var circle = beach.circle,
      x = circle[0],
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearingTransitions = [beach];

  d3_geom_voronoiDetachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle[0]) < ε
      && Math.abs(y - lArc.circle.cy) < ε) {
    previous = lArc.P;
    disappearingTransitions.unshift(lArc);
    d3_geom_voronoiDetachBeach(lArc);
    lArc = previous;
  }

  disappearingTransitions.unshift(lArc);
  d3_geom_voronoiDetachCircle(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle[0]) < ε
      && Math.abs(y - rArc.circle.cy) < ε) {
    next = rArc.N;
    disappearingTransitions.push(rArc);
    d3_geom_voronoiDetachBeach(rArc);
    rArc = next;
  }

  disappearingTransitions.push(rArc);
  d3_geom_voronoiDetachCircle(rArc);

  var nArcs = disappearingTransitions.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearingTransitions[iArc];
    lArc = disappearingTransitions[iArc - 1];
    d3_geom_voronoiSetEdgeStartpoint(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearingTransitions[0];
  rArc = disappearingTransitions[nArcs - 1];
  rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, undefined, vertex);

  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc);
}

function d3_geom_voronoiAddBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = d3_geom_voronoiBeaches._;

  while (node) {
    dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
    if (dxl > ε) node = node.L; else {
      dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
      if (dxr > ε) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -ε) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -ε) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  var newArc = d3_geom_voronoiCreateBeach(site);
  d3_geom_voronoiBeaches.insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    d3_geom_voronoiDetachCircle(lArc);
    rArc = d3_geom_voronoiCreateBeach(lArc.site);
    d3_geom_voronoiBeaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  d3_geom_voronoiDetachCircle(lArc);
  d3_geom_voronoiDetachCircle(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  d3_geom_voronoiSetEdgeStartpoint(rArc.edge, lSite, rSite, vertex);
  newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
  rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc);
}

function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function d3_geom_voronoiRightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

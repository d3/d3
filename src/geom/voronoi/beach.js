import "../../math/abs";

function d3_geom_voronoiBeach() {
  d3_geom_voronoiRedBlackNode(this);
  this.edge =
  this.site =
  this.circle = null;
}

function d3_geom_voronoiCreateBeach(site) {
  var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach;
  beach.site = site;
  return beach;
}

function d3_geom_voronoiDetachBeach(beach) {
  d3_geom_voronoiDetachCircle(beach);
  d3_geom_voronoiBeaches.remove(beach);
  d3_geom_voronoiBeachPool.push(beach);
  d3_geom_voronoiRedBlackNode(beach);
}

function d3_geom_voronoiRemoveBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = {x: x, y: y},
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  d3_geom_voronoiDetachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && abs(x - lArc.circle.x) < ε
      && abs(y - lArc.circle.cy) < ε) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    d3_geom_voronoiDetachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  d3_geom_voronoiDetachCircle(lArc);

  var rArc = next;
  while (rArc.circle
      && abs(x - rArc.circle.x) < ε
      && abs(y - rArc.circle.cy) < ε) {
    next = rArc.N;
    disappearing.push(rArc);
    d3_geom_voronoiDetachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  d3_geom_voronoiDetachCircle(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);

  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc);
}

function d3_geom_voronoiAddBeach(site) {
  var x = site.x,
      directrix = site.y,
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
      ax = lSite.x,
      ay = lSite.y,
      bx = site.x - ax,
      by = site.y - ay,
      rSite = rArc.site,
      cx = rSite.x - ax,
      cy = rSite.y - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = {x: (cy * hb - by * hc) / d + ax, y: (bx * hc - cx * hb) / d + ay};

  d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
  rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
  d3_geom_voronoiAttachCircle(lArc);
  d3_geom_voronoiAttachCircle(rArc);
}

function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site.x,
      rfocy = site.y,
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site.x,
      lfocy = site.y,
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
  return site.y === directrix ? site.x : Infinity;
}

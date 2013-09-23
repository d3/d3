function d3_geom_voronoiBeachSection() {
  d3_geom_voronoiRedBlackNode.call(this);
  this.edge =
  this.site =
  this.circleEvent = null;
}

function d3_geom_voronoiCreateBeachSection(site) {
  var beachSection = d3_geom_voronoiBeachSectionJunkyard.pop();
  if (!beachSection) beachSection = new d3_geom_voronoiBeachSection;
  beachSection.site = site;
  return beachSection;
}

function d3_geom_voronoiDetachBeachSection(beachSection) {
  d3_geom_voronoiDetachCircleEvent(beachSection);
  d3_geom_voronoiBeachLine.remove(beachSection);
  d3_geom_voronoiBeachSectionJunkyard.push(beachSection);
}

function d3_geom_voronoiRemoveBeachSection(beachSection) {
  var circle = beachSection.circleEvent,
      x = circle[0],
      y = circle.cy,
      vertex = [x, y],
      previous = beachSection.P,
      next = beachSection.N,
      disappearingTransitions = [beachSection];

  d3_geom_voronoiDetachBeachSection(beachSection);

  var lArc = previous;
  while (lArc.circleEvent
      && Math.abs(x - lArc.circleEvent[0]) < ε
      && Math.abs(y - lArc.circleEvent.cy) < ε) {
    previous = lArc.P;
    disappearingTransitions.unshift(lArc);
    d3_geom_voronoiDetachBeachSection(lArc);
    lArc = previous;
  }

  disappearingTransitions.unshift(lArc);
  d3_geom_voronoiDetachCircleEvent(lArc);

  var rArc = next;
  while (rArc.circleEvent
      && Math.abs(x - rArc.circleEvent[0]) < ε
      && Math.abs(y - rArc.circleEvent.cy) < ε) {
    next = rArc.N;
    disappearingTransitions.push(rArc);
    d3_geom_voronoiDetachBeachSection(rArc);
    rArc = next;
  }

  disappearingTransitions.push(rArc);
  d3_geom_voronoiDetachCircleEvent(rArc);

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

  d3_geom_voronoiAttachCircleEvent(lArc);
  d3_geom_voronoiAttachCircleEvent(rArc);
}

function d3_geom_voronoiAddBeachSection(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = d3_geom_voronoiBeachLine._;

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

  var newArc = d3_geom_voronoiCreateBeachSection(site);
  d3_geom_voronoiBeachLine.insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    d3_geom_voronoiDetachCircleEvent(lArc);
    rArc = d3_geom_voronoiCreateBeachSection(lArc.site);
    d3_geom_voronoiBeachLine.insert(newArc, rArc);
    newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
    d3_geom_voronoiAttachCircleEvent(lArc);
    d3_geom_voronoiAttachCircleEvent(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  d3_geom_voronoiDetachCircleEvent(lArc);
  d3_geom_voronoiDetachCircleEvent(rArc);

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
  d3_geom_voronoiAttachCircleEvent(lArc);
  d3_geom_voronoiAttachCircleEvent(rArc);
}

function d3_geom_voronoiCircleEvent() {
  this.arc = null;
  this.site = null;
  this.x = null;
  this.y = null;
  this.ycenter = null;
}

function d3_geom_voronoiAttachCircleEvent(arc) {
  var lArc = arc.rbPrevious,
      rArc = arc.rbNext;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite.x,
      by = cSite.y,
      ax = lSite.x - bx,
      ay = lSite.y - by,
      cx = rSite.x - bx,
      cy = rSite.y - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -ε2) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d,
      ycenter = y + by;

  var circleEvent = d3_geom_voronoiCircleEventJunkyard.pop();
  if (!circleEvent) circleEvent = new d3_geom_voronoiCircleEvent;
  circleEvent.arc = arc;
  circleEvent.site = cSite;
  circleEvent.x = x + bx;
  circleEvent.y = ycenter + Math.sqrt(x * x + y * y); // y bottom
  circleEvent.ycenter = ycenter;

  arc.circleEvent = circleEvent;

  var predecessor = null,
      node = d3_geom_voronoiCircleEvents.root;

  while (node) {
    if (circleEvent.y < node.y || (circleEvent.y === node.y && circleEvent.x <= node.x)) {
      if (node.rbLeft) node = node.rbLeft;
      else { predecessor = node.rbPrevious; break; }
    } else {
      if (node.rbRight) node = node.rbRight;
      else { predecessor = node; break; }
    }
  }

  d3_geom_voronoiCircleEvents.rbInsert(predecessor, circleEvent);
  if (!predecessor) d3_geom_voronoiFirstCircleEvent = circleEvent;
}

function d3_geom_voronoiDetachCircleEvent(arc) {
  var circle = arc.circleEvent;
  if (circle) {
    if (!circle.rbPrevious) d3_geom_voronoiFirstCircleEvent = circle.rbNext;
    d3_geom_voronoiCircleEvents.rbRemove(circle);
    d3_geom_voronoiCircleEventJunkyard.push(circle);
    arc.circleEvent = null;
  }
}

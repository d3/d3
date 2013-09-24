function d3_geom_voronoiCircle() {
  d3_geom_voronoiRedBlackNode(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function d3_geom_voronoiAttachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

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
      cy = y + by;

  var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = cy + Math.sqrt(x * x + y * y); // y bottom
  circle.cy = cy;

  arc.circle = circle;

  var before = null,
      node = d3_geom_voronoiCircles._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  d3_geom_voronoiCircles.insert(before, circle);
  if (!before) d3_geom_voronoiFirstCircle = circle;
}

function d3_geom_voronoiDetachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
    d3_geom_voronoiCircles.remove(circle);
    d3_geom_voronoiCirclePool.push(circle);
    d3_geom_voronoiRedBlackNode(circle);
    arc.circle = null;
  }
}

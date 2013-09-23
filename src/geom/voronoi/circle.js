function d3_geom_voronoiCircle() {
  d3_geom_voronoiRedBlackNode.call(this);
  this[0] =
  this[1] =
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

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -ε2) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d,
      cy = y + by;

  var circle = d3_geom_voronoiCircleJunkyard.pop() || new d3_geom_voronoiCircle;
  circle.arc = arc;
  circle.site = cSite;
  circle[0] = x + bx;
  circle[1] = cy + Math.sqrt(x * x + y * y); // y bottom
  circle.cy = cy;

  arc.circle = circle;

  var before = null,
      node = d3_geom_voronoiCircles._;

  while (node) {
    if (circle[1] < node[1] || (circle[1] === node[1] && circle[0] <= node[0])) {
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
    d3_geom_voronoiCircleJunkyard.push(circle);
    arc.circle = null;
  }
}

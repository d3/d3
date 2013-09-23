function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site.x,
      rfocy = site.y,
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.rbPrevious;
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
  var rArc = arc.rbNext;
  if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site.y === directrix ? site.x : Infinity;
}

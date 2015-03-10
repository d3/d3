import "../../math/trigonometry";

var d3_geom_voronoiEdges,
    d3_geom_voronoiCells,
    d3_geom_voronoiBeaches,
    d3_geom_voronoiBeachPool = [],
    d3_geom_voronoiFirstCircle,
    d3_geom_voronoiCircles,
    d3_geom_voronoiCirclePool = [];

import "beach";
import "cell";
import "circle";
import "clip";
import "edge";
import "red-black";

function d3_geom_voronoi(sites, bbox) {
  var site = sites.sort(d3_geom_voronoiVertexOrder).pop(),
      x0,
      y0,
      circle;

  d3_geom_voronoiEdges = [];
  d3_geom_voronoiCells = new Array(sites.length);
  d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree;
  d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree;

  while (true) {
    circle = d3_geom_voronoiFirstCircle;
    if (site && (!circle || site.y < circle.y || (site.y === circle.y && site.x < circle.x))) {
      if (site.x !== x0 || site.y !== y0) {
        d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
        d3_geom_voronoiAddBeach(site);
        x0 = site.x, y0 = site.y;
      }
      site = sites.pop();
    } else if (circle) {
      d3_geom_voronoiRemoveBeach(circle.arc);
    } else {
      break;
    }
  }

  if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);

  var diagram = {cells: d3_geom_voronoiCells, edges: d3_geom_voronoiEdges};

  d3_geom_voronoiBeaches =
  d3_geom_voronoiCircles =
  d3_geom_voronoiEdges =
  d3_geom_voronoiCells = null;

  return diagram;
};

function d3_geom_voronoiVertexOrder(a, b) {
  return b.y - a.y || b.x - a.x;
}

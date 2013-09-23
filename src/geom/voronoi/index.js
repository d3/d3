import "../../math/trigonometry";

var d3_geom_voronoiEdges,
    d3_geom_voronoiCells,
    d3_geom_voronoiBeachLine,
    d3_geom_voronoiBeachSectionJunkyard = [],
    d3_geom_voronoiCircleEvents,
    d3_geom_voronoiCircleEventJunkyard = [],
    d3_geom_voronoiFirstCircleEvent;

import "beach-section";
import "break-point";
import "cell";
import "circle-event";
import "clip";
import "edge";
import "half-edge";
import "red-black-tree";
import "vertex";

function d3_geom_voronoi(sites, bbox) {
  var site = sites.sort(d3_geom_voronoiVertexOrder).pop(),
      x0,
      y0,
      circle;

  d3_geom_voronoiEdges = [];
  d3_geom_voronoiCells = new Array(sites.length);
  d3_geom_voronoiBeachLine = new d3_geom_voronoiRedBlackTree;
  d3_geom_voronoiCircleEvents = new d3_geom_voronoiRedBlackTree;

  while (true) {
    circle = d3_geom_voronoiFirstCircleEvent;
    if (site && (!circle || site[1] < circle[1] || (site[1] === circle[1] && site[0] < circle[0]))) {
      if (site[0] !== x0 || site[1] !== y0) {
        d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
        d3_geom_voronoiAddBeachSection(site);
        x0 = site[0], y0 = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      d3_geom_voronoiRemoveBeachSection(circle.arc);
    } else {
      break;
    }
  }

  d3_geom_voronoiClipEdges(bbox);
  d3_geom_voronoiCloseCells(bbox);

  var diagram = {cells: d3_geom_voronoiCells, edges: d3_geom_voronoiEdges};

  d3_geom_voronoiBeachLine =
  d3_geom_voronoiCircleEvents =
  d3_geom_voronoiEdges =
  d3_geom_voronoiCells = null;

  return diagram;
};

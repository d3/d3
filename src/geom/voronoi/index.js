import "../../math/trigonometry";

var d3_geom_voronoiEdges = null,
    d3_geom_voronoiCells = null,
    d3_geom_voronoiBeachSectionJunkyard = [],
    d3_geom_voronoiCircleEventJunkyard = [],
    d3_geom_voronoiBeachLine,
    d3_geom_voronoiCircleEvents,
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
  d3_geom_voronoiBeachLine = new d3_geom_voronoiRedBlackTree;
  d3_geom_voronoiCircleEvents = new d3_geom_voronoiRedBlackTree;
  d3_geom_voronoiEdges = [];
  d3_geom_voronoiCells = [];

  sites.sort(d3_geom_voronoiVertexOrder);

  var site = sites.pop(),
      siteid = 0,
      xsitex,
      xsitey,
      circle;

  while (true) {
    circle = d3_geom_voronoiFirstCircleEvent;
    if (site && (!circle || site.y < circle.y || (site.y === circle.y && site.x < circle.x))) {
      if (site.x !== xsitex || site.y !== xsitey) {
        d3_geom_voronoiCells[siteid] = new d3_geom_voronoiCell(site);
        site.id = siteid++;
        d3_geom_voronoiAddBeachSection(site);
        xsitey = site.y;
        xsitex = site.x;
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

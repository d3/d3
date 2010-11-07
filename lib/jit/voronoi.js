// Adapted from Nicolas Garcia Belmonte's JIT implementation:
// http://blog.thejit.org/2010/02/12/voronoi-tessellation/
// http://blog.thejit.org/assets/voronoijs/voronoi.js

/**
 * @param vertices [[x1, y1], [x2, y2], …]
 * @param bounds [width, height]
 * @returns edges [[[x1, y1], [x2, y2]], …]
 */
function voronoi(vertices, bounds) {
  var width = bounds[0],
      height = bounds[1],
      edges = [],
      opposite = {left: "right", right: "left"};

  var Canvas = {
    plotEP: function(e) {
      var dy = height,
          dx = width,
          d = dx > dy ? dx : dy,
          pxmin = (dx - d) / 2,
          pxmax = width + (d - dx) / 2,
          pymin = (dy - d) / 2,
          pymax = height + (d - dy) / 2,
          s1,
          s2,
          x1,
          x2,
          y1,
          y2;
      if (e.a == 1 && e.b >= 0) {
        s1 = e.ep.right;
        s2 = e.ep.left;
      } else {
        s1 = e.ep.left;
        s2 = e.ep.right;
      }
      if (e.a == 1) {
        y1 = pymin;
        if (s1 && s1.y > pymin) {
          y1 = s1.y;
        }
        if (y1 > pymax) {
          return;
        }
        x1 = e.c - e.b * y1;
        y2 = pymax;
        if (s2 && s2.y < pymax) {
          y2 = s2.y;
        }
        if (y2 < pymin) {
          return;
        }
        x2 = e.c - e.b * y2;
        if (((x1 > pxmax) && (x2 > pxmax)) || ((x1 < pxmin) && (x2 < pxmin))) {
          return;
        }
        if (x1 > pxmax) {
          x1 = pxmax;
          y1 = (e.c - x1) / e.b;
        }
        if (x1 < pxmin) {
          x1 = pxmin;
          y1 = (e.c - x1) / e.b;
        }
        if (x2 > pxmax) {
          x2 = pxmax;
          y2 = (e.c - x2) / e.b;
        }
        if (x2 < pxmin) {
          x2 = pxmin;
          y2 = (e.c - x2) / e.b;
        }
      } else {
        x1 = pxmin;
        if (s1 && s1.x > pxmin) {
          x1 = s1.x;
        }
        if (x1 > pxmax) {
          return;
        }
        y1 = e.c - e.a * x1;
        x2 = pxmax;
        if (s2 && s2.x < pxmax) {
          x2 = s2.x;
        }
        if (x2 < pxmin) {
          return;
        }
        y2 = e.c - e.a * x2;
        if (((y1 > pymax) && (y2 > pymax)) || ((y1 < pymin) && (y2 < pymin))) {
          return;
        }
        if (y1 > pymax) {
          y1 = pymax;
          x1 = (e.c - y1) / e.a;
        }
        if (y1 < pymin) {
          y1 = pymin;
          x1 = (e.c - y1) / e.a;
        }
        if (y2 > pymax) {
          y2 = pymax;
          x2 = (e.c - y2) / e.a;
        }
        if (y2 < pymin) {
          y2 = pymin;
          x2 = (e.c - y2) / e.a;
        }
      }
      edges.push([[x1, y1], [x2, y2]]);
    }
  };

  var Sites = {
    list: vertices
      .map(function(v) {
        return {
          x: v[0],
          y: v[1]
        };
      })
      .sort(function(a, b) {
        return a.y < b.y ? -1
          : a.y > b.y ? 1
          : a.x < b.x ? -1
          : a.x > b.x ? 1
          : 0;
      }),
    bottomSite: null,
  };

  var EdgeList = {
    list: [],
    leftEnd: null,
    rightEnd: null,

    init: function() {
      this.leftEnd = this.createHalfEdge(null, "left");
      this.rightEnd = this.createHalfEdge(null, "left");
      this.leftEnd.right = this.rightEnd;
      this.rightEnd.left = this.leftEnd;
      this.list.unshift(this.leftEnd, this.rightEnd);
    },

    createHalfEdge: function(edge, side) {
      return {
        edge: edge,
        side: side,
        vertex: null,
        left: null,
        right: null
      };
    },

    insert: function(lb, he) {
      he.left = lb;
      he.right = lb.right;
      lb.right.left = he;
      lb.right = he;
    },

    leftBound: function(p) {
      var he = this.leftEnd;
      do {
        he = he.right;
      } while (he != this.rightEnd && Geom.rightOf(he, p));
      he = he.left;
      return he;
    },

    del: function(he) {
      he.left.right = he.right;
      he.right.left = he.left;
      he.edge = null;
    },

    right: function(he) {
      return he.right;
    },

    left: function(he) {
      return he.left;
    },

    leftRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[he.side];
    },

    rightRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[opposite[he.side]];
    }
  };

  var Geom = {

    bisect: function(s1, s2) {
      var newEdge = {
        region: {left: s1, right: s2},
        ep: {left: null, right: null}
      };

      var dx = s2.x - s1.x,
          dy = s2.y - s1.y,
          adx = dx > 0 ? dx : -dx,
          ady = dy > 0 ? dy : -dy;

      newEdge.c = s1.x * dx + s1.y * dy
          + (dx * dx + dy * dy) * .5;

      if (adx > ady) {
        newEdge.a = 1;
        newEdge.b = dy / dx;
        newEdge.c /= dx;
      } else {
        newEdge.b = 1;
        newEdge.a = dx / dy;
        newEdge.c /= dy;
      }

      return newEdge;
    },

    intersect: function(el1, el2) {
      var e1 = el1.edge,
          e2 = el2.edge;
      if (!e1 || !e2) {
        return null;
      }
      if (e1.region.right == e2.region.right) {
        return null;
      }
      var d = (e1.a * e2.b) - (e1.b * e2.a);
      if (Math.abs(d) < 1e-10) {
        return null;
      }
      var xint = (e1.c * e2.b - e2.c * e1.b) / d,
          yint = (e2.c * e1.a - e1.c * e2.a) / d;
      var e1r = e1.region.right,
          e2r = e2.region.right;
      var el, e;
      if ((e1r.y < e2r.y) ||
         (e1r.y == e2r.y && e1r.x < e2r.x)) {
        el = el1;
        e = e1;
      } else {
        el = el2;
        e = e2;
      }
      var rightOfSite = (xint >= e.region.right.x);
      if ((rightOfSite && (el.side == "left")) ||
        (!rightOfSite && (el.side == "right"))) {
        return null;
      }
      return {
        x: xint,
        y: yint
      };
    },

    rightOf: function(he, p) {
      var e = he.edge,
          topsite = e.region.right,
          rightOfSite = (p.x > topsite.x);

      if (rightOfSite && (he.side == "left")) {
        return 1;
      }
      if (!rightOfSite && (he.side == "right")) {
        return 0;
      }
      if (e.a == 1) {
        var dyp = p.y - topsite.y,
            dxp = p.x - topsite.x,
            fast = 0,
            above = 0;

        if ((!rightOfSite && (e.b < 0)) ||
          (rightOfSite && (e.b >= 0))) {
          above = fast = (dyp >= e.b * dxp);
        } else {
          above = ((p.x + p.y * e.b) > e.c);
          if (e.b < 0) {
            above = !above;
          }
          if (!above) {
            fast = 1;
          }
        }
        if (!fast) {
          var dxs = topsite.x - e.region.left.x;
          above = (e.b * (dxp * dxp - dyp * dyp)) <
            (dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b));

          if (e.b < 0) {
            above = !above;
          }
        }
      } else /* e.b == 1 */ {
        var yl = e.c - e.a * p.x,
            t1 = p.y - yl,
            t2 = p.x - topsite.x,
            t3 = yl - topsite.y;

        above = (t1 * t1) > (t2 * t2 + t3 * t3);
      }
      return he.side == "left" ? above : !above;
    },

    endPoint: function(edge, side, site) {
      edge.ep[side] = site;
      if (!edge.ep[opposite[side]]) return;
      Canvas.plotEP(edge);
    },

    distance: function(s, t) {
      var dx = s.x - t.x,
          dy = s.y - t.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

  };

  var EventQueue = {
    list: [],

    insert: function(he, site, offset) {
      he.vertex = site;
      he.ystar = site.y + offset;
      for (var i=0, list=this.list, l=list.length; i<l; i++) {
        var next = list[i];
        if (he.ystar > next.ystar ||
          (he.ystar == next.ystar &&
          site.x > next.vertex.x)) {
          continue;
        } else {
          break;
        }
      }
      list.splice(i, 0, he);
    },

    del: function(he) {
      for (var i=0, ls=this.list, l=ls.length; i<l && (ls[i] != he); ++i);
      ls.splice(i, 1);
    },

    empty: function() { return this.list.length == 0; },

    nextEvent: function(he) {
      for (var i=0, ls=this.list, l=ls.length; i<l; ++i) {
        if (ls[i] == he) return ls[i+1];
      }
      return null;
    },

    min: function() {
      var elem = this.list[0];
      return {
        x: elem.vertex.x,
        y: elem.ystar
      };
    },

    extractMin: function() {
      return this.list.shift();
    }
  };

  EdgeList.init();
  Sites.bottomSite = Sites.list.shift();

  var newSite = Sites.list.shift(), newIntStar;
  var lbnd, rbnd, llbnd, rrbnd, bisector;
  var bot, top, temp, p, v;
  var e, pm;

  while (true) {
    if (!EventQueue.empty()) {
      newIntStar = EventQueue.min();
    }
    if (newSite && (EventQueue.empty()
      || newSite.y < newIntStar.y
      || (newSite.y == newIntStar.y
      && newSite.x < newIntStar.x))) { //new site is smallest

      lbnd = EdgeList.leftBound(newSite);
      rbnd = EdgeList.right(lbnd);
      bot = EdgeList.rightRegion(lbnd);
      e = Geom.bisect(bot, newSite);
      bisector = EdgeList.createHalfEdge(e, "left");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(lbnd, bisector);
      if (p) {
        EventQueue.del(lbnd);
        EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
      }
      lbnd = bisector;
      bisector = EdgeList.createHalfEdge(e, "right");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(bisector, rbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, newSite));
      }
      newSite = Sites.list.shift();
    } else if (!EventQueue.empty()) { //intersection is smallest
      lbnd = EventQueue.extractMin();
      llbnd = EdgeList.left(lbnd);
      rbnd = EdgeList.right(lbnd);
      rrbnd = EdgeList.right(rbnd);
      bot = EdgeList.leftRegion(lbnd);
      top = EdgeList.rightRegion(rbnd);
      v = lbnd.vertex;
      Geom.endPoint(lbnd.edge, lbnd.side, v);
      Geom.endPoint(rbnd.edge, rbnd.side, v);
      EdgeList.del(lbnd);
      EventQueue.del(rbnd);
      EdgeList.del(rbnd);
      pm = "left";
      if (bot.y > top.y) {
        temp = bot;
        bot = top;
        top = temp;
        pm = "right";
      }
      e = Geom.bisect(bot, top);
      bisector = EdgeList.createHalfEdge(e, pm);
      EdgeList.insert(llbnd, bisector);
      Geom.endPoint(e, opposite[pm], v);
      p = Geom.intersect(llbnd, bisector);
      if (p) {
        EventQueue.del(llbnd);
        EventQueue.insert(llbnd, p, Geom.distance(p, bot));
      }
      p = Geom.intersect(bisector, rrbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, bot));
      }
    } else {
      break;
    }
  }//end while

  for (lbnd = EdgeList.right(EdgeList.leftEnd);
      lbnd != EdgeList.rightEnd;
      lbnd = EdgeList.right(lbnd)) {
    e = lbnd.edge;
    Canvas.plotEP(e);
  }

  return edges;
}

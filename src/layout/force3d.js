import "../core/identity";
import "../core/rebind";
import "../event/event";
import "../event/dispatch";
import "../event/timer";
import "../geom/octree";
import "layout";

// A rudimentary force layout using Gauss-Seidel.
d3.layout.force3d = function() {
  var force = {},
      event = d3.dispatch("start", "tick", "end"),
      size = [1, 1, 1],
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      chargeDistance2 = d3_layout_forceChargeDistance2,
      gravity = .1,
      theta2 = .64,
      nodes = [],
      links = [],
      distances,
      strengths,
      charges;

  function repulse(node) {
    return function(oct, x1, _0, _1, x2) {
      if (oct.point !== node) {
        var dx = oct.cx - node.x,
            dy = oct.cy - node.y,
            dz = oct.cz - node.z,
            dw = x2 - x1,
            dn = dx * dx + dy * dy + dz * dz;

        /* Barnes-Hut criterion. */
        if (dw * dw / theta2 < dn) {
          if (dn < chargeDistance2) {
            var k = oct.charge / dn;
            node.px -= dx * k;
            node.py -= dy * k;
            node.pz -= dz * k;
          }
          return true;
        }

        if (oct.point && dn && dn < chargeDistance2) {
          var k = oct.pointCharge / dn;
          node.px -= dx * k;
          node.py -= dy * k;
          node.pz -= dz * k;
        }
      }
      return !oct.charge;
    };
  }

  force.tick = function() {
    // simulated annealing, basically
    if ((alpha *= .99) < .005) {
      event.end({type: "end", alpha: alpha = 0});
      return true;
    }

    var n = nodes.length,
        m = links.length,
        q,
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        k, // current force
        x, // x-distance
        y, // y-distance
        z; // z-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      z = t.z - s.z;
      if (l = (x * x + y * y + z * z)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        z *= l;
        t.x -= x * (k = s.weight / (t.weight + s.weight));
        t.y -= y * k;
        t.z -= z * k;
        s.x += x * (k = 1 - k);
        s.y += y * k;
        s.z += z * k;
      }
    }

    // apply gravity forces
    if (k = alpha * gravity) {
      x = size[0] / 2;
      y = size[1] / 2;
      z = size[2] / 2;
      i = -1; if (k) while (++i < n) {
        o = nodes[i];
        o.x += (x - o.x) * k;
        o.y += (y - o.y) * k;
        o.z += (z - o.z) * k;
      }
    }

    // compute octree center of mass and apply charge forces
    if (charge) {
      d3_layout_force3dAccumulate(q = d3.geom.octree(nodes), alpha, charges);
      i = -1; while (++i < n) {
        if (!(o = nodes[i]).fixed) {
          q.visit(repulse(o));
        }
      }
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
        o.z = o.pz;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
        o.z -= (o.pz - (o.pz = o.z)) * friction;
      }
    }

    event.tick({type: "tick", alpha: alpha});
  };

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.linkDistance = function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = typeof x === "function" ? x : +x;
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = typeof x === "function" ? x : +x;
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = +x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = typeof x === "function" ? x : +x;
    return force;
  };

  force.chargeDistance = function(x) {
    if (!arguments.length) return Math.sqrt(chargeDistance2);
    chargeDistance2 = x * x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = +x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return Math.sqrt(theta2);
    theta2 = x * x;
    return force;
  };

  force.alpha = function(x) {
    if (!arguments.length) return alpha;

    x = +x;
    if (alpha) { // if we're already running
      if (x > 0) alpha = x; // we might keep it hot
      else alpha = 0; // or, next tick will dispatch "end"
    } else if (x > 0) { // otherwise, fire it up!
      event.start({type: "start", alpha: alpha = x});
      d3.timer(force.tick);
    }

    return force;
  };

  force.start = function() {
    var i,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        d = size[2],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
      o.weight = 0;
    }

    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      ++o.source.weight;
      ++o.target.weight;
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.z)) o.z = position("z", d);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
      if (isNaN(o.pz)) o.pz = o.z;
    }

    distances = [];
    if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i);
    else for (i = 0; i < m; ++i) distances[i] = linkDistance;

    strengths = [];
    if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i);
    else for (i = 0; i < m; ++i) strengths[i] = linkStrength;

    charges = [];
    if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i);
    else for (i = 0; i < n; ++i) charges[i] = charge;

    // inherit node position from first neighbor with defined position
    // or if no such neighbors, initialize node position randomly
    // initialize neighbors lazily to avoid overhead when not needed
    function position(dimension, size) {
      if (!neighbors) {
        neighbors = new Array(n);
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      var candidates = neighbors[i],
          j = -1,
          l = candidates.length,
          x;
      while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;
      return Math.random() * size;
    }

    return force.resume();
  };

  force.resume = function() {
    return force.alpha(.1);
  };

  force.stop = function() {
    return force.alpha(0);
  };

  return d3.rebind(force, event, "on");
};

function d3_layout_force3dAccumulate(oct, alpha, charges) {
  var cx = 0,
      cy = 0,
      cz = 0;
  oct.charge = 0;
  if (!oct.leaf) {
    var nodes = oct.nodes,
        n = nodes.length,
        i = -1,
        c;
    while (++i < n) {
      c = nodes[i];
      if (c == null) continue;
      d3_layout_force3dAccumulate(c, alpha, charges);
      oct.charge += c.charge;
      cx += c.charge * c.cx;
      cy += c.charge * c.cy;
      cz += c.charge * c.cz;
    }
  }
  if (oct.point) {
    // jitter internal nodes that are coincident
    if (!oct.leaf) {
      oct.point.x += Math.random() - .5;
      oct.point.y += Math.random() - .5;
      oct.point.z += Math.random() - .5;
    }
    var k = alpha * charges[oct.point.index];
    oct.charge += oct.pointCharge = k;
    cx += k * oct.point.x;
    cy += k * oct.point.y;
    cz += k * oct.point.z;
  }
  oct.cx = cx / oct.charge;
  oct.cy = cy / oct.charge;
  oct.cz = cz / oct.charge;
}

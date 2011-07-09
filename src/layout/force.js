// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("tick"),
      size = [1, 1],
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      gravity = .1,
      theta = .8,
      interval,
      nodes = [],
      links = [],
      distances,
      strengths;

  function repulse(node, kc) {
    return function(quad, x1, y1, x2, y2) {
      if (quad.point !== node) {
        var dx = quad.cx - node.x,
            dy = quad.cy - node.y,
            dn = 1 / Math.sqrt(dx * dx + dy * dy);

        /* Barnes-Hut criterion. */
        if ((x2 - x1) * dn < theta) {
          var k = kc * quad.count * dn * dn;
          node.x += dx * k;
          node.y += dy * k;
          return true;
        }

        if (quad.point && isFinite(dn)) {
          var k = kc * dn * dn;
          node.x += dx * k;
          node.y += dy * k;
        }
      }
    };
  }

  function tick() {
    var n = nodes.length,
        m = links.length,
        q = d3.geom.quadtree(nodes),
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = (x * x + y * y)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        t.x -= x;
        t.y -= y;
        s.x += x;
        s.y += y;
      }
    }

    // apply gravity forces
    var kg = alpha * gravity;
    x = size[0] / 2;
    y = size[1] / 2;
    i = -1; while (++i < n) {
      o = nodes[i];
      o.x += (x - o.x) * kg;
      o.y += (y - o.y) * kg;
    }

    // compute quadtree center of mass
    d3_layout_forceAccumulate(q);

    // apply charge forces
    var kc = alpha * charge;
    i = -1; while (++i < n) {
      q.visit(repulse(nodes[i], kc));
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
      }
    }

    event.tick.dispatch({type: "tick", alpha: alpha});

    // simulated annealing, basically
    return (alpha *= .99) < .005;
  }

  force.on = function(type, listener) {
    event[type].add(listener);
    return force;
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
    linkDistance = d3.functor(x);
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3.functor(x);
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return theta;
    theta = x;
    return force;
  };

  force.start = function() {
    var i,
        j,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
    }

    distances = [];
    strengths = [];
    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      distances[i] = linkDistance.call(this, o, i);
      strengths[i] = linkStrength.call(this, o, i);
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }

    // initialize node position based on first neighbor
    function position(dimension, size) {
      var neighbors = neighbor(i),
          j = -1,
          m = neighbors.length,
          x;
      while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
      return Math.random() * size;
    }

    // initialize neighbors lazily
    function neighbor() {
      if (!neighbors) {
        neighbors = [];
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      return neighbors[i];
    }

    return force.resume();
  };

  force.resume = function() {
    alpha = .1;
    d3.timer(tick);
    return force;
  };

  force.stop = function() {
    alpha = 0;
    return force;
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {

    this
      .on("mouseover.force", d3_layout_forceDragOver)
      .on("mouseout.force", d3_layout_forceDragOut)
      .on("mousedown.force", dragdown)
      .on("touchstart.force", dragdown);

    d3.select(window)
      .on("mousemove.force", d3_layout_forceDragMove)
      .on("touchmove.force", d3_layout_forceDragMove)
      .on("mouseup.force", d3_layout_forceDragUp, true)
      .on("touchend.force", d3_layout_forceDragUp, true)
      .on("click.force", d3_layout_forceDragClick, true);

    return force;
  };

  function dragdown(d, i) {
    var m = d3_layout_forcePoint(this.parentNode);
    (d3_layout_forceDragNode = d).fixed = true;
    d3_layout_forceDragMoved = false;
    d3_layout_forceDragElement = this;
    d3_layout_forceDragForce = force;
    d3_layout_forceDragOffset = [m[0] - d.x, m[1] - d.y];
    d3_layout_forceCancel();
  }

  return force;
};

var d3_layout_forceDragForce,
    d3_layout_forceDragNode,
    d3_layout_forceDragMoved,
    d3_layout_forceDragOffset,
    d3_layout_forceStopClick,
    d3_layout_forceDragElement;

function d3_layout_forceDragOver(d) {
  d.fixed = true;
}

function d3_layout_forceDragOut(d) {
  if (d !== d3_layout_forceDragNode) {
    d.fixed = false;
  }
}

function d3_layout_forcePoint(container) {
  return d3.event.touches
      ? d3.svg.touches(container)[0]
      : d3.svg.mouse(container);
}

function d3_layout_forceDragMove() {
  if (!d3_layout_forceDragNode) return;
  var parent = d3_layout_forceDragElement.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) {
    d3_layout_forceDragNode.fixed = false;
    d3_layout_forceDragOffset = d3_layout_forceDragNode = d3_layout_forceDragElement = null;
    return;
  }

  var m = d3_layout_forcePoint(parent);
  d3_layout_forceDragMoved = true;
  d3_layout_forceDragNode.px = m[0] - d3_layout_forceDragOffset[0];
  d3_layout_forceDragNode.py = m[1] - d3_layout_forceDragOffset[1];
  d3_layout_forceCancel();
  d3_layout_forceDragForce.resume(); // restart annealing
}

function d3_layout_forceDragUp() {
  if (!d3_layout_forceDragNode) return;

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_layout_forceDragMoved) {
    d3_layout_forceStopClick = true;
    d3_layout_forceCancel();
  }

  // Don't trigger this for touchend.
  if (d3.event.type === "mouseup") {
    d3_layout_forceDragMove();
  }

  d3_layout_forceDragNode.fixed = false;
  d3_layout_forceDragForce =
  d3_layout_forceDragOffset =
  d3_layout_forceDragNode =
  d3_layout_forceDragElement = null;
}

function d3_layout_forceDragClick() {
  if (d3_layout_forceStopClick) {
    d3_layout_forceCancel();
    d3_layout_forceStopClick = false;
  }
}

function d3_layout_forceCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_layout_forceAccumulate(quad) {
  var cx = 0,
      cy = 0;
  quad.count = 0;
  if (!quad.leaf) {
    quad.nodes.forEach(function(c) {
      d3_layout_forceAccumulate(c);
      quad.count += c.count;
      cx += c.count * c.cx;
      cy += c.count * c.cy;
    });
  }
  if (quad.point) {
    // jitter internal nodes that are coincident
    if (!quad.leaf) {
      quad.point.x += Math.random() - .5;
      quad.point.y += Math.random() - .5;
    }
    quad.count++;
    cx += quad.point.x;
    cy += quad.point.y;
  }
  quad.cx = cx / quad.count;
  quad.cy = cy / quad.count;
}

function d3_layout_forceLinkDistance(link) {
  return 20;
}

function d3_layout_forceLinkStrength(link) {
  return 1;
}

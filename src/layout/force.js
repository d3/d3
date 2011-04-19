// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("tick"),
      size = [1, 1],
      alpha = .1,
      drag = .9,
      distance = 30,
      charge = -60,
      gravity = .02,
      theta = .8,
      interval,
      nodes,
      links,
      distances;

  function accumulate(n) {
    var cx = 0,
        cy = 0;
    n.count = 0;
    if (!n.leaf) {
      n.nodes.forEach(function(c) {
        accumulate(c);
        n.count += c.count;
        cx += c.count * c.cx;
        cy += c.count * c.cy;
      });
    }
    if (n.point) {
      n.count++;
      cx += n.point.x;
      cy += n.point.y;
    }
    n.cx = cx / n.count;
    n.cy = cy / n.count;
  }

  function repulse(p) {
    return function(n, x1, y1, x2, y2) {
      var dx = n.cx - p.x,
          dy = n.cy - p.y,
          dn = 1 / Math.sqrt(dx * dx + dy * dy);

      /* Barnes-Hut criterion. */
      if ((x2 - x1) * dn < theta) {
        var k = alpha * charge * n.count * dn * dn;
        p.fx += dx * k;
        p.fy += dy * k;
        return true;
      }

      if (n.point && (n.point != p)) {
        var k = alpha * charge * dn * dn;
        p.fx += dx * k;
        p.fy += dy * k;
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

    // reset forces
    i = -1; while (++i < n) {
      (o = nodes[i]).fx = o.fy = 0;
    }

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = Math.sqrt(x * x + y * y)) {
        l = alpha * (l - distance) / l;
        x *= l;
        y *= l;
        t.x -= x;
        t.y -= y;
        s.x += x;
        s.y += y;
      }
    }

    // compute quadtree center of mass
    accumulate(q);

    // apply gravity forces
    x = size[0] / 2;
    y = size[1] / 2;
    i = -1; while (++i < n) {
      o = nodes[i];
      s = x - o.x;
      t = y - o.y;
      l = alpha * gravity / n * Math.sqrt(s * s + t * t);
      s *= l;
      t *= l;
      o.fx += s;
      o.fy += t;
    }

    // apply charge forces
    i = -1; while (++i < n) {
      q.visit(repulse(nodes[i]));
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        x = o.px - (o.px = o.x);
        y = o.py - (o.py = o.y);
        o.x += o.fx - x * drag;
        o.y += o.fy - y * drag;
      }
    }

    event.tick.dispatch({type: "tick"});

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

  force.distance = function(d) {
    if (!arguments.length) return distance;
    distance = d;
    return force;
  };

  force.start = function() {
    var i,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        o;

    // TODO initialize positions of new nodes using constraints (links)
    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = Math.random() * w;
      if (isNaN(o.y)) o.y = Math.random() * h;
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }

    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
    }

    d3.timer(tick);
    return force;
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
    var node, element;

    this
      .on("mouseover", function(d) { d.fixed = true; })
      .on("mouseout", function(d) { if (d != node) d.fixed = false; })
      .on("mousedown", mousedown);

    d3.select(window)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup);

    function mousedown(d) {
      (node = d).fixed = true;
      element = this;
      d3.event.preventDefault();
    }

    function mousemove() {
      if (!node) return;
      var m = d3.svg.mouse(element);
      node.px = m[0];
      node.py = m[1];
      force.resume(); // restart annealing
    }

    function mouseup() {
      if (!node) return;
      mousemove();
      node.fixed = false;
      node = element = null;
    }

    return force;
  };

  return force;
};

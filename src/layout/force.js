// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("tick"),
      size = [1, 1],
      alpha = .5,
      distance = 30,
      interval,
      nodes,
      links,
      distances;

  function tick() {
    var n = distances.length,
        i, // current index
        o, // current link
        s, // current source
        t, // current target
        l, // current distance
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation
    for (i = 0; i < n; ++i) {
      o = distances[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = Math.sqrt(x * x + y * y)) {
        l = alpha / (o.distance * o.distance) * (l - distance * o.distance) / l;
        x *= l;
        y *= l;
        if (!t.fixed) {
          t.x -= x;
          t.y -= y;
        }
        if (!s.fixed) {
          s.x += x;
          s.y += y;
        }
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
        j,
        k,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        o;

    var paths = [];
    for (i = 0; i < n; ++i) {
      o = nodes[i];
      o.x = o.x || Math.random() * w;
      o.y = o.y || Math.random() * h;
      o.fixed = 0;
      paths[i] = [];
      for (j = 0; j < n; ++j) {
        paths[i][j] = Infinity;
      }
      paths[i][i] = 0;
    }

    for (i = 0; i < m; ++i) {
      o = links[i];
      paths[o.source][o.target] = 1;
      paths[o.target][o.source] = 1;
      o.source = nodes[o.source];
      o.target = nodes[o.target];
    }

    // Floyd-Warshall
    for (k = 0; k < n; ++k) {
      for (i = 0; i < n; ++i) {
        for (j = 0; j < n; ++j) {
          paths[i][j] = Math.min(paths[i][j], paths[i][k] + paths[k][j]);
        }
      }
    }

    distances = [];
    for (i = 0; i < n; ++i) {
      for (j = i + 1; j < n; ++j) {
        distances.push({
          source: nodes[i],
          target: nodes[j],
          distance: paths[i][j] * paths[i][j]
        });
      }
    }

    distances.sort(function(a, b) {
      return a.distance - b.distance;
    });

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
      node.x = m[0];
      node.y = m[1];
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

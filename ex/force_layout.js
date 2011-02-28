// A rudimentary force layout using Gauss-Seidel.
function layout_force() {
  var force = {},
      event = d3.dispatch("tick"),
      size = {x: 1, y: 1},
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
        if (s.fixed) {
          if (t.fixed) continue;
          t.x -= x;
          t.y -= y;
        } else if (t.fixed) {
          s.x += x;
          s.y += y;
        } else {
          s.x += x;
          s.y += y;
          t.x -= x;
          t.y -= y;
        }
      }
    }

    // simulated annealing, basically
    if ((alpha *= .99) < 1e-6) force.stop();

    event.tick.dispatch({type: "tick"});
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
        w = size.x,
        h = size.y,
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

    if (interval) clearInterval(interval);
    interval = setInterval(tick, 24);
    return force;
  };

  force.resume = function() {
    alpha = .1;
    if (!interval) interval = setInterval(tick, 24);
    return force;
  };

  force.stop = function() {
    interval = clearInterval(interval);
    return force;
  };

  return force;
}

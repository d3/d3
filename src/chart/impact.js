// Inspired by http://dmitry.baranovskiy.com/work/github/
d3.chart.impact = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      values = Object,
      key = d3_chart_impactKey,
      value = d3_chart_impactValue,
      sort = null,
      xPadding = 30,
      yPadding = 3;

  // For each small multiple…
  function impact(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          n = d.length,
          paths = {},
          max = -Infinity;

      // First pass: track end positions of paths.
      var last = {};
      d.map(function(d, bi) {
        var v = values(d, bi).slice();
        if (sort) v.sort(sort);
        var keys = v.map(function(d, i) {
          var k = key(d, i);
          last[k] = bi;
          return k;
        });
        return {data: d, keys: keys, values: v};
      })
      // Second pass: compute stacked path positions.
      .forEach(function(d, bi) {
        var values = d.values,
            keys = d.keys,
            n = values.length,
            i = -1,
            offset = 0;
        var zeroes = {};
        for (var k in paths) zeroes[k] = 1;
        while (++i < n) {
          var v = value(values[i], i),
              k = keys[i],
              path = paths[k];
          if (!path) paths[k] = path = [];
          path.push([bi, v, offset, i]);
          offset += v;
          delete zeroes[k];
        }
        for (var k in zeroes) {
          if (bi > last[k]) continue;
          paths[k].push([bi, 0, offset, i++]);
        }
        if (offset > max) max = offset;
      });

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, n])
          .range([0, width + xPadding]),
          y1 = d3.scale.linear()
          .domain([0, max])
          .range([0, height]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, n])
          .range([0, width + xPadding]);

      // Stash the new scale.
      this.__chart__ = x1;

      paths = d3.entries(paths);

      var line0 = d3_chart_impactPath(x0, y1, xPadding, yPadding),
          line1 = d3_chart_impactPath(x1, y1, xPadding, yPadding),
          color = d3.scale.quantize()
          .domain([0, paths.length])
          .range(d3.range(9));

      var path = g.selectAll("path")
          .data(paths);

      path.enter().append("svg:path")
          .attr("class", function(d, i) { return "q" + color(i) + "-9"; })
          .attr("d", line0)
        .transition()
          .duration(duration)
          .attr("d", line1);

      path.transition()
          .duration(duration)
          .attr("d", line1);

      path.exit().remove();
    });
    d3.timer.flush();
  }

  impact.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return impact;
  };

  impact.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return impact;
  };

  impact.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return impact;
  };

  impact.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return impact;
  };

  impact.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return impact;
  };

  impact.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return impact;
  };

  impact.key = function(x) {
    if (!arguments.length) return key;
    key = x;
    return impact;
  };

  impact.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return impact;
  };

  impact.xPadding = function(x) {
    if (!arguments.length) return xPadding;
    xPadding = x;
    return impact;
  };

  impact.yPadding = function(x) {
    if (!arguments.length) return yPadding;
    yPadding = x;
    return impact;
  };

  return impact;
};

function d3_chart_impactPath(x, y, xp, yp) {
  return function(d) {
    d = d.value;
    var a = [], b = [],
        n = d.length,
        i = -1;
    while (++i < n) {
      var di = d[i],
          j = di[3],
          xi = x(di[0]),
          yi = y(di[2]) + j * yp - 1,
          hi = y(di[1] + di[2]) + j * yp + 1;
      if (i === 0) a.push("M ", xi, ",", yi);
      else a.push(" C", xi - xp / 2, ",", y(d[i-1][2]) + j * yp - 1, " ", xi - xp / 2, ",", yi, " ", xi, ",", yi);
      a.push(" L", x(di[0] + 1) - xp, ",", yi);
      if (i === n - 1) a.push(" L", x(di[0] + 1) - xp, ",", hi);
      if (i > 0) b.unshift(" C",
          xi - xp / 2, ",", hi, " ",
          xi - xp / 2, ",", y(d[i-1][1] + d[i-1][2]) + d[i-1][3] * yp + 1, " ",
          xi - xp, ",", y(d[i-1][1] + d[i-1][2]) + d[i-1][3] * yp + 1);
      b.unshift(" L", xi, ",", hi);
    }
    b.push("Z");
    return a.join("") + " " + b.join("");
  };
}

function d3_chart_impactKey(d) {
  return d[0];
}

function d3_chart_impactValue(d) {
  return Math.log(d[1] + 1);
}

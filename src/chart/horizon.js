// Implements a horizon layout, which is a variation of a single-series
// area chart where the area is folded into multiple bands. Color is used to
// encode band, allowing the size of the chart to be reduced significantly
// without impeding readability. This layout algorithm is based on the work of
// J. Heer, N. Kong and M. Agrawala in "Sizing the Horizon: The Effects of Chart
// Size and Layering on the Graphical Perception of Time Series Visualizations",
// CHI 2009. http://hci.stanford.edu/publications/2009/heer-horizon-chi09.pdf
d3.chart.horizon = function() {
  var bands = 1, // between 1 and 5, typically
      mode = "offset", // or mirror
      interpolate = "linear", // or basis, monotone, step-before, etc.
      x = d3_chart_horizonX,
      y = d3_chart_horizonY,
      w = 960,
      h = 40,
      duration = 0;

  var color = d3.scale.linear()
      .domain([-1, 0, 1])
      .range(["#d62728", "#fff", "#1f77b4"]);

  // For each small multiple…
  function horizon(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          n = 2 * bands + 1,
          xMin = Infinity,
          xMax = -Infinity,
          yMax = -Infinity,
          x0, // old x-scale
          y0, // old y-scale
          id; // unique id for paths

      // Compute x- and y-values along with extents.
      var data = d.map(function(d, i) {
        var xv = x.call(this, d, i),
            yv = y.call(this, d, i);
        if (xv < xMin) xMin = xv;
        if (xv > xMax) xMax = xv;
        if (-yv > yMax) yMax = -yv;
        if (yv > yMax) yMax = yv;
        return [xv, yv];
      });

      // Compute the new x- and y-scales.
      var x1 = d3.scale.linear().domain([xMin, xMax]).range([0, w]),
          y1 = d3.scale.linear().domain([0, yMax]).range([0, h * bands]);

      // Retrieve the old scales, if this is an update.
      if (this.__chart__) {
        x0 = this.__chart__.x;
        y0 = this.__chart__.y;
        id = this.__chart__.id;
      } else {
        x0 = d3.scale.linear().domain([0, Infinity]).range(x1.range());
        y0 = d3.scale.linear().domain([0, Infinity]).range(y1.range());
        id = ++d3_chart_horizonId;
      }

      // We'll use a defs to store the area path and the clip path.
      var defs = g.selectAll("defs")
          .data([data]);

      var defsEnter = defs.enter().append("svg:defs");

      // The clip path is a simple rect.
      defsEnter.append("svg:clipPath")
          .attr("id", "d3_chart_horizon_clip" + id)
        .append("svg:rect")
          .attr("width", w)
          .attr("height", h);

      defs.select("rect").transition()
          .duration(duration)
          .attr("width", w)
          .attr("height", h);

      // The area path is rendered with our resuable d3.svg.area.
      defsEnter.append("svg:path")
          .attr("id", "d3_chart_horizon_path" + id)
          .attr("d", d3_chart_horizonArea
          .interpolate(interpolate)
          .x(function(d) { return x0(d[0]); })
          .y0(h * bands)
          .y1(function(d) { return h * bands - y0(d[1]); }))
        .transition()
          .duration(duration)
          .attr("d", d3_chart_horizonArea
          .x(function(d) { return x1(d[0]); })
          .y1(function(d) { return h * bands - y1(d[1]); }));

      defs.select("path").transition()
          .duration(duration)
          .attr("d", d3_chart_horizonArea);

      // We'll use a container to clip all horizon layers at once.
      g.selectAll("g")
          .data([null])
        .enter().append("svg:g")
          .attr("clip-path", "url(#d3_chart_horizon_clip" + id + ")");

      // Define the transform function based on the mode.
      var transform = mode == "offset"
          ? function(d) { return "translate(0," + (d + (d < 0) - bands) * h + ")"; }
          : function(d) { return (d < 0 ? "scale(1,-1)" : "") + "translate(0," + (d - bands) * h + ")"; };

      // Instantiate each copy of the path with different transforms.
      var u = g.select("g").selectAll("use")
          .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

      // TODO don't fudge the enter transition
      u.enter().append("svg:use")
          .attr("xlink:href", "#d3_chart_horizon_path" + id)
          .attr("transform", function(d) { return transform(d + (d > 0 ? 1 : -1)); })
          .style("fill", color)
        .transition()
          .duration(duration)
          .attr("transform", transform);

      u.transition()
          .duration(duration)
          .attr("transform", transform)
          .style("fill", color);

      u.exit().transition()
          .duration(duration)
          .attr("transform", transform)
          .remove();

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1, id: id};
    });
    d3.timer.flush();
  }

  horizon.duration = function(x) {
    if (!arguments.length) return duration;
    duration = +x;
    return horizon;
  };

  horizon.bands = function(x) {
    if (!arguments.length) return bands;
    bands = +x;
    color.domain([-bands, 0, bands]);
    return horizon;
  };

  horizon.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return horizon;
  };

  horizon.colors = function(x) {
    if (!arguments.length) return color.range();
    color.range(x);
    return horizon;
  };

  horizon.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x + "";
    return horizon;
  };

  horizon.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return horizon;
  };

  horizon.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return horizon;
  };

  horizon.width = function(x) {
    if (!arguments.length) return width;
    w = +x;
    return horizon;
  };

  horizon.height = function(x) {
    if (!arguments.length) return height;
    h = +x;
    return horizon;
  };

  return horizon;
};

var d3_chart_horizonArea = d3.svg.area(),
    d3_chart_horizonId = 0;

function d3_chart_horizonX(d) {
  return d[0];
}

function d3_chart_horizonY(d) {
  return d[1];
}

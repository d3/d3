// Implements a horizon layout, which is a variation of a single-series
// area chart where the area is folded into multiple bands. Color is used to
// encode band, allowing the size of the chart to be reduced significantly
// without impeding readability. This layout algorithm is based on the work of
// J. Heer, N. Kong and M. Agrawala in <a
// href="http://hci.stanford.edu/publications/2009/heer-horizon-chi09.pdf">"Sizing
// the Horizon: The Effects of Chart Size and Layering on the Graphical
// Perception of Time Series Visualizations"</a>, CHI 2009.
d3.chart.horizon = function() {
  var bands = 2,
      mode, // TODO "mirror" and "offset"
      xValue = Number,
      yValue = Number,
      size = [1, 1],
      duration = 0;

  // For each small multiple…
  function horizon(g) {
    var w = size[0], h = size[1];
    g.each(function(d, i) {
      var g = d3.select(this),
          xMin = Infinity, xMax = -Infinity,
          yMin = Infinity, yMax = -Infinity,
          x0, // old x-scale
          y0; // old y-scale

     // Compute x- and y-values along with extents.
     var data = d.map(function(d, i) {
        var x = xValue.call(this, d, i),
            y = yValue.call(this, d, i);
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
        return [x, y];
      });

      // Compute the new x- and y-scales.
      var x1 = d3.scale.linear().domain([xMin, xMax]).range([0, w]),
          y1 = d3.scale.linear().domain([yMin, yMax]).range([0, h * bands]);

      // Retrieve the old scales, if this is an update.
      if (this.__chart__) {
        x0 = this.__chart__.x;
        y0 = this.__chart__.y;
      } else {
        x0 = d3.scale.linear().domain([0, Infinity]).range(x1.range());
        y0 = d3.scale.linear().domain([0, Infinity]).range(y1.range());
      }

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1};

      // Render the path as a referenceable definition.
      var area0 = d3.svg.area()
          .x(function(d) { return x0(d[0]); })
          .y0(h * bands)
          .y1(function(d) { return h * bands - y0(d[1]); }),
          area1 = d3.svg.area()
          .x(function(d) { return x1(d[0]); })
          .y0(h * bands)
          .y1(function(d) { return h * bands - y1(d[1]); });

      var defs = g.selectAll("defs")
          .data([data]);
      defs.enter().append("svg:defs").append("svg:path")
          .attr("id", "d3_chart_horizon_" + i)
          .attr("d", area0)
          .transition().duration(duration)
          .attr("d", area1);
      defs.select("path")
          .transition().duration(duration)
          .attr("d", area1);

      // Instantiate `n` copies of the path with different offsets.
      var use = g.selectAll("use")
          .data(d3.range(bands));
      use.enter().append("svg:use")
          .attr("class", function(d, i) { return "q" + i + "-" + bands; })
          .attr("y", function(d, i) { return -(bands - i - 1) * h; })
          .attr("xlink:href", "#d3_chart_horizon_" + i);
      use.exit().remove();
    });
    d3.timer.flush();
  }

  horizon.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return horizon;
  };

  horizon.bands = function(x) {
    if (!arguments.length) return bands;
    bands = x;
    return horizon;
  };

  horizon.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x;
    return horizon;
  };

  horizon.x = function(x) {
    if (!arguments.length) return xValue;
    xValue = x;
    return horizon;
  };

  horizon.y = function(x) {
    if (!arguments.length) return yValue;
    yValue = x;
    return horizon;
  };

  horizon.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return horizon;
  };
 
  return horizon;
};

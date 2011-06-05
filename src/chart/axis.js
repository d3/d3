d3.chart.axis = function() {
  var orient = "left", // left, right, top, bottom
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scales;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          format = tickFormat || scales[1].tickFormat(tickCount),
          transform = d3_chart_axisTransforms[orient];

      // Select the ticks and join with new data.
      var tick = g.selectAll("g")
          .data(scales[1].ticks(tickCount), function(d) {
            return this.textContent || format(d);
          });

      //  enter
      var tickEnter = tick.enter().append("svg:g").call(transform, scales[0], 1e-6),
          textEnter = tickEnter.append("svg:text").text(format),
          lineEnter = tickEnter.append("svg:line");

      // handle various orientations
      if (orient == "left") {
        textEnter.attr("text-anchor", "end").attr("x", -9).attr("dy", ".35em")
        lineEnter.attr("x2", -6);
      } else {
        textEnter.attr("text-anchor", "middle").attr("y", 9).attr("dy", ".71em")
        lineEnter.attr("y2", 6);
      }

      // enter + update
      tick.transition()
          .duration(duration)
          .call(transform, scales[1], 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(transform, scales[1], 1e-6)
          .remove();
    });
  }

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x in d3_chart_axisTransforms ? x : "left";
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return axis;
  };

  axis.tickCount = function(x) {
    if (!arguments.length) return tickCount;
    tickCount = x;
    return axis;
  };

  axis.scales = function(x) {
    if (!arguments.length) return scales;
    scales = x;
    return axis;
  };

  axis.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return axis;
  };

  return axis;
}

var d3_chart_axisTransforms = {
  left: function(tick, y, o) {
    tick.attr("transform", function(d) { return "translate(0," + y(d) + ")"; })
        .style("opacity", o);
  },
  bottom: function(tick, x, o) {
    tick.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; })
        .style("opacity", o);
  }
};

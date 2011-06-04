// TODO align (left/right/top/bottom?)
d3.chart.axis = function() {
  var dimension = "y", // or x
      mode = "tick", // or line
      transform = d3_chart_axisTransformY,
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scales,
      size;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          format = tickFormat || scales[1].tickFormat(tickCount);

      // Update ticks.
      var tick = g.selectAll("g." + dimension + ".tick")
          .data(scales[1].ticks(tickCount), function(d) {
            return this.textContent || tickFormat(d);
          });

      // enter
      var tickEnter = tick.enter().append("svg:g")
          .attr("class", dimension + " tick")
          .call(transform, scales[0], size, 1e-6);

      if (dimension == "y") {
        tickEnter.append("svg:line")
            .attr("x1", 0)
            .attr("x2", mode == "tick" ? -6 : size);

        tickEnter.append("svg:text")
            .attr("text-anchor", "end")
            .attr("x", mode == "tick" ? -9 : -3)
            .attr("dy", ".35em")
            .text(format);
      } else {
        tickEnter.append("svg:line")
            .attr("y1", 0)
            .attr("y2", mode == "tick" ? 6 : -size);

        tickEnter.append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", mode == "tick" ? 9 : 3)
            .attr("dy", ".71em")
            .text(format);
      }

      tickEnter.transition()
          .duration(duration)
          .call(transform, scales[1], size, 1);

      // update
      tick.transition()
          .duration(duration)
          .call(transform, scales[1], size, 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(transform, scales[1], size, 1e-6)
          .remove();
    });
  }

  axis.dimension = function(x) {
    if (!arguments.length) return dimension;
    dimension = x;
    transform = x == "y" ? d3_chart_axisTransformY : d3_chart_axisTransformX;
    return axis;
  };

  axis.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x;
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

  axis.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return axis;
  };

  axis.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return axis;
  };

  return axis;
}

function d3_chart_axisTransformX(tick, x, size, o) {
  tick.attr("transform", function(d) { return "translate(" + x(d) + "," + size + ")"; })
      .style("opacity", o);
}

function d3_chart_axisTransformY(tick, y, size, o) {
  tick.attr("transform", function(d) { return "translate(0," + y(d) + ")"; })
      .style("opacity", o);
}

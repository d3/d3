d3.chart.axis = function(cls) {
  var format = null,
      count = 10,
      transform = d3_chartAxisTransform,
      duration = 0,
      x0 = null,
      x1 = null;

  function axis(g) {
    var tformat = format || x1.tickFormat(count),
        tx = transform(x1);

    // Update x-ticks.
    var tick = g.selectAll("g." + cls + ".tick")
        .data(x1.ticks(count), function(d) {
          return this.textContent || tformat(d);
        });

    var tickEnter = tick.enter().append("svg:g")
        .attr("class", cls + " tick")
        .attr("transform", transform(x0))
        .style("opacity", 1e-6);

    // Transition the entering ticks to the new scale, x1.
    tickEnter.transition()
        .duration(duration)
        .attr("transform", tx)
        .style("opacity", 1);

    // Transition the updating ticks to the new scale, x1.
    tick.transition()
        .duration(duration)
        .attr("transform", tx)
        .style("opacity", 1);

    // Transition the exiting ticks to the new scale, x1.
    tick.exit().transition()
        .duration(duration)
        .attr("transform", tx)
        .style("opacity", 1e-6)
        .remove();

    return tickEnter;
  }

  axis.transform = function(x) {
    if (!arguments.length) return transform;
    transform = function(scale) {
      return function(d) {
        return x(scale, d);
      };
    };
    return axis;
  };

  axis.format = function(x) {
    if (!arguments.length) return format;
    format = x;
    return axis;
  };

  axis.count = function(x) {
    if (!arguments.length) return count;
    count = x;
    return axis;
  };

  axis.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return axis;
  };

  axis.scales = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    return axis;
  };

  return axis;
}

function d3_chartAxisTransform(x) {
  return function(d) {
    return "translate(" + x(d) + ")";
  };
}

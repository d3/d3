// TODO align (left/right/top/bottom?)
d3.chart.axis = function() {
  var dimension = "y", // or x
      transform = d3_chart_axisTransformY,
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scale1,
      size;

  function subdivide(ticks) {
    var ticks2 = [],
        i = -1,
        n = ticks.length - 1;
    while (++i < n) {
      ticks2.push(ticks[i]);
      ticks2.push((ticks[i] + ticks[i + 1]) / 2);
    }
    ticks2.push(ticks[i]);
    return ticks2;
  }

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          format = tickFormat || scale1.tickFormat(tickCount);

      // Add the axis container.
      g.selectAll(dimension + ".axis")
          .data([null])
        .enter().append("svg:g")
          .attr("class", dimension + " axis");

      // Update ticks.
      var tick = g.select(".axis." + dimension).selectAll("g")
          .data(subdivide(scale1.ticks(tickCount)), function(d) {
            return this.textContent || format(d);
          });

      // enter
      var tickEnter = tick.enter().append("svg:g")
          .call(transform, this.__chart__ && this.__chart__[dimension] || scale1, size, 1e-6);

      if (dimension == "y") {
        tickEnter.append("svg:line")
            .attr("class", "line")
            .attr("x2", size);

        tickEnter.append("svg:line")
            .attr("class", "tick")
            .attr("x2", -6);

        tickEnter.append("svg:text")
            .attr("text-anchor", "end")
            .attr("x", -9)
            .attr("dy", ".35em")
            .text(format);
      } else {
        tickEnter.append("svg:line")
            .attr("class", "line")
            .attr("y2", -size);

        tickEnter.append("svg:line")
            .attr("class", "tick")
            .attr("y2", 6);

        tickEnter.append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", 9)
            .attr("dy", ".71em")
            .text(format);
      }

      tickEnter.transition()
          .duration(duration)
          .call(transform, scale1, size, 1);

      // update
      tick.transition()
          .duration(duration)
          .call(transform, scale1, size, 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(transform, scale1, size, 1e-6)
          .remove();
    });
  }

  axis.dimension = function(x) {
    if (!arguments.length) return dimension;
    dimension = x;
    transform = x == "y" ? d3_chart_axisTransformY : d3_chart_axisTransformX;
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

  axis.scale = function(x) {
    if (!arguments.length) return scale1;
    scale1 = x;
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

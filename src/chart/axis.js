d3.chart.axis = function() {
  var scale = d3.scale.linear(),
      tickSize = 6,
      tickPadding = 3;

  function axis(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this);

      // Scale data.
      var range = scale.range(),
          ticks = scale.ticks(10),
          tickFormat = scale.tickFormat(10);

      // If the transition is interrupted, then really we'd prefer to know the
      // current state of the scale rather than the previous state (at the end
      // of the transition). We might be able to do that by using a custom tween
      // that stores the parameter t and an interpolated scale, but, meh.

      // Stash the new scale and grab the old scale.
      var scale0 = this.__chart__ || scale;
      this.__chart__ = scale.copy();

      // Ticks.
      var tick = g.selectAll("g.tick")
          .data(ticks, String);

      var tickEnter = tick.enter().append("svg:g")
          .attr("class", "tick")
          .attr("transform", function(d) { return "translate(" + scale0(d) + ",0)"; })
          .style("opacity", 1e-6);

      tickEnter.append("svg:line");

      tickEnter.append("svg:text")
          .attr("dy", ".71em")
          .attr("text-anchor", "middle");

      transition(tick.exit())
          .attr("transform", function(d) { return "translate(" + scale(d) + ",0)"; })
          .style("opacity", 1e-6)
          .remove();

      var tickUpdate = transition(tick)
          .style("opacity", 1)
          .attr("transform", function(d) { return "translate(" + scale(d) + ",0)"; })

      tickUpdate.select("line")
          .attr("y2", tickSize);

      tickUpdate.select("text")
          .attr("y", Math.max(tickSize, 0) + tickPadding)
          .text(tickFormat);

      // Domain.
      var path = g.selectAll("path.domain")
          .data([,]);

      path.enter().append("svg:path")
          .attr("class", "domain");

      transition(path)
          .attr("d", "M" + range[0] + "," + tickSize + "V0H" + range[1] + "V" + tickSize);

      function transition(o) {
        return selection.delay ? o.transition()
            .delay(selection[j][i].delay)
            .duration(selection[j][i].duration)
            .ease(selection.ease()) : o;
      }
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.tickSize = function(x) {
    if (!arguments.length) return tickSize;
    tickSize = +x;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  return axis;
};

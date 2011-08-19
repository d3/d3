d3.chart.axis = function() {
  var scale = d3.scale.linear(),
      tickSize = 6,
      tickPadding = 3;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this);

      // Scale data.
      var range = scale.range(),
          ticks = scale.ticks(10),
          tickFormat = scale.tickFormat(10);

      // Ticks.
      var tick = g.selectAll("g.tick")
          .data(ticks);

      var tickEnter = tick.enter().append("svg:g")
          .attr("class", "tick");

      tickEnter.append("svg:line");

      tickEnter.append("svg:text")
          .attr("dy", ".71em")
          .attr("text-anchor", "middle");

      tick.exit().remove();

      tick
          .attr("transform", function(d) { return "translate(" + scale(d) + ",0)"; })

      tick.select("line")
          .attr("y2", tickSize);

      tick.select("text")
          .attr("y", Math.max(tickSize, 0) + tickPadding)
          .text(tickFormat);

      // Domain.
      var path = g.selectAll("path.domain")
          .data([,]);

      path.enter().append("svg:path")
          .attr("class", "domain");

      path
          .attr("d", "M" + range[0] + "," + tickSize + "V0H" + range[1] + "V" + tickSize);
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

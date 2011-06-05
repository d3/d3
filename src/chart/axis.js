d3.chart.axis = function() {
  var orient = "left", // left, right, top, bottom
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scales,
      size = 0;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          format = tickFormat || scales[1].tickFormat(tickCount),
          transform = d3_chart_axisTransforms[orient];

      // Update ticks.
      var tick = g.selectAll("g")
          .data(d3_chart_axisSubdivide(scales[1].ticks(tickCount)), Number);

      //  enter
      tick.enter().append("svg:g")
          .call(transform, scales[0], size, 1);

      // enter + update
      tick.transition()
          .duration(duration)
          .call(transform, scales[1], size, 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(transform, scales[1], size, 1e-6)
          .remove();

      // Select only the major ticks.
      // var major = tick.filter(function(d, i) { return !(i & 1); });

      // Update existing major ticks' text; fade if the text changes.
      var text = tick.selectAll("text")
          .data(function(d, i) { return i & 1 ? [] : [d]; }, function(d) {
            return this.textContent || format(d);
          });

      var textEnter = text.enter().append("svg:text")
          .style("opacity", 1e-6)
          .text(format);

      text.transition()
          .duration(duration)
          .style("opacity", 1);

      text.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

      // Update existing major ticks' text; fade if the text changes.
      var line = tick.selectAll("line")
          .data(function(d, i) { return i & 1 ? [] : [d]; });

      line.enter().append("svg:line")
          .style("opacity", 1e-6);

      line.attr("class", "tick")
        .transition()
          .duration(duration)
          .style("opacity", 1);

      line.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

      if (orient == "left") {
        textEnter.attr("text-anchor", "end").attr("x", -9).attr("dy", ".35em")
        line.attr("x2", -6);
      } else {
        textEnter.attr("text-anchor", "middle").attr("y", 9).attr("dy", ".71em")
        line.attr("y2", 6);
      }
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

var d3_chart_axisTransforms = {
  left: function(tick, y, x, o) {
    tick.attr("transform", function(d) { return "translate(0," + y(d) + ")"; })
        .style("opacity", o);
  },
  bottom: function(tick, x, y, o) {
    tick.attr("transform", function(d) { return "translate(" + x(d) + "," + y + ")"; })
        .style("opacity", o);
  }
};

function d3_chart_axisSubdivide(ticks) {
  var subticks = [],
      i = -1,
      n = ticks.length - 1;
  while (++i < n) {
    subticks.push(ticks[i]);
    subticks.push((ticks[i] + ticks[i + 1]) / 2);
  }
  subticks.push(ticks[i]);
  return subticks;
}

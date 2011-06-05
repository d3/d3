d3.chart.axis = function() {
  var orient = "left", // left, right, top, bottom
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scales;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          f = tickFormat || scales[1].tickFormat(tickCount),
          t = /^(top|bottom)$/.test(orient) ? d3_chart_axisX : d3_chart_axisY;

      // Select the ticks and join with new data.
      var tick = g.selectAll("g")
          .data(scales[1].ticks(tickCount), function(d) {
            return this.textContent || f(d);
          });

      //  enter
      var tickEnter = tick.enter().append("svg:g").call(t, scales[0], 1e-6),
          textEnter = tickEnter.append("svg:text").text(f),
          lineEnter = tickEnter.append("svg:line");

      // handle various orientations
      switch (orient) {
        case "top": {
          textEnter.attr("text-anchor", "middle").attr("y", -9);
          lineEnter.attr("y2", -6);
          break;
        }
        case "left": {
          textEnter.attr("text-anchor", "end").attr("x", -9).attr("dy", ".35em");
          lineEnter.attr("x2", -6);
          break;
        }
        case "right": {
          textEnter.attr("text-anchor", "start").attr("x", 9).attr("dy", ".35em");
          lineEnter.attr("x2", 6);
          break;
        }
        case "bottom": {
          textEnter.attr("text-anchor", "middle").attr("y", 9).attr("dy", ".71em");
          lineEnter.attr("y2", 6);
          break;
        }
      }

      // enter + update
      tick.transition()
          .duration(duration)
          .call(t, scales[1], 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(t, scales[1], 1e-6)
          .remove();
    });
  }

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
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

function d3_chart_axisX(tick, x, o) {
  tick.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; })
      .style("opacity", o);
}

function d3_chart_axisY(tick, y, o) {
  tick.attr("transform", function(d) { return "translate(0," + y(d) + ")"; })
      .style("opacity", o);
}

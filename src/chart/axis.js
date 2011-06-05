d3.chart.axis = function() {
  var orient = "left", // left, right, top, bottom
      mode = "open", // open, closed
      tickFormat = null,
      tickCount = 10,
      duration = 0,
      scales;

  function axis(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          f = tickFormat || scales[1].tickFormat(tickCount),
          t = /^(top|bottom)$/.test(orient) ? d3_chart_axisX : d3_chart_axisY,
          p = d3_chart_axisPaths[orient],
          domain = mode == "closed" ? scales[1].domain() : null;

      // Select the ticks and join with new data.
      var tick = g.selectAll("g.tick")
          .data(scales[1].ticks(tickCount), function(d) {
            return this.textContent || f(d);
          });

      //  enter
      var tickEnter = tick.enter().insert("svg:g", "path").attr("class", "tick").call(t, scales[0], 1e-6),
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
          .call(t, scales[1], 1)
        .select("line")
          .style("opacity", domain ? function(d) {
            return domain.indexOf(d) == -1 ? 1 : 1e-6;
          } : 1);

      // exit
      tick.exit().transition()
          .duration(duration)
          .call(t, scales[1], 1e-6)
          .remove();

      // update domain path
      var path = g.selectAll("path")
      if (domain) {
        (path = path.data([,])).enter().append("svg:path")
            .attr("d", p(domain.map(scales[0])))
            .style("opacity", 1e-6);

        path.transition()
            .duration(duration)
            .attr("d", p(domain.map(scales[1])))
            .style("opacity", 1);
      } else {
        path.transition()
            .duration(duration)
            .style("opacity", 1e-6)
            .remove();
      }
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

  axis.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x;
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

var d3_chart_axisPaths = {
  bottom: function(r) { return "M" + r[0] + ",6V0H" + r[1] + "V6"; },
  top: function(r) { return "M" + r[0] + ",-6V0H" + r[1] + "V-6"; },
  left: function(r) { return "M-6," + r[0] + "H0V" + r[1] + "H-6"; },
  right: function(r) { return "M6," + r[0] + "H0V" + r[1] + "H6"; }
};

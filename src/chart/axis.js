d3.chart.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickFormat_;

  function axis(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this);

      // Ticks.
      var ticks = scale.ticks.apply(scale, tickArguments_),
          tickFormat = tickFormat_ || scale.tickFormat.apply(scale, tickArguments_),
          tick = g.selectAll("g.tick").data(ticks, String),
          tickEnter = tick.enter().insert("svg:g", "path").attr("class", "tick").style("opacity", 1e-6),
          tickExit = transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = scale.range(),
          path = g.selectAll("path.domain").data([,]),
          pathEnter = path.enter().append("svg:path").attr("class", "domain"),
          pathUpdate = transition(path);

      // Stash the new scale and grab the old scale.
      var scale0 = this.__chart__ || scale;
      this.__chart__ = scale.copy();

      tickEnter.append("svg:line");
      tickEnter.append("svg:text");
      tickUpdate.select("text").text(tickFormat);

      switch (orient) {
        case "bottom": {
          tickTransform = d3_chart_axisX;
          tickEnter.select("text").attr("dy", ".71em").attr("text-anchor", "middle");
          tickUpdate.select("line").attr("y2", tickSize);
          tickUpdate.select("text").attr("y", Math.max(tickSize, 0) + tickPadding);
          pathUpdate.attr("d", "M" + range[0] + "," + tickSize + "V0H" + range[1] + "V" + tickSize);
          break;
        }
        case "top": {
          tickTransform = d3_chart_axisX;
          tickEnter.select("text").attr("text-anchor", "middle");
          tickUpdate.select("line").attr("y2", -tickSize);
          tickUpdate.select("text").attr("y", -(Math.max(tickSize, 0) + tickPadding));
          pathUpdate.attr("d", "M" + range[0] + "," + -tickSize + "V0H" + range[1] + "V" + -tickSize);
          break;
        }
        case "left": {
          tickTransform = d3_chart_axisY;
          tickEnter.select("text").attr("dy", ".32em").attr("text-anchor", "end");
          tickUpdate.select("line").attr("x2", -tickSize);
          tickUpdate.select("text").attr("x", -(Math.max(tickSize, 0) + tickPadding));
          pathUpdate.attr("d", "M" + -tickSize + "," + range[0] + "H0V" + range[1] + "H" + -tickSize);
          break;
        }
        case "right": {
          tickTransform = d3_chart_axisY;
          tickEnter.select("text").attr("dy", ".32em");
          tickUpdate.select("line").attr("x2", tickSize);
          tickUpdate.select("text").attr("x", Math.max(tickSize, 0) + tickPadding);
          pathUpdate.attr("d", "M" + tickSize + "," + range[0] + "H0V" + range[1] + "H" + tickSize);
          break;
        }
      }

      tickEnter.call(tickTransform, scale0);
      tickUpdate.call(tickTransform, scale);
      tickExit.call(tickTransform, scale);

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

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
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

  axis.ticks = function() {
    if (!arguments.length) return tickArguments_;
    tickArguments_ = arguments;
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  return axis;
};

function d3_chart_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_chart_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

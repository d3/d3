d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = 6,
      tickMinorSize = 6,
      tickEndSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickFormat_,
      tickSubdivide = 0;

  function axis(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this);

      // Ticks.
      var ticks = scale.ticks.apply(scale, tickArguments_),
          tickFormat = tickFormat_ == null ? scale.tickFormat.apply(scale, tickArguments_) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("svg:line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("svg:g", "path").style("opacity", 1e-6),
          tickExit = transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleExtent(scale.range()),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("svg:path").attr("class", "domain"),
          pathUpdate = transition(path);

      // Stash the new scale and grab the old scale.
      var scale0 = this.__chart__ || scale;
      this.__chart__ = scale.copy();

      tickEnter.append("svg:line").attr("class", "tick");
      tickEnter.append("svg:text");
      tickUpdate.select("text").text(tickFormat);

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickUpdate.attr("y2", tickMinorSize);
          tickEnter.select("text").attr("dy", ".71em").attr("text-anchor", "middle");
          tickUpdate.select("line").attr("y2", tickMajorSize);
          tickUpdate.select("text").attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickUpdate.attr("y2", -tickMinorSize);
          tickEnter.select("text").attr("text-anchor", "middle");
          tickUpdate.select("line").attr("y2", -tickMajorSize);
          tickUpdate.select("text").attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickUpdate.attr("x2", -tickMinorSize);
          tickEnter.select("text").attr("dy", ".32em").attr("text-anchor", "end");
          tickUpdate.select("line").attr("x2", -tickMajorSize);
          tickUpdate.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickUpdate.attr("x2", tickMinorSize);
          tickEnter.select("text").attr("dy", ".32em");
          tickUpdate.select("line").attr("x2", tickMajorSize);
          tickUpdate.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding);
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      tickEnter.call(tickTransform, scale0);
      tickUpdate.call(tickTransform, scale);
      tickExit.call(tickTransform, scale);

      subtickEnter.call(tickTransform, scale0);
      subtickUpdate.call(tickTransform, scale);
      subtickExit.call(tickTransform, scale);

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

  axis.tickSize = function(x, y, z) {
    if (!arguments.length) return tickMajorSize;
    var n = arguments.length - 1;
    tickMajorSize = +x;
    tickMinorSize = n > 1 ? +y : tickMajorSize;
    tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function(x) {
    if (!arguments.length) return tickSubdivide;
    tickSubdivide = +x;
    return axis;
  };

  return axis;
};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        subticks,
        i = -1,
        n = ticks.length,
        d = (ticks[1] - ticks[0]) / ++m,
        j,
        v;
    while (++i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i] - j * d) >= extent[0]) {
          subticks.push(v);
        }
      }
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
      subticks.push(v);
    }
  }
  return subticks;
}

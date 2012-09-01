d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = d3_functor(6),
      tickMinorSize = d3_functor(6),
      tickEndSize = d3_functor(6),
      tickPadding = 3,
      tickArguments_ = [10],
      tickValues = null,
      tickFormat_ = null,
      tickFormatExtended_,
      tickSubdivide = 0;

  function axis(g) {
    g.each(function() {
      var g = d3.select(this);

      // Ticks, or domain values for ordinal scales.
      var ticks = (tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain()) : tickValues)
                    .map(d3_svg_axisMapTicks),
          tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide);
      var subtick = g.selectAll(".minor");
      subtick = subtick.data(subticks /* , function(d, i) {
        return i; // Math.floor(100 * (d.index + d.subindex / d.modulus));
      } */ );
      var subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6);
      var subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove();
      var subtickUpdate = d3.transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
          tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = d3.transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("path").attr("class", "domain"),
          pathUpdate = d3.transition(path);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale1 = scale.copy(),
          scale0 = this.__chart__ || scale1;
      this.__chart__ = scale1;

      tickEnter.append("line").attr("class", "tick");
      tickEnter.append("text").attr("class", "tick-text");

      var lineEnter = tickEnter.select("line"),
          lineUpdate = tickUpdate.select("line"),
          text = tick.select("text.tick-text").text(function(d, i) {
            if (!tickFormatExtended_)
              return tickFormat(d.value);
            else
              return tickFormatExtended_(d, i);
          }),
          textEnter = tickEnter.select("text.tick-text"),
          textUpdate = tickUpdate.select("text.tick-text");

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", function(d, i) {
            return +tickMinorSize(d, i);
          });
          subtickUpdate.attr("x2", 0).attr("y2", function(d, i) {
            return +tickMinorSize(d, i);
          });
          lineEnter.attr("y2", tickMajorSize);
          textEnter.attr("y", function(d, i) {
            return Math.max(+tickMajorSize(d, i), 0) + tickPadding;
          });
          lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
          textUpdate.attr("x", 0).attr("y", function (d, i) {
            return Math.max(+tickMajorSize(d, i), 0) + tickPadding;
          });
          text.attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize(range, 0) + "V0H" + range[1] + "V" + tickEndSize(range, 1));
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", function(d, i) {
            return -tickMinorSize(d, i);
          });
          subtickUpdate.attr("x2", 0).attr("y2", function(d, i) {
            return -tickMinorSize(d, i);
          });
          lineEnter.attr("y2", function(d, i) {
            return -tickMajorSize(d, i);
          });
          textEnter.attr("y", function(d, i) {
            return -(Math.max(+tickMajorSize(d, i), 0) + tickPadding);
          });
          lineUpdate.attr("x2", 0).attr("y2", function(d, i) {
            return -tickMajorSize(d, i);
          });
          textUpdate.attr("x", 0).attr("y", function(d, i) {
            return -(Math.max(+tickMajorSize(d, i), 0) + tickPadding);
          });
          text.attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize(range, 0) + "V0H" + range[1] + "V" + -tickEndSize(range, 1));
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", function(d, i) {
            return -tickMinorSize(d, i);
          });
          subtickUpdate.attr("x2", function(d, i) {
            return -tickMinorSize(d, i);
          }).attr("y2", 0);
          lineEnter.attr("x2", function(d, i) {
            return -tickMajorSize(d, i);
          });
          textEnter.attr("x", function(d, i) {
            return -(Math.max(+tickMajorSize(d, i), 0) + tickPadding);
          });
          lineUpdate.attr("x2", function(d, i) {
            return -tickMajorSize(d, i);
          }).attr("y2", 0);
          textUpdate.attr("x", function(d, i) {
            return -(Math.max(+tickMajorSize(d, i), 0) + tickPadding);
          }).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize(range, 0) + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize(range, 1));
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", tickMinorSize);
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          lineEnter.attr("x2", tickMajorSize);
          textEnter.attr("x", function(d, i) {
            return Math.max(+tickMajorSize(d, i), 0) + tickPadding;
          });
          lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
          textUpdate.attr("x", function(d, i) {
            return Math.max(+tickMajorSize(d, i), 0) + tickPadding;
          }).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize(range, 0) + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize(range, 1));
          break;
        }
        default: {
          // orient is supposed to be a user-defined callback function

        }
      }

      // For quantitative scales:
      // - enter new ticks from the old scale
      // - exit old ticks to the new scale
      if (scale.ticks) {
        tickEnter.call(tickTransform, scale0);
        tickUpdate.call(tickTransform, scale1);
        tickExit.call(tickTransform, scale1);
        subtickEnter.call(tickTransform, scale0);
        subtickUpdate.call(tickTransform, scale1);
        subtickExit.call(tickTransform, scale1);
      }

      // For ordinal scales:
      // - any entering ticks are undefined in the old scale
      // - any exiting ticks are undefined in the new scale
      // Therefore, we only need to transition updating ticks.
      else {
        var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
        tickEnter.call(tickTransform, x);
        tickUpdate.call(tickTransform, x);
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

  axis.tickValues = function(x) {
    if (!arguments.length) return tickValues;
    tickValues = x;
    return axis;
  };

  axis.tickFormat = function(x, extended) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    tickFormatExtended_ = extended;
    return axis;
  };

  axis.tickSize = function(major, minor, half, end) {
    var n = arguments.length;
    if (!n) return [tickMajorSize, tickMinorSize, tickEndSize];
    tickMajorSize = d3_functor(major);
    tickMinorSize = n > 2 ? d3_functor(minor) : tickMajorSize;
    tickEndSize = d3_functor(arguments[n - 1]);
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
  selection.attr("transform", function(d) {
    return "translate(" + x(d.value) + ",0)";
  });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) {
    return "translate(0," + y(d.value) + ")";
  });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  var subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        i = 0,
        n = ticks.length,
        d = (ticks[1].value - ticks[0].value) / ++m,
        j,
        v;
    while (i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i].value - j * d) > extent[0]) {
          subticks.push({
            value: v,
            index: i - 1,
            subindex: m - j,
            modulus: m,
            majors: [ticks[i - 1], ticks[i]]
          });
        }
      }
      ++i;
      if (i < n)
        d = (+ticks[i].value - +ticks[i - 1].value) / m;
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i].value + j * d) < extent[1];) {
      subticks.push({
        value: v,
        index: i,
        subindex: m - j,
        modulus: m,
        majors: [ticks[i], null]
      });
    }
  }
  return subticks;
}

function d3_svg_axisMapTicks(v, i, ticks) {
  return {
    value: v,
    index: i
  };
}
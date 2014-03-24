import "../core/identity";
import "../math/trigonometry";
import "../scale/linear";
import "../scale/scale";
import "../selection/selection";
import "../transition/transition";
import "svg";

d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = d3_svg_axisDefaultOrient,
      innerTickSize = 6,
      outerTickSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickValues = null,
      tickFormat_;

  function axis(g) {
    g.each(function() {
      var g = d3.select(this);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale0 = this.__chart__ || scale,
          scale1 = this.__chart__ = scale.copy();

      // Ticks, or domain values for ordinal scales.
      var ticks = tickValues == null ? (scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain()) : tickValues,
          tickFormat = tickFormat_ == null ? (scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity) : tickFormat_,
          tick = g.selectAll(".tick").data(ticks, scale1),
          tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε),
          tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(),
          tickUpdate = d3.transition(tick.order()).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale1),
          path = g.selectAll(".domain").data([0]),
          pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));

      tickEnter.append("line");
      tickEnter.append("text");

      var lineEnter = tickEnter.select("line"),
          lineUpdate = tickUpdate.select("line"),
          text = tick.select("text").text(tickFormat),
          textEnter = tickEnter.select("text"),
          textUpdate = tickUpdate.select("text");

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          lineEnter.attr("y2", innerTickSize);
          textEnter.attr("y", Math.max(innerTickSize, 0) + tickPadding);
          lineUpdate.attr("x2", 0).attr("y2", innerTickSize);
          textUpdate.attr("x", 0).attr("y", Math.max(innerTickSize, 0) + tickPadding);
          text.attr("dy", ".71em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          lineEnter.attr("y2", -innerTickSize);
          textEnter.attr("y", -(Math.max(innerTickSize, 0) + tickPadding));
          lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);
          textUpdate.attr("x", 0).attr("y", -(Math.max(innerTickSize, 0) + tickPadding));
          text.attr("dy", "0em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          lineEnter.attr("x2", -innerTickSize);
          textEnter.attr("x", -(Math.max(innerTickSize, 0) + tickPadding));
          lineUpdate.attr("x2", -innerTickSize).attr("y2", 0);
          textUpdate.attr("x", -(Math.max(innerTickSize, 0) + tickPadding)).attr("y", 0);
          text.attr("dy", ".32em").style("text-anchor", "end");
          pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          lineEnter.attr("x2", innerTickSize);
          textEnter.attr("x", Math.max(innerTickSize, 0) + tickPadding);
          lineUpdate.attr("x2", innerTickSize).attr("y2", 0);
          textUpdate.attr("x", Math.max(innerTickSize, 0) + tickPadding).attr("y", 0);
          text.attr("dy", ".32em").style("text-anchor", "start");
          pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize);
          break;
        }
      }

      // If either the new or old scale is ordinal,
      // entering ticks are undefined in the old scale,
      // and so can fade-in in the new scale’s position.
      // Exiting ticks are likewise undefined in the new scale,
      // and so can fade-out in the old scale’s position.
      if (scale1.rangeBand) {
        var x = scale1, dx = x.rangeBand() / 2;
        scale0 = scale1 = function(d) { return x(d) + dx; };
      } else if (scale0.rangeBand) {
        scale0 = scale1;
      } else {
        tickExit.call(tickTransform, scale1);
      }

      tickEnter.call(tickTransform, scale0);
      tickUpdate.call(tickTransform, scale1);
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
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

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  axis.tickSize = function(x) {
    var n = arguments.length;
    if (!n) return innerTickSize;
    innerTickSize = +x;
    outerTickSize = +arguments[n - 1];
    return axis;
  };

  axis.innerTickSize = function(x) {
    if (!arguments.length) return innerTickSize;
    innerTickSize = +x;
    return axis;
  };

  axis.outerTickSize = function(x) {
    if (!arguments.length) return outerTickSize;
    outerTickSize = +x;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function() {
    return arguments.length && axis;
  };

  return axis;
};

var d3_svg_axisDefaultOrient = "bottom",
    d3_svg_axisOrients = {top: 1, right: 1, bottom: 1, left: 1};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

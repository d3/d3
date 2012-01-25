d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      arrange = false,
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

      // If selection is a transition, create subtransitions.
      var transition = selection.delay ? function(o) {
        var id = d3_transitionInheritId;
        try {
          d3_transitionInheritId = selection.id;
          return o.transition()
              .delay(selection[j][i].delay)
              .duration(selection[j][i].duration)
              .ease(selection.ease());
        } finally {
          d3_transitionInheritId = id;
        }
      } : Object;

      // Ticks, or domain values for ordinal scales.
      var ticks = scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain(),
          tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
          tickExit = transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("path").attr("class", "domain"),
          pathUpdate = transition(path);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale1 = scale.copy(),
          scale0 = this.__chart__ || scale1;
      this.__chart__ = scale1;

      tickEnter.append("line").attr("class", "tick");
      tickEnter.append("line").attr("class", "tickPointer");
      tickEnter.append("text");
      tickUpdate.select("text").text(tickFormat);

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
          tickEnter.select("line.tick").attr("y2", tickMajorSize);
          tickEnter.select("line.tickPointer").attr("y1", tickMajorSize).attr("y2", tickMajorSize);
          tickEnter.select("text").attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          tickUpdate.select("line.tick").attr("x2", 0).attr("y2", tickMajorSize);
          tickUpdate.select("line.tickPointer").attr("x2", 0).attr("y2", tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding).attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", -tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
          tickEnter.select("line.tick").attr("y2", -tickMajorSize);
          tickEnter.select("line.tickPointer").attr("y1", -tickMajorSize).attr("y2", -tickMajorSize);
          tickEnter.select("text").attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          tickUpdate.select("line.tick").attr("x2", 0).attr("y2", -tickMajorSize);
          tickUpdate.select("line.tickPointer").attr("x2", 0).attr("y2", -tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", -tickMinorSize);
          subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
          tickEnter.select("line.tick").attr("x2", -tickMajorSize);
          tickEnter.select("line.tickPointer").attr("x1", -tickMajorSize).attr("x2", -tickMajorSize);
          tickEnter.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
          tickUpdate.select("line.tick").attr("x2", -tickMajorSize).attr("y2", 0);
          tickUpdate.select("line.tickPointer").attr("x2", -tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", tickMinorSize);
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          tickEnter.select("line.tick").attr("x2", tickMajorSize);
          tickEnter.select("line.tickPointer").attr("x1", tickMajorSize).attr("x2", tickMajorSize);
          tickEnter.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding);
          tickUpdate.select("line.tick").attr("x2", tickMajorSize).attr("y2", 0);
          tickUpdate.select("line.tickPointer").attr("x2", tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      // For quantitative scales:
      // - enter new ticks from the old scale
      // - exit old ticks to the new scale
      if (scale.ticks) {
        tickEnter.call(tickTransform, scale0, arrange);
        tickUpdate.call(tickTransform, scale1, arrange);
        tickExit.call(tickTransform, scale1, arrange);
        subtickEnter.call(tickTransform, scale0, arrange);
        subtickUpdate.call(tickTransform, scale1, arrange);
        subtickExit.call(tickTransform, scale1, arrange);
      }

      // For ordinal scales:
      // - any entering ticks are undefined in the old scale
      // - any exiting ticks are undefined in the new scale
      // Therefore, we only need to transition updating ticks.
      else {
        var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
        tickEnter.call(tickTransform, x, arrange);
        tickUpdate.call(tickTransform, x, arrange);
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

  axis.arrange = function(b) {
    if (!arguments.length) return arrange;
    arrange = b;
    return axis;
  };

  return axis;
};

function adjustPositions(poss, dimens, space) {
  var done = false;
  while(!done) {
    done = true;
    for(var i = 0; i < poss.length-1; i++) {
      var overlap = poss[i+1] - poss[i] - (dimens[i]/2 + dimens[i+1]/2) - space;
      if(overlap < -1e-10) {
        poss[i] += overlap/2;
        poss[i+1] -= overlap/2;
        done = false;
      }
    }
  }
}

function d3_svg_axisX(selection, x, arrange) {
  if(arrange) {
    var xs = [], widths = [];
    selection.each(function(d, i) { xs.push(x(d)); });
    selection.selectAll("text").each(function(d, i) {
      if(typeof this.getBBox === 'function') {
        widths.push(this.getBBox().width);
      } else {
        console.error("Cannot determine bounding box to arrange axis.");
        return;
      }
    });
    adjustPositions(xs, widths, 3);
    selection.each(function(d, i) {
      var diff = xs[i++] - x(d);
      d3.select(this).select("text").attr("x", diff);
      d3.select(this).select("line.tickPointer").attr("x2", diff);
    });
  }
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y, arrange) {
  if(arrange) {
    var ys = [], heights = [];
    selection.each(function(d, i) { ys.push(y(d)); });
    selection.selectAll("text").each(function(d, i) {
      if(typeof this.getBBox === 'function') {
        heights.push(this.getBBox().height);
      } else {
        console.error("Cannot determine bounding box to arrange axis.");
        return;
      }
    });
    adjustPositions(ys, heights, 0);
    selection.each(function(d, i) {
      var diff = ys[i++] - y(d);
      d3.select(this).select("text").attr("y", diff);
      d3.select(this).select("line.tickPointer").attr("y2", diff);
    });
  }
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

(function(){d3.chart = {};
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
// Inspired by http://informationandvisualization.de/blog/box-plot
d3.chart.box = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = d3_chart_boxWhiskers,
      quartiles = d3_chart_boxQuartiles,
      tickFormat = null;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var g = d3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = d.quartiles = quartiles(d);

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
          : d3.range(n);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("svg:line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();

      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData]);

      box.enter().append("svg:rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[2]); })
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("svg:line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("svg:line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();

      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      outlier.enter().insert("svg:circle", "text")
          .attr("class", "outlier")
          .attr("r", 5)
          .attr("cx", width / 2)
          .attr("cy", function(i) { return x0(d[i]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.exit().transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData);

      boxTick.enter().append("svg:text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
          .attr("x", function(d, i) { return i & 1 ? width : 0 })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("svg:text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", width)
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return box;
  };

  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

function d3_chart_boxWhiskers(d) {
  return [0, d.length - 1];
}

function d3_chart_boxQuartiles(d) {
  var n = d.length;
  return [.25, .5, .75].map(function(q) {
    q *= n;
    return ~~q === q ? (d[q] + d[q + 1]) / 2 : d[Math.round(q)];
  });
}
// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
d3.chart.bullet = function() {
  var orient = "left", // TODO top & bottom
      reverse = false,
      duration = 0,
      ranges = d3_chart_bulletRanges,
      markers = d3_chart_bulletMarkers,
      measures = d3_chart_bulletMeasures,
      width = 380,
      height = 30,
      tickFormat = null;

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          g = d3.select(this);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
          .range(reverse ? [width, 0] : [0, width]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ && this.__chart__.x || x1;

      // Stash the new scale.
      this.__chart__ = {x: x1};

      // Derive width-scales from the x-scales.
      var w0 = d3_chart_bulletWidth(x0),
          w1 = d3_chart_bulletWidth(x1);

      // Update the range rects.
      var range = g.selectAll("rect.range")
          .data(rangez);

      range.enter().append("svg:rect")
          .attr("class", function(d, i) { return "range s" + i; })
          .attr("width", w0)
          .attr("height", height)
          .attr("x", reverse ? x0 : 0)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      range.transition()
          .duration(duration)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", height);

      // Update the axis.
      var ga = g.selectAll(".axis").data([,]);
      ga.enter().append("svg:g").attr("class", "axis");
      ga.attr("transform", "translate(0," + height + ")").call(axis.scales([x0, x1]));

      // Update the measure rects.
      var measure = g.selectAll("rect.measure")
          .data(measurez);

      measure.enter().append("svg:rect")
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("width", w0)
          .attr("height", height / 3)
          .attr("x", reverse ? x0 : 0)
          .attr("y", height / 3)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      measure.transition()
          .duration(duration)
          .attr("width", w1)
          .attr("height", height / 3)
          .attr("x", reverse ? x1 : 0)
          .attr("y", height / 3);

      // Update the marker lines.
      var marker = g.selectAll("line.marker")
          .data(markerz);

      marker.enter().append("svg:line")
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", height / 6)
          .attr("y2", height * 5 / 6)
        .transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1);

      marker.transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", height / 6)
          .attr("y2", height * 5 / 6);
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == "right" || orient == "bottom";
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    axis.tickFormat(tickFormat = x);
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    axis.duration(duration = x);
    return bullet;
  };

  var axis = bullet.axis = d3.chart.axis()
      .orient("bottom")
      .mode("open")
      .tickCount(8);

  return bullet;
};

function d3_chart_bulletRanges(d) {
  return d.ranges;
}

function d3_chart_bulletMarkers(d) {
  return d.markers;
}

function d3_chart_bulletMeasures(d) {
  return d.measures;
}

function d3_chart_bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function d3_chart_bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}
// Implements a horizon layout, which is a variation of a single-series
// area chart where the area is folded into multiple bands. Color is used to
// encode band, allowing the size of the chart to be reduced significantly
// without impeding readability. This layout algorithm is based on the work of
// J. Heer, N. Kong and M. Agrawala in "Sizing the Horizon: The Effects of Chart
// Size and Layering on the Graphical Perception of Time Series Visualizations",
// CHI 2009. http://hci.stanford.edu/publications/2009/heer-horizon-chi09.pdf
d3.chart.horizon = function() {
  var bands = 1, // between 1 and 5, typically
      mode = "offset", // or mirror
      interpolate = "linear", // or basis, monotone, step-before, etc.
      x = d3_chart_horizonX,
      y = d3_chart_horizonY,
      w = 960,
      h = 40,
      duration = 0;

  var color = d3.scale.linear()
      .domain([-1, 0, 1])
      .range(["#d62728", "#fff", "#1f77b4"]);

  // For each small multiple…
  function horizon(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          n = 2 * bands + 1,
          xMin = Infinity,
          xMax = -Infinity,
          yMax = -Infinity,
          x0, // old x-scale
          y0, // old y-scale
          id; // unique id for paths

      // Compute x- and y-values along with extents.
      var data = d.map(function(d, i) {
        var xv = x.call(this, d, i),
            yv = y.call(this, d, i);
        if (xv < xMin) xMin = xv;
        if (xv > xMax) xMax = xv;
        if (-yv > yMax) yMax = -yv;
        if (yv > yMax) yMax = yv;
        return [xv, yv];
      });

      // Compute the new x- and y-scales.
      var x1 = d3.scale.linear().domain([xMin, xMax]).range([0, w]),
          y1 = d3.scale.linear().domain([0, yMax]).range([0, h * bands]);

      // Retrieve the old scales, if this is an update.
      if (this.__chart__) {
        x0 = this.__chart__.x;
        y0 = this.__chart__.y;
        id = this.__chart__.id;
      } else {
        x0 = d3.scale.linear().domain([0, Infinity]).range(x1.range());
        y0 = d3.scale.linear().domain([0, Infinity]).range(y1.range());
        id = ++d3_chart_horizonId;
      }

      // We'll use a defs to store the area path and the clip path.
      var defs = g.selectAll("defs")
          .data([data]);

      var defsEnter = defs.enter().append("svg:defs");

      // The clip path is a simple rect.
      defsEnter.append("svg:clipPath")
          .attr("id", "d3_chart_horizon_clip" + id)
        .append("svg:rect")
          .attr("width", w)
          .attr("height", h);

      defs.select("rect").transition()
          .duration(duration)
          .attr("width", w)
          .attr("height", h);

      // The area path is rendered with our resuable d3.svg.area.
      defsEnter.append("svg:path")
          .attr("id", "d3_chart_horizon_path" + id)
          .attr("d", d3_chart_horizonArea
          .interpolate(interpolate)
          .x(function(d) { return x0(d[0]); })
          .y0(h * bands)
          .y1(function(d) { return h * bands - y0(d[1]); }))
        .transition()
          .duration(duration)
          .attr("d", d3_chart_horizonArea
          .x(function(d) { return x1(d[0]); })
          .y1(function(d) { return h * bands - y1(d[1]); }));

      defs.select("path").transition()
          .duration(duration)
          .attr("d", d3_chart_horizonArea);

      // We'll use a container to clip all horizon layers at once.
      g.selectAll("g")
          .data([null])
        .enter().append("svg:g")
          .attr("clip-path", "url(#d3_chart_horizon_clip" + id + ")");

      // Define the transform function based on the mode.
      var transform = mode == "offset"
          ? function(d) { return "translate(0," + (d + (d < 0) - bands) * h + ")"; }
          : function(d) { return (d < 0 ? "scale(1,-1)" : "") + "translate(0," + (d - bands) * h + ")"; };

      // Instantiate each copy of the path with different transforms.
      var u = g.select("g").selectAll("use")
          .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

      // TODO don't fudge the enter transition
      u.enter().append("svg:use")
          .attr("xlink:href", "#d3_chart_horizon_path" + id)
          .attr("transform", function(d) { return transform(d + (d > 0 ? 1 : -1)); })
          .style("fill", color)
        .transition()
          .duration(duration)
          .attr("transform", transform);

      u.transition()
          .duration(duration)
          .attr("transform", transform)
          .style("fill", color);

      u.exit().transition()
          .duration(duration)
          .attr("transform", transform)
          .remove();

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1, id: id};
    });
    d3.timer.flush();
  }

  horizon.duration = function(x) {
    if (!arguments.length) return duration;
    duration = +x;
    return horizon;
  };

  horizon.bands = function(x) {
    if (!arguments.length) return bands;
    bands = +x;
    color.domain([-bands, 0, bands]);
    return horizon;
  };

  horizon.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return horizon;
  };

  horizon.colors = function(x) {
    if (!arguments.length) return color.range();
    color.range(x);
    return horizon;
  };

  horizon.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x + "";
    return horizon;
  };

  horizon.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return horizon;
  };

  horizon.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return horizon;
  };

  horizon.width = function(x) {
    if (!arguments.length) return width;
    w = +x;
    return horizon;
  };

  horizon.height = function(x) {
    if (!arguments.length) return height;
    h = +x;
    return horizon;
  };

  return horizon;
};

var d3_chart_horizonArea = d3.svg.area(),
    d3_chart_horizonId = 0;

function d3_chart_horizonX(d) {
  return d[0];
}

function d3_chart_horizonY(d) {
  return d[1];
}
// Based on http://vis.stanford.edu/protovis/ex/qqplot.html
d3.chart.qq = function() {
  var n = 100,
      x = d3_chart_scatterX,
      y = d3_chart_scatterY,
      scatter = d3.chart.scatter()
        .x(function(d, i) {
          return d3_chart_qqQuantiles(n, x.call(this, d, i));
        })
        .y(function(d, i) {
          return d3_chart_qqQuantiles(n, y.call(this, d, i));
        }),
      domain = null,
      xAxis = d3.chart.axis().orient("bottom").tickCount(3),
      yAxis = d3.chart.axis().orient("left").tickCount(3);

  // For each small multiple…
  function qq(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          duration = scatter.duration();

      g.call(scatter);

      g.selectAll("g.datum").each(function(d, i) {
        var g = d3.select(this);
        if (g.select("circle").empty())
          g.append("svg:circle")
              .attr("r", 4.5);
      });

      var xRange = this.__chart__.x.range(),
          yRange = this.__chart__.y.range();

      // Update diagonal line.
      var diagonal = g.selectAll("line.diagonal")
          .data([null]);

      diagonal.enter().insert("svg:line", "g")
          .attr("class", "diagonal")
          .attr("x1", xRange[0])
          .attr("y1", yRange[0])
          .attr("x2", xRange[1])
          .attr("y2", yRange[1]);

      diagonal.transition()
          .duration(duration)
          .attr("x1", xRange[0])
          .attr("y1", yRange[0])
          .attr("x2", xRange[1])
          .attr("y2", yRange[1]);
    });
  }

  qq.width = d3.rebind(qq, scatter.width);
  qq.height = d3.rebind(qq, scatter.height);
  qq.duration = d3.rebind(qq, scatter.duration);
  qq.tickFormat = d3.rebind(qq, scatter.tickFormat);
  qq.domain = d3.rebind(qq, scatter.domain);

  qq.count = function(z) {
    if (!arguments.length) return n;
    n = z;
    return qq;
  };

  qq.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return qq;
  };

  qq.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return qq;
  };

  return qq;
};

function d3_chart_qqQuantiles(n, values) {
  var m = values.length - 1;
  values = values.slice().sort(d3.ascending);
  return d3.range(n).map(function(i) {
    return values[~~(i * m / n)];
  });
}
d3.chart.radar = function() {
  var radius = 1,
      duration = 0,
      domain = null,
      dimensions = d3_chart_radarDimensions,
      tickFormat = null, // TODO add ticks
      rAxis = d3.chart.axis().orient("bottom").tickCount(5);

  // For each small multiple…
  function radar(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          dims = dimensions.call(this, d, i),
          r1 = d3.scale.linear().domain(domain.call(this, d, i)).range([0, radius]), // TODO allow null
          r0 = this.__chart__ && this.__chart__.r || r1,
          a1 = d3.scale.linear().domain([0, dims.length]).range([0, 360]);
          a0 = this.__chart__ && this.__chart__.a || a1;

      // Stash the new scales.
      this.__chart__ = {r: r1, a: a1};

      // Use <g> to ensure axes appear below lines and markers.
      var axis = g.selectAll("g.axes")
          .data(dims, String);

      var axisEnter = axis.enter().append("svg:g")
          .attr("class", "axes")
          .attr("transform", t0);

      axisEnter.append("svg:line")
          .attr("x2", r0.range()[1]);

      axisEnter.append("svg:text")
          .attr("text-anchor", "start")
          .attr("dy", ".35em")
          .attr("x", r0.range()[1] + 3)
          .text(String);

      axis
          .call(rAxis.scales([r0, r1]))
          .filter(function(d, i) { return i; })
        .selectAll(".tick text")
          .style("display", "none");

      axis.selectAll(".tick")
          .filter(function(d, i) { return !i; })
          .style("display", "none");

      axis.each(function(dim) {
        var point = d3.select(this).selectAll("circle")
            .data(d); // TODO customizable join?

        point.enter().append("svg:circle")
            .attr("cx", function(d, i) { return r0(d[dim]); })
            .attr("r", 4.5);

        point.transition()
            .duration(duration)
            .attr("cx", function(d) { return r1(d[dim]); });
      });

      var axisUpdate = axis.transition()
          .duration(duration)
          .attr("transform", t1);

      axisUpdate.select("line")
          .attr("x2", r1.range()[1]);

      axisUpdate.select("text")
          .attr("x", r1.range()[1] + 3);

      var axisExit = axis.exit().transition()
          .duration(duration)
          .attr("transform", t1)
          .remove();

      axisExit.select("line")
          .attr("x2", r1.range()[1]);

      axisExit.select("text")
          .attr("x", r1.range()[1] + 3);

      function t0(d, i) { return "rotate(" + a0(i) + ")"; }
      function t1(d, i) { return "rotate(" + a1(i) + ")"; }

//       function x(r, a) {
//         return function(d, i) {
//           return r(d) * Math.cos(Math.PI * a(i) / 180);
//         };
//       }
//
//       function y(r, a) {
//         return function(d, i) {
//           return r(d) * Math.sin(Math.PI * a(i) / 180);
//         };
//       }

//       var x0 = x(r0, a0),
//           y0 = y(r0, a0),
//           x1 = x(r1, a1),
//           y1 = y(r1, a1),
//           line0 = closed(d3.svg.line().x(x0).y(y0)),
//           line1 = closed(d3.svg.line().x(x1).y(y1));

//       function closed(f) {
//         return function(d, i) {
//           return f(d.map(function(d) { return d.value }), i) + "z";
//         };
//       }

//       var ob = g.selectAll("g.observation")
//           .data(data);
//
//       var obEnter = ob.enter().append("svg:g")
//           .attr("class", function(d, i) { return "observation ob" + i; });
//
//       obEnter.append("svg:path")
//           .attr("d", line0)
//         .transition()
//           .duration(duration)
//           .attr("d", line1);
//
//       var marker = g.selectAll("g.observation").selectAll("circle")
//           .data(Object, function(d) { return d.key; });
//
//       marker.enter().append("svg:circle")
//           .attr("r", 5.5)
//           .attr("transform", function(d, i) { return rotate0(d, i) + "translate(" + r0(d.value) + ")"; })
//         .transition()
//           .duration(duration)
//           .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + r1(d.value) + ")"; });
//
//       marker.transition()
//           .duration(duration)
//           .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + r1(d.value) + ")"; });
//
//       marker.exit().remove();
//
//       ob.select("path")
//           .attr("d", line0)
//         .transition()
//           .duration(duration)
//           .attr("d", line1);
//
//       ob.exit().remove();
    });
  }

  radar.radius = function(x) {
    if (!arguments.length) return radius;
    radius = x;
    return radar;
  };

  radar.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    rAxis.tickFormat(tickFormat = x);
    return radar;
  };

  radar.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return radar;
  };

  radar.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return radar;
  };

  radar.dimensions = function(x) {
    if (!arguments.length) return dimensions;
    dimensions = x == null ? x : d3.functor(x);
    return radar;
  };

  return radar;
};

function d3_chart_radarDimensions(d) {
  return d3.keys(d[0]);
}
d3.chart.scatter = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      tickFormat = null,
      x = d3_chart_scatterX,
      y = d3_chart_scatterY,
      xAxis = d3.chart.axis().orient("bottom").tickCount(3),
      yAxis = d3.chart.axis().orient("left").tickCount(3);

  function scatter(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          xMin = Infinity, xMin = Infinity,
          xMax = -Infinity, xMax = -Infinity,
          dx = x.call(this, d, i),
          dy = y.call(this, d, i),
          xd = domain && domain.call(this, d, i) || [d3.min(dx), d3.max(dx)], // new x-domain
          yd = domain && domain.call(this, d, i) || [d3.min(dy), d3.max(dy)], // new y-domain
          x1 = d3.scale.linear().domain(xd).range([0, width]), // new x-scale
          y1 = d3.scale.linear().domain(yd).range([height, 0]), // new y-scale
          x0 = this.__chart__ && this.__chart__.x || x1, // old x-scale
          y0 = this.__chart__ && this.__chart__.y || y1; // old y-scale

      // x-axis
      var gx = g.selectAll(".x.axis").data([,]);
      gx.enter().append("svg:g").attr("class", "x axis");
      gx.attr("transform", "translate(0," + height + ")").call(xAxis.scales([x0, x1]));

      // y-axis
      var gy = g.selectAll(".y.axis").data([,]);
      gy.enter().append("svg:g").attr("class", "y axis")
      gy.call(yAxis.scales([y0, y1]));

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1};

      // Update scatter plots.
      var datum = g.selectAll("g.datum")
          .data(dx);

      var t = function(d, i) { return "translate(" + x1(d) + "," + y1(dy[i]) + ")"; };

      datum.enter().append("svg:g")
          .attr("class", "datum")
          .attr("transform", function(d, i) { return "translate(" + x0(d) + "," + y0(dy[i]) + ")"; })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .delay(function(d) { return x0(d) * 5; })
          .attr("transform", t)
          .style("opacity", 1);

      datum.transition()
          .duration(duration)
          .delay(function(d) { return x1(d) * 5; })
          .attr("transform", t)
          .style("opacity", 1);

      datum.exit().transition()
          .duration(duration)
          .delay(function(d) { return x1(d) * 5; })
          .attr("transform", t)
          .style("opacity", 1e-6)
          .remove();

      d3.timer.flush();
    });
  }

  scatter.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return scatter;
  };

  scatter.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return scatter;
  };

  scatter.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return scatter;
  };

  scatter.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return scatter;
  };

  scatter.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return scatter;
  };

  scatter.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return scatter;
  };

  scatter.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    xAxis.tickFormat(tickFormat);
    yAxis.tickFormat(tickFormat);
    return scatter;
  };

  return scatter;
};

function d3_chart_scatterX(d) {
  return d.x;
}

function d3_chart_scatterY(d) {
  return d.y;
}
})()
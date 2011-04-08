// ranges (bad, satisfactory, good)
// measures (actual, forecast)
// markers (previous, goal)

/*
 * Chart design based on the recommendations of Stephen Few. Implementation
 * based on the work of Clint Ivy, Jamie Love, and Jason Davies.
 * http://projects.instantcognition.com/protovis/bulletchart/
 */

d3.chart.bullet = function() {
  var orient = "left", // TODO top & bottom
      duration = 0,
      ranges = d3_chart_bulletRanges,
      markers = d3_chart_bulletMarkers,
      measures = d3_chart_bulletMeasures,
      width = 380,
      height = 30,
      x0,
      tickFormat = null;

  function bullet(g) {
    var max = 0,
        reverse = orient == "right" || orient == "bottom";

    // Convert the data to a standardized representation, and also compute the
    // maximum value, needed to standardize the x-scale across multiples.
    g.map(function(d, i) {
      var r = ranges.call(this, d, i).slice().sort(d3.descending),
          m = markers.call(this, d, i).slice().sort(d3.descending),
          z = measures.call(this, d, i).slice().sort(d3.descending);
      max = Math.max(max, r[0], m[0], z[0]);
      return {
        ranges: r,
        markers: m,
        measures: z,
        data: d
      };
    });

    // Update the x-scales.
    var x1 = d3.scale.linear()
        .domain([0, max])
        .range(reverse ? [width, 0] : [0, width]);

    // Initialize the old scale, if this is the first render.
    if (!x0) x0 = d3.scale.linear()
        .domain([0, Infinity])
        .range(x1.range());

    // Derive width-scales from the x-scales.
    var w0 = d3_chart_bulletWidth(x0),
        w1 = d3_chart_bulletWidth(x1);

    // Update the range rects.
    var range = g.selectAll("rect.range")
        .data(d3_chart_bulletRanges);

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

    // Update the measure rects.
    var measure = g.selectAll("rect.measure")
        .data(d3_chart_bulletMeasures);

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
        .data(d3_chart_bulletMarkers);

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

    // Compute the tick format.
    var format = tickFormat || x1.tickFormat(8);

    // Update the tick groups.
    var tick = g.selectAll("g.tick")
        .data(x1.ticks(8), format);

    // Initialize the ticks with the old scale, x0.
    var tickEnter = tick.enter().append("svg:g")
        .attr("class", "tick")
        .attr("transform", d3_chart_bulletTranslate(x0))
        .attr("opacity", 1e-6);

    tickEnter.append("svg:line")
        .attr("y1", height)
        .attr("y2", height * 7 / 6);

    tickEnter.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("y", height * 7 / 6)
        .text(format);

    // Transition the entering ticks to the new scale, x1.
    tickEnter.transition()
        .duration(duration)
        .attr("transform", d3_chart_bulletTranslate(x1))
        .attr("opacity", 1);

    // Transition the updating ticks to the new scale, x1.
    var tickUpdate = tick.transition()
        .duration(duration)
        .attr("transform", d3_chart_bulletTranslate(x1))
        .attr("opacity", 1);

    tickUpdate.select("line")
        .attr("y1", height)
        .attr("y2", height * 7 / 6);

    tickUpdate.select("text")
        .attr("y", height * 7 / 6);

    // Transition the exiting ticks to the new scale, x1.
    tick.exit().transition()
        .duration(duration)
        .attr("transform", d3_chart_bulletTranslate(x1))
        .attr("opacity", 1e-6)
        .remove();

    // Lastly, restore the original data and update the previous scale!
    g.map(d3_chart_bulletData);
    x0 = x1;
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return bullet;
  };

  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

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
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

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

function d3_chart_bulletData(d) {
  return d.data;
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

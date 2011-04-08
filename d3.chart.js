(function(){d3.chart = {};
// ranges (bad, satisfactory, good)
// measures (actual, forecast)
// markers (previous, goal)

/*
 * Chart design based on the recommendations of Stephen Few. Implementation
 * based on the work of Clint Ivy, Jamie Love, and Jason Davies.
 * http://projects.instantcognition.com/protovis/bulletchart/
 */

d3.chart.bullet = function() {
  var orient = "left",
      duration = 0,
      title = d3_chart_bulletTitle,
      subtitle = d3_chart_bulletSubtitle,
      ranges = d3_chart_bulletRanges,
      markers = d3_chart_bulletMarkers,
      measures = d3_chart_bulletMeasures,
      width = 380,
      height = 30,
      x0 = null,
      x1 = d3.scale.linear(),
      tickFormat = d3.format(",.0f");

  function bullet(g) {
    var max = 0;

    // Convert the data to a standardized representation, and also compute the
    // maximum value, needed to standardize the x-scale across multiples.
    g.map(function(d, i) {
      var r = ranges.call(this, d, i).slice().sort(d3.descending),
          m = markers.call(this, d, i).slice().sort(d3.descending),
          z = measures.call(this, d, i).slice().sort(d3.descending);
      max = Math.max(max, r[0], m[0], z[0]);
      return {
        title: [title.call(this, d, i)],
        subtitle: [subtitle.call(this, d, i)],
        ranges: r,
        markers: m,
        measures: z,
        data: d
      };
    });

    var reversed = orient === "right" || orient === "bottom";

    // Update the x-scales.
    var xRange = reversed ? [width, 0] : [0, width];
    x1.domain([0, max]).range(xRange);
    if (x0 === null)
      x0 = d3.scale.linear().domain([0, Infinity]).range(xRange);

    // Update the title.
    var titleText = g.select("text.title");

    if (titleText.empty())
      titleText = g.append("svg:text")
          .attr("class", "title")
          .attr("dy", "1em")
          .style("font-weight", "bold");
    titleText
        .text(d3_chart_bulletTitle);

    // Update the subtitle.
    var subtitleText = g.select("text.subtitle");
    if (subtitleText.empty())
      subtitleText = g.append("svg:text")
          .attr("class", "subtitle")
          .attr("dy", "2.5em")
          .style("font-size", ".7em")
          .style("fill", "#999");
    subtitleText
        .text(d3_chart_bulletSubtitle);

    // Update the chart.
    var chart = g.select("g.chart");
    if (chart.empty())
      chart = g.append("svg:g")
          .attr("class", "chart")
          .attr("transform", "translate(120)");

    // Update the range rects.
    var range = chart.selectAll("rect.range")
        .data(d3_chart_bulletRanges);

    range.enter().append("svg:rect")
        .attr("class", function(d, i) { return "range s" + i; })
        .attr("width", function(d) { return Math.abs(x0(d) - x0(0)); })
        .attr("height", height)
        .attr("x", reversed ? x0 : 0)
      .transition()
        .duration(duration)
        .attr("width", function(d) { return Math.abs(x1(d) - x1(0)); })
        .attr("x", reversed ? x1 : 0);

    range.transition()
        .duration(duration)
        .attr("x", reversed ? x1 : 0)
        .attr("width", function(d) { return Math.abs(x1(d) - x1(0)); })
        .attr("height", height);

    // Update the measure rects.
    var measure = chart.selectAll("rect.measure")
        .data(d3_chart_bulletMeasures);

    measure.enter().append("svg:rect")
        .attr("class", function(d, i) { return "measure s" + i; })
        .attr("width", function(d) { return Math.abs(x0(d) - x0(0)); })
        .attr("height", height / 3)
        .attr("x", reversed ? x0 : 0)
        .attr("y", height / 3)
      .transition()
        .duration(duration)
        .attr("width", function(d) { return Math.abs(x1(d) - x1(0)); })
        .attr("x", reversed ? x1 : 0);

    measure.transition()
        .duration(duration)
        .attr("width", function(d) { return Math.abs(x1(d) - x1(0)); })
        .attr("height", height / 3)
        .attr("x", reversed ? x1 : 0)
        .attr("y", height / 3);

    // Update the marker lines.
    var marker = chart.selectAll("line.marker")
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

    // Update the tick groups.
    var tick = chart.selectAll("g.tick")
        .data(x1.ticks(8), tickFormat);

    var translate = function(f) {
      return function(d) {
        return "translate(" + f(d) + ",0)";
      };
    };

    // Initialize the ticks with the old scale, x0.
    var tickEnter = tick.enter().append("svg:g")
        .attr("class", "tick")
        .attr("transform", translate(x0))
        .attr("opacity", 1e-6);

    tickEnter.append("svg:line")
        .attr("y1", height)
        .attr("y2", height * 7 / 6);

    tickEnter.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("y", height * 7 / 6)
        .text(tickFormat);

    // Transition the entering ticks to the new scale, x1.
    tickEnter.transition()
        .duration(duration)
        .attr("transform", translate(x1))
        .attr("opacity", 1);

    // Transition the updating ticks to the new scale, x1.
    var tickUpdate = tick.transition()
        .duration(duration)
        .attr("transform", translate(x1))
        .attr("opacity", 1);

    tickUpdate.select("line")
        .attr("y1", height)
        .attr("y2", height * 7 / 6);

    tickUpdate.select("text")
        .attr("y", height * 7 / 6);

    // Transition the exiting ticks to the new scale, x1.
    tick.exit().transition()
        .duration(duration)
        .attr("transform", translate(x1))
        .attr("opacity", 1e-6)
        .remove();

    // Lastly, restore the original data and update the previous scale!
    g.map(d3_chart_bulletData);
    x0.domain([0, max]).range(xRange);
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
    x0.range([0, width = x]);
    x1.range([0, width]);
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

function d3_chart_bulletTitle(d) {
  return d.title;
}

function d3_chart_bulletSubtitle(d) {
  return d.subtitle;
}

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
})()
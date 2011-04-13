// Inspired by http://informationandvisualization.de/blog/box-plot
d3.chart.boxplot = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      sort = d3_chart_boxplotSort,
      tickFormat = null;

  // For each small multiple…
  function boxplot(g) {
    g.each(function(d, i) {
      d = d.slice();
      d.sort(sort);
      var len = d.length,
          min = d[0],
          q1 = d[Math.floor(.25 * len)],
          median = d[Math.floor(.5 * len)],
          q3 = d[Math.floor(.75 * len)],
          max = d[len-1],
          g = d3.select(this);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain ? domain.call(this, d, i) : [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Update center line.
      var center = g.selectAll("line.center")
          .data([[min, max]]);

      center.enter().append("svg:line")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
        .transition()
          .duration(duration)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().remove();

      // Update boxes.
      var box = g.selectAll("rect.box")
          .data([[q1, q3]]);

      box.enter().append("svg:rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[1]); })
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[1]); })
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[1]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[1]); });

      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[1]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[1]); });

      box.exit().remove();

      // Update markers.
      var marker = g.selectAll("line.marker")
          .data([min, median, max]);

      marker.enter().append("svg:line")
          .attr("class", "marker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      marker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      marker.exit().remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update ticks.
      var tick = g.selectAll("text")
          .data([min, q1, median, q3, max]);

      tick.enter().append("svg:text")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i&1 ? 8 : -8 })
          .attr("x", function(d, i) { return i&1 ? width : 0 })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i&1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      tick.text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);
    });
  }

  boxplot.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return boxplot;
  };

  boxplot.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return boxplot;
  };

  boxplot.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return boxplot;
  };

  boxplot.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return boxplot;
  };

  boxplot.domain = function(x) {
    if (!arguments.length) return domain;
    domain = d3.functor(x);
    return boxplot;
  };

  boxplot.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return boxplot;
  };

  return boxplot;
};

function d3_chart_boxplotSort(a, b) {
  return a - b;
}

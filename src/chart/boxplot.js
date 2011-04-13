// Inspired by http://informationandvisualization.de/blog/box-plot
d3.chart.boxplot = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = d3_chart_boxplotWhiskers,
      outlierSymbol = d3.svg.symbol(),
      tickFormat = null;

  // For each small multiple…
  function boxplot(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var len = d.length,
          min = d[0],
          max = d[len-1],
          whiskerIndices = whiskers.call(this, d, i),
          whiskerData = whiskerIndices.map(function(i) { return d[i]; }),
          firstWhisker = whiskerIndices[0],
          lastWhisker = whiskerIndices[whiskerIndices.length - 1],
          whiskerRange = lastWhisker - firstWhisker,
          q1 = d[firstWhisker + Math.floor(.25 * whiskerRange)],
          median = d[firstWhisker + Math.floor(.5 * whiskerRange)],
          q3 = d[firstWhisker + Math.floor(.75 * whiskerRange)],
          outliers = d.slice(0, firstWhisker).concat(d.slice(lastWhisker + 1, len)),
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

      // Update median line
      var medianLine = g.selectAll("line.median")
          .data([median]);

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

      medianLine.exit().remove();

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData);

      whisker.enter().append("svg:line")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      whisker.exit().remove();

      // Update outliers.
      var outlier = g.selectAll("path.outlier")
          .data(outliers);

      outlier.enter().append("svg:path")
          .attr("class", "outlier")
          .attr("d", outlierSymbol)
          .attr("transform", function(d) { return "translate(" + width / 2 + "," + x0(d) + ")"; })
        .transition()
          .duration(duration)
          .attr("d", outlierSymbol)
          .attr("transform", function(d) { return "translate(" + width / 2 + "," + x1(d) + ")"; });

      outlier.transition()
          .duration(duration)
          .attr("d", outlierSymbol)
          .attr("transform", function(d) { return "translate(" + width / 2 + "," + x1(d) + ")"; });

      outlier.exit().remove();

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

  boxplot.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return boxplot;
  };

  boxplot.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return boxplot;
  };

  boxplot.outlierSymbol = function(x) {
    if (!arguments.length) return outlierSymbol;
    outlierSymbol = x;
    return boxplot;
  };

  return boxplot;
};

function d3_chart_boxplotWhiskers(d) {
  return [0, d.length-1];
}

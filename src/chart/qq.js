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

      var xRange = this.__chart__.x.range(),
          yRange = this.__chart__.y.range();

      // Update diagonal line.
      var diagonal = g.selectAll("line.diagonal")
          .data([null]);

      diagonal.enter().insert("svg:line", "circle")
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

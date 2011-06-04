// Based on http://vis.stanford.edu/protovis/ex/qqplot.html
d3.chart.qq = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      tickFormat = null,
      n = 100,
      x = d3_chart_qqX,
      y = d3_chart_qqY,
      xAxis = d3.chart.axis().dimension("x").mode("line").size(height).tickCount(3),
      yAxis = d3.chart.axis().dimension("y").mode("line").size(width).tickCount(3);

  // For each small multiple…
  function qq(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          qx = d3_chart_qqQuantiles(n, x.call(this, d, i)),
          qy = d3_chart_qqQuantiles(n, y.call(this, d, i)),
          xd = domain && domain.call(this, d, i) || [d3.min(qx), d3.max(qx)], // new x-domain
          yd = domain && domain.call(this, d, i) || [d3.min(qy), d3.max(qy)], // new y-domain
          x1 = d3.scale.linear().domain(xd).range([0, width]), // new x-scale
          y1 = d3.scale.linear().domain(yd).range([height, 0]), // new y-scale
          x0 = this.__chart__ && this.__chart__.x || x1, // old x-scale
          y0 = this.__chart__ && this.__chart__.y || y1; // old y-scale

      g.call(xAxis.scale(x1));
      g.call(yAxis.scale(y1));

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1};

      // Update diagonal line.
      var diagonal = g.selectAll("line.diagonal")
          .data([null]);

      diagonal.enter().append("svg:line")
          .attr("class", "diagonal")
          .attr("x1", x1(yd[0]))
          .attr("y1", y1(xd[0]))
          .attr("x2", x1(yd[1]))
          .attr("y2", y1(xd[1]));

      diagonal.transition()
          .duration(duration)
          .attr("x1", x1(yd[0]))
          .attr("y1", y1(xd[0]))
          .attr("x2", x1(yd[1]))
          .attr("y2", y1(xd[1]));

      // Update quantile plots.
      var circle = g.selectAll("circle")
          .data(d3.range(n).map(function(i) {
            return {x: qx[i], y: qy[i]};
          }));

      circle.enter().append("svg:circle")
          .attr("class", "quantile")
          .attr("r", 4.5)
          .attr("cx", function(d) { return x0(d.x); })
          .attr("cy", function(d) { return y0(d.y); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cx", function(d) { return x1(d.x); })
          .attr("cy", function(d) { return y1(d.y); })
          .style("opacity", 1);

      circle.transition()
          .duration(duration)
          .attr("cx", function(d) { return x1(d.x); })
          .attr("cy", function(d) { return y1(d.y); })
          .style("opacity", 1);

      circle.exit().transition()
          .duration(duration)
          .attr("cx", function(d) { return x1(d.x); })
          .attr("cy", function(d) { return y1(d.y); })
          .style("opacity", 1e-6)
          .remove();
    });
  }

  qq.width = function(x) {
    if (!arguments.length) return width;
    yAxis.size(width = x);
    return qq;
  };

  qq.height = function(x) {
    if (!arguments.length) return height;
    xAxis.size(height = x);
    return qq;
  };

  qq.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return qq;
  };

  qq.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return qq;
  };

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

  qq.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    xAxis.tickFormat(tickFormat);
    yAxis.tickFormat(tickFormat);
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

function d3_chart_qqX(d) {
  return d.x;
}

function d3_chart_qqY(d) {
  return d.y;
}

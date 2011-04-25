// Based on http://vis.stanford.edu/protovis/ex/qqplot.html
d3.chart.qq = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      intervals = 100,
      tickFormat = null,
      distribution = d3_chart_qqUniform;
      values = d3_chart_qqValues;
      qi = d3_chart_qqQi;

  // For each small multiple…
  function qq(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          q1 = d3_chart_qqQuantile(intervals, distribution.call(this, d, i)),
          q2 = d3_chart_qqQuantile(intervals, values.call(this, d, i));

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [d3.min(q1), d3.max(q1)])
          .range([0, width]);
      var y1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [d3.min(q1), d3.max(q2)])
          .range([height, 0]);

      // Retrieve the old scales, if this is an update.
      var x0, y0;
      if (this.__chart__) {
        x0 = this.__chart__.x;
        y0 = this.__chart__.y;
      } else {
        x0 = d3.scale.linear()
            .domain([0, Infinity])
            .range(x1.range());
        y0 = d3.scale.linear()
            .domain([0, Infinity])
            .range(y1.range());
      }

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1};

      // Update diagonal line.
      var xd = x1.domain(), yd = y1.domain();
      var diagonal = g.selectAll("line.diagonal")
          .data([{x1: x1(yd[0]), y1: y1(xd[0]), x2: x1(yd[1]), y2: y1(xd[1])}]);

      diagonal.enter().append("svg:line")
          .attr("class", "diagonal")
          .attr("x1", function(d) { return d.x1; })
          .attr("y1", function(d) { return d.y1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y2", function(d) { return d.y2; })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1);

      diagonal.transition()
          .duration(duration)
          .attr("x1", function(d) { return d.x1; })
          .attr("y1", function(d) { return d.y1; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y2", function(d) { return d.y2; });

      // Update quantile plots.
      var datum = g.selectAll("circle")
          .data(d3.range(.01, 1, .01));

      datum.enter().append("svg:circle")
          .attr("cx", function(d) { return x0(qi(d, q1)); })
          .attr("cy", function(d) { return y0(qi(d, q2)); })
          .attr("r", 5)
        .transition()
          .duration(duration)
          .attr("cx", function(d) { return x1(qi(d, q1)); })
          .attr("cy", function(d) { return y1(qi(d, q2)); });

      datum.transition()
          .duration(duration)
          .attr("cx", function(d) { return x1(qi(d, q1)); })
          .attr("cy", function(d) { return y1(qi(d, q2)); });

      datum.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("cx", function(d) { return x1(qi(d, q1)); })
          .attr("cy", function(d) { return y1(qi(d, q2)); })
          .remove();

      // Update border box.
      var box = g.selectAll("rect")
          .data([[xd[1], yd[1]]]);

      box.enter().append("svg:rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", function(d) { return x0(d[0]); })
          .attr("height", function(d) { return x0(d[1]); })
        .transition()
          .duration(duration)
          .attr("width", function(d) { return x1(d[0]); })
          .attr("height", function(d) { return x1(d[1]); });

      box.transition()
          .duration(duration)
          .attr("width", function(d) { return x1(d[0]); })
          .attr("height", function(d) { return x1(d[1]); });

      var xformat = tickFormat || x1.tickFormat(4);

      // Update x-ticks.
      var xtick = g.selectAll("g.x.tick")
          .data(x1.ticks(4), function(d) {
            return this.textContent || xformat(d);
          });

      var xtickEnter = xtick.enter().append("svg:g")
          .attr("class", "x tick")
          .attr("transform", function(d) { return "translate(" + x0(d) + "," + height + ")"; })
          .attr("opacity", 1e-6);

      xtickEnter.append("svg:line")
          .attr("y1", 0)
          .attr("y2", -5);

      xtickEnter.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .text(xformat);

      // Transition the entering ticks to the new scale, x1.
      xtickEnter.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + x1(d) + "," + height + ")"; })
          .attr("opacity", 1);

      // Transition the updating ticks to the new scale, x1.
      var xtickUpdate = xtick.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + x1(d) + "," + height + ")"; })
          .attr("opacity", 1);

      // Transition the exiting ticks to the new scale, x1.
      xtick.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + x1(d) + "," + height + ")"; })
          .attr("opacity", 1e-6)
          .remove();

      var yformat = tickFormat || y1.tickFormat(4);

      // Update ticks.
      var ytick = g.selectAll("g.y.tick")
          .data(y1.ticks(4), function(d) {
            return this.textContent || yformat(d);
          });

      var ytickEnter = ytick.enter().append("svg:g")
          .attr("class", "y tick")
          .attr("transform", function(d) { return "translate(0," + y0(d) + ")"; })
          .attr("opacity", 1e-6);

      ytickEnter.append("svg:line")
          .attr("x1", 0)
          .attr("x2", 5);

      ytickEnter.append("svg:text")
          .attr("text-anchor", "end")
          .attr("dx", "-.5em")
          .attr("dy", ".3em")
          .text(yformat);

      // Transition the entering ticks to the new scale, y1.
      ytickEnter.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(0," + y1(d) + ")"; })
          .attr("opacity", 1);

      // Transition the updating ticks to the new scale, y1.
      var ytickUpdate = ytick.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(0," + y1(d) + ")"; })
          .attr("opacity", 1);

      // Transition the exiting ticks to the new scale, y1.
      ytick.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(0," + y1(d) + ")"; })
          .attr("opacity", 1e-6)
          .remove();
    });
  }

  qq.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return qq;
  };

  qq.height = function(x) {
    if (!arguments.length) return height;
    height = x;
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

  qq.intervals = function(x) {
    if (!arguments.length) return intervals;
    intervals = x;
    return qq;
  };

  qq.distribution = function(x) {
    if (!arguments.length) return distribution;
    distribution = x;
    return qq;
  };

  qq.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return qq;
  };

  qq.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return qq;
  };

  return qq;
};

// Compute quantiles of a distribution.
function d3_chart_qqQuantile(n, values) {
  values = values.slice().sort(function(a, b) { return a - b; });
  return d3.range(n).map(function(i) { return values[Math.floor(i * (values.length - 1) / n)]; });
}

// Lookup the value for an input quantile.
function d3_chart_qqQi(f, quantiles) {
  return quantiles[Math.round(f * (quantiles.length - 1))];
}

function d3_chart_qqUniform() {
  return d3.range(10000).map(Math.random);
}

function d3_chart_qqValues(d) {
  return d.values;
}

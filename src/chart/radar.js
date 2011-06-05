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

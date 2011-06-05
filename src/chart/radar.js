d3.chart.radar = function() {
  var radius = 1,
      duration = 0,
      domain = null,
      value = d3_chartRadarValue,
      variables = d3_chartRadarVariables,
      tickFormat = null, // TODO add ticks
      labelOffset = 14.5,
      rAxis = d3.chart.axis().dimension("x").tickCount(5);

  // For each small multiple…
  function radar(g) {
    g.each(function(d, i) {
      var g = d3.select(this),
          vars = variables.call(this, d, i),
          data = d.map(function(d) {
            return vars.map(function(v) { return value(d, v); });
          }),
          max = d3.max(data, function(d) { return d3.max(d); });

      // Compute the new r-scale.
      var r1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [0, max])
          .range([0, radius]);

      // Compute the new a-scale.
      var a1 = d3.scale.linear()
          .domain([0, vars.length])
          .range([0, 360]);

      // Retrieve the old scales, if this is an update.
      var r0, a0;
      if (this.__chart__) {
        r0 = this.__chart__.x;
        a0 = this.__chart__.a;
      } else {
        r0 = d3.scale.linear()
            .domain([0, Infinity])
            .range(r1.range());

        a0 = d3.scale.linear()
            .domain([0, Infinity])
            .range(a1.range());
      }

      g.call(rAxis.scale(r1));

      // Stash the new scales.
      this.__chart__ = {x: r1, a: a1};

      function x(r, a) {
        return function(d, i) {
          return r(d) * Math.cos(Math.PI * a(i) / 180);
        };
      }

      function y(r, a) {
        return function(d, i) {
          return r(d) * Math.sin(Math.PI * a(i) / 180);
        };
      }

      var x0 = x(r0, a0),
          y0 = y(r0, a0),
          x1 = x(r1, a1),
          y1 = y(r1, a1),
          line0 = closed(d3.svg.line().x(x0).y(y0)),
          line1 = closed(d3.svg.line().x(x1).y(y1));

      function closed(f) {
        return function(d, i) {
          return f(d, i) + "z";
        };
      }

      // Use <g> to ensure axes appear below lines and markers.
      var axes = g.select("g.axes");
      if (axes.empty()) axes = g.append("svg:g").attr("class", "axes");

      var rotate0 = function(d, i) { return "rotate(" + a0(i) + ")"; };
      var rotate1 = function(d, i) { return "rotate(" + a1(i) + ")"; };

      var axis = axes.selectAll("line")
          .data(vars, String);

      axis.enter().append("svg:line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", r0.range()[1])
          .attr("y2", 0)
          .attr("transform", rotate0)
        .transition()
          .duration(duration)
          .attr("transform", rotate1)
          .attr("x2", r1.range()[1]);

      axis.transition()
          .duration(duration)
          .attr("x2", r1.range()[1])
          .attr("transform", rotate1);

      axis.exit().remove();

      var label = axes.selectAll("g")
          .data(vars, String);

      var labelEnter = label.enter().append("svg:g")
          .attr("transform", function(d, i) { return rotate0(d, i) + "translate(" + (r0.range()[1] + labelOffset) + ")"; });

      labelEnter.transition()
          .duration(duration)
          .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + (r1.range()[1] + labelOffset) + ")"; });

      labelEnter.append("svg:text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .attr("transform", function(d, i) { return rotate0(d, -i); })
        .transition()
          .duration(duration)
          .text(String)
          .attr("transform", function(d, i) { return rotate1(d, -i); });

      label.select("text")
        .transition()
          .duration(duration)
          .attr("transform", function(d, i) { return rotate1(d, -i); })
          .text(String);

      label.transition()
          .duration(duration)
          .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + (r1.range()[1] + labelOffset) + ")"; });

      label.exit().remove();

      var ob = g.selectAll("g.observation")
          .data(data);

      var obEnter = ob.enter().append("svg:g")
          .attr("class", function(d, i) { return "observation ob" + i; });

      obEnter.append("svg:path")
          .attr("d", line0)
        .transition()
          .duration(duration)
          .attr("d", line1);

      var marker = g.selectAll("g.observation").selectAll("circle")
          .data(Object, function(d, i) { return vars[i]; });

      marker.enter().append("svg:circle")
          .attr("r", 5.5)
          .attr("transform", function(d, i) { return rotate0(d, i) + "translate(" + r0(d) + ")"; })
        .transition()
          .duration(duration)
          .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + r1(d) + ")"; });

      marker.transition()
          .duration(duration)
          .attr("transform", function(d, i) { return rotate1(d, i) + "translate(" + r1(d) + ")"; });

      marker.exit().remove();

      ob.select("path").transition()
          .duration(duration)
          .attr("d", line1);

      ob.exit().remove();
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

  radar.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return radar;
  };

  radar.variables = function(x) {
    if (!arguments.length) return variables;
    variables = x == null ? x : d3.functor(x);
    return radar;
  };

  return radar;
};

function d3_chartRadarValue(d, v) {
  return d[v];
}

function d3_chartRadarVariables(d) {
  return d3.keys(d[0]);
}

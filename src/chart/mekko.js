d3.chart.mekko = function() {
  var width = 1,
      height = 1,
      z = d3.scale.category10(),
      n = d3.format(",d"),
      p = d3.format("%"),
      value = d3_chartMekkoValue,
      categoryX = d3_chartMekkoCategoryX,
      categoryY = d3_chartMekkoCategoryY,
      duration = 0;

  // For each small multiple…
  function mekko(g) {
    g.each(function(data, i) {
      var offset = 0,
          x0, // old x-scale
          y0; // old y-scale

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .range([0, width]);

      // Compute the new y-scale.
      var y1 = d3.scale.linear()
          .range([0, height]);

      // Retrieve the old scales, if this is an update.
      if (this.__chart__) {
        x0 = this.__chart__.x;
        y0 = this.__chart__.y;
      } else {
        x0 = d3.scale.linear().domain([0, Infinity]).range(x1.range());
        y0 = d3.scale.linear().domain([0, Infinity]).range(y1.range());
      }

      // Stash the new scales.
      this.__chart__ = {x: x1, y: y1};

      // Nest values by x-category. We assume the categories are distinct.
      var groups = d3.nest()
          .key(categoryX)
          .rollup(function(d) { return d.map(d3_chartMekkoData); })
          .entries(data);

      // Compute the total sum, the per-x sum, and the per-y offset.
      // You can use reduce rather than reduceRight to reverse the ordering.
      // We also record a reference to the parent x-category for each
      // y-category.
      var sum = groups.reduce(function(v, p) {
        return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
          d.parent = p;
          d.category = categoryY.call(this, d.data, p);
          return (d.offset = v) + (d.value = value.call(this, d.data, p));
        }, 0));
      }, 0);

      // Add x-axis ticks.
      var xtick = svg.selectAll("g.x")
          .data(x1.ticks(10));

      var xtickEnter = xtick.enter().append("svg:g")
          .attr("class", "x")
          .call(tick, tx0, 1e-6);

      xtickEnter.append("svg:line")
          .attr("y2", 6)
          .style("stroke", "#000");

      xtickEnter.append("svg:text")
          .attr("y", 8)
          .attr("text-anchor", "middle")
          .attr("dy", ".71em")
          .text(p);

      // Transition the entering ticks to the new scale, x1.
      xtickEnter.transition()
          .duration(duration)
          .call(tick, tx1, 1);

      // Transition the updating ticks to the new scale, x1.
      xtick.transition()
          .duration(duration)
          .call(tick, tx1, 1);

      // Transition the exiting ticks to the new scale, x1.
      xtick.exit().transition()
          .duration(duration)
          .call(tick, tx1, 1e-6)
          .remove();

      // Add y-axis ticks.
      var ytick = svg.selectAll("g.y")
          .data(y1.ticks(10));

      var ytickEnter = ytick.enter().append("svg:g")
          .attr("class", "y")
          .call(tick, ty0, 1e-6);

      ytickEnter.append("svg:line")
          .attr("x1", -6)
          .style("stroke", "#000");

      ytickEnter.append("svg:text")
          .attr("x", -8)
          .attr("text-anchor", "end")
          .attr("dy", ".35em")
          .text(p);

      // Transition the entering ticks to the new scale, y1.
      ytickEnter.transition()
          .duration(duration)
          .call(tick, ty1, 1);

      // Transition the updating ticks to the new scale, y1.
      ytick.transition()
          .duration(duration)
          .call(tick, ty1, 1);

      // Transition the exiting ticks to the new scale, y1.
      ytick.exit().transition()
          .duration(duration)
          .call(tick, ty1, 1e-6)
          .remove();

      // Add a group for each x-category.
      var xGroup = svg.selectAll("g.group")
          .data(groups, function(d) { return d.key; });

      xGroup.enter().append("svg:g")
          .attr("class", "group")
          .attr("xlink:title", function(d) { return d.key; })
          .call(groupX, x0, 1e-6)
        .transition()
          .duration(duration)
          .call(groupX, x1, 1);

      xGroup.transition()
          .duration(duration)
          .call(groupX, x1, 1);

      xGroup.exit().transition()
          .duration(duration)
          .call(groupX, x1, 1e-6)
          .remove();

      // Add a rect for each y-category. Re-select to get current x-categories.
      var yGroup = svg.selectAll("g.group").selectAll("a.y")
          .data(function(d) { return d.values; }, function(d) { return d.category; });

      yGroup.enter().append("svg:a")
          .attr("class", "y")
          .attr("xlink:title", title)
        .append("svg:rect")
          .style("fill", function(d, i) { return z(d.category); })
          .call(groupY, x0, y0, 1e-6)
        .transition()
          .duration(duration)
          .call(groupY, x1, y1, 1);

      yGroup
          .attr("xlink:title", title)
        .select("rect").transition()
          .duration(duration)
          .call(groupY, x1, y1, 1);

      yGroup.exit().transition()
          .duration(duration)
          .remove()
        .select("rect")
          .call(groupY, x1, y1, 1e-6);

      // Translate functions for x- and y-ticks.
      function tx0(d) { return "translate(" + x0(d) + "," + y0(1) + ")"; }
      function tx1(d) { return "translate(" + x1(d) + "," + y1(1) + ")"; }
      function ty0(d) { return "translate(0," + y0(1 - d) + ")"; }
      function ty1(d) { return "translate(0," + y1(1 - d) + ")"; }

      // Update the position and opacity of the specified tick group.
      function tick(g, t, o) {
           g.attr("transform", t)
            .style("opacity", o);
      }

      // Update the position and opacity of the specified x-category group.
      function groupX(g, x, o) {
           g.attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; })
            .style("opacity", o)
      }

      // Update the position and opacity of the specified y-category group.
      function groupY(rect, x, y, o) {
        rect.attr("y", function(d) { return y(d.offset / d.parent.sum); })
            .attr("height", function(d) { return y(d.value / d.parent.sum); })
            .attr("width", function(d) { return x(d.parent.sum / sum); })
            .style("opacity", o);
      }

      // Compute the title toolkit for the specified y-category.
      function title(d) {
        return d.category + " " + d.parent.key + ": " + n(d.value);
      }

      d3.timer.flush();
    });
  }

  mekko.width = function(w) {
    if (!arguments.length) return width;
    width = w;
    return mekko;
  };

  mekko.height = function(h) {
    if (!arguments.length) return height;
    height = h;
    return mekko;
  };

  mekko.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return mekko;
  };

  mekko.categoryX = function(x) {
    if (!arguments.length) return categoryX;
    categoryX = x;
    return mekko;
  };

  mekko.categoryY = function(x) {
    if (!arguments.length) return categoryY;
    categoryY = x;
    return mekko;
  };

  mekko.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return mekko;
  };

  return mekko;
};

function d3_chartMekkoValue(d) {
  return d.value;
}

function d3_chartMekkoCategoryX(d) {
  return d.x;
}

function d3_chartMekkoCategoryY(d) {
  return d.y;
}

function d3_chartMekkoData(d) {
  return {data: d};
}

d3.chart.mekko = function() {
  var width = 1,
      height = 1,
      x = d3.scale.linear().range([0, width]),
      y = d3.scale.linear().range([0, height]),
      z = d3.scale.category10(),
      n = d3.format(",d"),
      p = d3.format("%"),
      value = d3_chartMekkoValue,
      categoryX = d3_chartMekkoCategoryX,
      categoryY = d3_chartMekkoCategoryY;

  // For each small multiple…
  function mekko(g) {
    g.each(function(data, i) {
      var offset = 0;

      // Nest values by x-category. We assume each (x-category, y-category) is
      // unique.
      var groups = d3.nest()
          .key(categoryX)
          .entries(data);

      // Compute the total sum, the per-x sum, and the per-y offset.
      // You can use reduce rather than reduceRight to reverse the ordering.
      // We also record a reference to the parent x-category for each
      // y-category.
      var sum = groups.reduce(function(v, p) {
        return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
          d.parent = p;
          return (d.offset = v) + value.call(this, d);
        }, 0));
      }, 0);

      // Add x-axis ticks.
      var xtick = svg.selectAll("g.x")
          .data(x.ticks(10))
        .enter().append("svg:g")
          .attr("class", "x")
          .attr("transform", function(d) { return "translate(" + x(d) + "," + y(1) + ")"; });

      xtick.append("svg:line")
          .attr("y2", 6)
          .style("stroke", "#000");

      xtick.append("svg:text")
          .attr("y", 8)
          .attr("text-anchor", "middle")
          .attr("dy", ".71em")
          .text(p);

      // Add y-axis ticks.
      var ytick = svg.selectAll("g.y")
          .data(y.ticks(10))
        .enter().append("svg:g")
          .attr("class", "y")
          .attr("transform", function(d) { return "translate(0," + y(1 - d) + ")"; });

      ytick.append("svg:line")
          .attr("x1", -6)
          .style("stroke", "#000");

      ytick.append("svg:text")
          .attr("x", -8)
          .attr("text-anchor", "end")
          .attr("dy", ".35em")
          .text(p);

      // Add a group for each x-category.
      var xGroup = svg.selectAll("g.group")
          .data(groups)
        .enter().append("svg:g")
          .attr("class", "group")
          .attr("xlink:title", function(d) { return d.key; })
          .attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; });

      // Add a rect for each y-category.
      var yGroup = xGroup.selectAll(".y")
          .data(function(d) { return d.values; })
        .enter().append("svg:a")
          .attr("class", "y")
          .attr("xlink:title", function(d, i) { return categoryY.call(this, d, i) + " " + d.parent.key + ": " + n(d.value); })
        .append("svg:rect")
          .attr("y", function(d) { return y(d.offset / d.parent.sum); })
          .attr("height", function(d) { return y(d.value / d.parent.sum); })
          .attr("width", function(d) { return x(d.parent.sum / sum); })
          .style("fill", function(d, i) { return z(categoryY.call(this, d, i)); });
    });
  }

  mekko.width = function(w) {
    if (!arguments.length) return width;
    width = w;
    x.range([0, width]);
    return mekko;
  };

  mekko.height = function(h) {
    if (!arguments.length) return height;
    height = h;
    y.range([0, height]);
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

  return mekko;
};

function d3_chartMekkoValue(d) {
  return d.value;
}

function d3_chartMekkoCategoryX(d) {
  return d.a;
}

function d3_chartMekkoCategoryY(d) {
  return d.b;
}

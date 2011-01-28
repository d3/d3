---
layout: guide
title: A Bar Chart, Part 2
---

# d3.js ~ A Bar Chart, Part 2

## Data-Driven Documents

<style type="text/css">

.chart {
  margin-left: 42px;
  font: 10px sans-serif;
}

.chart rect {
  fill: steelblue;
  stroke: white;
}

.chart text.bar {
  fill: white;
}

</style>

<script type="text/javascript">

var n = 33,
    w = 660,
    h = 80,
    data = d3.range(n).map(next);

var x = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangeRoundBands([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .range([0, h])
    .interpolate(d3.interpolateRound);

var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w)
    .attr("height", h);

chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", x.rangeBand())
    .attr("height", function(d) { return y(d.value); });

chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w - 1)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");

function next() {
  var i = next.time || 0,
      v = next.value || 50;
  return {
    time: next.time = i + 1,
    value: next.value = Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}

</script>

<script type="text/javascript">

var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w)
    .attr("height", h);

var g = chart.append("svg:g");

chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w - 1)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");

redraw();

setInterval(function() {
  data.shift();
  data.push(next());
  redraw();
}, 1500);

function redraw() {

  var rect = g.selectAll("rect")
      .data(data, {
        nodeKey: function(n) { return n.getAttribute("key"); },
        dataKey: function(d) { return d.time; }
      });

  rect.enter("svg:rect")
      .attr("opacity", 1e-6)
      .attr("key", function(d) { return d.time; })
      .attr("x", function(d, i) { return x(i) - 5.5; })
      .attr("y", function(d) { return h - y(d.value) - 5.5; })
      .attr("width", x.rangeBand() + 10)
      .attr("height", function(d) { return y(d.value) + 10; })
    .transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return y(d.value); })

  rect.transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return y(d.value); });

  rect.exit().transition()
      .duration(1000)
      .attr("opacity", 1e-6)
      .attr("x", function(d, i) { return x(i) - 5.5; })
      .attr("y", function(d) { return h - y(d.value) - 5.5; })
      .attr("width", x.rangeBand() + 10)
      .attr("height", function(d) { return y(d.value) + 10; })
      .remove();

}

</script>

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
    w = 20,
    h = 80,
    data = d3.range(n).map(next);

var x = d3.scale.linear()
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]);

var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * n - 1)
    .attr("height", h);

chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); });

chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * n)
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

var chart1 = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * n - 1)
    .attr("height", h);

var g1 = chart1.append("svg:g");

chart1.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * n)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");

redraw1();

function redraw1() {

  var rect = g1.selectAll("rect")
      .data(data);

  rect.enter("svg:rect")
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); });

  rect.transition()
      .duration(1000)
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

  rect.exit()
      .remove();

}

</script>

<script type="text/javascript">

var chart2 = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * n - 1)
    .attr("height", h);

var g2 = chart2.append("svg:g");

chart2.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * n)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");

redraw2();

function redraw2() {

  var rect = g2.selectAll("rect")
      .data(data, {
        nodeKey: function(n) { return n.getAttribute("key"); },
        dataKey: function(d) { return d.time; }
      });

  rect.enter("svg:rect")
      .attr("key", function(d) { return d.time; })
      .attr("x", function(d, i) { return x(i + 1) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
    .transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

  rect.exit().transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i - 1) - .5; })
      .remove();

}

</script>

<script type="text/javascript">

var chart3 = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * n - 1)
    .attr("height", h);

var g3 = chart3.append("svg:g");

chart3.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * n)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");

redraw3();

function redraw3() {

  var rect = g3.selectAll("rect")
      .data(data, {
        nodeKey: function(n) { return n.getAttribute("key"); },
        dataKey: function(d) { return d.time; }
      });

  rect.enter("svg:rect")
      .attr("opacity", 1e-6)
      .attr("key", function(d) { return d.time; })
      .attr("x", function(d, i) { return x(i) - 5.5; })
      .attr("y", function(d) { return h - y(d.value) - 5.5; })
      .attr("width", w + 10)
      .attr("height", function(d) { return y(d.value) + 10; })
      .style("fill", "green")
    .transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
      .style("fill", "steelblue");

  rect.transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
      .style("fill", "steelblue");

  rect.exit().transition()
      .duration(1000)
      .attr("opacity", 1e-6)
      .attr("x", function(d, i) { return x(i) - 5.5; })
      .attr("y", function(d) { return h - y(d.value) - 5.5; })
      .attr("width", w + 10)
      .attr("height", function(d) { return y(d.value) + 10; })
      .style("fill", "brown")
      .remove();

}

</script>

<script type="text/javascript">

setInterval(function() {
  data.shift();
  data.push(next());
  redraw1();
  redraw2();
  redraw3();
}, 1500);

</script>

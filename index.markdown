---
layout: default
---

<a href="http://github.com/mbostock/d3"><img
    style="position:absolute;top:0;right:0;border:0;"
    width="149" height="149" src="forkme.png" alt="Fork me on GitHub"
    /></a>

# d3.js

## Data-Driven Documents

**D3.js** is a small, free JavaScript library for manipulating HTML documents
based on data. D3 can help you quickly visualize your data as HTML or SVG,
handle interactivity, and incorporate rich animations into your pages. You can
use D3 as a visualization framework, or you can just use it to build dynamic
pages. Unlike other systems, D3 doesn&rsquo;t tie you to a proprietary
representation, so you are free to exercise the full capabilities of modern
browsers.

* [Documentation](/docs/)
* [Examples](/ex/)

<style type="text/css">
.bar {
  text-align: right;
  font: 10px sans-serif;
  padding: 4px;
  margin: 1px;
  color: white;
  background: -webkit-gradient(linear, right top, left top, from(transparent), to(steelblue));
  background: -moz-linear-gradient(right, transparent, steelblue);
}
</style>

<div id="chart-2">
</div>

<script type="text/javascript">
var data = [4, 8, 15, 16, 23, 42];

var create = d3.select("#chart-2")
  .selectAll("div.bar")
    .data(data)
  .enter.add("div")
    .attr("class", "bar")
    .style("width", 0)
    .style("background-color", "steelblue")
  .apply();

var update = d3.select("#chart-2")
  .selectAll("div.bar")
    .data(data)
    .text(function(d) { return d; })
  .transition()
    .duration(500)
    .delay(function() { return this.index * 50; })
    .tweenStyle("width", function(d) { return d * 10 + "px"; })
    .tweenStyle("background-color", function(d) { return "rgb(" + ~~(d * 6) + ",50,100)"; })
  .apply();

setInterval(function() {
  data.forEach(function(d, i) { data[i] = ~~(Math.random() * 50); });
  update.apply();
}, 1000);

</script>

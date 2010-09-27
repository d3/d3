---
layout: default
---

# d3.js

## Data-Driven Documents

**D3.js** is a small, free JavaScript library for manipulating HTML documents
based on data. D3 can help you quickly visualize your data as HTML or SVG,
handle interactivity, and incorporate rich animations into your pages. You can
use D3 as a visualization framework, or you can just use it to build dynamic
pages. Unlike other systems, D3 doesn&rsquo;t tie you to a proprietary
representation, so you are free to exercise the full capabilities of modern
browsers.

* [Introduction](/intro/)
* [Documentation](/docs/)
* [Examples](/ex/)

<div id="chart-2">
</div>

<script type="text/javascript">
var data = [4, 8, 15, 16, 23, 42];

d3.select("#chart-2")
  .selectAll("div.bar")
    .data(data)
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .style("background-color", function(d) { return "rgb(" + ~~(d * 6) + ",50,100)"; })
    .text(function(d) { return d; })
  .apply();

var update = d3.select("#chart-2")
  .selectAll("div.bar")
    .data(function() { return data.map(function() { return ~~(Math.random() * 50); }); })
    .text(function(d) { return d; })
  .transition()
    .duration(500)
    .delay(function() { return this.index * 50; })
    .tweenStyle("width", function(d) { return d * 10 + "px"; })
    .tweenStyle("background-color", function(d) { return "rgb(" + ~~(d * 6) + ",50,100)"; });

window.addEventListener("keypress", update.apply, false);

</script>

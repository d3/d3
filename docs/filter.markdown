---
layout: docs
title: 'filter'
---

## <tt>filter(<i>f</i>)</tt>

![filter](filter.png)

Filters the current selection, applying the given filter function <i>f</i>. The
function <i>f</i> is invoked for each node in the current selection. The
arguments to the function <i>f</i> are the current data stack, and the context
is the current node. The function <i>f</i> must return true for nodes that
should appear in the filtered selection.

For example, given the following HTML:

{% highlight html linenos %}
<table>
  <tr><td>0.</td><td>Zero</td></tr>
  <tr><td>1.</td><td>One</td></tr>
  <tr><td>2.</td><td>Two</td></tr>
  <tr><td>3.</td><td>Three</td></tr>
  <tr><td>4.</td><td>Four</td></tr>
  <tr><td>5.</td><td>Five</td></tr>
</table>
{% endhighlight %}

<div class="highlight ex">
  <table>
    <tr><td>0.</td><td>Zero</td></tr>
    <tr><td>1.</td><td>One</td></tr>
    <tr><td>2.</td><td>Two</td></tr>
    <tr><td>3.</td><td>Three</td></tr>
    <tr><td>4.</td><td>Four</td></tr>
    <tr><td>5.</td><td>Five</td></tr>
  </table>
</div>

To select all table rows, then filter to the odd rows, say:

{% highlight js linenos %}
d3.selectAll("tr")
  .filter(function() { return this.index & 1; })
    .style("background-color", "yellow")
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.selectAll('tr')
      .filter(function() { return this.index & 1; })
      .style('background-color', 'yellow')
      .apply()">
    Apply
  </button>
  <button onclick="d3.selectAll('tr')
      .style('background-color', null)
      .apply()">
    Reset
  </button>
</div>

Filtering is most useful in conjunction with [data](data.html). For example,
given a simple bar chart whose data is the array of numbers \[4, 8, 15, 16, 23,
42\]:

<style type="text/css">
.bar {
  text-align: right;
  font: 10px sans-serif;
  padding: 4px;
  margin: 1px;
  color: white;
  background-color: steelblue;
  -webkit-transition: background-color 500ms linear;
  -moz-transition: background-color 500ms linear;
}
</style>

<div id="chart-1">
</div>

<script type="text/javascript">
var numbers = [4, 8, 15, 16, 23, 42];

d3.select("#chart-1")
  .selectAll("div.bar")
    .data(numbers)
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; })
  .apply();
</script>

To highlight the powers of two, say:

{% highlight js linenos %}
d3.selectAll("#chart-1 div.bar")
    .data(numbers)
  .filter(function(d) { return Math.log(d) / Math.LN2 % 1 == 0; })
    .style("background-color", "brown")
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.selectAll('#chart-1 div.bar')
      .data(numbers)
    .filter(function(d) { return Math.log(d) / Math.LN2 % 1 == 0; })
      .style('background-color', 'brown')
      .apply()">
    Apply
  </button>
  <button onclick="d3.selectAll('#chart-1 div.bar')
      .style('background-color', null)
      .apply()">
    Reset
  </button>
</div>

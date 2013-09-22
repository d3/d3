---
layout: tutorial
title: A Bar Chart, Part 2
---

# A Bar Chart, Part 2

The [previous part](bar-1.html) of this tutorial covered the construction of a
no-frills, static bar chart. This part will showcase some of the dynamic
capabilities of D3, including *transitions* and *data joins*.

Say that, rather than a simple array of numbers, you want to visualize a [time
series](http://en.wikipedia.org/wiki/Time_series)—a sequence of values sampled
at regular time intervals. For example, say you run a website, and want to track
how many visitors find your ideas intriguing? A bar chart could show the number
of visitors that subscribe to your newsletter in realtime!

## Dynamic Data

Now typically, the subscription data would be downloaded to the client via an
HTTP request. You can poll the server to refresh the latest data every minute,
or use [web sockets](http://www.w3.org/TR/websockets/) to stream data
incrementally, minimizing latency. To simplify this tutorial and focus on the
task of visualization, we'll construct a synthetic (*i.e.*, fake) dataset by
[random walk](http://en.wikipedia.org/wiki/Random_walk):

{% highlight js linenos %}
var t = 1297110663, // start time (seconds since epoch)
    v = 70, // start value (subscribers)
    data = d3.range(33).map(next); // starting dataset

function next() {
  return {
    time: ++t,
    value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}
{% endhighlight %}

The exact mechanism of the random walk is unimportant, but you should understand
the structure of the resulting data. Rather than a number, each data point is an
object with `time` and `value` attributes:

{% highlight js linenos %}
{"time": 1297110663, "value": 56},
{"time": 1297110664, "value": 53},
{"time": 1297110665, "value": 58},
{"time": 1297110666, "value": 58},
{% endhighlight %}

Note that the values in the dataset are constrained to the domain \[10, 90\],
which is convenient because it allows a fixed *y*-scale. This simplifies the
implementation, as the old bars will not resize as new data arrives. You *can*
use a dynamic scale, but keep in mind that rescaling old values while
introducing new ones makes it harder for the user to perceive changes
accurately. Also, you'll need reference lines! Cushioning your scales to avoid
sudden changes, or applying
[hysteresis](http://en.wikipedia.org/wiki/Hysteresis) to delay changes, is
recommended.

If you stream data from the server, you can redraw the bar chart whenever new
data becomes available. In this case, we'll cycle the data every 1.5 seconds:

{% highlight js linenos %}
setInterval(function() {
  data.shift();
  data.push(next());
  redraw();
}, 1500);
{% endhighlight %}

The `shift` operation removes the first (oldest) element in the array, while the
`push` appends after the last (newest) element. If you have a lot of data, a
[circular buffer](http://en.wikipedia.org/wiki/Circular_buffer) will improve
performance; with smaller data, the inefficiency of the `shift` operation is
negligible and can be ignored. The `redraw` method is a function that you will
define; we'll get to that shortly.

## Dynamic Bars

For now, the next step is to construct two scales, based on our knowledge of the
dataset and the desired chart size. To fix the maximum bar size to 80×20,
construct two linear scales:

{% highlight js linenos %}
var w = 20,
    h = 80;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]);
{% endhighlight %}

The *x*-scale is a bit cheeky in that we've defined the domain as \[0, 1\],
rather than the full time-domain of the dataset. That's because we'll assume
(again, for simplicity) that the data is in chronological order and there are no
missing data points. As such, we can use the index of the data to derive the
*x*-position; `x(i)` is identical to `w * i`. A more robust implementation would
update the domain from the `time` attributes of the dataset whenever the data
changes.

The *y*-scale uses `rangeRound` rather than `range`; the only difference is that
the output values of the scale are rounded to the  nearest integer to avoid
antialiasing artifacts. If you prefer, you can instead use SVG's
[shape-rendering](http://www.w3.org/TR/SVG/painting.html#ShapeRenderingProperty)
property. However, antialiasing is nice for smooth intermediate values during
transition.

With the scales ready, construct the SVG container for the chart:

{% highlight js linenos %}
var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);
{% endhighlight %}

Add the initial bars:

{% highlight js linenos %}
chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); });
{% endhighlight %}

In SVG, rects are positioned relative to their top-left corner. For a vertical
bar chart (also known as a column chart), the bars should be anchored by their
bottom-left corner, so the "y" attribute flips the *y*-scale. Alternatively, you
can use a transform to change the [coordinate
system](http://www.w3.org/TR/SVG/coords.html). The .5 offset is to avoid
antialiasing; the 1-pixel white stroke is centered on the given location, so a
half-pixel offset will fill the pixel exactly. If you are not the Martha Stewart
type, and don't care for crisp edges, you may omit this step.

Add the *x*-axis last, so that it appears on top of the bars:

{% highlight js linenos %}
chart.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .style("stroke", "#000");
{% endhighlight %}

SVG draws shapes in the order they are specified, so to have the axis appear on
top of the bars, the line must exist *after* the rects in the DOM. It is
sometimes convenient to use `g` elements to group shapes into the desired
z-order.

A little bit of CSS will set the bar colors:

{% highlight css linenos %}
.chart rect {
  fill: steelblue;
  stroke: white;
}
{% endhighlight %}

<style type="text/css">

.chart {
  margin-left: 42px;
}

.chart rect {
  fill: steelblue;
  stroke: white;
}

</style>

<script type="text/javascript">

var t = 1297110663,
    v = 70,
    data = d3.range(33).map(next);

function next() {
  return {
    time: ++t,
    value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}

</script>

<script type="text/javascript">

var w = 20,
    h = 80;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]);

</script>

The code so far produces a static bar chart:

<script type="text/javascript">

var chart = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); });

chart.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .style("stroke", "#000");

</script>

Now, what about that `redraw` function?

{% highlight js linenos %}
function redraw() {

  // Update…
  chart.selectAll("rect")
      .data(data)
    .transition()
      .duration(1000)
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

}
{% endhighlight %}

Observe how the bars dance happily in response to changing data:

<script type="text/javascript">

var chart1 = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

chart1.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); });

chart1.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .style("stroke", "#000");

redraw1();

function redraw1() {

  chart1.selectAll("rect")
      .data(data)
    .transition()
      .duration(1000)
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

}

</script>

The redraw function is fairly trivial—reselect the `rect` elements, bind them to
the new data, and then start a transition that updates the "y" and "height"
attributes. No enter and exit selection is needed! Without a data join, the data
are joined to nodes by index. As the length of the data array is fixed, the
number of nodes never changes, and thus the enter and exit selections are always
empty.

## Object Constancy

Yet, the above animation is poor because it lacks object constancy through the
transition: it does not convey the changing data accurately. Rather than
updating values in-place, the bars should slide to the left, so that each bar
corresponds to the same point in time across the transition. Do this using a
*data join*, to bind nodes to data by timestamp rather than index:

{% highlight js linenos %}
function redraw() {
  
  // Do this using a optional data() parameter to bind nodes to data by timestamp rather than index
  var rect = chart.selectAll("rect")
      .data(data, function(d) { return d.time; });

  // Enter…
  rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); });

  // Update…
  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  // Exit…
  rect.exit()
      .remove();

}
{% endhighlight %}

With the new data join, we can no longer assume that the enter and exit
selections are empty; instead, each contains exactly one bar upon redraw, as a
new data point arrives and an old data point leaves. (If using real data, don't
assume regularity; multiple bars could enter and exit with each redraw.) So, the
update is split to handle enter and exit separately. However, the update
transition is actually simplified: we only transition the "x" attribute, as the
"y" and "height" attributes do not change!

Note that operations on the entering or exiting selection do *not* affect the
updating selection. Thus, the transition defined on `rect` on L14 above includes
only the updating bars, not any of the entering bars that are appended on L7.

The bar chart now slides as desired, but the enter and exit are a bit clunky:

<script type="text/javascript">

var chart2 = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

chart2.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .style("stroke", "#000");

redraw2();

function redraw2() {

  var rect = chart2.selectAll("rect")
      .data(data, function(d) { return d.time; });

  rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); });

  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.exit()
      .remove();

}

</script>

The above implementation enters new bars immediately, while old bars are removed
immediately. A common alternative is to fade, but in this case the most
intuitive transition is for new bars to enter from the right, and old bars to
exit to the left. Enter and exit can have transitions, too, which you can use to
offset the index `i` to the *x*-scale:

{% highlight js linenos %}
function redraw() {

  var rect = chart.selectAll("rect")
      .data(data, function(d) { return d.time; });

  rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i + 1) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
    .transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.exit().transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i - 1) - .5; })
      .remove();

}
{% endhighlight %}

Note that the enter transition is staged; we initialize the values, and then
start the transition. This is not needed with the exit transition because we'll
transition from the current state of the bar, regardless of value.

Et voilà!

<script type="text/javascript">

var chart3 = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

chart3.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .style("stroke", "#000");

redraw3();

function redraw3() {

  var rect = chart3.selectAll("rect")
      .data(data, function(d) { return d.time; });

  rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i + 1) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
    .transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.exit().transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i - 1) - .5; })
      .remove();

}

</script>

This tutorial covered several core concepts in D3, including transitions, enter
and exit, and data joins. However, this only scratches the surface! Explore the
[examples gallery](../ex/) to see more advanced techniques with D3.

<script type="text/javascript">

setInterval(function() {
  data.shift();
  data.push(next());
  redraw1();
  redraw2();
  redraw3();
  d3.timer.flush(); // avoid memory leak when in background tab
}, 1500);

</script>

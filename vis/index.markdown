---
layout: vis
title: Visualization
---

# d3.js

## Data-Driven Visualization

<style type="text/css">

.chart {
  font: 10px sans-serif;
  shape-rendering: crispEdges;
}

.chart div {
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
}

.chart rect {
  stroke: white;
  fill: steelblue;
}

.chart text.bar {
  fill: white;
}

</style>

Say you have some data—a simple array of numbers:

{% highlight js linenos %}
var data = [4, 8, 15, 16, 23, 42];
{% endhighlight %}

<script type="text/javascript">
var data = [4, 8, 15, 16, 23, 42];
</script>

One of the ways you might visualize this univariate data is a bar chart. Let's
examine how to create bar charts using D3, first with basic HTML, and then a
more advanced example with SVG.

### HTML

To get started with HTML, you'll first need a container for the chart:

{% highlight js linenos %}
var chart = d3.select("body")
  .append("div")
    .attr("class", "chart");
{% endhighlight %}

This code selects the document body, which will be the parent node of the new
`div` element that serves as the chart container. The chart container is then
appended to the end of the body, becoming the body's last child. By setting the
"class" attribute, you can easily define associated styles, such as the
background color and font size. The `attr` operator returns the current
selection, thus the `chart` variable refers to the chart container element.

Next, add some `div` elements to the container, setting the width by scaling the
data:

{% highlight js linenos %}
chart.selectAll("div")
    .data(data)
  .enter("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
{% endhighlight %}

As above, you can use the `text` operator to set the text content of the bars.
The identity function, `function(d) { return d; }`, causes each data value to be
formatted using JavaScript's default string conversion, equivalent to the
built-in `String` function. This may be ugly for some numbers (*e.g.*,
0.12000000000000001). The `d3.format` class, modeled after Python's [string
formatting](http://docs.python.org/library/stdtypes.html#string-formatting), is
available for more control over how the number is formatted, supporting
comma-grouping of thousands and fixed precision.

The above code results in a rudimentary bar chart:

<script type="text/javascript">
d3.select(".content")
  .append("div")
    .attr("class", "chart")
  .selectAll("div")
    .data(data)
  .enter("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
</script>

One weakness of the code so far is the magic number 10, which scales the data
value to the appropriate bar width. This number depends on the *domain* of the
data (the maximum value, 42), and the width of the chart (420). To avoid
hard-coding the *x*-scale of 10, you can use D3's linear scale class, and
compute the maximum value from the data:

{% highlight js linenos %}
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range(["0px", "420px"]);
{% endhighlight %}

<script type="text/javascript">
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range(["0px", "420px"]);
</script>

Although it looks like an object, the `x` variable here is actually a *function*
that converts data values (in the domain) to scaled values (in the range). For
example, an input value of 4 returns "40px", and an input value of 16 returns
"160px". The output range of the scale in this example are strings, with the
appropriate `px` units for CSS. D3's automatic interpolators detect the numbers
within the strings, while retaining the constant remainder.

The new scale arguably still has a magic number: 420px, the width of the chart.
If you want to make the chart truly resizable, you can inspect the width of the
chart container, `chart.style("width")`. Or, use percentages rather than pixels.
In any case, the reusable scale makes the chart specification easier to
modify—for example, you can easily replace the linear scale with a log or root
scale.

Using the new scale, you can simplify the width style definition:

{% highlight js linenos %}
chart.selectAll("div")
    .data(data)
  .enter("div")
    .style("width", x)
    .text(String);
{% endhighlight %}

Now, the HTML representation is very concise, but it's not very flexible.
Displaying reference lines in the background, or generating columns rather than
bars, is difficult in pure HTML. Chart types such as pies and streamgraphs are
practically impossible. Fortunately, there's a convenient alternative: [Scalable
Vector Graphics](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) (SVG)!

### SVG

You use SVG much the same way as HTML, but it offers substantially more
flexibility. To start with SVG, create an `svg:svg` container instead of a
`div`:

{% highlight js linenos %}
var chart = d3.select("body")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 20 * data.length);
{% endhighlight %}

An immediate difference you will notice with SVG is that units are implicitly in
pixels, and thus do not need the "px" suffix. Even though the units are pixels,
you can rescale the SVG without losing image quality, and you can use
percentages, too. So you must tweak the definition of the *x*-scale to use a
numeric range:

{% highlight js linenos %}
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
{% endhighlight %}

<script type="text/javascript">
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
</script>

Another difference is that, unlike with HTML, SVG does not provide automatic
flow layout. By default, the bars would be drawn on top of each other. To fix
this, set the *y*-position and height explicitly:

{% highlight js linenos %}
chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("y", function(d, i) { return i * 20; })
    .attr("width", x)
    .attr("height", 20);
{% endhighlight %}

The SVG-based chart is now almost identical to our original. The chart is
currently missing labels, but that will be fixed shortly:

<script type="text/javascript">
d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 20 * data.length)
  .selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("y", function(d, i) { return i * 20; })
    .attr("width", x)
    .attr("height", 20);
</script>

Astute readers will notice that a magic number crept back into the chart
description: the bar height of 20 pixels. Arguably, this number isn't
magic—twenty is a reasonable height for the bars, just as fourteen is a
reasonable point size for text. Alternatively, you can set a height for the
entire chart, and use a second scale for the *y*-axis:

{% highlight js linenos %}
var y = d3.scale.ordinal()
    .domain(data)
    .rangeBands([0, 120]);
{% endhighlight %}

<script type="text/javascript">
var y = d3.scale.ordinal()
    .domain(data)
    .rangeBands([0, 120]);
</script>

Now `y` is a function, much like the earlier `x`. It takes as input values from
the data array, and for each value returns the corresponding *y*-position. For
example, an input value of 4 returns 0, and an input value of 16 returns 60.
This approach requires that the values in our dataset are unique; ordinal scales
are often used to position non-quantitative data, such as country names. With
univariate data, you can use the array indices as the ordinal domain: \[0, 1,
2…\].

The new scale plugs into the bar specification, replacing the "y" attribute:

{% highlight js linenos %}
chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());
{% endhighlight %}

The new scales can also be applied to render labels, showing the associated
value. The labels are centered vertically within each bar, with the text
right-aligned:

{% highlight js linenos %}
chart.selectAll("text")
    .data(data)
  .enter("svg:text")
    .attr("x", x)
    .attr("y", y)
    .attr("dx", -3) // padding-right
    .attr("dy", y.rangeBand() / 2) // vertical-align: middle
    .attr("dominant-baseline", "central") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(String);
{% endhighlight %}

The [SVG Text](http://www.w3.org/TR/SVG/text.html) specification describes in
detail the meaning of the "dx", "dy", "dominant-baseline" and "text-anchor"
attributes. The full specification is dense, as it offers a level of control
required only by the most ambitious typographers; that said, it's not too hard
to remember standard settings for alignment and padding.

The SVG chart now looks identical to the earlier HTML version:

<script type="text/javascript">
var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 120);

chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

chart.selectAll("text")
    .data(data)
  .enter("svg:text")
    .attr("class", "bar")
    .attr("x", x)
    .attr("y", y)
    .attr("dx", -3)
    .attr("dy", y.rangeBand() / 2)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "end")
    .text(String);
</script>

Add some padding…

{% highlight js linenos %}
var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", 440)
    .attr("height", 140)
  .append("svg:g")
    .attr("transform", "translate(10,15)");
{% endhighlight %}

Add some reference lines…

{% highlight js linenos %}
chart.selectAll("line")
    .data(x.ticks(10))
  .enter("svg:line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 120)
    .attr("stroke", "#ccc");
{% endhighlight %}

Add some labels for the reference lines…

{% highlight js linenos %}
chart.selectAll("text.rule")
    .data(x.ticks(10))
  .enter("svg:text")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);
{% endhighlight %}

Add a *y*-axis…

{% highlight js linenos %}
chart.append("svg:line")
    .attr("y1", 0)
    .attr("y2", 120)
    .attr("stroke", "#000");
{% endhighlight %}

Et voilà!

<script type="text/javascript">
var chart = d3.select(".content")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", 440)
    .attr("height", 140)
  .append("svg:g")
    .attr("transform", "translate(10,15)");

chart.selectAll("line")
    .data(x.ticks(10))
  .enter("svg:line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 120)
    .attr("stroke", "#ccc");

chart.selectAll("text.rule")
    .data(x.ticks(10))
  .enter("svg:text")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);

chart.selectAll("rect")
    .data(data)
  .enter("svg:rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

chart.selectAll("text.bar")
    .data(data)
  .enter("svg:text")
    .attr("class", "bar")
    .attr("x", x)
    .attr("y", y)
    .attr("dx", -3)
    .attr("dy", y.rangeBand() / 2)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "end")
    .text(String);

chart.append("svg:line")
    .attr("y1", 0)
    .attr("y2", 120)
    .attr("stroke", "#000");
</script>

<!--
var rule = chart.selectAll("g.rule")
    .data(x.ticks(10))
  .enter("svg:g")
    .attr("class", "rule");

rule.append("svg:line")

rule.append("svg:text")
 -->

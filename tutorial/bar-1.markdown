---
layout: tutorial
title: A Bar Chart, Part 1
---

# A Bar Chart, Part 1

<style type="text/css">

.chart {
  margin-left: 42px;
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

One of the ways you might visualize this univariate data is a bar chart. This
guide will examine how to create a simple bar chart using D3, first with basic
HTML, and then a more advanced example with SVG.

## HTML

To get started with HTML, you'll first need a container for the chart:

{% highlight js linenos %}
var chart = d3.select("body").append("div")
    .attr("class", "chart");
{% endhighlight %}

This code selects the document body, which will be the parent of the new chart.
Every visible node needs a parent, with the exception of the document's root
node. The chart container, a `div` element, is then created and appended to the
body. The `append` operator adds the new node as the last child: the chart will
appear at the end of the body.

D3 uses the [method chaining](http://en.wikipedia.org/wiki/Method_chaining)
design pattern. Above, setting the attribute returns the current selection, and
the `chart` variable thus refers to the chart container element. This approach
minimizes the amount of code needed to apply many selections and transformations
in sequence.

The `attr` operator sets the "class" attribute on the chart container, allowing
stylesheets to be applied to the chart elements. This is convenient for static
styles, such as the background color and font size. CSS code lives in a `style`
element or an external stylesheet referenced by a `link` element, rather than
the `script` element used for JavaScript:

{% highlight css linenos %}
.chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
}
{% endhighlight %}

Next, add some `div` elements to the container, setting the width by scaling the
data:

{% highlight js linenos %}
chart.selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
{% endhighlight %}

This code selects the child `div` elements of the chart container. This
selection is empty because the container was just added. However, by binding
this selection to the array of numbers via the `data` operator, you can obtain
the *entering* selection—a set of placeholder nodes, one per data element, to
which you can append the desired child nodes for each bar.

The `text` operator sets the text content of the bars. The identity function,
`function(d) { return d; }`, causes each data value (number) to be formatted
using JavaScript's default string conversion, equivalent to the built-in
`String` function. This may be ugly for some numbers (*e.g.*,
0.12000000000000001). The `d3.format` class, modeled after Python's [string
formatting](http://docs.python.org/library/stdtypes.html#string-formatting), is
available for more control over how the number is formatted, supporting
comma-grouping of thousands and fixed precision.

The above code results in a rudimentary bar chart:

<script type="text/javascript">
d3.select(".content").append("div")
    .attr("class", "chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
</script>

One weakness of the code so far is the [magic number][1] 10, which scales the
data value to the appropriate bar width. This number depends on the *domain* of
the data (the maximum value, 42), and the width of the chart (420). To avoid
hard-coding the *x*-scale of 10, you can use D3's linear scale class, and
compute the maximum value from the data:

[1]: http://en.wikipedia.org/wiki/Magic_number_(programming)#Unnamed_numerical_constants

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
If you want to make the chart resizable, you can inspect the width of the chart
container, `chart.style("width")`. Or, use percentages rather than pixels. In
any case, the reusable scale makes the chart specification easier to modify—for
example, you can easily replace the linear scale with a log or root scale.

Using the new scale, you can simplify the width style definition:

{% highlight js linenos %}
chart.selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", x)
    .text(String);
{% endhighlight %}

Now, the HTML representation is very concise, but it's not very flexible.
Displaying reference lines in the background, or generating columns rather than
bars, is difficult in pure HTML. Chart types such as pies and streamgraphs are
practically impossible. Fortunately, there's a convenient alternative: [Scalable
Vector Graphics](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) (SVG)!

## SVG

You use SVG much the same way as HTML, but it offers substantially more
flexibility. To start with SVG, create an `svg` container instead of a
`div`:

{% highlight js linenos %}
var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 20 * data.length);
{% endhighlight %}

An immediate difference you will notice with SVG is that the units are
implicitly pixels, and thus do not need the "px" suffix. Even with pixels, you
can rescale the SVG without losing image quality. You can use percentages for
relative positioning, too. To use a numeric range for the *x*-scale:

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

Unlike HTML, SVG does not provide automatic flow layout. Shapes are positioned
relative to the top-left corner, called the origin. Thus, by default, the bars
would be drawn on top of each other. To fix this, set the *y*-coordinate and
height explicitly:

{% highlight js linenos %}
chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", function(d, i) { return i * 20; })
    .attr("width", x)
    .attr("height", 20);
{% endhighlight %}

Also, the CSS changes slightly when using SVG. Rather than the background, the
fill determines the bar color. You can also apply a white border to each bar by
setting the stroke style:

{% highlight css linenos %}
.chart rect {
  stroke: white;
  fill: steelblue;
}
{% endhighlight %}

The SVG-based chart is now almost identical to our original. The chart is
currently missing labels, but that will be fixed shortly:

<script type="text/javascript">
d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 20 * data.length)
  .selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", function(d, i) { return i * 20; })
    .attr("width", x)
    .attr("height", 20);
</script>

Astute readers will notice that a magic number crept back into the chart
description: the bar height of 20 pixels. Arguably, this number isn't
magic—twenty is a reasonable height for the bars, just as fourteen is a
reasonable point size for text. However, if you prefer to set a height for the
entire chart, use a second scale for the *y*-axis:

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

As with `x` previously, `y` is now a function. It takes as input values from the
data array, and for each value returns the corresponding *y*-coordinate. For
example, an input value of 4 returns 0, and an input value of 16 returns 60.
This approach requires that the values in our dataset are unique; ordinal scales
are often used to encode non-quantitative data, such as country names.
Alternatively, you can use array indices as the ordinal domain: \[0, 1, 2…\].

The new scale plugs into the bar specification, replacing the "y" attribute:

{% highlight js linenos %}
chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());
{% endhighlight %}

The new scales can also be applied to render labels, showing the associated
value. This code centers labels vertically within each bar, and right-aligns
text:

{% highlight js linenos %}
chart.selectAll("text")
    .data(data)
  .enter().append("text")
    .attr("x", x)
    .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
    .attr("dx", -3) // padding-right
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(String);
{% endhighlight %}

The formal [SVG Text](http://www.w3.org/TR/SVG/text.html) specification
describes in detail the meaning of the "dx", "dy" and "text-anchor" attributes.
The full spec is dense, as SVG offers a level of control required by only the
most ambitious typographers; fortunately, it's not too hard to remember standard
settings for alignment and padding!

The SVG chart now looks identical to the earlier HTML version:

<script type="text/javascript">
var chart = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 120);

chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

chart.selectAll("text")
    .data(data)
  .enter().append("text")
    .attr("class", "bar")
    .attr("x", x)
    .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
    .attr("dx", -3)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(String);
</script>

With the basic chart is in place, you can place additional marks to improve
readability. As a first step, pad the SVG container to make space for labels:

{% highlight js linenos %}
var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 440)
    .attr("height", 140)
  .append("g")
    .attr("transform", "translate(10,15)");
{% endhighlight %}

The `g` element is a [container
element](http://www.w3.org/TR/SVG/struct.html), much like the `div` element in
HTML. Setting a
[transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) on a
container affects how its children are positioned. For padding, you need only to
translate; however, for advanced graphical effects, you can use any affine
transformation, such as scale, rotate and shear!

The linear scale, `x`, provides a `ticks` routine that generates values in the
domain at sensible intervals. For a chart this size, about ten ticks is
appropriate; for smaller or larger charts, you can vary the number of ticks to
generate. These tick values serve as data for reference lines:

{% highlight js linenos %}
chart.selectAll("line")
    .data(x.ticks(10))
  .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 120)
    .style("stroke", "#ccc");
{% endhighlight %}

Positioning text above the reference lines reveals their value:

{% highlight js linenos %}
chart.selectAll(".rule")
    .data(x.ticks(10))
  .enter().append("text")
    .attr("class", "rule")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);
{% endhighlight %}

Note that the rule labels are assigned the class "rule"; this avoids a selector
collision with the value labels on each bar. (Another way to disambiguate is to
put reference labels in a separate `g` container.) Lastly, add a single black
line for the *y*-axis:

{% highlight js linenos %}
chart.append("line")
    .attr("y1", 0)
    .attr("y2", 120)
    .style("stroke", "#000");
{% endhighlight %}

Et voilà!

<script type="text/javascript">
var chart = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", 440)
    .attr("height", 140)
    .style("margin-left", "32px") // Tweak alignment…
  .append("g")
    .attr("transform", "translate(10,15)");

chart.selectAll("line")
    .data(x.ticks(10))
  .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 120)
    .style("stroke", "#ccc");

chart.selectAll(".rule")
    .data(x.ticks(10))
  .enter().append("text")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);

chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

chart.selectAll(".bar")
    .data(data)
  .enter().append("text")
    .attr("class", "bar")
    .attr("x", x)
    .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
    .attr("dx", -3)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(String);

chart.append("line")
    .attr("y1", 0)
    .attr("y2", 120)
    .style("stroke", "#000");
</script>

This tutorial covered many of the core concepts in D3, including selections,
dynamic properties, and scales. However, this only scratches the surface!
Continue reading [part 2](bar-2.html) to learn about transitions in dynamic
visualizations. Or, explore the [examples gallery](../ex/) to see more advanced
techniques with D3.

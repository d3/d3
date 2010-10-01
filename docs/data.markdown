---
layout: docs
title: 'data'
---

## <tt>data(<i>v</i>)</tt>

![data](data.png)

Binds the current selection to the given data array *v*. The array may be
specified either as a constant array or a function that returns an array. If a
function, the arguments to *v* are the current data stack, and the context is
null.

The returned data selection includes only the *updating* nodes: nodes that exist
both in the data array and in the current selection. The *entering* and
*exiting* nodes may be addressed separately using the `enter` and `exit`
sub-selections, respectively. The entering selection contains nodes that exist
in the data array but not in the current selection. The `node` value is null for
entering nodes. Entering nodes may be [added](add.html) to the document like so:

{% highlight js linenos %}
.enter.add("div")
{% endhighlight %}

Similarly, the exiting selection contains nodes that exist in the current
selection but not in the data array. The `data` value is null for exiting
nodes. To [remove](remove.html) exiting nodes from the document, say:

{% highlight js linenos %}
.exit.remove()
{% endhighlight %}

An optional key can be specified to determine how the data should be paired with
nodes. More on that below.

### Simple Data

The type of elements in the data array is arbitrary. For example, you can
specify an array of numbers, such as \[4, 8, 15, 16, 23, 42\]. This might be
used to construct a simple bar chart:

{% highlight js linenos %}
d3.select("#chart-1")
  .selectAll("div")
    .data([4, 8, 15, 16, 23, 42])
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; })
  .apply();
{% endhighlight %}

Resulting in:

<style type="text/css">
textarea {
  font: 14px Courier;
  width: 700px;
  height: 140px;
}
.bar {
  text-align: right;
  font: 10px sans-serif;
  padding: 4px;
  margin: 0 1px 1px 0;
  color: white;
  background-color: steelblue;
  -webkit-transition: width 500ms ease;
  -moz-transition: width 500ms ease;
}
span.bar{display:inline-block;}
line{stroke:black;}
line,rect{shape-rendering:crispEdges}
.q0{fill:#1f77b4}
.q1{fill:#ff7f0e}
.q2{fill:#2ca02c}
.q3{fill:#d62728}
.q4{fill:#9467bd}
.q5{fill:#8c564b}
.q6{fill:#e377c2}
.q7{fill:#7f7f7f}
.q8{fill:#bcbd22}
.q9{fill:#17becf}
</style>

<div id="chart-1">
</div>

<script type="text/javascript">
d3.select("#chart-1")
  .selectAll("div")
    .data([4, 8, 15, 16, 23, 42])
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; })
  .apply();
</script>

### Nested Data

You can also specify structured data using a [JSON](http://json.org/) literal.
For example, you might have a two-dimensional nested array of numbers:

{% highlight js linenos %}
var data = [
  [1, 1, 4],
  [1, 2, 8],
  [2, 4, 15],
  [3, 8, 16],
  [5, 16, 23],
  [8, 32, 42]
];
{% endhighlight %}

Nested data can be bound to the document in conjunction with
[selectAll](selectAll.html). In the case of nested arrays, the inner data
property is defined using a function to dereference the nested array:

{% highlight js linenos %}
d3.select("#chart-2")
  .selectAll("div")
    .data(data) // bind nested arrays to outer divs
  .enter.add("div")
  .selectAll("span")
    .data(function(d) { return d; }) // bind individual values to inner spans
  .enter.add("span")
    .attr("class", "bar")
    .style("width", function(d) { return d * 8 + "px"; })
    .text(function(d) { return d; })
  .apply();
{% endhighlight %}

This results in a rudimentary stacked bar chart:

<div id="chart-2">
</div>

<script type="text/javascript">
var data = [
  [1, 1, 4],
  [1, 2, 8],
  [2, 4, 15],
  [3, 8, 16],
  [5, 16, 23],
  [8, 32, 42]
];

d3.select("#chart-2")
  .selectAll("div")
    .data(data)
  .enter.add("div")
  .selectAll("span")
    .data(function(d) { return d; })
  .enter.add("span")
    .attr("class", "bar")
    .style("opacity", function() { return (3 + this.index) / 5; })
    .style("display", "inline-block")
    .style("width", function(d) { return d * 8 + "px"; })
    .text(function(d) { return d; })
  .apply();
</script>

### The Data Stack

Data can be specified either as a constant or as a function, providing a great
deal of flexibility in binding data to the document. When data is bound
recursively, the enclosing data is provided to functions as additional
arguments; this is called the *data stack*. This allows attributes (and other
properties) to be defined in terms of not only their local data, but the
enclosing data as well. It&rsquo;s also useful for dereferencing nested data, as
shown in the previous example.

Consider this tabular data of deaths in the [Crimean
War](http://en.wikipedia.org/wiki/Crimean_War), 1854-1856:

{% highlight js linenos %}
var crimea = [
  {date: "4/1854", wounds: 0, other: 110, disease: 110},
  {date: "5/1854", wounds: 0, other: 95, disease: 105},
  {date: "6/1854", wounds: 0, other: 40, disease: 95},
  {date: "7/1854", wounds: 0, other: 140, disease: 520},
  {date: "8/1854", wounds: 20, other: 150, disease: 800},
  {date: "9/1854", wounds: 220, other: 230, disease: 740},
  ...
];

crimea.causes = ["disease", "wounds", "other"];
{% endhighlight %}

To construct a grouped bar chart, you might first iterate over each of the
series in the data (*i.e.*, the three categorical causes: &ldquo;disease&rdquo;,
&ldquo;wounds&rdquo; and &ldquo;other&rdquo;). Then, iterate over individual
values (*i.e.*., the recorded number of deaths for the given cause for each
month). In abbreviated form:

{% highlight js linenos %}
svg.selectAll("g")
    .data(crimea.causes)
    ...
  .selectAll("rect")
    .data(crimea)
    ...
{% endhighlight %}

You can now refer to both the local (`d`) and enclosing (`p`) data to define
the height:

{% highlight js linenos %}
.attr("height", function(d, p) { return d[p] / 6; })
{% endhighlight %}

The first argument `d` is an element in the `crimea` array; the second argument
`p` is an element in the `crimea.causes` array. The causes are defined as
strings, so `d[p]` for the first series is equivalent to `d.disease`.  For the
second series, it is equivalent to `d.wounds`, and so on. The names of the
JavaScript variables &ldquo;d&rdquo; and &ldquo;p&rdquo; are arbitrary: you can
name the arguments whatever you like, to make the code more readable. By
convention, these examples use the name &ldquo;d&rdquo; for the first argument,
which is the local data.

To construct an SVG image for this grouped bar chart, you might specify an
[svg:g](http://www.w3.org/TR/SVG/struct.html#GElement) (group) element for each
cause, and then an [svg:rect](http://www.w3.org/TR/SVG/shapes.html#RectElement)
element for each value. Here the group element shifts the bars for each series
to the right; the first series is shifted 0 pixels, the second 8 pixels, and the
third 16 pixels. Then within each group element, the first rect is shifted right
an additional 0 pixels, the second 28 pixels, *etc.*:

{% highlight js linenos %}
svg.selectAll("g")
    .data(crimea.causes)
  .enter.add("svg:g")
    .attr("transform", function() { return "translate(" + this.index * 8 + ",0)"; })
  .selectAll("rect")
    .data(crimea)
  .enter.add("svg:rect")
    .attr("x", function() { return this.index * 28; })
    .attr("y", function(d, p) { return 240 - d[p] / 6; })
    .attr("height", function(d, p) { return d[p] / 6; })
    .attr("width", 8);
{% endhighlight %}

This results in a rudimentary grouped bar chart:

<div id="chart-3">
</div>

<script type="text/javascript" src="crimea.js"> </script>
<script type="text/javascript">
var svg = d3.select("#chart-3")
  .add("svg:svg")
    .attr("height", 240)
    .attr("width", 790);

svg.selectAll("g")
    .data(crimea.causes)
  .enter.add("svg:g")
    .attr("transform", function() { return "translate(" + this.index * 8 + ",0)"; })
    .attr("class", function() { return "q" + this.index; })
  .selectAll("rect")
    .data(crimea)
  .enter.add("svg:rect")
    .attr("x", function() { return this.index * 28; })
    .attr("y", function(d, p) { return 240 - d[p] / 6; })
    .attr("height", function(d, p) { return d[p] / 6; })
    .attr("width", 8);

svg.add("svg:line")
    .attr("x1", 0)
    .attr("y1", 240)
    .attr("x2", 790)
    .attr("y2", 240);

svg.apply();
</script>

Note that, for the sake of simplicity, these examples hard-code the dimensions
of the SVG image, and suitable scale factors (*e.g.*, /6, \*8). You can make
your code more flexible by using [scales](scale.html) instead.

### <tt>key(<i>n</i>, <i>v</i>)</tt>

Specifies a binding key name *n* and value *v* that determines how the data
should be paired with the selected nodes. If no key is specified, then data will
be paired with nodes using the index (*i.e.*, the element *i* in the data array
is paired with the node *i* in the current selection).

The name *n* corresponds to an attribute name that stores the key value for each
nodes, such as &ldquo;id&rdquo;. The value function *v* is invoked for each
element in the data array. The arguments to the function *v* are the current
data stack, and the context is null. The function *v* must return the string key
value for the given datum; this return value will be used to lookup nodes by the
named attributed *n*.

### Keyed Enter and Exit

Keys are essential for preserving object constancy during transitions and when
the dataset changes: they provide explicit control over which selected nodes are
bound to which data elements. For example, say we have a dataset of named
values:

{% highlight js linenos %}
var candidates = [
  {name: "Locke", value: 4},
  {name: "Hugo", value: 8},
  {name: "Sawyer", value: 15},
  {name: "Sayid", value: 16},
  {name: "Jack", value: 23},
  {name: "Kwon", value: 42}
];
{% endhighlight %}

To match the `name` field to the node&rsquo;s ID, say:

{% highlight js linenos %}
var t4 = d3.select("#chart-4")
  .selectAll("div")
    .data(candidates)
    .key("id", function(d) { return d.name; });
{% endhighlight %}

To update the width of the bar when the value changes, say:

{% highlight js linenos %}
t4.style("width", function(d) { return d.value * 10 + "px"; });
{% endhighlight %}

Similarly, to define new values on enter:

{% highlight js linenos %}
t4.enter.add("div")
    .attr("class", "bar")
    .attr("id", function(d) { return d.name; })
    .style("width", function(d) { return d.value * 10 + "px"; })
    .text(function(d) { return d.name; });
{% endhighlight %}

And to remove bars on exit:

{% highlight js linenos %}
t4.exit.remove();
{% endhighlight %}

Putting it all together:

<div id="chart-4">
</div>

<script type="text/javascript">
var candidates = [
  {name: "Locke", value: 4},
  {name: "Hugo", value: 8},
  {name: "Sawyer", value: 15},
  {name: "Sayid", value: 16},
  {name: "Jack", value: 23},
  {name: "Kwon", value: 42}
], _candidates = "[\n  {\"name\": \"Locke\", \"value\": 4},\n  {\"name\": \"Hugo\", \"value\": 8},\n  {\"name\": \"Sawyer\", \"value\": 15},\n  {\"name\": \"Sayid\", \"value\": 16},\n  {\"name\": \"Jack\", \"value\": 23},\n  {\"name\": \"Kwon\", \"value\": 42}\n]";

var t4 = d3.select("#chart-4")
  .selectAll("div")
    .data(function() { return candidates; })
    .key("id", function(d) { return d.name; });

t4.style("width", function(d) { return d.value * 10 + "px"; });

t4.enter.add("div")
    .attr("class", "bar")
    .attr("id", function(d) { return d.name; })
    .style("width", function(d) { return d.value * 10 + "px"; })
    .text(function(d) { return d.name; });

t4.exit.remove();

t4.apply();
</script>

Now edit the data and re-apply to see how the key binds the data to specific
elements:

<div class="highlight ex">
  <textarea id="candidates">[
  {"name": "Locke", "value": 4},
  {"name": "Hugo", "value": 8},
  {"name": "Sawyer", "value": 15},
  {"name": "Sayid", "value": 16},
  {"name": "Jack", "value": 23},
  {"name": "Kwon", "value": 42}
]</textarea><br>
  <button onclick="candidates=JSON.parse(document.getElementById('candidates').value);t4.apply()">
    Apply
  </button>
  <button onclick="candidates=JSON.parse(document.getElementById('candidates').value=_candidates);t4.apply()">
    Reset
  </button>
</div>

By default, entering elements are added to the end. An enhancement to this
example might re-sort the elements by value when the data changes.

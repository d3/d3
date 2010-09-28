---
layout: docs
---
What do we mean by data-driven manipulation? Say you have an array of numbers:

{% highlight js linenos %}
var data = [4, 8, 15, 16, 23, 42];
{% endhighlight %}

Typically, if we wanted to construct a rudimentary HTML bar chart of these
numbers in JavaScript, we would iterate over the numbers and create div elements
for each:

{% highlight js linenos %}
var chart = document.getElementById("chart");
for (var i = 0; i < data.length; i++) {
  var bar = document.createElement("div");
  bar.setAttribute("class", "bar");
  bar.style.width = d * 10 + "px";
  bar.appendChild(document.createTextNode(data[i]));
  chart.appendChild(bar);
}
{% endhighlight %}

Using D3, we can reduce the code substantially:

{% highlight js linenos %}
d3.select("#chart")
  .selectAll("div.bar")
    .data(data)
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; })
  .apply();
{% endhighlight %}

Perhaps more importantly, it will be a lot easier to handle dynamic data,
interaction and animation, as we will see! But first, let&rsquo;s take a look at
each of these statements to understand how D3 works.

1. On line 1 (L1), we select the chart element in the current document; this is
   similar to using `document.getElementById`. D3 uses the [W3C Selectors
   API](http://www.w3.org/TR/selectors-api/) for selecting elements, so
   it&rsquo;s easy to select arbitrary elements by tag name, class, ID, and
   other attributes.

2. On L2-3, we select the descendent bar elements of the previously-selected
   chart. Since the chart is initially empty, this returns zero matches.
   However, by binding the selection to the dataset (`data`), we can create a
   *data selection* that includes the entering (missing) elements.

3. On L4-7, we add a bar for each of the entering elements in the dataset, and
   then set the class, width and text content for each bar. The values can be
   defined either as constants, or as functions of data.

5. Lastly, on L8 we apply the transformation we built on the previous lines. D3
   is _declarative_ in that the transformation isn&rsquo;t applied immediately;
   instead, we build up a reusable transform object and then call `apply`. This
   allows the same transform to be re-applied later, such as on animation or to
   handle an event.

The nice thing about data-binding is that we can easily define related
attributes derived from the data. For example, say we wanted to set the
background color of each bar:

{% highlight js linenos %}
    .style("background-color", function(d) { return "rgb(" + ~~(d * 6) + ",50,100)"; })
{% endhighlight %}

D3 provides a slew of handy reusable functions for simplifying the definition of
dynamic data-driven properties. We can also style elements using external,
static CSS. So if we wanted to put a sexy CSS3 gradient on our bar chart,
_simply because we can_:

{% highlight css linenos %}
.bar {
  background: -webkit-gradient(linear, right top, left top, from(transparent), to(steelblue));
  background: -moz-linear-gradient(right, transparent, steelblue);
}
{% endhighlight %}

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

Et voil&agrave;!

<div id="chart-1">
</div>

<script type="text/javascript">
d3.select("#chart-1")
  .selectAll("div.bar")
    .data([4, 8, 15, 16, 23, 42])
  .enter.add("div")
    .attr("class", "bar")
    .style("width", function(d) { return d * 10 + "px"; })
    .style("background-color", function(d) { return "rgb(" + ~~(d * 6) + ",50,100)"; })
    .text(function(d) { return d; })
  .apply();
</script>


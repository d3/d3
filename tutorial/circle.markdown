---
layout: tutorial
title: Three Little Circles
---

# Three Little Circles

<style type="text/css">

.chart {
  background: #fff;
  border: solid 1px #ddd;
  box-shadow: 0 0 4px rgba(0,0,0,.2);
  font: 10px sans-serif;
  height: 180px;
  position: relative;
  width: 720px;
}

.chart svg {
  border-left: solid 2px #ddd;
  left: 360px;
  position: absolute;
  top: 0;
}

.chart pre {
  font: 12px monospace;
  height: 60px;
  left: 10px;
  position: absolute;
  top: 0;
  width: 340px;
}

.chart circle.little {
  fill: #aaa;
  stroke: #666;
  stroke-width: 1.5px;
}

.chart button {
  left: 275px;
  position: absolute;
  top: 145px;
  width: 80px;
}

.chart .data rect {
  fill: #eee;
  stroke: #ccc;
}

</style>

<script type="text/javascript">
var data = [32, 57, 112],
    dataEnter = data.concat(293),
    dataExit = data.slice(0, 2),
    w = 360,
    h = 180,
    x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
    y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);
</script>

Once upon a time, there were three little circles. This tutorial shows you how
to manipulate them using selections.

## Selecting Elements

The [selectAll](https://github.com/mbostock/d3/wiki/Selections#selectAll)
operator takes a [selector](http://www.w3.org/TR/CSS2/selector.html) string,
such as "circle", and returns a selection:

<div id="chart-2" class="chart">
<pre class="code">
var circle = svg.selectAll("circle");
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-2").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12);

  d3.select("#chart-2 button").on("click", function() {
    svg.selectAll("circle.select").remove();

    svg.selectAll("circle.select")
        .data(data)
      .enter().append("svg:circle")
        .attr("class", "select")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 60)
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 3)
      .transition()
        .duration(750)
        .attr("r", 12)
        .style("stroke-opacity", 1);
  });
})();
</script>

Once we have a selection, we can apply various operators to the selected
elements. For example, we might change the fill color using
[style](https://github.com/mbostock/d3/wiki/Selections#style), and the radius
and the *y*-position using
[attr](https://github.com/mbostock/d3/wiki/Selections#attr):

<div id="chart-3" class="chart">
<pre class="code">
circle.style("fill", "steelblue");
circle.attr("cy", 90);
circle.attr("r", 30);
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-3").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var circle = svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12);

  d3.select("#chart-3 button").on("click", function() {
    circle.style("fill", "#aaa").attr("r", 12).attr("cy", y);
    circle.transition().duration(500).delay(0).style("fill", "steelblue");
    circle.transition().duration(500).delay(500).attr("cy", 90);
    circle.transition().duration(500).delay(1000).attr("r", 30);
  });
})();
</script>

We can also compute the attribute values dynamically, using functions rather
than constants. For example, maybe we want to set the *x*-coordinate to a random
value:

<div id="chart-4" class="chart">
<pre class="code">
circle.attr("cx", function() {
  return Math.random() * w;
});
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-4").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12);

  d3.select("#chart-4 button").on("click", function() {
    svg.selectAll("circle")
      .transition()
        .duration(750)
        .attr("cx", function() { return Math.random() * w; });
  });
})();
</script>

If you run this example multiple times, you'll see that the attribute is
recomputed as a number random number each time. Unlike Protovis, D3 doesn't
stash these functions internally; they are run once, immediately, and then your
code continues. So you can run them again or redefine them however you like.

## Binding Data

This is beginning to look a lot like [jQuery](http://jquery.com/). More
commonly, though, we want to use *data* to drive the appearance of our circles.
To do that, we need some data. For the sake of example, let's imagine that each
of these circles represents a number: 32, 57 and 112. The
[data](https://github.com/mbostock/d3/wiki/Selections#data) operator binds these
numbers to the circles:

<div id="chart-5" class="chart">
<pre class="code">
circle.data([32, 57, 112]);
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-5").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12);

  var g = svg.selectAll("g.data")
      .data(data)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-5 button").on("click", function() {
    g
        .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; })
      .select("rect")
        .style("opacity", 1);

    g.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; })
      .select("rect")
        .style("opacity", 1e-6);
  });
})();
</script>

All data in D3 is specified as an array of values. Conveniently, this mirrors
the concept of a selection, which is just an array of elements. Notice then how
the first number (the first *datum*, 32) is bound to the first circle (the first
*element*, on top), the second number is bound to the second circle, and so on.


Once data is bound, that data is accessible as an argument to our attribute and
style functions. This means we visually encode data, or in other words, create
a visualization! For example, here we set the *x*-position and radius using the
data:

<div id="chart-6" class="chart">
<pre class="code">
circle.attr("cx", function(d) {
  return d;
});

circle.attr("r", function(d) {
  return Math.sqrt(d);
});
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-6").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g")
      .data(data)
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 12);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-6 button").on("click", function() {
    g
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; })
      .select("circle")
        .attr("r", 12);

    g.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + d + "," + y(d) + ")"; })
      .select("circle")
        .attr("r", Math.sqrt);
  });
})();
</script>

There's a second argument to each function you can use: it specifies the *index*
of the element within its selection. This is a
[zero-based](http://en.wikipedia.org/wiki/Zero-based_numbering) index, and it's
useful for computing offsets or as a simple way of identifying individual
elements. The argument is optional; if you don't specify it when declaring your
function, it will be ignored. For example:

<div id="chart-6b" class="chart">
<pre class="code">
circle.attr("cx", function(d, i) {
  return i * 100 + 30;
});
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-6b").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g")
      .data(data)
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 12);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d, i) { return i; });

  d3.select("#chart-6b button").on("click", function() {
    g
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; })
      .transition()
        .duration(750)
        .attr("transform", function(d, i) { return "translate(" + (i * 100 + 30) + "," + y(d) + ")"; });
  });
})();
</script>

Here we use the index *i* to position the elements sequentially only the
*x*-dimension. Each element is separated by 100 pixels, with an offset of 30
pixels from the left side. In SVG, the origin is in the top-left corner.

## Creating Elements

But what if we had *four* numbers to display, rather than three? We wouldn't
have enough circles to display all the numbers. When joining data to elements,
D3 stores the leftover data in the
[enter](https://github.com/mbostock/d3/wiki/Selections#enter) selection. (The
terms "enter" and "exit" are adopted from stage terminology.) Here, the fourth
number 293 remains in the enter selection, because we only have three circle
elements:

<div id="chart-7" class="chart">
<pre class="code">
var circle = svg.selectAll("circle")
    .data([32, 57, 112, 293]);
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-7").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12);

  var g = svg.selectAll("g.data")
      .data(dataEnter)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-7 button").on("click", function() {
    g
        .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; })
      .select("rect")
        .style("opacity", 1);

    g.filter(function(d, i) { return i != 3; }).transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; })
      .select("rect")
        .style("opacity", 1e-6);

    g.select("rect").filter(function(d, i) { return i == 3; })
        .style("fill", "#eee")
        .style("stroke", "#ccc")
      .transition()
        .duration(750)
        .style("fill", "lightgreen")
        .style("stroke", "green");
  });
})();
</script>

Using the enter selection, we can create new circles for any missing data. Each
new circle is already bound to the data, so we can use data to compute
attributes and styles:

<div id="chart-8" class="chart">
<pre class="code">
var enter = circle.enter().append("svg:circle");

enter.attr("cy", 90);

enter.attr("cx", 160);

enter.attr("r", function(d) {
  return Math.sqrt(d);
});
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-8").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g")
      .data(data)
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 12);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  var g = svg.selectAll("g.data")
      .data(dataEnter)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; })
      .filter(function(d, i) { return i == 3; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 1e-6);

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", "lightgreen")
      .style("stroke", "green");

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-8 button").on("click", function() {
    g.attr("transform", "translate(80,20)");
    g.select("circle").attr("r", 1e-6);
    g.select("rect").style("opacity", 1);
    var t = g.transition().duration(750);
    t.attr("transform", "translate(160,100)");
    t.select("circle").attr("r", Math.sqrt);
    t.select("rect").style("opacity", 1e-6);
  });
})();
</script>

Taking this to the next logical step, then, what if we have *no* existing
elements? Meaning, what if the document is empty? Say we start with an empty
page, and we want to create new circles that correspond to our data? Then we're
joining data to an empty selection, and all of the data ends up in *enter*:

<div id="chart-9" class="chart">
<pre class="code">
var enter = circle.enter().append("svg:circle");

enter.attr("cy", 90);

enter.attr("cx", function(d) {
  return d;
});

enter.attr("r", function(d) {
  return Math.sqrt(d);
});
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-9").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g.data")
      .data(dataEnter)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 1e-6);

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", "lightgreen")
      .style("stroke", "green");

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-9 button").on("click", function() {
    g.attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });
    g.select("rect").style("opacity", 1);
    g.select("circle").attr("r", 1e-6);

    var t = g.transition().duration(750);
    t.attr("transform", function(d, i) { return "translate(" + d + ",90)"; });
    t.select("circle").attr("r", Math.sqrt);
    t.select("rect").style("opacity", 1e-6);
  });
})();
</script>

This pattern is so common, you'll often see the
[selectAll](https://github.com/mbostock/d3/wiki/Selections#selectAll) +
[data](https://github.com/mbostock/d3/wiki/Selections#data) +
[enter](https://github.com/mbostock/d3/wiki/Selections#enter) +
[append](https://github.com/mbostock/d3/wiki/Selections#append) operators called
sequentially, one immediately after the other. Despite it being common, keep in
mind that this is just one special case of a data join; we've already seen
another common case (selecting elements for update) and we'll see other
interesting cases to consider in a bit.

Another technique you can use to make your code more concise is [method
chaining](http://en.wikipedia.org/wiki/Method_chaining). Each operator in D3
returns the current selection, so you can apply multiple operators sequentially.
For example, the above code can be rewritten:

<div id="chart-10" class="chart">
<pre class="code">
svg.selectAll("circle")
    .data([32, 57, 112, 293])
  .enter().append("svg:circle")
    .attr("cy", 90)
    .attr("cx", String)
    .attr("r", Math.sqrt);
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-10").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g.data")
      .data(dataEnter)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 1e-6);

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", "lightgreen")
      .style("stroke", "green");

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-10 button").on("click", function() {
    g.attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });
    g.select("rect").style("opacity", 1);
    g.select("circle").attr("r", 1e-6);

    var t = g.transition().duration(750);
    t.attr("transform", function(d, i) { return "translate(" + d + ",90)"; });
    t.select("circle").attr("r", Math.sqrt);
    t.select("rect").style("opacity", 1e-6);
  });
})();
</script>

As you can see, the code is made even smaller using built-in JavaScript
functions, rather than defining anonymous ones. The built-in
[String](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String) method, for example, is a shorthand way of using JavaScript's default string
conversion to compute the attribute value from the associated data. Similarly,
we can plug in
[Math.sqrt](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/sqrt)
to set the radius attribute as the square root of the associated data. This
technique of plugging in reusable functions to compute attribute values is used
extensively in D3, particularly in conjunction with
[scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales) and
[shapes](https://github.com/mbostock/d3/wiki/SVG-Shapes).

## Destroying Elements

Sometimes you have the opposite problem from creation: you have too *many*
existing elements, and you want to remove them. You can select nodes and
[remove](https://github.com/mbostock/d3/wiki/Selections#remove) them, but more
commonly, you'll use the [exit](https://github.com/mbostock/d3/wiki/Selections#exit)
selection to let D3 determine which elements are exiting the stage. The exit
selection is the opposite of the enter selection: it contains all elements for
which there is no corresponding data.

<div id="chart-11" class="chart">
<pre class="code">
var circle = svg.selectAll("circle")
    .data([32, 57]);
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-11").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var circle = svg.selectAll("circle")
      .data(data)
    .enter().append("svg:circle")
      .attr("class", "little")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 12)
      .filter(function(d, i) { return i == 2; });

  var g = svg.selectAll("g.data")
      .data(dataExit)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  g.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  d3.select("#chart-11 button").on("click", function() {
    g
        .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; })
      .select("rect")
        .style("opacity", 1);

    g.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; })
      .select("rect")
        .style("opacity", 1e-6);

    circle
        .style("fill", "#aaa")
        .style("stroke", "#666")
      .transition()
        .duration(750)
        .style("fill", "lightcoral")
        .style("stroke", "red");
  });
})();
</script>

All that's left to do, then, is to remove the exiting elements:

<div id="chart-12" class="chart">
<pre class="code">
circle.exit().remove();
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-12").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var g = svg.selectAll("g.data")
      .data(data)
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });

  g.append("svg:circle")
      .attr("class", "little")
      .attr("r", 12);

  g.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  g = g.filter(function(d, i) { return i == 2; });

  g.select("circle")
      .style("fill", "lightcoral")
      .style("stroke", "red");

  d3.select("#chart-12 button").on("click", function() {
    g.select("circle").attr("r", 12);
    g.select("text").style("opacity", 1);
    var t = g.transition().duration(750);
    t.select("circle").attr("r", 1e-6);
    t.select("text").style("opacity", 1e-6);
  });
})();
</script>

The enter, update and exit selections are computed by the [data](https://github.com/mbostock/d3/wiki/Selections#data)
operator, and don't change when you append or remove elements—at least until you
call [selectAll](https://github.com/mbostock/d3/wiki/Selections#selectAll)
again. So, if you keep variables around that point to selections (such as
`circle`, above), you'll probably want to reselect after adding or removing
elements.

## All Together Now

Putting everything together, consider the three possible outcomes that result
from joining data to elements:

1. enter - incoming actors, entering the stage.
2. update - persistent actors, staying on stage.
3. exit - outgoing actors, exiting the stage.

When we use the default join-by-index, either the enter or exit selection will
be empty (or both): if there are more data than elements, the extra data are in
the enter selection; if there are fewer data than elements, the extra elements
are in the exit selection. However, by specifying a key function to the data
operator, we can control exactly how data is bound to elements. And in this
case, we have both enter and exit.

<div id="chart-13" class="chart">
<pre class="code">
var circle = svg.selectAll("circle")
    .data([32, 57, 293], String);

circle.enter().append("svg:circle")
    .attr("cy", 90)
    .attr("cx", String)
    .attr("r", Math.sqrt);

circle.exit().remove();
</pre>
<button>Run</button>
</div>

<script type="text/javascript">
(function() {
  var svg = d3.select("#chart-13").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

  var gd = svg.selectAll("g.data")
      .data([32, 57, 293])
    .enter().append("svg:g")
      .attr("class", "data")
      .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; });

  var ed = gd.filter(function(d, i) { return i == 2; }),
      ud = gd.filter(function(d, i) { return i != 2; });

  ed.append("svg:circle")
      .attr("class", "little")
      .attr("r", 1e-6);

  gd.append("svg:rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 20)
      .attr("height", 20);

  gd.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  var ge = svg.selectAll("g.element")
      .data(data)
    .enter().append("svg:g")
      .attr("class", "element")
      .attr("transform", function(d) { return "translate(" + d + ",90)"; });

  ge.append("svg:circle")
      .attr("class", "little")
      .attr("r", Math.sqrt);

  ge.append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(String);

  ed.select("rect")
      .style("fill", "lightgreen")
      .style("stroke", "green");

  var xe = ge.filter(function(d, i) { return i == 2; });

  xe.select("circle")
      .style("fill", "lightcoral")
      .style("stroke", "red");

  d3.select("#chart-13 button").on("click", function() {
    gd
        .attr("transform", function(d, i) { return "translate(" + 20 * (i + 1) + ",20)"; })
      .transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + d + ",90)"; });

    gd.select("rect")
        .style("opacity", 1)
      .transition()
        .duration(750)
        .style("opacity", 1e-6);

    ed.select("circle")
        .attr("r", 1e-6)
      .transition()
        .duration(750)
        .attr("r", Math.sqrt);

    xe.select("circle")
        .attr("r", Math.sqrt)
      .transition()
        .duration(750)
        .attr("r", 1e-6);

    xe.select("text")
        .style("opacity", 1)
      .transition()
        .duration(750)
        .style("opacity", 1e-6);
  });
})();
</script>

Want to learn more about selections and transitions? Read
[A Bar Chart, Part 2](bar-2.html) for a practical example of using enter and
exit to display realtime data.

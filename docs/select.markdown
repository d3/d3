---
layout: docs
title: 'select'
---

## <tt>select(<i>s</i>)</tt>

![select](select.png)

Selects the first descendant of each node in the current selection that matches
the [selector](http://www.w3.org/TR/css3-selectors/) string *s*. The first
descendant is determined using *document order*: depth-first pre-order traversal
of the DOM tree or subtree in question. The descendant does not need to be an
immediate child of the context node.

For example, given the following HTML:

{% highlight html linenos %}
<table>
  <tr><td>1.</td><td>One</td></tr>
  <tr><td>2.</td><td>Two</td></tr>
  <tr><td>3.</td><td>Three</td></tr>
</table>
{% endhighlight %}

<div class="highlight ex">
  <table>
    <tr><td>1.</td><td>One</td></tr>
    <tr><td>2.</td><td>Two</td></tr>
    <tr><td>3.</td><td>Three</td></tr>
  </table>
</div>

To select all `tr` elements, then sub-select the first `td` elements, say:

{% highlight js linenos %}
d3.selectAll("tr")
  .select("td")
    .style("background-color", "yellow")
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.selectAll('tr')
      .select('td')
        .style('background-color', 'yellow')
        .apply()">
    Apply
  </button>
  <button onclick="d3.selectAll('tr')
      .select('td')
        .style('background-color', null)
        .apply()">
    Reset
  </button>
</div>

Note that this example could alternatively be written using the
[:first-child](http://www.w3.org/TR/CSS2/selector.html#first-child)
psuedo-class.

## <tt>d3.select(<i>s</i>)</tt>

![select](select-init.png)

Selects the first descendent of the current document that matches the
[selector](http://www.w3.org/TR/css3-selectors/) string *s*. The first
descendant is determined using *document order*: depth-first pre-order traversal
of the DOM tree or subtree in question. The descendant does not need to be an
immediate child of the root element.

For example, given the following HTML:

{% highlight html linenos %}
<html>
  <body>
    <span id="hello">...</span>
  </body>
</html>
{% endhighlight %}

<div class="highlight ex">
  <span id="hello">...</span>
</div>

To select the span, say:

{% highlight js linenos %}
d3.select("#hello")
    .text("Hello, world!")
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.select('#hello')
        .text('Hello, world!')
        .apply()">
    Apply
  </button>
  <button onclick="d3.select('#hello')
        .text('...')
        .apply()">
    Reset
  </button>
</div>

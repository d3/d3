---
layout: docs
title: 'selectAll'
---

## <tt>selectAll(<i>s</i>)</tt>

![selectAll](selectAll.png)

For each node in the current selection, selects all descendants of the given
node that match the [selector](http://www.w3.org/TR/css3-selectors/) string
*s*. Each sub-selection is processed independently, with selected nodes returned
in *document order*: depth-first pre-order traversal of the DOM tree or subtree
in question. The descendants do not need to be immediate children of the context
node.

For example, given the following HTML:

{% highlight html linenos %}
<table id="ex1">
  <tr><td>1.</td><td>One</td></tr>
  <tr><td>2.</td><td>Two</td></tr>
  <tr><td>3.</td><td>Three</td></tr>
</table>
{% endhighlight %}

<style type="text/css">
.q0{background:#1f77b4}
.q1{background:#ff7f0e}
.q2{background:#2ca02c}
.q3{background:#d62728}
.q4{background:#9467bd}
.q5{background:#8c564b}
.q6{background:#e377c2}
.q7{background:#7f7f7f}
.q8{background:#bcbd22}
.q9{background:#17becf}
</style>

<div class="highlight ex">
  <table id="ex1">
    <tr><td>1.</td><td>One</td></tr>
    <tr><td>2.</td><td>Two</td></tr>
    <tr><td>3.</td><td>Three</td></tr>
  </table>
</div>

To select all rows within the table &ldquo;ex1&rdquo;, then sub-select all
descendant cells, say:

{% highlight js linenos %}
d3.selectAll("#ex1 tr")
  .selectAll("td")
    .attr("class", function() { return "q" + this.index; })
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.selectAll('#ex1 tr').selectAll('td').attr('class', function() { return 'q' + this.index; }).apply()">
    Apply
  </button>
  <button onclick="d3.selectAll('#ex1 tr').selectAll('td').attr('class', null).apply()">
    Reset
  </button>
</div>

The classes &ldquo;q0&rdquo;, &ldquo;q1&rdquo; *etc.* are used here to style the
selected elements. The same elements can be selected using a single selector,
&ldquo;#ex1 tr td&rdquo;, but the behavior is different because the matched
elements are processed as a single set. See below for details.

## <tt>d3.selectAll(<i>s</i>)</tt>

![selectAll](selectAll-init.png)

Selects all descendants of the current document that match the
[selector](http://www.w3.org/TR/css3-selectors/) string *s*. The selected nodes
are returned in *document order*: depth-first pre-order traversal of the DOM
tree or subtree in question. The descendants do not need to be immediate
children of the document element.

For example, given the following HTML:

{% highlight html linenos %}
<table id="ex2">
  <tr><td>1.</td><td>One</td></tr>
  <tr><td>2.</td><td>Two</td></tr>
  <tr><td>3.</td><td>Three</td></tr>
</table>
{% endhighlight %}

<div class="highlight ex">
  <table id="ex2">
    <tr><td>1.</td><td>One</td></tr>
    <tr><td>2.</td><td>Two</td></tr>
    <tr><td>3.</td><td>Three</td></tr>
  </table>
</div>

To select all cells within the table &ldquo;ex2&rdquo;, say:

{% highlight js linenos %}
d3.selectAll("#ex2 td")
    .attr("class", function() { return "q" + this.index; })
    .apply();
{% endhighlight %}

<div class="highlight ex">
  <button onclick="d3.selectAll('#ex2 td').attr('class', function() { return 'q' + this.index; }).apply()">
    Apply
  </button>
  <button onclick="d3.selectAll('#ex2 td').attr('class', null).apply()">
    Reset
  </button>
</div>

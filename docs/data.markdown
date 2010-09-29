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
sub-selections, respectively. An optional key can be specified to determine how
the data should be paired with nodes.

The type of elements in the data array is arbitrary. For example, you can
specify an array of numbers:

{% highlight js linenos %}
.data([4, 8, 15, 16, 23, 42])
{% endhighlight %}

Or you might specify structured data using a [JSON](http://json.org/) literal:

{% highlight js linenos %}
.data([
  {date: "4/1854", wounds: 0, other: 110, disease: 110},
  {date: "5/1854", wounds: 0, other: 95, disease: 105},
  {date: "6/1854", wounds: 0, other: 40, disease: 95},
  {date: "7/1854", wounds: 0, other: 140, disease: 520},
  {date: "8/1854", wounds: 20, other: 150, disease: 800},
  {date: "9/1854", wounds: 220, other: 230, disease: 740},
  ...
])
{% endhighlight %}

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
named attributed *n*. For example, to match the `date` field to the node&rsquo;s
ID:

{% highlight js linenos %}
.key("id", function(d) { return d.date; })
{% endhighlight %}

### <tt>enter</tt>

The entering selection: nodes that exist in the data array but not in the
current selection. The `node` value is null for entering nodes. Typically,
entering nodes are [added](add.html) to the document:

{% highlight js linenos %}
.enter.add("div")
{% endhighlight %}

### <tt>exit</tt>

The exiting selection: nodes that exist in the current selection but not in the
data array. The `data` value is null for exiting nodes. Typically, exiting nodes
are [removed](remove.html) from the document:

{% highlight js linenos %}
.exit.remove()
{% endhighlight %}

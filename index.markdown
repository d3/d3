---
layout: default
---

# d3.js

## Data-Driven Documents

**D3.js** is a small, [free](https://github.com/mbostock/d3/raw/master/LICENSE)
JavaScript library for manipulating documents based on data.

<div class="gallery">
  <img src="calendar.png">
  <img src="chord.png">
  <img src="choropleth.png">
  <img src="force.png">
  <img src="splom.png">
  <img src="stack.png">
  <img src="stream.png">
  <img src="voronoi.png">
</div>

D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then
apply data-driven transformations to the document. As a trivial example, you can
use D3 to generate a basic HTML table from an array of numbers. Or, use the same
data to create an interactive SVG bar chart with smooth transitions and
interaction.

D3 is not a traditional visualization framework. Rather than provide a
monolithic system with all the features anyone may ever need, D3 solves only the
crux of the problem: efficient manipulation of documents based on data. This
gives D3 extraordinary flexibility, exposing the full capabilities of underlying
technologies such as [CSS3](http://www.w3.org/Style/CSS/current-work),
[HTML5](http://www.w3.org/TR/html5/) and [SVG](http://www.w3.org/TR/SVG/). It
avoids learning a new intermediate proprietary representation. With minimal
overhead, D3 is extremely fast, supporting large datasets and dynamic behaviors
for interaction and animation. And, for those common needs, D3's functional
style allows code reuse through a diverse collection of optional modules.

### Selections

Modifying documents using the native W3C [DOM API](http://www.w3.org/DOM/DOMTR)
is indubitably tedious; not only are the method names verbose, but the
imperative approach requires manual iteration and bookkeeping of temporary
state. For example, to change the text color of paragraph elements:

{% highlight js linenos %}
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "white", null);
}
{% endhighlight %}

Instead of manipulating individual nodes, D3 employs a declarative approach,
operating on arbitrary sets of nodes called *selections*. For example, you can
rewrite the above loop in 40 characters rather than 190:

{% highlight js linenos %}
d3.selectAll("p")
    .style("color", "white");
{% endhighlight %}

Of course, a selection may trivially consist of only a single node:

{% highlight js linenos %}
d3.select("body")
    .style("background-color", "black");
{% endhighlight %}

The selector format is defined by the W3C [Selectors
API](http://www.w3.org/TR/selectors-api/), supported natively by modern
browsers. Backwards-compatibility for older browsers can be provided by
[Sizzle](http://sizzlejs.com/). The above examples select nodes by tag name ("p"
and "body", respectively). Elements may be selected using a variety of
predicates, including containment, attribute values, and associated class or ID.
And in the future, D3 could be extended to support additional selector formats,
such as [XPath](http://www.w3.org/TR/xpath/).

D3 provides standard facilities for mutating nodes: setting attributes or
styles; registering event listeners; adding, removing or sorting nodes; and
changing HTML or text content. These suffice for the vast majority of needs.
However, if the underlying DOM API is strictly needed, the nodes in a selection
can be accessed directly, as each D3 selection is simply an array of nodes.

### Dynamic Properties

Readers familiar with [jQuery](http://jquery.com/) or
[Prototype](http://www.prototypejs.org/) should immediately recognize
similarities with D3. However, styles, attributes, and other properties can be
specified as *functions of data* in D3, not just simple constants.  Although
their appearance is simple, these functions can be surprisingly powerful; the
`d3.geo.path` function, for example, projects [geographic
coordinates](http://geojson.org/) into SVG [path
data](http://www.w3.org/TR/SVG/paths.html#PathData). D3 provides many built-in
reusable functions and function factories, such as graphical primitives for
area, line and pie charts.

How might you use dynamic properties? To start with a simple functional example,
color paragraphs by picking random colors from the rainbow:

{% highlight js linenos %}
d3.selectAll("p")
    .style("color", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
{% endhighlight %}

Or use the node index `i`, provided as the second argument, to alternate shades
of gray for even and odd nodes:

{% highlight js linenos %}
d3.selectAll("p")
    .style("color", function(d, i) {
      return i % 2 ? "#fff" : "#eee";
    });
{% endhighlight %}

D3 also allows you to bind data to a selection; this data is available when
computing properties. The data is specified as an array of arbitrary values
(whatever you want), and each value to passed as the first argument (`d`) to
property functions. The first element in the data array is passed to the first
node in the selection, the second element to the second node, and so on. For
example, if you bind an array of numbers to paragraph elements, you can use
these numbers to compute dynamic font sizes:

{% highlight js linenos %}
d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
{% endhighlight %}

Once the data has been bound to the document, you can omit the `data` operator,
and D3 will retrieve the previously-bound data per node. This allows you to
recompute properties without explicitly respecifying the associated data.

### Enter and Exit

D3 can easily manipulate existing nodes, but what if the nodes don't exist yet?
Similarly, what if there are more nodes in the document than elements in your
data array, and you want to remove the surplus? Using the *enter* and *exit*
selections, you can add new nodes to match your data, and remove nodes that are
no longer needed.

When data is bound to a selection of nodes, each element in the data array is
paired with the corresponding node in the selection. If there are fewer nodes
than data, the extra data elements form the enter selection, which you can
instantiate using the `enter` operator. This operator takes the name of the node
to append to the document, such as "p" for paragraph elements:

{% highlight js linenos %}
d3.select("body")
  .selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
  .enter("p")
    .text(function(d) { return "I'm number " + d + "!"; });
{% endhighlight %}

A common pattern is to break the initial selection into three parts: the
updating nodes to modify, the entering nodes to add, and the exiting nodes to
remove.

{% highlight js linenos %}
// Update…
var p = d3.select("body")
  .selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .text(String);

// Enter…
p.enter("p")
    .text(String);

// Exit…
p.exit()
  .remove();
{% endhighlight %}

By handling these three cases separately, you can perform only the necessary
modifications on each set of nodes. This is particularly useful when specifying
transitions. For example, with a bar chart you might initialize entering bars
using the old scale, and then transition entering bars to the new scale along
with the updating and exiting bars. If you want to share dynamic properties
across enter and update, you can reselect nodes after instantiating the enter
selection, or use the `call` (mix-in) operator.

Note that the updating nodes are actually the default selection—the result of
the `data` operator. Thus, if you forget about the enter and exit selections,
you will automatically select only the elements for which there exists
corresponding data.

To reiterate, D3 lets you transform *existing* documents (node hierarchies)
based on data. This generalization includes creating new documents, where the
starting selection is the empty node. D3 allows you to change an existing
document in response to user interaction, animation over time, or even
asynchronous notification from a third-party. A hybrid approach is even
possible, where the document is initially rendered on the server, and
updated on the client via D3.

<!--
By breaking the selection into three pieces—enter, update and exit—the user can
define the minimal set of operations that need to apply to each subselection.
Very often this includes different transitions for each subselection. Standard
practice for chart transitions is to initialize entering nodes using the old
layout, and to transition exiting nodes to the new layout. This allows entering
and exiting nodes to transition consistently with the updating nodes.

Often, the set of the nodes matching the selector are empty, as the nodes have
not yet been created! By binding this empty selection to the data, you can
create a *virtual* selection, with null nodes for each element in the dataset
that does not yet exist in the document. The `enter` operator then creates the
nodes, appending them to the document and materializing the selection. (Enter,
exit and update selections are discussed further in the section on data
binding.)

 For example, to add a tooltip
to the images:

{% highlight js linenos %}
d3.selectAll("div img")
    .attr("title", function(d) { return d.description; });
{% endhighlight %}

Here the selector "div img" is interpreted as `img` elements that are
descendants of `div` elements…
 -->

### Transformation, not Representation

D3 does not provide a new graphical representation—unlike
[Processing](http://processing.org/), [Raphaël](http://raphaeljs.com/), or
[Protovis](http://vis.stanford.edu/protovis/), there is no new vocabulary of
marks to learn. Instead, you build directly on standards such as CSS3, HTML5 and
SVG. This approach offers numerous advantages. You have full access to the
underlying browser's functionality; for example, you can create elements using
D3, and then style them with external stylesheets. You can use advanced filters
such as dashed strokes and composite filter effects. If browser makers introduce
new features to CSS tomorrow, you'll be able to use them immediately rather than
waiting for a toolkit update. And, if you decide in the future to use a toolkit
other than D3, you can take your enhanced knowledge of open standards with you!

Consider the wheel. In Processing, you create a circle using the `ellipse`
operator, which takes four arguments: the *x* and *y* of the ellipse center, and
the *width* and *height*. Raphaël provides an `ellipse` operator with the same
arguments, and a `circle` operator that takes three arguments using *radius*.
Protovis defines `pv.Dot` and `pv.Wedge` mark types. D3, in contast, does not
reinvent the wheel, instead using the standard `svg:circle` element:

{% highlight js linenos %}
svg.append("svg:circle")
    .attr("cx", 50)
    .attr("cy", 40)
    .attr("r", 10);
{% endhighlight %}

Because D3 does not specify a particular representation of circle, you can
define alternate forms that may offer better performance or compatibility, such
as pure HTML:

{% highlight js linenos %}
body.append("div")
    .style("position", "absolute")
    .style("left", "40px")
    .style("top", "30px")
    .style("width", "20px")
    .style("height", "20px")
    .style("border-radius", "10px")
    .style("background-color", "#000");
{% endhighlight %}

D3 is easy to debug using the browser's built-in inspector: the nodes that you
manipulate are exactly those that can be inspected natively by the browser.
Furthermore, operations are applied immediately (within the scope of operators
such as `style`), and the selection object is an array of nodes.

### Transitions

Given D3's focus on manipulation—not just a one-time mapping of data to a static
representation—it naturally includes support for smooth transitions. These are
gradual interpolation of styles or attributes over time. Various easing
functions are provided to vary tweening, such as "elastic", "cubic-in-out" and
"linear". D3 knows how to interpolate basic types, such as numbers and numbers
embedded within strings (font sizes, path data, *etc.*). You can provide your
own interpolator to extend transitions to more complex properties, such as a
backing data structure.

Transitions are trivially created from selections via the `transition` operator.
To fade the background of the page to black, say:

{% highlight js linenos %}
d3.select("body").transition()
    .style("background-color", "black");
{% endhighlight %}

You can use CSS3 transitions, too! D3 does not replace the browser's toolbox,
but instead exposes it in a way that is easier to use. A more complex resizing
of circles in a symbol map can still be expressed succinctly:

{% highlight js linenos %}
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { return Math.sqrt(d * scale); });
{% endhighlight %}

The transition's duration and delay parameters can be customized, and as with
other properties, specified as functions of data. This is particularly
convenient for running a staggered delay by index (`i`), allowing the viewer to
follow individual elements across the transition more easily.

By dirtying only the attributes that actually change during the transition, D3
eliminates any overhead, allowing greater graphical complexity and higher frame
rates. Transitions dispatch an event on end that allows sequencing of complex
multi-stage transitions.

### Subselections

Most documents have some hierarchical structure. For example, what if you wanted
to first select all lists, and then select all their list items? By calling
`selectAll` on an existing selection, you generate a subselection for each node:

{% highlight js linenos %}
d3.selectAll("ul")
  .selectAll("li")
    .text(function(d, i) { return "I'm number " + i + "!"; });
{% endhighlight %}

The result of the first `selectAll` contains all `ul` elements, while the second
contains all `li` elements that are within `ul` elements. This results in a
simple tree structure that mirrors the document:

![subselect](subselectAll.png)

The second selection is *grouped* according to the first selection: the index
(`i`) for the list items (`li` elements) corresponds to their index *within* the
list, rather than across all lists. By grouping elements, D3 allows you to
maintain the hierarchical structure as you recursively descend into the
document.

For example, if your associated data is hierarchical—say a list of multiple
choice questions, each with a set of possible responses—you can map the list of
questions to the first `ul` selection, and then each set of responses to the
groups in the second `li` selection. The `data` property is evaluated for each
group of the subselection:

{% highlight js linenos %}
d3.selectAll("ul")
    .data(questions) // an array of questions
  .selectAll("li")
    .data(function(d) { return d.responses; }) // a nested array of responses
    .text(function(d) { return d.text; }); // the text of the response
{% endhighlight %}

Thus, the `data` property can *also* be defined as a function, taking as an
argument the data associated with the parent node. By combining subselection
with the `enter` and `exit` operators, you can use D3 to construct and update
complex hierarchical documents with a minimum amount of code.

<!--
Whereas `selectAll` groups the subselection by the parent node (the list element
in the above example), the `select` operator maintains the original grouping.
Thus, if we replace the second `selectAll` with a `select`, we will instead
obtain a flat selection of the first list items within each list:

![subselect](subselect.png)

Subselections are obtained by calling `select` or `selectAll` on an existing
selection. (Conceptually, the `d3` global is a singleton selection of the root
`document`.) When `select` is used, the specified selector is queried on each of
the nodes in the existing selection. The returned selection has the same number
of nodes as the original selection. For example, to select the first bold (`b`)
element within all paragraph (`p`) elements:

{% highlight js linenos %}
d3.selectAll("p")
  .select("b");
{% endhighlight %}

With `selectAll`, the returned selection contains *all* matching nodes, for
*each* node in the original selection, so grouped. Thus, in the photo-sharing
example above, the index (`i`) for the image elements is of the array of photos,
whereas the corresponding index for the parent div elements is of the array of
albums.
-->

### Data Joins

With simple documents, it may suffice to map data elements to nodes by index.
However, more complicated manipulations require a *join* specification. A data
join consists of two functions: a function that maps data to a unique string
key, and a function that maps nodes to the corresponding key. When the key for a
datum and a node are equal, the node and the datum are joined. For example, to
join the data attribute `key` with the node attribute of the same name:

{% highlight js linenos %}
d3.selectAll("ul")
    .data(data, {
      nodeKey: function(n) { return n.getAttribute("id"); },
      dataKey: function(d) { return d.id; }
    });
{% endhighlight %}

If no join is specified, then the default join is by index. The data for which
there is no corresponding key in the nodes become the enter selection, and the
nodes for which there is no corresponding key in the data become the exit
selection; the remaining nodes and data that share keys become the default
update selection.

To continue the previous example of a multiple-choice test, here is the skeleton
code to update the state of the document to match the array of questions:

{% highlight js linenos %}
// Update…
var ul = d3.selectAll("ul")
    .data(questions, "id");

// Enter…
ul.enter("ul")
    .attr("id", function(d) { return d.id; });

// Exit…
ul.exit()
    .remove();
{% endhighlight %}

The above example uses the shorthand syntax for the data join, in the case where
the node attribute and data attribute have the same name. More concise
specifications of the data join are under consideration for a future release,
such as a data join defined only by the previously-bound data.

### Modules

D3 is highly extensible, with optional modules available as needed, without
bloating the core library. The only required feature of D3 is the selection
implementation, along with transitions. For convenience, the default `d3.js`
file also includes standard SVG shape generators and utilities, such as scales
and data transformations.

Several additional modules are available that are not included in the default
build. The `geo` module adds support for geographic data, such as translating
GeoJSON into SVG path data. The Albers equal-area projection is included in this
module, as it is well-suited to choropleth maps. The `geom` module includes
several computational geometry utilities, such as algorithms for Voronoi
diagrams and convex hulls. The `csv` module supports reading and writing
comma-separated values, a common alternative to [JSON](http://www.json.org/).
Lastly, the `layout` module includes various reusable visualization layouts,
such as force-directed graphs, treemaps, and chord diagrams.

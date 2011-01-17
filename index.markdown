---
layout: default
---

<a href="http://github.com/mbostock/d3"><img
    style="position:absolute;top:0;right:0;border:0;"
    width="149" height="149" src="/forkme.png" alt="Fork me on GitHub"
    /></a>

# d3.js

## Data-Driven Documents

**D3.js** is a small, [free](https://github.com/mbostock/d3/raw/master/LICENSE)
JavaScript library for manipulating documents based on data.

At its core, D3 allows you to bind arbitrary data to a Document Object Model
(DOM), and then apply data-driven transformations to the document. As a trivial
example, you can use D3 to generate a basic HTML table from an array of numbers.
Or, use the same data to create an interactive SVG bar chart with smooth
transitions and interaction.

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

Generating complex documents using the W3C [DOM
API](http://www.w3.org/DOM/DOMTR) is indubitably tedious; not only are the
method names verbose, but the imperative approach requires manual iteration and
bookkeeping of temporary state. For example, to change the text color of
paragraph elements:

{% highlight js linenos %}
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "white", null);
}
{% endhighlight %}

Instead of manipulating individual nodes, D3 employs a declarative approach by
operating on arbitrary sets of nodes: a *selection*. For example, you can
rewrite the above loop in 40 characters rather than 190:

{% highlight js linenos %}
d3.selectAll("p")
    .style("color", "white");
{% endhighlight %}

Of course, a selection may instead consist of only a single node:

{% highlight js linenos %}
d3.select("body")
    .style("background-color", "black");
{% endhighlight %}

D3 provides standard facilities for manipulating node selections: setting
attributes or styles; adding, removing or sorting nodes; and changing HTML or
text content. This suffices for the vast majority of needs. However, if the
underlying DOM API is strictly needed, the nodes in a selection can be trivially
accessed, as each D3 selection is simply an array of nodes.

Readers familiar with [jQuery](http://jquery.com/) or
[Prototype](http://www.prototypejs.org/) should immediately recognize
similarities with D3. However, styles, attributes, and other properties can be
specified as *functions of data* in D3, not just simple constants. For example,
to alternate paragraph colors, define the style with a function that returns
distinct values for even and odd elements:

{% highlight js linenos %}
d3.selectAll("p")
    .style("color", function(d, i) { return i & 1 ? "#fff" : "#eee"; });
{% endhighlight %}

Similarly, if you first bind data to paragraph elements, you can use this data
to compute dynamic property values:

{% highlight js linenos %}
d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
{% endhighlight %}

Property functions take two arguments: the bound data (`d`) and zero-based
numeric index (`i`). Although their appearance is simple, these functions can be
surprisingly powerful; the optional `d3.geo.path` function, for example, can
transform geographic data using arbitrary projections into SVG [path
data](http://www.w3.org/TR/SVG/paths.html#PathData). D3 provides many built-in
reusable functions and function factories, such as graphical primitives for
area, line and pie charts. See the section on modules for more on utility
functions.

### Subselections and Hierarchies

Flat selections are sufficient for only the simplest cases; most documents and
datasets have some hierarchical structure. For example, a photo-sharing
application may show different photo albums, each with a collection of photos.
The application can display this data by generating `div` elements, each
containing a series of `img` elements:

{% highlight js linenos %}
d3.selectAll("div")
    .data(albums)
    .enter("div")
  .selectAll("img")
    .data(function(d) { return d.photos; })
    .enter("img")
    .attr("src", function(d) { return d.url; });
{% endhighlight %}

Thus, the `data` property can *also* be defined as a function, taking as an
argument the data associated with the parent node. This allows hierarchical data
to be recursively dereferenced.

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

Often, the set of the nodes matching the selector are empty, as the nodes have
not yet been created! By binding this empty selection to the data, you can
create a *virtual* selection, with null nodes for each element in the dataset
that does not yet exist in the document. The `enter` operator then creates the
nodes, appending them to the document and materializing the selection. (Enter,
exit and update selections are discussed further in the section on data
binding.)

Once the data has been bound to the document, you can omit the `data` operator,
and D3 will retrieve the previously-bound data per element. This reduces the
amount of the code needed to update the document. For example, to add a tooltip
to the images:

{% highlight js linenos %}
d3.selectAll("div img")
    .attr("title", function(d) { return d.description; });
{% endhighlight %}

Here the selector "div img" is interpreted as `img` elements that are
descendants of `div` elements, per the W3C [Selectors
API](http://www.w3.org/TR/selectors-api/). Elements may be selected using a
variety of predicates, including containment, attribute values, and associated
class or ID.

### Transformation, not Representation

D3 does not provide a new graphical representation—unlike
[Processing](http://processing.org/), [Raphaël](http://raphaeljs.com/), or
[Protovis](http://vis.stanford.edu/protovis/), there is no new vocabulary of
marks to learn. Instead, you build directly on standards such as CSS3, HTML5 and
SVG. D3 does not (literally) reinvent the wheel; to render a circle in SVG
centered at ⟨50,40⟩ with radius 10, append an `svg:circle` element:

{% highlight js linenos %}
svg.append("svg:circle")
    .attr("cx", 50)
    .attr("cy", 40)
    .attr("r", 10);
{% endhighlight %}

If you instead wish to create the circle using pure HTML:

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

There are numerous reasons D3 focuses on manipulation existing representations,
rather than introducing a new one. You have full access to the underlying
browser's functionality; for example, you can create elements using D3, and then
style them with external stylesheets. D3 is also easier to debug using the
browser's built-in inspector: operations are applied immediately (such as within
the scope of a call to the `style` operator), and the selection object is an
array of nodes. If browser makers introduce new features to CSS tomorrow, you'll
be able to use them in D3 immediately rather than waiting for a toolkit update.

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

(Of course, if you want to use CSS3 transitions, you can use those too! D3 does
not replace the browser's toolbox, but instead exposes it in a way that is
easier to use.) A more complex resizing of circles in a symbol map can still be
expressed succinctly:

{% highlight js linenos %}
d3.select("circle").transition()
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
rates. As with selections, transitions can be nested; a subselection implicitly
creates a subtransition. And, just as event handlers can be registered on
selections to receive user interface events, transitions dispatch an event on
end that allows sequencing of complex multi-stage transitions.

### Data Binding

To reiterate, D3 lets you transform *existing* documents (node hierarchies)
based on data. This is a generalization of the simpler case of creating a new
document from data, where the starting selection is the empty node. Thus, in
addition to creating documents from scratch, D3 allows you to change an existing
document in response to user interaction, animation over time, or even
asynchronous notification from a third-party. A hybrid approach is even
possible, where the document is initially rendered on the server, and then
updated on the client via D3.

Binding and rebinding data to the document is controlled using a *join*
specification. This consists of two key functions: a function that maps data to
a unique string key, and a function that maps nodes to the same. When the key
for a datum and a node are equal, the node and the datum are joined. For
example, to join the data attribute `key` with the node attribute of the same
name:

{% highlight js linenos %}
d3.selectAll("div")
    .data(data, {
      nodeKey: function(n) { return n.getAttribute("key"); },
      dataKey: function(d) { return d.key; }
    });
{% endhighlight %}

If no join is specified, then the default join is by index. If there are fewer
nodes than data, the extra data become the enter selection; similarly, if there
are fewer data than nodes, the extra nodes become the exit selection. More
generally, the data for which there is no corresponding key in the nodes become
the enter selection, and the nodes for which there is no corresponding key in
the data become the exit selection; the remaining nodes and data that share keys
become the default update selection.

To continue the previous example of a photo-sharing application, here is the
skeleton code to update the state of the document to match the array of albums:

{% highlight js linenos %}
var div = d3.selectAll("div")
    .data(data, "key");

div.enter("div")
    .attr("key", function(d) { return d.key; });

div.exit()
    .remove();
{% endhighlight %}

The above example uses the shorthand syntax for the data join, in the case where
the node attribute and data attribute have the same name. (More concise
specifications of the data join are under consideration for a future release,
such as a data join defined only by the previously-bound data.)

By breaking the selection into three pieces—enter, update and exit—the user can
define the minimal set of operations that need to apply to each subselection.
Very often this includes different transitions for each subselection. Standard
practice for chart transitions is to initialize entering nodes using the old
layout, and to transition exiting nodes to the new layout. This allows entering
and exiting nodes to transition consistently with the updating nodes.

### Modules

D3 is highly extensible, with optional modules available as needed, without
bloating the core componentry. The only required feature of D3 is the selection
implementation, along with transitions. For convenience, the default `d3.js`
file also includes standard SVG shape generators andexex utilities, such as scales
and data transformations.

Several additional modules are available that are not included in the default
build. The `geo` module adds support for geographic data, such as translating
GeoJSON into SVG path data. The Albers equal-area projection is included in this
module, as it is well-suited to choropleth maps. The `geom` module includes
several computational geometry utilies, such as algorithms for Voronoi diagrams
and convex hulls. The `csv` module supports reading and writing comma-separated
values, a common alternative to [JSON](http://www.json.org/). Lastly, the
`layout` module includes various resuable visualization layouts, such as
force-directed graphs, treemaps, and chord diagrams.

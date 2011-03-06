---
layout: tutorial
title: For Protovis Users
---

# For Protovis Users

[D3](../) and [Protovis](http://vis.stanford.edu/protovis/) have the same
primary author ([Mike Bostock](http://bost.ocks.org/mike)), so it's not
surprising that these two systems take a similar approach to visualization.
However, there are plenty of important differences, too; enough that it made
sense to start anew, rather than patching the design of Protovis. Many of these
changes were influenced by observing users' successes and struggles with past
approaches.

D3 and Protovis also share the same goal: to enable you, the web developer
(however experienced you may be), to build custom visualizations in the browser
with a minimum amount of effort. Not "zero" effort, certainly—but at least to
alleviate the repetive burden of common tasks, while retaining the
expressiveness needed for custom designs. D3 is not
[a](http://code.google.com/p/flot/) [charting](http://www.highcharts.com/)
[library](http://g.raphaeljs.com/)!

Where D3 and Protovis *differ* is the type of visualizations they enable (the
what), and the method of implementation (the how). While Protovis excels at
concise, declarative representations of static scenes, D3 focuses on efficient
transformations: scene changes. This makes animation, interaction, complex and
dynamic visualizations much easier to implement in D3. Also, by adopting the
browser's native representation (HTML & SVG), D3 better integrates with other
web technologies, such as [CSS3](http://www.w3.org/Style/CSS/current-work) and
[developer
tools](http://developer.apple.com/technologies/safari/developer-tools.html). Our
hope is that this makes D3 not only more powerful, but easier to use.

## So, What's Different?

### Native Representation

The first difference you'll notice is that you specify elements as HTML or SVG
directly, rather than using an intermediate (proprietary) representation. For
example, a Protovis bar is specified using the `pv.Bar` mark type:

{% highlight js linenos %}
vis.add(pv.Bar)
    .left(0)
    .top(25)
    .width(80)
    .height(20);
{% endhighlight %}

In D3, the equivalent representation is just SVG's
[rect](http://www.w3.org/TR/SVG/shapes.html#RectElement) element. In fact, this
is what Protovis uses under the hood!

{% highlight js linenos %}
vis.append("svg:rect")
    .attr("x", 0)
    .attr("y", 25)
    .attr("width", 80)
    .attr("height", 20);
{% endhighlight %}

D3 can create any type of element the browser supports, and set any attribute or
style property. This offers more expressiveness in terms of graphical output:
for example, you can use [dashed
strokes](http://www.w3.org/TR/SVG/painting.html#StrokeDasharrayProperty),
[coordinate
transforms](http://www.w3.org/TR/SVG/coords.html#TransformAttribute),
[gradients](http://www.w3.org/TR/SVG/pservers.html#Gradients),
[clipping](http://www.w3.org/TR/SVG/masking.html) and [Bézier
curves](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands), oh my!
D3 also offers more flexibility in how you represent your scene, which can
dramatically improve performance for larger datasets. The web abounds with
reference materials on HTML5, CSS3 and SVG that you can learn and apply using
D3. Your knowledge of these standards will be relevant even if you decide to use
an alternative to D3 down the road.

The native representation improves the development process by complementing your
browser's other technologies. One big convenience is that static styles can be
moved out of code and into a stylesheet. For example, if you set `attr("class",
"snazzy")` on your elements, you can then apply a gradient:

{% highlight css linenos %}
.snazzy {
  background-image: -webkit-linear-gradient(#aad, #556);
}
{% endhighlight %}

Unlike Protovis' intermediate representation, D3's output can be inspected
directly using developer tools, making debugging much easier. (Paul Irish has
some [helpful tips](http://www.youtube.com/watch?v=nOEw9iiopwI) on getting the
most out of the inspector.) You can even use the browser's console to execute D3
commands interactively, watching how they transform the document. D3 selections
are simply arrays of DOM elements!

A subtler advantage of native representation is that selections can be requeried
from the document, across hierarchies, at any time. In Protovis, in order to
modify the visualization, you need to modify the underlying data or property
definitions, and then render. This requires a reference (*e.g.*, `var`) to every
mark in the scene. Furthermore, re-rendering is expensive in Protovis because
the entire mark hierarchy (or subtree thereof) is first evaluated and then
rebuilt as SVG. In contrast, D3 lets you touch only the elements and attributes
that need changing. This not only improves performance, but makes arbitrary
modifications easier. ([Local
variables](http://vis.stanford.edu/protovis/docs/local.html) were introduced to
Protovis to ameliorate this problem, but ultimately proved too confusing and
magical to be widely useful.)

Of course, Protovis' specialized representation has advantages, too! Anchors
and wedges have no trivial equivalent in SVG. Thus, it can require more code to
accomplish the same task in D3 as compared to Protovis. However, helper classes,
such as the `d3.svg` module, mitigate this additional effort. These helpers work
with SVG path elements, setting the "d" attribute:

* `pv.Wedge` → `d3.svg.arc`
* `pv.Area` → `d3.svg.area`
* `pv.Line` → `d3.svg.line`
* `pv.Dot` → `d3.svg.symbol`

The SVG [g](http://www.w3.org/TR/SVG/struct.html#Groups) (grouping) element
serves a similar to purpose to the Protovis panel; the "transform" attribute can
translate, scale and rotate child elements. SVG's default coordinate system
places the origin ⟨0,0⟩ in the top-left corner. To emulate the right and bottom
positional properties of Protovis, use a transform to flip axes, or invert the
attribute defintion (*e.g.*, *right* = *width* - *x*).

### Transformation

The next big difference is that D3 code describes *transformations* of scenes
(scene changes), whereas Protovis describes *representations* (the scenes
themselves). This means you may write more code with D3—where Protovis would
automatically re-evaluate all properties to update the scene, D3 needs explicit
instruction. However, it also eliminates the substantial overhead discussed in
the previous section. And it's not a matter of deficient implementation—Protovis
is not given enough information, in terms of dependencies between properties and
data, to update the scene efficiently.

In conjunction with transformations, D3's data-binding allows [enter &
exit](../#enter_and_exit) selections, which control which elements are added or
removed, and what happens to them during enter and exit. You can even bind data
to existing documents, decoupling transformation from generation. D3 supports
automatic *transitions*, where attributes or styles are smoothly interpolated
over time. Transitions were
[experimented](https://github.com/mbostock/protovis/tree/transition) with
Protovis, but without direct control over transformations, the Protovis model
became unwieldy for dynamic scenes.

### Immediate Evaluation

To improve debugging, D3 applies operators immediately, rather than deferring
evaluation to a `render` call as with Protovis. By shortening the delay between
when property functions are defined and when they are evaluated, D3 reduces the
likelihood of external state changing (or evaporating), which can break
evaluation. Reference capture, although convenient for re-evaluation, was a
frequent source of confusion by users. This was exacerbated by a common
misunderstanding of JavaScript's `var` keyword, which is function- rather than
block-scoped.

Immediate evaluation also minimizes internal control flow, moving it up to the
user's code; for example, the `attr` operator immediately sets attributes on the
current selection and then returns. The Protovis model, in contrast, has
elaborate hidden control flow that is only revealed when the code crashes—a
confusing consequence of embedded declarative languages. Immediate evaluation
offers better compatibility with standard JavaScript organizational constructs,
such as functions and loops; D3 can even generate recursive structures through
the `each` operator.

Another benefit of eliminating control flow is that layouts are decoupled from
property evaluation. Protovis layouts were difficult to implement because they
required understanding the internal rendering machinery. In D3, layouts are
simply helper classes that create or modify data structures, such as a
description of chords, or positions of nodes in a force-directed graph. The user
then binds the layout's data to attributes and elements as needed.

## Anything Else?

Despite all the differences above, there remain many similarities between D3 and
Protovis, too. To name a few:

* Method chaining.
* Properties as functions of data.
* Data pre-processors, such as the nest operator, and AJAX loaders.
* Scales for computing visual encodings as length, area, color, *etc.*
* Layouts for reusable visualization techniques (*e.g.*, streamgraphs).
* Lots of examples!

D3 is also younger than Protovis, and very much a work-in-progress. We are
planning on porting additional features from Protovis to D3, such as
hierarchical layouts. If there's a feature that's particularly important to you,
please [let us know](http://github.com/mbostock/d3/issues)!

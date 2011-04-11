---
layout: api
title: Documentation
---

# Documentation

## Tutorials

<div class="gallery">

<div class="list">
  <a href="../tutorial/bar-1.html">
    <img src="../tutorial/bar-1.png"/>
  </a>
  <h4><a href="../tutorial/bar-1.html">A Bar Chart, Part 1</a></h4>

  <p>Learn the basics of D3 with this introductory tutorial. Using the
  example of a no-frills, static bar chart, this guide describes the core D3
  concepts, including selections, functional properties, and scales. You'll
  also see how D3 can be applied to HTML, CSS and SVG.</p>
</div>

<div class="list">
  <a href="../tutorial/bar-2.html">
    <img src="../tutorial/bar-2.png"/>
  </a>
  <h4><a href="../tutorial/bar-2.html">A Bar Chart, Part 2</a></h4>

  <p>A continuation of the above introductory tutorial, this guide covers more
  exciting dynamic aspects of D3, including transitions and data joins. Learn
  how to create realtime visualizations and specify enter and exit
  animations.</p>
</div>

<div class="list">
  <a href="../tutorial/protovis.html">
    <img src="../tutorial/protovis.png"/>
  </a>
  <h4><a href="../tutorial/protovis.html">For Protovis Users</a></h4>

  <p>An introduction to D3 for users of Protovis. Covers design motivation as
  well as tips on converting Protovis visualizations to D3.</p>
</div>

</div>

<br clear="left"/>

## Reference

### d3

ascending, descending, min, max, keys, values, entries, split, merge, range,
xhr, text, json, html, xml, format, nest (map, key, sortKeys, sortValues,
rollup, entries), ns, event, rgb, hsl, ease, interpolate, interpolateNumber,
interpolateRound, interpolateString, interpolateRgb, interpolateArray,
interpolateObject.

##### `d3.select(node)`
Returns a selection containing the specified node. _node_ can be one of two things:

- string: a selector, such as "tag" or ".class"
- object: a DOM element

##### `d3.selectAll(nodes)`
Returns a selection containing the specified nodes. _nodes_ can be one of two things:

- string: a selector, such as "tag" or ".class"
- array: an array of DOM element

##### `d3.transition()`
Returns a new transition. Nodes can then be selected, as an alternative to deriving a transition from an existing selection.

#### Selections

#####`selection.filter()

#####`selection.data()

#####`selection.classed()

#####`selection.insert()

#####`selection.sort()

##### `selection.empty()`
Returns true if the selection is empty.

##### `selection.node()`
Return the DOM node for the first element in the selection.

##### `selection.append(name)`
Append a new element _name_ as the last child for every element in the selection.

##### `selection.remove()`
Remove selected elements.

##### `selection.call(function[, optargs…])`
Call _function_ once for the entire selection. The function is invoked with the entire selection as an array of elements as the first argument and any _optargs_ as subsequent arguments.

##### `selection.each(function)`
Call _function_ for every element in the selection. The function is invoked with two arguments: the bound data for the element and the index of the bound data.

##### `selection.attr(name[, value])`
Get or set the value of the attribute _name_ for every element in the selection. _value_ can be one of four things:

-   empty: get the value of the attribute for the first element in the selection
-   null: remove the attribute
-   constant: set the attribute to the supplied value for each element.
-   function: set the attribute to the result of evaluating the function for each element in the selection. The function is invoked with two arguments: the bound data for the element and the index of the bound data.

##### `selection.style(name[, value[, priority]])`
Get or set the CSS style property _name_ for every element in the selection. _priority_ can be "important". _value_ can be one of four things:

-   empty: get the value of the style property for the first element in the selection
-   null: remove the style property
-   constant: set the style property to the supplied value for each element.
-   function: set the style property to the result of evaluating the function for each element in the selection. The function is invoked with two arguments: the bound data for the element and the index of the bound data.

##### `selection.property(name[, value])`
Get or set the Javascript object property _name_ for every element in the selection. _value_ can be one of four things:

-   empty: get the value of the object property for the first element in the selection
-   null: remove the object property
-   constant: set the object property to the supplied value for each element.
-   function: set the object property to the result of evaluating the function for each element in the selection. The function is invoked with two arguments: the bound data for the element and the index of the bound data.

##### `selection.text([value])` and `selection.html([value])`
Get or set the content inside the selected elements. _text()_ sets the contents as text (via createTextNode(), _html()_ sets the contents as HTML (via innerHTML). _value_ can be one of four things:

- empty: get the value of the content for the first element in the selection
- null: remove the content
- constant: set the content to the supplied value for each element.
- function: set the content to the result of evaluating the function for each element in the selection. The function is invoked with two arguments: the bound data for the element and the index of the bound data.

##### `selection.on(type, listener)`
Arrange for _listener_ to be invoked when a DOM event of type _type_ occurs on the selected elements. Any previous _listener_ of that type is removed (set _listener_ to null to remove a listener without adding a new one). The _listener_ function is invoked with two arguments: the bound data for the element and the index of the bound data. To access the event itself from within the listener use `d3.event`.

##### `selection.transition()`
Initiate a transition for the selected elements. See d3.transition for details.

#### transitions

delay, duration, ease, attrTween, attr, styleTween, style, select, selectAll,
remove, each.

### d3.scale

scale, domain, range, linear (invert, rangeRound, interpolate, ticks,
tickFormat), log (invert, rangeRound, interpolate, ticks, tickFormat), pow
(invert, rangeRound, interpolate, ticks, tickFormat, exponent), sqrt, ordinal
(rangePoints, rangeBands, rangeRoundBands, rangeBand), category10, category20,
category20b, category20c, quantile (quantiles), quantize.

### d3.svg

mouse, arc (innerRadius, outerRadius, startAngle, endAngle), line (x, y,
interpolate, tension) area, (x, y0, y1, interpolate, tension), chord (radius,
source, target, startAngle, endAngle).

### d3.time

format (format, parse, toString).

### d3.layout

chord (matrix, padding, sortGroups, sortSubgroups, sortChords, chords, groups),
stack (order, offset), force (on, nodes, links, size, distance, start, stop,
resume, drag), pie (value, sort, startAngle, endAngle),  treemap (children,
value, size, round).

### d3.geom

contour, hull, voronoi, delaunay, quadtree, polygon (area, clip).

### d3.geo

albers (origin, parallels, scale, translate), albersUsa (scale, translate),
mercator (scale, translate), path (projection, area, pointRadius).

### d3.csv

parse, parseRows, format.

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

#### d3.select\[All\]

select, selectAll, filter, data, each, empty, node, classed, style,
property, text, html, append, insert, remove, sort, on, transition, call.

*attr*(name, value): Set the attribute named _name_ to _value_ on the selected 
DOM node. _name_ is XML namespace aware. _value_ can be one of three things:
- empty: remove the attribute
- constant: set the attribute to the supplied value
- function: set the attribute to the result of calling the function. The function is invoked with two arguments: the bound data and the index of the bound data.

#### d3.transition

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

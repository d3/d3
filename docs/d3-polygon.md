# d3-polygon

This module provides a few basic geometric operations for two-dimensional polygons. Each polygon is represented as an array of two-element arrays [​[<i>x1</i>, <i>y1</i>], [<i>x2</i>, <i>y2</i>], …], and may either be closed (wherein the first and last point are the same) or open (wherein they are not). Typically polygons are in counterclockwise order, assuming a coordinate system where the origin ⟨0,0⟩ is in the top-left corner.

## Polygons

### d3.polygonArea(polygon)

[Source](https://github.com/d3/d3-polygon/blob/master/src/area.js "Source Code")

Returns the signed area of the specified *polygon*. If the vertices of the polygon are in counterclockwise order (assuming a coordinate system where the origin ⟨0,0⟩ is in the top-left corner), the returned area is positive; otherwise it is negative, or zero.

### d3.polygonCentroid(polygon)

[Source](https://github.com/d3/d3-polygon/blob/master/src/centroid.js "Source Code")

Returns the [centroid](https://en.wikipedia.org/wiki/Centroid) of the specified *polygon*.

### d3.polygonHull(points)

[Source](https://github.com/d3/d3-polygon/blob/master/src/hull.js#L23 "Source Code")

<a href="http://bl.ocks.org/mbostock/6f14f7b7f267a85f7cdc"><img src="https://raw.githubusercontent.com/d3/d3-polygon/master/img/hull.png" width="250" height="250"></a>

Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of the specified *points* using [Andrew’s monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain). The returned hull is represented as an array containing a subset of the input *points* arranged in counterclockwise order. Returns null if *points* has fewer than three elements.

### d3.polygonContains(polygon, point)

[Source](https://github.com/d3/d3-polygon/blob/master/src/contains.js "Source Code")

Returns true if and only if the specified *point* is inside the specified *polygon*.

### d3.polygonLength(polygon)

[Source](https://github.com/d3/d3-polygon/blob/master/src/length.js "Source Code")

Returns the length of the perimeter of the specified *polygon*.

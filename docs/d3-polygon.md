<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import PlotRender from "./components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);

</script>

# d3-polygon

This module provides a few basic geometric operations for two-dimensional polygons. Each polygon is represented as an array of two-element arrays [​[*x0*, *y0*], [*x1*, *y1*], …], and may either be closed (wherein the first and last point are the same) or open (wherein they are not). Typically polygons are in counterclockwise order, assuming a coordinate system where the origin is in the top-left corner.

## polygonArea(*polygon*) {#polygonArea}

```js
d3.polygonArea([[1, 1], [1.5, 0], [2, 1]]) // -0.5
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/area.js) · Returns the signed area of the specified *polygon*. If the vertices of the polygon are in counterclockwise order (assuming a coordinate system where the origin is in the top-left corner), the returned area is positive; otherwise it is negative, or zero.

## polygonCentroid(*polygon*) {#polygonCentroid}

```js
d3.polygonArea([[1, 1], [1.5, 0], [2, 1]]) // [1.5, 0.6666666666666666]
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/centroid.js) · Returns the [centroid](https://en.wikipedia.org/wiki/Centroid) of the specified *polygon*.

## polygonHull(*points*) {#polygonHull}

<PlotRender defer :options='{
  axis: null,
  aspectRatio: 1,
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.hull(points)
  ]
}' />

```js
d3.polygonHull(points) // [[3.0872864263338777, -1.300100095019402], [1.6559368816733773, -2.5092525689499605], …]
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/hull.js) · Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of the specified *points* using [Andrew’s monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain). The returned hull is represented as an array containing a subset of the input *points* arranged in counterclockwise order. Returns null if *points* has fewer than three elements.

## polygonContains(*polygon*, *point*) {#polygonContains}

```js
d3.polygonContains([[1, 1], [1.5, 0], [2, 1]], [1.5, 0.667]) // true
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/contains.js) · Returns true if and only if the specified *point* is inside the specified *polygon*.

## polygonLength(*polygon*) {#polygonLength}

```js
d3.polygonLength([[1, 1], [1.5, 0], [2, 1]]) // 3.23606797749979
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/length.js) · Returns the length of the perimeter of the specified *polygon*.

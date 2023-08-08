<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "../components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const neighborsState = shallowRef({i: -1, N: []});

</script>

# Voronoi diagrams

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 0.3})
  ]
}' />

Given a set of points, the Voronoi diagram partitions the plane into cells representing the region of the plane that is closest to the corresponding point. The Voronoi diagram is the dual of the [Delaunay triangulation](./delaunay.md).

## *delaunay*.voronoi(*bounds*) {#delaunay_voronoi}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Voronoi diagram for the given [Delaunay triangulation](./delaunay.md). When rendering, the diagram will be clipped to the specified *bounds* = [*xmin*, *ymin*, *xmax*, *ymax*].

```js
const delaunay = d3.Delaunay.from([[0, 0], [0, 100], [100, 0], [100, 100]]);
const voronoi = delaunay.voronoi([0, 0, 640, 480]);
```

If *bounds* is not specified, it defaults to [0, 0, 960, 500]. The Voronoi diagram is returned even in degenerate cases where no triangulation exists — namely 0, 1 or 2 points, and collinear points.

### *voronoi*.delaunay {#voronoi_delaunay}

The Voronoi diagram’s associated [Delaunay triangulation](./delaunay.md).

### *voronoi*.circumcenters {#voronoi_circumcenters}

The [circumcenters](http://mathworld.wolfram.com/Circumcenter.html) of the Delaunay triangles as a Float64Array [*cx0*, *cy0*, *cx1*, *cy1*, …]. Each contiguous pair of coordinates *cx*, *cy* is the circumcenter for the corresponding triangle. These circumcenters form the coordinates of the Voronoi cell polygons.

### *voronoi*.vectors {#voronoi_vectors}

A Float64Array [*vx0*, *vy0*, *wx0*, *wy0*, …] where each non-zero quadruple describes an open (infinite) cell on the outer hull, giving the directions of two open half-lines.

### *voronoi*.xmin<br>*voronoi*.ymin<br>*voronoi*.xmax<br>*voronoi*.ymax {#voronoi_bounds}

The bounds of the viewport [*xmin*, *ymin*, *xmax*, *ymax*] for rendering the Voronoi diagram. These values only affect the rendering methods ([*voronoi*.render](#voronoi_render), [*voronoi*.renderBounds](#voronoi_renderBounds), [*voronoi*.renderCell](#voronoi_renderCell)).

## *voronoi*.contains(*i*, *x*, *y*) {#voronoi_contains}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns true if the cell with the specified index *i* contains the specified point ⟨*x*, *y*⟩; *i.e.*, whether the point *i* is the closest point in the diagram to the specified point. (This method is not affected by the associated Voronoi diagram’s viewport [bounds](#voronoi_bounds).)

## *voronoi*.neighbors(*i*) {#voronoi_neighbors}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 0.3}),
    Plot.link(points, {
      x1: (d) => d[0],
      y1: (d) => d[1],
      x2: (d) => d[0],
      y2: (d) => d[1],
      stroke: "red",
      strokeWidth: 2,
      markerStart: "dot",
      markerEnd: "arrow",
      render(index, scales, values, dimensions, context, next) {
        const {x1: X, y1: Y} = values;
        const delaunay = d3.Delaunay.from(points, (d, i) => X[i], (d, i) => Y[i]);
        const voronoi = delaunay.voronoi([0, 0, dimensions.width, dimensions.height]);
        function update(x, y) {
          const i = delaunay.find(x, y);
          const N = Array.from(voronoi.neighbors(i));
          neighborsState = {i, N};
          return next(
            d3.range(N.length),
            scales,
            {
              x1: N.map(() => X[i]),
              x2: N.map((j) => X[j]),
              y1: N.map(() => Y[i]),
              y2: N.map((j) => Y[j])
            },
            dimensions,
            context
          );
        }
        let line = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newline = update(Math.round(x), Math.round(y));
          line.replaceWith(newline);
          line = newline;
        });
        return line;
      }
    }),
  ]
}' />

```js-vue
voronoi.neighbors({{neighborsState.i}}) // [{{neighborsState.N.join(", ")}}]
```

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns an iterable over the indexes of the cells that share a common edge with the specified cell *i*. Voronoi neighbors are always neighbors on the Delaunay graph, but the converse is false when the common edge has been clipped out by the Voronoi diagram’s viewport.

## *voronoi*.render(*context*) {#voronoi_render}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the mesh of Voronoi cells to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.renderBounds(*context*) {#voronoi_renderBounds}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor", clip: true}),
    Plot.frame()
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the viewport extent to the specified *context*. The specified *context* must implement the *context*.rect method from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). Equivalent to *context*.rect(*voronoi*.xmin, *voronoi*.ymin, *voronoi*.xmax - *voronoi*.xmin, *voronoi*.ymax - *voronoi*.ymin). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.renderCell(*i*, *context*) {#voronoi_renderCell}

<PlotRender defer :options='{
  style: {overflow: "hidden"},
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  color: {scheme: $dark ? "turbo" : "orrd"},
  marks: [
    Plot.voronoi(Array.from(d3.union(d3.Delaunay.from(points).triangles), (i) => points[i]), {fill: (d, i) => -i}),
    Plot.dot(points, {r: 2, fill: "black"}),
    Plot.voronoiMesh(points, {stroke: "black", strokeOpacity: 1}),
    Plot.frame({stroke: "black"}),
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the cell with the specified index *i* to the specified *context*. The specified *context* must implement the *context*.moveTo , *context*.lineTo and *context*.closePath methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.cellPolygons() {#voronoi_cellPolygons}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns an iterable over the non-empty [polygons for each cell](#voronoi_cellPolygon), with the cell index as property. See also [*voronoi*.renderCell](#voronoi_renderCell).

## *voronoi*.cellPolygon(*i*) {#voronoi_cellPolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns the convex, closed polygon [[*x0*, *y0*], [*x1*, *y1*], …, [*x0*, *y0*]] representing the cell for the specified point *i*. See also [*voronoi*.renderCell](#voronoi_renderCell).

## *voronoi*.update() {#voronoi_update}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Updates the Voronoi diagram and underlying triangulation after the points have been modified in-place — useful for Lloyd’s relaxation. Calls [*delaunay*.update](./delaunay.md#delaunay_update) on the underlying Delaunay triangulation.

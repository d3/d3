<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "../components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const findState = shallowRef({x: 0, y: 0, i: -1});
const neighborsState = shallowRef({i: -1, N: []});

</script>

# Delaunay triangulations

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3})
  ]
}' />

The Delaunay triangulation is a triangular mesh formed from a set of points in *x* and *y*. No point is inside the circumcircle of any triangle, which is a nice geometric property for certain applications, and tends to avoid “sliver” triangles. The Delaunay triangulation is the dual of the [Voronoi diagram](./voronoi.md).

## new Delaunay(*points*) {#Delaunay}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Delaunay triangulation for the given flat array [*x0*, *y0*, *x1*, *y1*, …] of *points*.

```js
const delaunay = new d3.Delaunay(Float64Array.of(0, 0, 0, 1, 1, 0, 1, 1));
```

The given *points* may be any array-like type, but is typically a Float64Array.

### *delaunay*.points {#delaunay_points}

The coordinates of the points as an array [*x0*, *y0*, *x1*, *y1*, …].

### *delaunay*.halfedges {#delaunay_halfedges}

The halfedge indexes as an Int32Array [*j0*, *j1*, …]. For each index 0 ≤ *i* < *halfedges*.length, there is a halfedge from triangle vertex *j* = *halfedges*[*i*] to triangle vertex *i*. Equivalently, this means that triangle ⌊*i* / 3⌋ is adjacent to triangle ⌊*j* / 3⌋. If *j* is negative, then triangle ⌊*i* / 3⌋ is an exterior triangle on the [convex hull](#delaunay_hull). For example, to render the internal edges of the Delaunay triangulation:

```js
const {points, halfedges, triangles} = delaunay;
for (let i = 0, n = halfedges.length; i < n; ++i) {
  const j = halfedges[i];
  if (j < i) continue;
  const ti = triangles[i];
  const tj = triangles[j];
  context.moveTo(points[ti * 2], points[ti * 2 + 1]);
  context.lineTo(points[tj * 2], points[tj * 2 + 1]);
}
```

See also [*delaunay*.render](#delaunay_render).

### *delaunay*.hull {#delaunay_hull}

An Int32Array of point indexes that form the convex hull in counterclockwise order. If the points are collinear, returns them ordered.

See also [*delaunay*.renderHull](#delaunay_renderHull).

### *delaunay*.triangles {#delaunay_triangles}

The triangle vertex indexes as an Uint32Array [*i0*, *j0*, *k0*, *i1*, *j1*, *k1*, …]. Each contiguous triplet of indexes *i*, *j*, *k* forms a counterclockwise triangle. The coordinates of the triangle’s points can be found by going through [*delaunay*.points](#delaunay_points). For example, to render triangle *i*:

```js
const {points, triangles} = delaunay;
const t0 = triangles[i * 3 + 0];
const t1 = triangles[i * 3 + 1];
const t2 = triangles[i * 3 + 2];
context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
context.closePath();
```

See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

### *delaunay*.inedges {#delaunay_inedges}

The incoming halfedge indexes as a Int32Array [*e0*, *e1*, *e2*, …]. For each point *i*, *inedges*[*i*] is the halfedge index *e* of an incoming halfedge. For coincident points, the halfedge index is -1; for points on the convex hull, the incoming halfedge is on the convex hull; for other points, the choice of incoming halfedge is arbitrary. The *inedges* table can be used to traverse the Delaunay triangulation; see also [*delaunay*.neighbors](#delaunay_neighbors).

## Delaunay.from(*points*, *fx*, *fy*, *that*) {#Delaunay_from}

:::tip
Delaunay.from is typically slower than [new Delaunay](#Delaunay) because it requires materializing a new flat array of *xy* coordinates.
:::

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Delaunay triangulation for the given array or iterable of *points*. If *fx* and *fy* are not specified, then *points* is assumed to be an array of two-element arrays of numbers: [[*x0*, *y0*], [*x1*, *y1*], …].

```js
const delaunay = d3.Delaunay.from([[0, 0], [0, 1], [1, 0], [1, 1]]);
```

Otherwise, *fx* and *fy* are functions that are invoked for each element in the *points* array in order, and must return the respective x and y coordinate for each point.

```js
const delaunay = d3.Delaunay.from([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}], (d) => d.x, (d) => d.y);
```

If *that* is specified, the functions *fx* and *fy* are invoked with *that* as *this*. (See [Array.from](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for reference.)

## *delaunay*.find(*x*, *y*, *i*) {#delaunay_find}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3}),
    Plot.line(points, {
      stroke: "red",
      strokeWidth: 3,
      markerStart: "dot",
      markerEnd: "arrow",
      render(index, scales, values, dimensions, context, next) {
        const {x: X, y: Y} = values;
        const delaunay = d3.Delaunay.from(points, (d, i) => X[i], (d, i) => Y[i]);
        function update(x, y) {
          let j = 0, i, path = [j];
          while ((i = delaunay._step(j, x, y)) >= 0 && i !== j) path.push(j = i);
          findState = {x, y, i};
          return next(path, scales, values, dimensions, context);
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
delaunay.find({{findState.x}}, {{findState.y}}) // {{findState.i}}
```

[Examples](https://observablehq.com/@d3/delaunay-find) · [Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the index of the input point that is closest to the specified point ⟨*x*, *y*⟩. The search is started at the specified point *i*. If *i* is not specified, it defaults to zero.

## *delaunay*.neighbors(*i*) {#delaunay_neighbors}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3}),
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
        function update(x, y) {
          const i = delaunay.find(x, y);
          const N = Array.from(delaunay.neighbors(i));
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
delaunay.neighbors({{neighborsState.i}}) // [{{neighborsState.N.join(", ")}}]
```

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns an iterable over the indexes of the neighboring points to the specified point *i*. The iterable is empty if *i* is a coincident point.

## *delaunay*.render(*context*) {#delaunay_render}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the edges of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderHull(*context*) {#delaunay_renderHull}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.hull(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the convex hull of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderTriangle(*i*, *context*) {#delaunay_renderTriangle}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  color: {scheme: $dark ? "turbo" : "orrd", reverse: true},
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.geo([], {
      stroke: "black",
      strokeOpacity: 0.2,
      initializer(data, facets, channels, {x, y}) {
        const delaunay = d3.Delaunay.from(points, (d) => x(d[0]), (d) => y(d[1]));
        const polygons = Array.from(delaunay.trianglePolygons());
        const index = d3.range(polygons.length);
        return {
          data: polygons,
          facets: [index],
          channels: {
            geometry: {
              value: polygons.map((ring) => ({type: "Polygon", coordinates: [ring.map(([px, py]) => [x.invert(px), y.invert(py)])]})),
              scale: false // TODO allow scale: true here
            },
            fill: {
              value: index,
              scale: true
            }
          }
        };
      }
    }),
    Plot.dot(points, {r: 2, fill: "black"})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders triangle *i* of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo, *context*.lineTo and *context*.closePath methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderPoints(*context*, *radius*) {#delaunay_renderPoints}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the input points of the Delaunay triangulation to the specified *context* as circles with the specified *radius*. If *radius* is not specified, it defaults to 2. The specified *context* must implement the *context*.moveTo and *context*.arc methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.hullPolygon() {#delaunay_hullPolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the closed polygon [[*x0*, *y0*], [*x1*, *y1*], …, [*x0*, *y0*]] representing the convex hull. See also [*delaunay*.renderHull](#delaunay_renderHull).

## *delaunay*.trianglePolygons() {#delaunay_trianglePolygons}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns an iterable over the [polygons for each triangle](#delaunay_trianglePolygon), in order. See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

## *delaunay*.trianglePolygon(*i*) {#delaunay_trianglePolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the closed polygon [[*x0*, *y0*], [*x1*, *y1*], [*x2*, *y2*], [*x0*, *y0*]] representing the triangle *i*. See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

## *delaunay*.update() {#delaunay_update}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Recomputes the triangulation after the points have been modified in-place.

## *delaunay*.voronoi(*bounds*) {#delaunay_voronoi}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the [Voronoi diagram](./voronoi.md) for the given Delaunay triangulation. When rendering, the diagram will be clipped to the specified *bounds* = [*xmin*, *ymin*, *xmax*, *ymax*].

```js
const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, 640, 480]);
```

If *bounds* is not specified, it defaults to [0, 0, 960, 500]. The Voronoi diagram is returned even in degenerate cases where no triangulation exists — namely 0, 1 or 2 points, and collinear points.

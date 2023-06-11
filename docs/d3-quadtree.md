<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, shallowRef, onMounted} from "vue";
import ExampleAnimatedQuadtree from "./components/ExampleAnimatedQuadtree.vue";
import PlotRender from "./components/PlotRender.js";
import quadtree_findVisited from "./components/quadtreeFindVisited.js";
import quadtree_nodes from "./components/quadtreeNodes.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const tree = d3.quadtree(d3.range(points.length), (i) => points[i][0], (i) => points[i][1]);
const findState = shallowRef({x: 0, y: 0, i: -1});

</script>

# d3-quadtree

<ExampleAnimatedQuadtree :points="points" />

A [quadtree](https://en.wikipedia.org/wiki/Quadtree) recursively partitions two-dimensional space into squares, dividing each square into four equally-sized squares. Each distinct point exists in a unique leaf [node](#quadtree-nodes); coincident points are represented by a linked list. Quadtrees can accelerate various spatial operations, such as the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation) for computing many-body forces, collision detection, and searching for nearby points.

<!-- http://bl.ocks.org/mbostock/9078690 -->
<!-- http://bl.ocks.org/mbostock/4343214 -->

## quadtree(*data*, *x*, *y*) {#quadtree}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/quadtree.js) · Creates a new, empty quadtree with an empty [extent](#quadtree_extent) and the default [x](#quadtree_x) and [y](#quadtree_y) accessors. If *data* is specified, [adds](#quadtree_addAll) the specified iterable of data to the quadtree.

```js
const tree = d3.quadtree(data);
```

This is equivalent to:

```js
const tree = d3.quadtree().addAll(data);
```

If *x* and *y* are also specified, sets the [x](#quadtree_x) and [y](#quadtree_y) accessors to the specified functions before adding the specified iterable of data to the quadtree, equivalent to:

```js
const tree = d3.quadtree().x(x).y(y).addAll(data);
```

## *quadtree*.x(x) {#quadtree_x}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/x.js) · If *x* is specified, sets the current x-coordinate accessor and returns the quadtree.

```js
const tree = d3.quadtree().x((d) => d.x);
```

The x accessor is used to derive the x coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the x and y accessors must be consistent, returning the same value given the same input.

If *x* is not specified, returns the current x accessor.

```js
tree.x() // (d) => d.x
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

## *quadtree*.y(y) {#quadtree_y}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/y.js) · If *y* is specified, sets the current y-coordinate accessor and returns the quadtree.

```js
const tree = d3.quadtree().y((d) => d.y);
```

The y accessor is used to derive the y coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the x and y accessors must be consistent, returning the same value given the same input.

If *y* is not specified, returns the current y accessor.

```js
tree.y() // (d) => d.y
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

## *quadtree*.extent(*extent*) {#quadtree_extent}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/extent.js) · If *extent* is specified, expands the quadtree to [cover](#quadtree_cover) the specified points [[*x0*, *y0*], [*x1*, *y1*]] and returns the quadtree.

```js
const tree = d3.quadtree().extent([[0, 0], [1, 1]]);
```

If *extent* is not specified, returns the quadtree’s current extent [[*x0*, *y0*], [*x1*, *y1*]], where *x0* and *y0* are the inclusive lower bounds and *x1* and *y1* are the inclusive upper bounds, or undefined if the quadtree has no extent.

```js
tree.extent() // [[0, 0], [2, 2]]
```

The extent may also be expanded by calling [*quadtree*.cover](#quadtree_cover) or [*quadtree*.add](#quadtree_add).

## *quadtree*.cover(*x*, *y*) {#quadtree_cover}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/cover.js) · Expands the quadtree to cover the specified point ⟨*x*,*y*⟩, and returns the quadtree.

```js
const tree = d3.quadtree().cover(0, 0).cover(1, 1);
```

If the quadtree’s extent already covers the specified point, this method does nothing. If the quadtree has an extent, the extent is repeatedly doubled to cover the specified point, wrapping the [root](#quadtree_root) [node](#quadtree-nodes) as necessary; if the quadtree is empty, the extent is initialized to the extent [[⌊*x*⌋, ⌊*y*⌋], [⌈*x*⌉, ⌈*y*⌉]]. (Rounding is necessary such that if the extent is later doubled, the boundaries of existing quadrants do not change due to floating point error.)

## *quadtree*.add(*datum*) {#quadtree_add}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/add.js) · Adds the specified *datum* to the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
const tree = d3.quadtree().add([0, 0]);
```

If the new point is outside the current [extent](#quadtree_extent) of the quadtree, the quadtree is automatically expanded to [cover](#quadtree_cover) the new point.

## *quadtree*.addAll(*data*) {#quadtree_addAll}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/add.js) · Adds the specified iterable of *data* to the quadtree, deriving each element’s coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and return this quadtree.

```js
const tree = d3.quadtree().addAll([[0, 0], [1, 2]]);
```

This is approximately equivalent to calling [*quadtree*.add](#quadtree_add) repeatedly:

```js
for (let i = 0, n = data.length; i < n; ++i) {
  quadtree.add(data[i]);
}
```

However, this method results in a more compact quadtree because the extent of the *data* is computed first before adding the data.

## *quadtree*.remove(*datum*) {#quadtree_remove}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/remove.js) · Removes the specified *datum* from the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
tree.remove(data[0]);
```

If the specified *datum* does not exist in this quadtree (as determined by strict equality with *datum*, and independent of the computed position), this method does nothing.

## *quadtree*.removeAll(*data*) {#quadtree_removeAll}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/remove.js) · Removes the specified *data* from the quadtree, deriving their coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
tree.removeAll(data);
```

If a specified datum does not exist in this quadtree (as determined by strict equality with *datum*, and independent of the computed position), it is ignored.

## *quadtree*.copy() {#quadtree_copy}

```js
const t1 = d3.quadtree(data);
const t2 = t1.copy();
```

[Source](https://github.com/d3/d3-quadtree/blob/main/src/quadtree.js) · Returns a copy of the quadtree. All [nodes](#quadtree-nodes) in the returned quadtree are identical copies of the corresponding node in the quadtree; however, any data in the quadtree is shared by reference and not copied.

## *quadtree*.root() {#quadtree_root}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/root.js) · Returns the root [node](#quadtree-nodes) of the quadtree.

```js
tree.root() // [{…}, empty × 2, {…}]
```

## *quadtree*.data() {#quadtree_data}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/data.js) · Returns an array of all data in the quadtree.

```js
tree.data() // [[0, 0], [1, 2]]
```

## *quadtree*.size() {#quadtree_size}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/size.js) · Returns the total number of data in the quadtree.

```js
tree.size() // 2
```

## *quadtree*.find(*x*, *y*, *radius*) {#quadtree_find}

<PlotRender defer v-once :options='{
  axis: null,
  aspectRatio: 1,
  round: true,
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.rect(quadtree_nodes.call(tree), {stroke: "currentColor", x1: "x1", y1: "y1", x2: "x2", y2: "y2"}),
    Plot.rect({length: 1}, {
      stroke: "red",
      strokeOpacity: 0.5,
      render(index, scales, values, dimensions, context, next) {
        function update(x, y) {
          const visited = quadtree_findVisited.call(tree, x, y);
          return next(
            d3.range(visited.length),
            scales,
            {
              x1: visited.map((d, i) => scales.x(d.x0) + d.dx0),
              y1: visited.map((d, i) => scales.y(d.y0) - d.dy0),
              x2: visited.map((d, i) => scales.x(d.x1) + d.dx1),
              y2: visited.map((d, i) => scales.y(d.y1) - d.dy1)
            },
            dimensions,
            context
          );
        }
        let rect = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newrect = update(scales.x.invert(x), scales.y.invert(y));
          rect.replaceWith(newrect);
          rect = newrect;
        });
        return rect;
      }
    }),
    Plot.dot(points, {
      r: 3.5,
      stroke: "red",
      strokeWidth: 3,
      render(index, scales, values, dimensions, context, next) {
        function update(x, y) {
          const i = tree.find(x, y);
          findState = {x, y, i};
          return next([i], scales, values, dimensions, context);
        }
        let dot = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newdot = update(scales.x.invert(x), scales.y.invert(y));
          dot.replaceWith(newdot);
          dot = newdot;
        });
        return dot;
      }
    }),
  ]
}' />

[Source](https://github.com/d3/d3-quadtree/blob/main/src/find.js) · Returns the datum closest to the position ⟨*x*,*y*⟩ with the given search *radius*. If *radius* is not specified, it defaults to infinity.

```js-vue
tree.find({{findState.x.toFixed(3)}}, {{findState.y.toFixed(3)}}) // {{points[findState.i] && `[${points[findState.i].map((p) => p.toFixed(3)).join(", ")}]`}}
```

If there is no datum within the search area, returns undefined.

```js
tree.find(10, 10, 1) // undefined
```

## *quadtree*.visit(*callback*) {#quadtree_visit}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/visit.js) · Visits each [node](#quadtree-nodes) in the quadtree in pre-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.)

If the *callback* returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited. This can be used to quickly visit only parts of the tree, for example when using the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation). Note, however, that child quadrants are always visited in sibling order: top-left, top-right, bottom-left, bottom-right. In cases such as [search](#quadtree_find), visiting siblings in a specific order may be faster.

As an example, the following visits the quadtree and returns all the nodes within a rectangular extent [xmin, ymin, xmax, ymax], ignoring quads that cannot possibly contain any such node:

```js
function search(quadtree, xmin, ymin, xmax, ymax) {
  const results = [];
  quadtree.visit((node, x1, y1, x2, y2) => {
    if (!node.length) {
      do {
        let d = node.data;
        if (d[0] >= xmin && d[0] < xmax && d[1] >= ymin && d[1] < ymax) {
          results.push(d);
        }
      } while (node = node.next);
    }
    return x1 >= xmax || y1 >= ymax || x2 < xmin || y2 < ymin;
  });
  return results;
}
```

## *quadtree*.visitAfter(*callback*) {#quadtree_visitAfter}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/visitAfter.js) · Visits each [node](#quadtree-nodes) in the quadtree in post-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.) Returns *root*.

## Quadtree nodes

Internal nodes of the quadtree are represented as sparse four-element arrays in left-to-right, top-to-bottom order:

* `0` - the top-left quadrant, if any.
* `1` - the top-right quadrant, if any.
* `2` - the bottom-left quadrant, if any.
* `3` - the bottom-right quadrant, if any.

A child quadrant may be undefined if it is empty.

Leaf nodes are represented as objects with the following properties:

* `data` - the data associated with this point, as passed to [*quadtree*.add](#quadtree_add).
* `next` - the next datum in this leaf, if any.

The `length` property may be used to distinguish leaf nodes from internal nodes: it is undefined for leaf nodes, and 4 for internal nodes. For example, to iterate over all data in a leaf node:

```js
if (!node.length) do console.log(node.data); while (node = node.next);
```

The point’s x and y coordinates **must not be modified** while the point is in the quadtree. To update a point’s position, [remove](#quadtree_remove) the point and then re-[add](#quadtree_add) it to the quadtree at the new position. Alternatively, you may discard the existing quadtree entirely and create a new one from scratch; this may be more efficient if many of the points have moved.

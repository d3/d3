<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "../components/PlotRender.js";

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

</script>

# Tree {#Tree}

<PlotRender :options='{
  axis: null,
  height: 100,
  margin: 20,
  marginRight: 120,
  marks: [
    Plot.tree(gods, {textStroke: "var(--vp-c-bg)"})
  ]
}' />

[Examples](https://observablehq.com/@d3/tidy-tree) · The tree layout produces tidy node-link diagrams of trees using the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf), improved to run in linear time by [Buchheim *et al.*](http://dirk.jivas.de/papers/buchheim02improving.pdf) Tidy trees are typically more compact than [dendrograms](./cluster.md).

## tree() {#tree}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · Creates a new tree layout with default settings.

## *tree*(*root*) {#_tree}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the y coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree). You may want to call [*root*.sort](./hierarchy.md#node_sort) before passing the hierarchy to the tree layout.

## *tree*.size(*size*) {#tree_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *size* is specified, sets this tree layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#tree_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

## *tree*.nodeSize(*size*) {#tree_nodeSize}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *size* is specified, sets this tree layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#tree_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

## *tree*.separation(*separation*) {#tree_separation}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *separation* is specified, sets the separation accessor to the specified function and returns this tree layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

A variation that is more appropriate for radial layouts reduces the separation gap proportionally to the radius:

```js
function separation(a, b) {
  return (a.parent == b.parent ? 1 : 2) / a.depth;
}
```

The separation accessor is used to separate neighboring nodes. The separation function is passed two nodes *a* and *b*, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.

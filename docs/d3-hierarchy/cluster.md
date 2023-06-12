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

# Cluster {#Cluster}

<PlotRender :options='{
  axis: null,
  height: 130,
  margin: 20,
  marginRight: 120,
  marks: [
    Plot.cluster(gods, {textStroke: "var(--vp-c-bg)"})
  ]
}' />

[Examples](https://observablehq.com/@d3/cluster-dendrogram) · The cluster layout produces [dendrograms](http://en.wikipedia.org/wiki/Dendrogram): node-link diagrams that place leaf nodes of the tree at the same depth. Dendrograms are typically less compact than [tidy trees](./tree.md), but are useful when all the leaves should be at the same level, such as for hierarchical clustering or [phylogenetic tree diagrams](https://observablehq.com/@d3/tree-of-life).

## cluster() {#cluster}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · Creates a new cluster layout with default settings.

## *cluster*(*root*) {#_cluster}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the y coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram). You may want to call [*root*.sort](./hierarchy.md#node_sort) before passing the hierarchy to the cluster layout.

## *cluster*.size(*size*) {#cluster_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *size* is specified, sets this cluster layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#cluster_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

## *cluster*.nodeSize(*size*) {#cluster_nodeSize}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *size* is specified, sets this cluster layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#cluster_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

## *cluster*.separation(*separation*) {#cluster_separation}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *separation* is specified, sets the separation accessor to the specified function and returns this cluster layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

The separation accessor is used to separate neighboring leaves. The separation function is passed two leaves *a* and *b*, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.

# Partition {#Partition}

[<img alt="Partition" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/partition.png">](https://observablehq.com/@d3/icicle/2)

[Examples](https://observablehq.com/@d3/icicle/2) · The partition layout produces adjacency diagrams: a space-filling variant of a [node-link tree diagram](./tree.md). Rather than drawing a link between parent and child in the hierarchy, nodes are drawn as solid areas (either arcs or rectangles), and their placement relative to other nodes reveals their position in the hierarchy. The size of the nodes encodes a quantitative dimension that would be difficult to show in a node-link diagram.

## partition() {#partition}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · Creates a new partition layout with the default settings.

## *partition*(*root*) {#_partition}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the partition layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *partition*.size(*size*) {#partition_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *size* is specified, sets this partition layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this partition layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *partition*.round(*round*) {#partition_round}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *round* is specified, enables or disables rounding according to the given boolean and returns this partition layout. If *round* is not specified, returns the current rounding state, which defaults to false.

## *partition*.padding(*padding*) {#partition_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *padding* is specified, sets the padding to the specified number and returns this partition layout. If *padding* is not specified, returns the current padding, which defaults to zero. The padding is used to separate a node’s adjacent children.

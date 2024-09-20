# Treemap {#Treemap}

[<img alt="Treemap" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/treemap.png">](https://observablehq.com/@d3/treemap/2)

[Examples](https://observablehq.com/@d3/treemap/2) · Introduced by [Ben Shneiderman](http://www.cs.umd.edu/hcil/treemap-history/) in 1991, a **treemap** recursively subdivides area into rectangles according to each node’s associated value. D3’s treemap implementation supports an extensible [tiling method](#treemap_tile): the default [squarified](#treemapSquarify) method seeks to generate rectangles with a [golden](https://en.wikipedia.org/wiki/Golden_ratio) aspect ratio; this offers better readability and size estimation than [slice-and-dice](#treemapSliceDice), which simply alternates between horizontal and vertical subdivision by depth.

## treemap() {#treemap}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · Creates a new treemap layout with default settings.

## *treemap*(*root*) {#_treemap}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the treemap layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *treemap*.tile(*tile*) {#treemap_tile}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *tile* is specified, sets the [tiling method](#treemap-tiling) to the specified function and returns this treemap layout. If *tile* is not specified, returns the current tiling method, which defaults to [treemapSquarify](#treemapSquarify) with the golden ratio.

## *treemap*.size(*size*) {#treemap_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *size* is specified, sets this treemap layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this treemap layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *treemap*.round(*round*) {#treemap_round}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *round* is specified, enables or disables rounding according to the given boolean and returns this treemap layout. If *round* is not specified, returns the current rounding state, which defaults to false.

## *treemap*.padding(*padding*) {#treemap_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the [inner](#treemap_paddingInner) and [outer](#treemap_paddingOuter) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function.

## *treemap*.paddingInner(*padding*) {#treemap_paddingInner}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the inner padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The inner padding is used to separate a node’s adjacent children.

## *treemap*.paddingOuter(*padding*) {#treemap_paddingOuter}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the [top](#treemap_paddingTop), [right](#treemap_paddingRight), [bottom](#treemap_paddingBottom) and [left](#treemap_paddingLeft) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function.

## *treemap*.paddingTop(*padding*) {#treemap_paddingTop}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the top padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The top padding is used to separate the top edge of a node from its children.

## *treemap*.paddingRight(*padding*) {#treemap_paddingRight}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the right padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current right padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The right padding is used to separate the right edge of a node from its children.

## *treemap*.paddingBottom(*padding*) {#treemap_paddingBottom}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the bottom padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current bottom padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The bottom padding is used to separate the bottom edge of a node from its children.

## *treemap*.paddingLeft(*padding*) {#treemap_paddingLeft}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the left padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current left padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The left padding is used to separate the left edge of a node from its children.

## Treemap tiling

Several built-in tiling methods are provided for use with [*treemap*.tile](#treemap_tile).

### treemapBinary(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapBinary}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/binary.js) · Recursively partitions the specified *nodes* into an approximately-balanced binary tree, choosing horizontal partitioning for wide rectangles and vertical partitioning for tall rectangles.

### treemapDice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapDice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/dice.js) · Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* horizontally according the value of each of the specified *node*’s children. The children are positioned in order, starting with the left edge (*x0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the right edge (*x1*) of the given rectangle.

### treemapSlice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSlice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/slice.js) · Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* vertically according the value of each of the specified *node*’s children. The children are positioned in order, starting with the top edge (*y0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the bottom edge (*y1*) of the given rectangle.

### treemapSliceDice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSliceDice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/sliceDice.js) · If the specified *node* has odd depth, delegates to [treemapSlice](#treemapSlice); otherwise delegates to [treemapDice](#treemapDice).

### treemapSquarify(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSquarify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js) · Implements the [squarified treemap](https://www.win.tue.nl/~vanwijk/stm.pdf) algorithm by Bruls *et al.*, which seeks to produce rectangles of a given [aspect ratio](#squarify_ratio).

### treemapResquarify(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapResquarify}

[Examples](https://observablehq.com/@d3/animated-treemap) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/resquarify.js) · Like [treemapSquarify](#treemapSquarify), except preserves the topology (node adjacencies) of the previous layout computed by d3.treemapResquarify, if there is one and it used the same [target aspect ratio](#squarify_ratio). This tiling method is good for animating changes to treemaps because it only changes node sizes and not their relative positions, thus avoiding distracting shuffling and occlusion. The downside of a stable update, however, is a suboptimal layout for subsequent updates: only the first layout uses the Bruls *et al.* squarified algorithm.

### *squarify*.ratio(*ratio*) {#squarify_ratio}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js) · Specifies the desired aspect ratio of the generated rectangles. The *ratio* must be specified as a number greater than or equal to one. Note that the orientation of the generated rectangles (tall or wide) is not implied by the ratio; for example, a ratio of two will attempt to produce a mixture of rectangles whose *width*:*height* ratio is either 2:1 or 1:2. (However, you can approximately achieve this result by generating a square treemap at different dimensions, and then [stretching the treemap](https://observablehq.com/@d3/stretched-treemap) to the desired aspect ratio.) Furthermore, the specified *ratio* is merely a hint to the tiling algorithm; the rectangles are not guaranteed to have the specified aspect ratio. If not specified, the aspect ratio defaults to the golden ratio, φ = (1 + sqrt(5)) / 2, per [Kong *et al.*](http://vis.stanford.edu/papers/perception-treemaps)

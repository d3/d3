# d3-hierarchy

Many datasets are intrinsically hierarchical. Consider [geographic entities](https://www.census.gov/programs-surveys/geography/guidance/hierarchy.html), such as census blocks, census tracts, counties and states; the command structure of businesses and governments; file systems and software packages. And even non-hierarchical data may be arranged empirically into a hierarchy, as with [*k*-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) or [phylogenetic trees](https://observablehq.com/@mbostock/tree-of-life).

This module implements several popular techniques for visualizing hierarchical data:

**Node-link diagrams** show topology using discrete marks for nodes and links, such as a circle for each node and a line connecting each parent and child. The [“tidy” tree](#tree) is delightfully compact, while the [dendrogram](#cluster) places leaves at the same level. (These have both polar and Cartesian forms.) [Indented trees](https://observablehq.com/@d3/indented-tree) are useful for interactive browsing.

**Adjacency diagrams** show topology through the relative placement of nodes. They may also encode a quantitative dimension in the area of each node, for example to show revenue or file size. The [“icicle” diagram](#partition) uses rectangles, while the “sunburst” uses annular segments.

**Enclosure diagrams** also use an area encoding, but show topology through containment. A [treemap](#treemap) recursively subdivides area into rectangles. [Circle-packing](#pack) tightly nests circles; this is not as space-efficient as a treemap, but perhaps more readily shows topology.

A good hierarchical visualization facilitates rapid multiscale inference: micro-observations of individual elements and macro-observations of large groups.

## Hierarchies

Before you can compute a hierarchical layout, you need a root node. If your data is already in a hierarchical format, such as JSON, you can pass it directly to [d3.hierarchy](#hierarchy); otherwise, you can rearrange tabular data, such as comma-separated values (CSV), into a hierarchy using [d3.stratify](#stratify).

### d3.hierarchy(data, children)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Constructs a root node from the specified hierarchical *data*. The specified *data* must be an object representing the root node. For example:

```json
{
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}
```

The specified *children* accessor function is invoked for each datum, starting with the root *data*, and must return an iterable of data representing the children, if any. If the children accessor is not specified, it defaults to:

```js
function children(d) {
  return d.children;
}
```

If *data* is a Map, it is implicitly converted to the entry [undefined, *data*], and the children accessor instead defaults to:

```js
function children(d) {
  return Array.isArray(d) ? d[1] : null;
}
```

This allows you to pass the result of [d3.group](https://github.com/d3/d3-array/blob/main/README.md#group) or [d3.rollup](https://github.com/d3/d3-array/blob/main/README.md#rollup) to d3.hierarchy.

The returned node and each descendant has the following properties:

* *node*.data - the associated data, as specified to the [constructor](#hierarchy).
* *node*.depth - zero for the root node, and increasing by one for each descendant generation.
* *node*.height - zero for leaf nodes, and the greatest distance from any descendant leaf for internal nodes.
* *node*.parent - the parent node, or null for the root node.
* *node*.children - an array of child nodes, if any; undefined for leaf nodes.
* *node*.value - the summed value of the node and its [descendants](#node_descendants); optional, see [*node*.sum](#node_sum) and [*node*.count](#node_count).

This method can also be used to test if a node is an `instanceof d3.hierarchy` and to extend the node prototype.

### node.ancestors()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/ancestors.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Returns the array of ancestors nodes, starting with this node, then followed by each parent up to the root.

### node.descendants()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/descendants.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Returns the array of descendant nodes, starting with this node, then followed by each child in topological order.

### node.leaves()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/leaves.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Returns the array of leaf nodes in traversal order; leaves are nodes with no children.

### node.find(filter)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/find.js)<!-- , [Examples](https://observablehq.com/@d3/d3-hierarchy) -->

Returns the first node in the hierarchy from this *node* for which the specified *filter* returns a truthy value. undefined if no such node is found.

### node.path(target)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/path.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Returns the shortest path through the hierarchy from this *node* to the specified *target* node. The path starts at this *node*, ascends to the least common ancestor of this *node* and the *target* node, and then descends to the *target* node. This is particularly useful for [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling).

### node.links()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/links.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Returns an array of links for this *node* and its descendants, where each *link* is an object that defines source and target properties. The source of each link is the parent node, and the target is a child node.

### node.sum(value)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sum.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Evaluates the specified *value* function for this *node* and each descendant in [post-order traversal](#node_eachAfter), and returns this *node*. The *node*.value property of each node is set to the numeric value returned by the specified function plus the combined value of all children. The function is passed the node’s data, and must return a non-negative number. The *value* accessor is evaluated for *node* and every descendant, including internal nodes; if you only want leaf nodes to have internal value, then return zero for any node with children. [For example](https://observablehq.com/@d3/treemap-by-count), as an alternative to [*node*.count](#node_count):

```js
root.sum(function(d) { return d.value ? 1 : 0; });
```

You must call *node*.sum or [*node*.count](#node_count) before invoking a hierarchical layout that requires *node*.value, such as [d3.treemap](#treemap). Since the API supports [method chaining](https://en.wikipedia.org/wiki/Method_chaining), you can invoke *node*.sum and [*node*.sort](#node_sort) before computing the layout, and then subsequently generate an array of all [descendant nodes](#node_descendants) like so:

```js
var treemap = d3.treemap()
    .size([width, height])
    .padding(2);

var nodes = treemap(root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; }))
  .descendants();
```

This example assumes that the node data has a value field.

### node.count()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/count.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Computes the number of leaves under this *node* and assigns it to *node*.value, and similarly for every descendant of *node*. If this *node* is a leaf, its count is one. Returns this *node*. See also [*node*.sum](#node_sum).

### node.sort(compare)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sort.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Sorts the children of this *node*, if any, and each of this *node*’s descendants’ children, in [pre-order traversal](#node_eachBefore) using the specified *compare* function, and returns this *node*. The specified function is passed two nodes *a* and *b* to compare. If *a* should be before *b*, the function must return a value less than zero; if *b* should be before *a*, the function must return a value greater than zero; otherwise, the relative order of *a* and *b* are not specified. See [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more.

Unlike [*node*.sum](#node_sum), the *compare* function is passed two [nodes](#hierarchy) rather than two nodes’ data. For example, if the data has a value property, this sorts nodes by the descending aggregate value of the node and all its descendants, as is recommended for [circle-packing](#pack):

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.value - a.value; });
``````

Similarly, to sort nodes by descending height (greatest distance from any descendant leaf) and then descending value, as is recommended for [treemaps](#treemap) and [icicles](#partition):

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
```

To sort nodes by descending height and then ascending id, as is recommended for [trees](#tree) and [dendrograms](#cluster):

```js
root
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.height - a.height || a.id.localeCompare(b.id); });
```

You must call *node*.sort before invoking a hierarchical layout if you want the new sort order to affect the layout; see [*node*.sum](#node_sum) for an example.

### node[Symbol.iterator]\(\)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/iterator.js "Source")

Returns an iterator over the *node*’s descendants in breadth-first order. For example:

```js
for (const descendant of node) {
  console.log(descendant);
}
```

### node.each(function, that)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/each.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Invokes the specified *function* for *node* and each descendant in [breadth-first order](https://en.wikipedia.org/wiki/Breadth-first_search), such that a given *node* is only visited if all nodes of lesser depth have already been visited, as well as all preceding nodes of the same depth. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

### node.eachAfter(function, that)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachAfter.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Invokes the specified *function* for *node* and each descendant in [post-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Post-order), such that a given *node* is only visited after all of its descendants have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

### node.eachBefore(function, that)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachBefore.js), [Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy)

Invokes the specified *function* for *node* and each descendant in [pre-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order), such that a given *node* is only visited after all of its ancestors have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

### node.copy()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js), [Examples](https://observablehq.com/@d3/d3-hierarchy)

Return a deep copy of the subtree starting at this *node*. (The returned deep copy shares the same data, however.) The returned node is the root of a new tree; the returned node’s parent is always null and its depth is always zero.

## Stratify

Consider the following table of relationships:

Name  | Parent
------|--------
Eve   |
Cain  | Eve
Seth  | Eve
Enos  | Seth
Noam  | Seth
Abel  | Eve
Awan  | Eve
Enoch | Awan
Azura | Eve

These names are conveniently unique, so we can unambiguously represent the hierarchy as a CSV file:

```
name,parent
Eve,
Cain,Eve
Seth,Eve
Enos,Seth
Noam,Seth
Abel,Eve
Awan,Eve
Enoch,Awan
Azura,Eve
```

To parse the CSV using [d3.csvParse](https://github.com/d3/d3-dsv#csvParse):

```js
var table = d3.csvParse(text);
```

This returns:

```json
[
  {"name": "Eve",   "parent": ""},
  {"name": "Cain",  "parent": "Eve"},
  {"name": "Seth",  "parent": "Eve"},
  {"name": "Enos",  "parent": "Seth"},
  {"name": "Noam",  "parent": "Seth"},
  {"name": "Abel",  "parent": "Eve"},
  {"name": "Awan",  "parent": "Eve"},
  {"name": "Enoch", "parent": "Awan"},
  {"name": "Azura", "parent": "Eve"}
]
```

To convert to a hierarchy:

```js
var root = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
    (table);
```

This returns:

[<img alt="Stratify" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/stratify.png">](https://runkit.com/mbostock/56fed33d8630b01300f72daa)

This hierarchy can now be passed to a hierarchical layout, such as [d3.tree](#_tree), for visualization.

### d3.stratify()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js), [Examples](https://observablehq.com/@d3/d3-stratify)

Constructs a new stratify operator with the default settings.

### stratify(data)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js), [Examples](https://observablehq.com/@d3/d3-stratify)

Generates a new hierarchy from the specified tabular *data*.

### stratify.id(id)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js), [Examples](https://observablehq.com/@d3/d3-stratify)

If *id* is specified, sets the id accessor to the given function and returns this stratify operator. Otherwise, returns the current id accessor, which defaults to:

```js
function id(d) {
  return d.id;
}
```

The id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [parent id](#stratify_parentId). For leaf nodes, the id may be undefined; otherwise, the id must be unique. (Null and the empty string are equivalent to undefined.)

### stratify.parentId(parentId)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js), [Examples](https://observablehq.com/@d3/d3-stratify)

If *parentId* is specified, sets the parent id accessor to the given function and returns this stratify operator. Otherwise, returns the current parent id accessor, which defaults to:

```js
function parentId(d) {
  return d.parentId;
}
```

The parent id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [id](#stratify_id). For the root node, the parent id should be undefined. (Null and the empty string are equivalent to undefined.) There must be exactly one root node in the input data, and no circular relationships.

### stratify.path(path)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js), [Examples](https://observablehq.com/@d3/d3-stratify)

If *path* is specified, sets the path accessor to the given function and returns this stratify operator. Otherwise, returns the current path accessor, which defaults to undefined. If a path accessor is set, the id and parentId arguments are ignored, and a unix-like hierarchy is computed on the slash-delimited strings returned by the path accessor, imputing parent nodes and ids as necessary.

```js
d3.stratify().path(d => d)(["a/b", "a/c"]); // nodes with id "/a", "/a/b", "/a/c"
```

## Cluster

[<img alt="Dendrogram" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/cluster.png">](https://observablehq.com/@d3/cluster-dendrogram)

The **cluster layout** produces [dendrograms](http://en.wikipedia.org/wiki/Dendrogram): node-link diagrams that place leaf nodes of the tree at the same depth. Dendrograms are typically less compact than [tidy trees](#tree), but are useful when all the leaves should be at the same level, such as for hierarchical clustering or [phylogenetic tree diagrams](https://observablehq.com/@mbostock/tree-of-life).

### d3.cluster()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js), [Examples](https://observablehq.com/@d3/cluster-dendrogram)

Creates a new cluster layout with default settings.

### cluster(root)

Lays out the specified *root* [hierarchy](#hierarchy), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the *y*-coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram). You may want to call [*root*.sort](#node_sort) before passing the hierarchy to the cluster layout.

### cluster.size(size)

If *size* is specified, sets this cluster layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#cluster_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

### cluster.nodeSize(size)

If *size* is specified, sets this cluster layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#cluster_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

### cluster.separation(separation)

If *separation* is specified, sets the separation accessor to the specified function and returns this cluster layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

The separation accessor is used to separate neighboring leaves. The separation function is passed two leaves *a* and *b*, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.

## Tree

[<img alt="Tidy Tree" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/tree.png">](https://observablehq.com/@d3/tidy-tree)

The **tree** layout produces tidy node-link diagrams of trees using the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf), improved to run in linear time by [Buchheim *et al.*](http://dirk.jivas.de/papers/buchheim02improving.pdf) Tidy trees are typically more compact than [dendrograms](#cluster).

### d3.tree()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js), [Examples](https://observablehq.com/@d3/tidy-tree)

Creates a new tree layout with default settings.

### tree(root)

Lays out the specified *root* [hierarchy](#hierarchy), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the *y*-coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree). You may want to call [*root*.sort](#node_sort) before passing the hierarchy to the tree layout.

### tree.size(size)

If *size* is specified, sets this tree layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#tree_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

### tree.nodeSize(size)

If *size* is specified, sets this tree layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#tree_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

### tree.separation(separation)

If *separation* is specified, sets the separation accessor to the specified function and returns this tree layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

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

## Treemap

[<img alt="Treemap" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/treemap.png">](https://observablehq.com/@d3/treemap)

Introduced by [Ben Shneiderman](http://www.cs.umd.edu/hcil/treemap-history/) in 1991, a **treemap** recursively subdivides area into rectangles according to each node’s associated value. D3’s treemap implementation supports an extensible [tiling method](#treemap_tile): the default [squarified](#treemapSquarify) method seeks to generate rectangles with a [golden](https://en.wikipedia.org/wiki/Golden_ratio) aspect ratio; this offers better readability and size estimation than [slice-and-dice](#treemapSliceDice), which simply alternates between horizontal and vertical subdivision by depth.

### d3.treemap()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js), [Examples](https://observablehq.com/@d3/treemap)

Creates a new treemap layout with default settings.

### treemap(root)

Lays out the specified *root* [hierarchy](#hierarchy), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](#node_sum) before passing the hierarchy to the treemap layout. You probably also want to call [*root*.sort](#node_sort) to order the hierarchy before computing the layout.

### treemap.tile(tile)

If *tile* is specified, sets the [tiling method](#treemap-tiling) to the specified function and returns this treemap layout. If *tile* is not specified, returns the current tiling method, which defaults to [d3.treemapSquarify](#treemapSquarify) with the golden ratio.

### treemap.size(size)

If *size* is specified, sets this treemap layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this treemap layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

### treemap.round(round)

If *round* is specified, enables or disables rounding according to the given boolean and returns this treemap layout. If *round* is not specified, returns the current rounding state, which defaults to false.

### treemap.padding(padding)

If *padding* is specified, sets the [inner](#treemap_paddingInner) and [outer](#treemap_paddingOuter) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function.

### treemap.paddingInner(padding)

If *padding* is specified, sets the inner padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The inner padding is used to separate a node’s adjacent children.

### treemap.paddingOuter(padding)

If *padding* is specified, sets the [top](#treemap_paddingTop), [right](#treemap_paddingRight), [bottom](#treemap_paddingBottom) and [left](#treemap_paddingLeft) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function.

### treemap.paddingTop(padding)

If *padding* is specified, sets the top padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The top padding is used to separate the top edge of a node from its children.

### treemap.paddingRight(padding)

If *padding* is specified, sets the right padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current right padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The right padding is used to separate the right edge of a node from its children.

### treemap.paddingBottom(padding)

If *padding* is specified, sets the bottom padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current bottom padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The bottom padding is used to separate the bottom edge of a node from its children.

### treemap.paddingLeft(padding)

If *padding* is specified, sets the left padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current left padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The left padding is used to separate the left edge of a node from its children.

## Treemap Tiling

Several built-in tiling methods are provided for use with [*treemap*.tile](#treemap_tile).

### d3.treemapBinary(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/binary.js), [Examples](https://observablehq.com/@d3/treemap)

Recursively partitions the specified *nodes* into an approximately-balanced binary tree, choosing horizontal partitioning for wide rectangles and vertical partitioning for tall rectangles.

### d3.treemapDice(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/dice.js), [Examples](https://observablehq.com/@d3/treemap)

Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* horizontally according the value of each of the specified *node*’s children. The children are positioned in order, starting with the left edge (*x0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the right edge (*x1*) of the given rectangle.

### d3.treemapSlice(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/slice.js), [Examples](https://observablehq.com/@d3/treemap)

Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* vertically according the value of each of the specified *node*’s children. The children are positioned in order, starting with the top edge (*y0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the bottom edge (*y1*) of the given rectangle.

### d3.treemapSliceDice(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/sliceDice.js), [Examples](https://observablehq.com/@d3/treemap)

If the specified *node* has odd depth, delegates to [treemapSlice](#treemapSlice); otherwise delegates to [treemapDice](#treemapDice).

### d3.treemapSquarify(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js), [Examples](https://observablehq.com/@d3/treemap)

Implements the [squarified treemap](https://www.win.tue.nl/~vanwijk/stm.pdf) algorithm by Bruls *et al.*, which seeks to produce rectangles of a given [aspect ratio](#squarify_ratio).

### d3.treemapResquarify(node, x0, y0, x1, y1)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/resquarify.js), [Examples](https://observablehq.com/@d3/animated-treemap)

Like [d3.treemapSquarify](#treemapSquarify), except preserves the topology (node adjacencies) of the previous layout computed by d3.treemapResquarify, if there is one and it used the same [target aspect ratio](#squarify_ratio). This tiling method is good for animating changes to treemaps because it only changes node sizes and not their relative positions, thus avoiding distracting shuffling and occlusion. The downside of a stable update, however, is a suboptimal layout for subsequent updates: only the first layout uses the Bruls *et al.* squarified algorithm.

### squarify.ratio(ratio)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js), [Examples](https://observablehq.com/@d3/treemap)

Specifies the desired aspect ratio of the generated rectangles. The *ratio* must be specified as a number greater than or equal to one. Note that the orientation of the generated rectangles (tall or wide) is not implied by the ratio; for example, a ratio of two will attempt to produce a mixture of rectangles whose *width*:*height* ratio is either 2:1 or 1:2. (However, you can approximately achieve this result by generating a square treemap at different dimensions, and then [stretching the treemap](https://observablehq.com/@d3/stretched-treemap) to the desired aspect ratio.) Furthermore, the specified *ratio* is merely a hint to the tiling algorithm; the rectangles are not guaranteed to have the specified aspect ratio. If not specified, the aspect ratio defaults to the golden ratio, φ = (1 + sqrt(5)) / 2, per [Kong *et al.*](http://vis.stanford.edu/papers/perception-treemaps)

## Partition

[<img alt="Partition" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/partition.png">](https://observablehq.com/@d3/icicle)

The **partition layout** produces adjacency diagrams: a space-filling variant of a node-link tree diagram. Rather than drawing a link between parent and child in the hierarchy, nodes are drawn as solid areas (either arcs or rectangles), and their placement relative to other nodes reveals their position in the hierarchy. The size of the nodes encodes a quantitative dimension that would be difficult to show in a node-link diagram.

### d3.partition()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js), [Examples](https://observablehq.com/@d3/icicle)

Creates a new partition layout with the default settings.

### partition(root)

Lays out the specified *root* [hierarchy](#hierarchy), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](#node_sum) before passing the hierarchy to the partition layout. You probably also want to call [*root*.sort](#node_sort) to order the hierarchy before computing the layout.

### partition.size(size)

If *size* is specified, sets this partition layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this partition layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

### partition.round(round)

If *round* is specified, enables or disables rounding according to the given boolean and returns this partition layout. If *round* is not specified, returns the current rounding state, which defaults to false.

### partition.padding(padding)

If *padding* is specified, sets the padding to the specified number and returns this partition layout. If *padding* is not specified, returns the current padding, which defaults to zero. The padding is used to separate a node’s adjacent children.

## Pack

[<img alt="Circle-Packing" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/pack.png">](https://observablehq.com/@d3/circle-packing)

Enclosure diagrams use containment (nesting) to represent a hierarchy. The size of the leaf circles encodes a quantitative dimension of the data. The enclosing circles show the approximate cumulative size of each subtree, but due to wasted space there is some distortion; only the leaf nodes can be compared accurately. Although [circle packing](http://en.wikipedia.org/wiki/Circle_packing) does not use space as efficiently as a [treemap](#treemap), the “wasted” space more prominently reveals the hierarchical structure.

### d3.pack()

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js), [Examples](https://observablehq.com/@d3/circle-packing)

Creates a new pack layout with the default settings.

### pack(root)

Lays out the specified *root* [hierarchy](#hierarchy), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the circle’s center
* *node*.y - the *y*-coordinate of the circle’s center
* *node*.r - the radius of the circle

You must call [*root*.sum](#node_sum) before passing the hierarchy to the pack layout. You probably also want to call [*root*.sort](#node_sort) to order the hierarchy before computing the layout.

### pack.radius(radius)

If *radius* is specified, sets the pack layout’s radius accessor to the specified function and returns this pack layout. If *radius* is not specified, returns the current radius accessor, which defaults to null. If the radius accessor is null, the radius of each leaf circle is derived from the leaf *node*.value (computed by [*node*.sum](#node_sum)); the radii are then scaled proportionally to fit the [layout size](#pack_size). If the radius accessor is not null, the radius of each leaf circle is specified exactly by the function.

### pack.size(size)

If *size* is specified, sets this pack layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this pack layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

### pack.padding(padding)

If *padding* is specified, sets this pack layout’s padding accessor to the specified number or function and returns this pack layout. If *padding* is not specified, returns the current padding accessor, which defaults to the constant zero. When siblings are packed, tangent siblings will be separated by approximately the specified padding; the enclosing parent circle will also be separated from its children by approximately the specified padding. If an [explicit radius](#pack_radius) is not specified, the padding is approximate because a two-pass algorithm is needed to fit within the [layout size](#pack_size): the circles are first packed without padding; a scaling factor is computed and applied to the specified padding; and lastly the circles are re-packed with padding.

### d3.packSiblings(circles)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/siblings.js)

Packs the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius. Assigns the following properties to each circle:

* *circle*.x - the *x*-coordinate of the circle’s center
* *circle*.y - the *y*-coordinate of the circle’s center

The circles are positioned according to the front-chain packing algorithm by [Wang *et al.*](https://dl.acm.org/citation.cfm?id=1124851)

### d3.packEnclose(circles)

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/enclose.js), [Examples](https://observablehq.com/@d3/d3-packenclose)

Computes the [smallest circle](https://en.wikipedia.org/wiki/Smallest-circle_problem) that encloses the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius, and *circle*.x and *circle*.y properties specifying the circle’s center. The enclosing circle is computed using the [Matoušek-Sharir-Welzl algorithm](http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf). (See also [Apollonius’ Problem](https://bl.ocks.org/mbostock/751fdd637f4bc2e3f08b).)

# Hierarchies

Before you can compute a [hierarchical layout](../d3-hierarchy.md), you need a root node. If your data is already in a hierarchical format, such as JSON, you can pass it directly to [hierarchy](#hierarchy); otherwise, you can rearrange tabular data, such as comma-separated values (CSV), into a hierarchy using [stratify](./stratify.md).

## hierarchy(*data*, *children*) {#hierarchy}

[Examples](https://observablehq.com/@d3/d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js) · Constructs a root node from the specified hierarchical *data*. The specified *data* must be an object representing the root node. For example:

```js
const data = {
  name: "Eve",
  children: [
    {name: "Cain"},
    {name: "Seth", children: [{name: "Enos"}, {name: "Noam"}]},
    {name: "Abel"},
    {name: "Awan", children: [{name: "Enoch"}]},
    {name: "Azura"}
  ]
};
```

To construct a hierarchy:

```js
const root = d3.hierarchy(data);
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

This allows you to pass the result of [group](../d3-array/group.md#group) or [rollup](../d3-array/group.md#rollup) to hierarchy.

The returned root node and each descendant has the following properties:

* *node*.data - the associated data as passed to [hierarchy](#hierarchy)
* *node*.depth - zero for the root, increasing by one for each descendant generation
* *node*.height - the greatest distance from any descendant leaf, or zero for leaves
* *node*.parent - the parent node, or null for the root node
* *node*.children - an array of child nodes, if any, or undefined for leaves
* *node*.value - the optional summed value of the node and its [descendants](#node_descendants)

This method can also be used to test if a node is an `instanceof d3.hierarchy` and to extend the node prototype.

## *node*.ancestors() {#node_ancestors}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/ancestors.js) · Returns the array of ancestors nodes, starting with this node, then followed by each parent up to the root.

## *node*.descendants() {#node_descendants}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/descendants.js) · Returns the array of descendant nodes, starting with this node, then followed by each child in topological order.

## *node*.leaves() {#node_leaves}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/leaves.js) · Returns the array of leaf nodes in traversal order. A *leaf* is a node with no children.

## *node*.find(*filter*) {#node_find}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/find.js) · Returns the first node in the hierarchy from this *node* for which the specified *filter* returns a truthy value. Returns undefined if no such node is found.

## *node*.path(*target*) {#node_path}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/path.js) · Returns the shortest path through the hierarchy from this *node* to the specified *target* node. The path starts at this *node*, ascends to the least common ancestor of this *node* and the *target* node, and then descends to the *target* node. This is useful for [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling).

## *node*.links() {#node_links}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/links.js) · Returns an array of links for this *node* and its descendants, where each *link* is an object that defines source and target properties. The source of each link is the parent node, and the target is a child node.

## *node*.sum(*value*) {#node_sum}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sum.js) · Evaluates the specified *value* function for this *node* and each descendant in [post-order traversal](#node_eachAfter), and returns this *node*. The *node*.value property of each node is set to the numeric value returned by the specified function plus the combined value of all children. The function is passed the node’s data, and must return a non-negative number. The *value* accessor is evaluated for *node* and every descendant, including internal nodes; if you only want leaf nodes to have internal value, then return zero for any node with children. [For example](https://observablehq.com/@d3/treemap-by-count), as an alternative to [*node*.count](#node_count):

```js
root.sum((d) => d.value ? 1 : 0);
```

You must call *node*.sum or [*node*.count](#node_count) before invoking a hierarchical layout that requires *node*.value, such as [treemap](./treemap.md). For example:

```js
// Construct the treemap layout.
const treemap = d3.treemap();
treemap.size([width, height]);
treemap.padding(2);

// Sum and sort the data.
root.sum((d) => d.value);
root.sort((a, b) => b.height - a.height || b.value - a.value);

// Compute the treemap layout.
treemap(root);

// Retrieve all descendant nodes.
const nodes = root.descendants();
```

Since the API supports [method chaining](https://en.wikipedia.org/wiki/Method_chaining), you can also say:

```js
d3.treemap()
    .size([width, height])
    .padding(2)
  (root
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value))
  .descendants()
```

This example assumes that the node data has a value field.

## *node*.count() {#node_count}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/count.js) · Computes the number of leaves under this *node* and assigns it to *node*.value, and similarly for every descendant of *node*. If this *node* is a leaf, its count is one. Returns this *node*. See also [*node*.sum](#node_sum).

## *node*.sort(compare) {#node_sort}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sort.js) · Sorts the children of this *node*, if any, and each of this *node*’s descendants’ children, in [pre-order traversal](#node_eachBefore) using the specified *compare* function, and returns this *node*.

The specified function is passed two nodes *a* and *b* to compare. If *a* should be before *b*, the function must return a value less than zero; if *b* should be before *a*, the function must return a value greater than zero; otherwise, the relative order of *a* and *b* are not specified. See [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more.

Unlike [*node*.sum](#node_sum), the *compare* function is passed two [nodes](#hierarchy) rather than two nodes’ data. For example, if the data has a value property, this sorts nodes by the descending aggregate value of the node and all its descendants, as is recommended for [circle-packing](./pack.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
```

Similarly, to sort nodes by descending height (greatest distance from any descendant leaf) and then descending value, as is recommended for [treemaps](./treemap.md) and [icicles](./partition.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);
```

To sort nodes by descending height and then ascending id, as is recommended for [trees](./tree.md) and [dendrograms](./cluster.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || d3.ascending(a.id, b.id));
```

You must call *node*.sort before invoking a hierarchical layout if you want the new sort order to affect the layout; see [*node*.sum](#node_sum) for an example.

## node[Symbol.iterator]\(\) {#node_iterator}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/iterator.js) · Returns an iterator over the *node*’s descendants in breadth-first order. For example:

```js
for (const descendant of node) {
  console.log(descendant);
}
```

## *node*.each(*function*, *that*) {#node_each}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/each.js) · Invokes the specified *function* for *node* and each descendant in [breadth-first order](https://en.wikipedia.org/wiki/Breadth-first_search), such that a given *node* is only visited if all nodes of lesser depth have already been visited, as well as all preceding nodes of the same depth. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.eachAfter(*function*, *that*) {#node_eachAfter}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachAfter.js) · Invokes the specified *function* for *node* and each descendant in [post-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Post-order), such that a given *node* is only visited after all of its descendants have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.eachBefore(*function*, *that*) {#node_eachBefore}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachBefore.js) · Invokes the specified *function* for *node* and each descendant in [pre-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order), such that a given *node* is only visited after all of its ancestors have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.copy() {#node_copy}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js) · Return a deep copy of the subtree starting at this *node*. (The returned deep copy shares the same data, however.) The returned node is the root of a new tree; the returned node’s parent is always null and its depth is always zero.

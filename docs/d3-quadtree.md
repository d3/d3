# d3-quadtree

A [quadtree](https://en.wikipedia.org/wiki/Quadtree) recursively partitions two-dimensional space into squares, dividing each square into four equally-sized squares. Each distinct point exists in a unique leaf [node](#nodes); coincident points are represented by a linked list. Quadtrees can accelerate various spatial operations, such as the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation) for computing many-body forces, collision detection, and searching for nearby points.

<a href="http://bl.ocks.org/mbostock/9078690"><img src="http://bl.ocks.org/mbostock/raw/9078690/thumbnail.png" width="202"></a>
<a href="http://bl.ocks.org/mbostock/4343214"><img src="http://bl.ocks.org/mbostock/raw/4343214/thumbnail.png" width="202"></a>

## Quadtress

### d3.quadtree(data, x, y)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/quadtree.js "Source")

Creates a new, empty quadtree with an empty [extent](#quadtree_extent) and the default [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors. If *data* is specified, [adds](#quadtree_addAll) the specified iterable of data to the quadtree. This is equivalent to:

```js
const tree = d3.quadtree()
    .addAll(data);
```

If *x* and *y* are also specified, sets the [*x*-](#quadtree_x) and [*y*-](#quadtree_y) accessors to the specified functions before adding the specified iterable of data to the quadtree, equivalent to:

```js
const tree = d3.quadtree()
    .x(x)
    .y(y)
    .addAll(data);
```

### quadtree.x(x)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/x.js "Source")

If *x* is specified, sets the current *x*-coordinate accessor and returns the quadtree. If *x* is not specified, returns the current *x*-accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

The *x*-acccessor is used to derive the *x*-coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the *x*- and *y*-accessors must be consistent, returning the same value given the same input.

### quadtree.y(y)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/y.js "Source")

If *y* is specified, sets the current *y*-coordinate accessor and returns the quadtree. If *y* is not specified, returns the current *y*-accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

The *y*-acccessor is used to derive the *y*-coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the *x*- and *y*-accessors must be consistent, returning the same value given the same input.

### quadtree.extent(extent)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/extent.js "Source")

If *extent* is specified, expands the quadtree to [cover](#quadtree_cover) the specified points [[*x0*, *y0*], [*x1*, *y1*]] and returns the quadtree. If *extent* is not specified, returns the quadtree’s current extent [[*x0*, *y0*], [*x1*, *y1*]], where *x0* and *y0* are the inclusive lower bounds and *x1* and *y1* are the inclusive upper bounds, or undefined if the quadtree has no extent. The extent may also be expanded by calling [*quadtree*.cover](#quadtree_cover) or [*quadtree*.add](#quadtree_add).

### quadtree.cover(x, y)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/cover.js "Source")

Expands the quadtree to cover the specified point ⟨*x*,*y*⟩, and returns the quadtree. If the quadtree’s extent already covers the specified point, this method does nothing. If the quadtree has an extent, the extent is repeatedly doubled to cover the specified point, wrapping the [root](#quadtree_root) [node](#nodes) as necessary; if the quadtree is empty, the extent is initialized to the extent [[⌊*x*⌋, ⌊*y*⌋], [⌈*x*⌉, ⌈*y*⌉]]. (Rounding is necessary such that if the extent is later doubled, the boundaries of existing quadrants do not change due to floating point error.)

### quadtree.add(datum)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/add.js "Source")

Adds the specified *datum* to the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors, and returns the quadtree. If the new point is outside the current [extent](#quadtree_extent) of the quadtree, the quadtree is automatically expanded to [cover](#quadtree_cover) the new point.

### quadtree.addAll(data)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/add.js "Source")

Adds the specified iterable of *data* to the quadtree, deriving each element’s coordinates ⟨*x*,*y*⟩ using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors, and return this quadtree. This is approximately equivalent to calling [*quadtree*.add](#quadtree_add) repeatedly:

```js
for (let i = 0, n = data.length; i < n; ++i) {
  quadtree.add(data[i]);
}
```

However, this method results in a more compact quadtree because the extent of the *data* is computed first before adding the data.

### quadtree.remove(datum)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/remove.js "Source")

Removes the specified *datum* from the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors, and returns the quadtree. If the specified *datum* does not exist in this quadtree, this method does nothing.

### quadtree.removeAll(data)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/remove.js "Source")

Removes the specified *data* from the quadtree, deriving their coordinates ⟨*x*,*y*⟩ using the current [*x*-](#quadtree_x) and [*y*-](#quadtree_y)accessors, and returns the quadtree. If a specified datum does not exist in this quadtree, it is ignored.

### quadtree.copy()

Returns a copy of the quadtree. All [nodes](#nodes) in the returned quadtree are identical copies of the corresponding node in the quadtree; however, any data in the quadtree is shared by reference and not copied.

### quadtree.root()

[Source](https://github.com/d3/d3-quadtree/blob/master/src/root.js "Source")

Returns the root [node](#nodes) of the quadtree.

### quadtree.data()

[Source](https://github.com/d3/d3-quadtree/blob/master/src/data.js "Source")

Returns an array of all data in the quadtree.

### quadtree.size()

[Source](https://github.com/d3/d3-quadtree/blob/master/src/size.js "Source")

Returns the total number of data in the quadtree.

### quadtree.find(x, y, radius)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/find.js "Source")

Returns the datum closest to the position ⟨*x*,*y*⟩ with the given search *radius*. If *radius* is not specified, it defaults to infinity. If there is no datum within the search area, returns undefined.

### quadtree.visit(callback)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/visit.js "Source")

Visits each [node](#nodes) in the quadtree in pre-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.)

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

### quadtree.visitAfter(callback)

[Source](https://github.com/d3/d3-quadtree/blob/master/src/visitAfter.js "Source")

Visits each [node](#nodes) in the quadtree in post-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.) Returns *root*.

## Nodes

Internal nodes of the quadtree are represented as four-element arrays in left-to-right, top-to-bottom order:

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

The point’s *x*- and *y*-coordinates **must not be modified** while the point is in the quadtree. To update a point’s position, [remove](#quadtree_remove) the point and then re-[add](#quadtree_add) it to the quadtree at the new position. Alternatively, you may discard the existing quadtree entirely and create a new one from scratch; this may be more efficient if many of the points have moved.

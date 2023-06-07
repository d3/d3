# Stratify {#Stratify}

[Examples](https://observablehq.com/@d3/d3-stratify) · Consider the following table of relationships:

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

To parse the CSV using [csvParse](../d3-dsv.md#csvParse):

```js
const table = d3.csvParse(text);
```

This returns an array of {*name*, *parent*} objects:

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

To convert to a [hierarchy](./hierarchy.md):

```js
const root = d3.stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent)
  (table);
```

This hierarchy can now be passed to a hierarchical layout, such as [tree](./tree.md), for visualization.

The stratify operator also works with [delimited paths](#stratify_path) as is common in file systems.

## stratify() {#stratify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · Constructs a new stratify operator with the default settings.

```js
const stratify = d3.stratify();
```

## *stratify*(*data*) {#_stratify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · Generates a new hierarchy from the specified tabular *data*.

```js
const root = stratify(data);
```

## *stratify*.id(*id*) {#stratify_id}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *id* is specified, sets the id accessor to the given function and returns this stratify operator. Otherwise, returns the current id accessor, which defaults to:

```js
function id(d) {
  return d.id;
}
```

The id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [parent id](#stratify_parentId). For leaf nodes, the id may be undefined; otherwise, the id must be unique. (Null and the empty string are equivalent to undefined.)

## *stratify*.parentId(*parentId*) {#stratify_parentId}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *parentId* is specified, sets the parent id accessor to the given function and returns this stratify operator. Otherwise, returns the current parent id accessor, which defaults to:

```js
function parentId(d) {
  return d.parentId;
}
```

The parent id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [id](#stratify_id). For the root node, the parent id should be undefined. (Null and the empty string are equivalent to undefined.) There must be exactly one root node in the input data, and no circular relationships.

## *stratify*.path(*path*) {#stratify_path}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *path* is specified, sets the path accessor to the given function and returns this stratify operator. Otherwise, returns the current path accessor, which defaults to undefined.

If a path accessor is set, the [id](#stratify_id) and [parentId](#stratify_parentId) accessors are ignored, and a unix-like hierarchy is computed on the slash-delimited strings returned by the path accessor, imputing parent nodes and ids as necessary.

For example, given the output of the UNIX find command in the local directory:

```js
const paths = [
  "axes.js",
  "channel.js",
  "context.js",
  "legends.js",
  "legends/ramp.js",
  "marks/density.js",
  "marks/dot.js",
  "marks/frame.js",
  "scales/diverging.js",
  "scales/index.js",
  "scales/ordinal.js",
  "stats.js",
  "style.js",
  "transforms/basic.js",
  "transforms/bin.js",
  "transforms/centroid.js",
  "warnings.js",
];
```

You can say:

```js
const root = d3.stratify().path((d) => d)(paths);
```

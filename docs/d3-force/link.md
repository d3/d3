<script setup>

import ExampleLinkForce from "../components/ExampleLinkForce.vue";

</script>

# Link force

<ExampleLinkForce />

The link force pushes linked nodes together or apart according to the desired [link distance](#link_distance). The strength of the force is proportional to the difference between the linked nodes’ distance and the target distance, similar to a spring force.

## forceLink(*links*) {#forceLink}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · Creates a new link force with the specified *links* and default parameters. If *links* is not specified, it defaults to the empty array.

:::warning
This function is impure; it may mutate the passed-in *links*. See [*link*.links](#link_links).
:::

```js
const link = d3.forceLink(links).id((d) => d.id);
```

## *link*.links(*links*) {#link_links}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *links* is specified, sets the array of links associated with this force, recomputes the [distance](#link_distance) and [strength](#link_strength) parameters for each link, and returns this force. If *links* is not specified, returns the current array of links, which defaults to the empty array.

Each link is an object with the following properties:

* `source` - the link’s source node; see [*simulation*.nodes](./simulation.md#simulation_nodes)
* `target` - the link’s target node; see [*simulation*.nodes](./simulation.md#simulation_nodes)
* `index` - the zero-based index into *links*, assigned by this method

For convenience, a link’s source and target properties may be initialized using numeric or string identifiers rather than object references; see [*link*.id](#link_id).

:::warning
This function is impure; it may mutate the passed-in *links* when the link force is [initialized](./simulation.md#force_initialize) (or re-initialized, as when the nodes or links change). Any *link*.source or *link*.target property which is not an object is replaced by an object reference to the corresponding *node* with the given identifier.
:::

If the specified array of *links* is modified, such as when links are added to or removed from the simulation, this method must be called again with the new (or changed) array to notify the force of the change; the force does not make a defensive copy of the specified array.

## *link*.id(*id*) {#link_id}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *id* is specified, sets the node id accessor to the specified function and returns this force. If *id* is not specified, returns the current node id accessor, which defaults to the numeric *node*.index:

```js
function id(d) {
  return d.index;
}
```

The default id accessor allows each link’s source and target to be specified as a zero-based index into the [nodes](./simulation.md#simulation_nodes) array. For example:

```js
const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"}
];

const links = [
  {"source": 0, "target": 1}, // Alice → Bob
  {"source": 1, "target": 2} // Bob → Carol
];
```

Now consider a different id accessor that returns a string:

```js
function id(d) {
  return d.id;
}
```

With this accessor, you can use named sources and targets:

```js
const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"}
];

const links = [
  {"source": "Alice", "target": "Bob"},
  {"source": "Bob", "target": "Carol"}
];
```

This is particularly useful when representing graphs in JSON, as JSON does not allow references. See [this example](https://observablehq.com/@d3/force-directed-graph/2).

The id accessor is invoked for each node whenever the force is initialized, as when the [nodes](./simulation.md#simulation_nodes) or [links](#link_links) change, being passed the node and its zero-based index.

## *link*.distance(*distance*) {#link_distance}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *distance* is specified, sets the distance accessor to the specified number or function, re-evaluates the distance accessor for each link, and returns this force. If *distance* is not specified, returns the current distance accessor, which defaults to:

```js
function distance() {
  return 30;
}
```

The distance accessor is invoked for each [link](#link_links), being passed the *link* and its zero-based *index*. The resulting number is then stored internally, such that the distance of each link is only recomputed when the force is initialized or when this method is called with a new *distance*, and not on every application of the force.

## *link*.strength(*strength*) {#link_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each link, and returns this force. If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength(link) {
  return 1 / Math.min(count(link.source), count(link.target));
}
```

Where *count*(*node*) is a function that returns the number of links with the given node as a source or target. This default was chosen because it automatically reduces the strength of links connected to heavily-connected nodes, improving stability.

The strength accessor is invoked for each [link](#link_links), being passed the *link* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each link is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *link*.iterations(*iterations*) {#link_iterations}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *iterations* is specified, sets the number of iterations per application to the specified number and returns this force. If *iterations* is not specified, returns the current iteration count which defaults to 1. Increasing the number of iterations greatly increases the rigidity of the constraint and is useful for [complex structures such as lattices](https://observablehq.com/@d3/force-directed-lattice), but also increases the runtime cost to evaluate the force.

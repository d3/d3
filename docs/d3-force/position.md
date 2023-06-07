# Position forces

The [*x*](#forceX)- and [*y*](#forceY)-position forces push nodes towards a desired position along the given dimension with a configurable strength. The [*radial*](#forceRadial) force is similar, except it pushes nodes towards the closest point on a given circle. The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position. While these forces can be used to position individual nodes, they are intended primarily for global forces that apply to all (or most) nodes.

## forceX(*x*) {#forceX}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · Creates a new position force along the *x*-axis towards the given position [*x*](#x_x). If *x* is not specified, it defaults to 0.

```js
const x = d3.forceX(width / 2);
```

## *x*.strength(*strength*) {#x_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *x*-velocity: ([*x*](#x_x) - *node*.x) × *strength*. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current *x*-position to the target *x*-position with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *x*.x(*x*) {#x_x}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · If *x* is specified, sets the *x*-coordinate accessor to the specified number or function, re-evaluates the *x*-accessor for each node, and returns this force. If *x* is not specified, returns the current *x*-accessor, which defaults to:

```js
function x() {
  return 0;
}
```

The *x*-accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target *x*-coordinate of each node is only recomputed when the force is initialized or when this method is called with a new *x*, and not on every application of the force.

## forceY(*y*) {#forceY}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · Creates a new position force along the *y*-axis towards the given position [*y*](#y_y). If *y* is not specified, it defaults to 0.

```js
const y = d3.forceY(height / 2);
```

## *y*.strength(*strength*) {#y_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *y*-velocity: ([*y*](#y_y) - *node*.y) × *strength*. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current *y*-position to the target *y*-position with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *y*.y(*y*) {#y_y}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · If *y* is specified, sets the *y*-coordinate accessor to the specified number or function, re-evaluates the *y*-accessor for each node, and returns this force. If *y* is not specified, returns the current *y*-accessor, which defaults to:

```js
function y() {
  return 0;
}
```

The *y*-accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target y coordinate of each node is only recomputed when the force is initialized or when this method is called with a new *y*, and not on every application of the force.

## forceRadial(*radius*, *x*, *y*) {#forceRadial}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · Creates a new position force towards a circle of the specified [*radius*](#radial_radius) centered at ⟨[*x*](#radial_x),[*y*](#radial_y)⟩. If *x* and *y* are not specified, they default to ⟨0,0⟩.

```js
const radial = d3.forceRadial(r, width / 2, height / 2);
```

## *radial*.strength(*strength*) {#radial_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *x*- and *y*-velocity. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current position to the closest point on the circle with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *radial*.radius(*radius*) {#radial_radius}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *radius* is specified, sets the circle *radius* to the specified number or function, re-evaluates the *radius* accessor for each node, and returns this force. If *radius* is not specified, returns the current *radius* accessor.

The *radius* accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target radius of each node is only recomputed when the force is initialized or when this method is called with a new *radius*, and not on every application of the force.

## *radial*.x(*x*) {#radial_x}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *x* is specified, sets the *x*-coordinate of the circle center to the specified number and returns this force. If *x* is not specified, returns the current *x*-coordinate of the center, which defaults to zero.

## *radial*.y(*y*) {#radial_y}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *y* is specified, sets the y coordinate of the circle center to the specified number and returns this force. If *y* is not specified, returns the current y coordinate of the center, which defaults to zero.

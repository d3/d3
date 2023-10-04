# Center force

The center force translates nodes uniformly so that the mean position of all nodes (the center of mass if all nodes have equal weight) is at the given position ⟨[*x*](#center_x),[*y*](#center_y)⟩. This force modifies the positions of nodes on each application; it does not modify velocities, as doing so would typically cause the nodes to overshoot and oscillate around the desired center. This force helps keep nodes in the center of the viewport, and unlike the [position forces](./position.md), it does not distort their relative positions.

## forceCenter(*x*, *y*) {#forceCenter}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · Creates a new center force with the specified [*x*-](#center_x) and [*y*-](#center_y) coordinates. If *x* and *y* are not specified, they default to ⟨0,0⟩.

```js
const center = d3.forceCenter(width / 2, height / 2);
```

## *center*.x(*x*) {#center_x}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *x* is specified, sets the *x*-coordinate of the centering position to the specified number and returns this force. If *x* is not specified, returns the current *x*-coordinate, which defaults to zero.

## *center*.y(*y*) {#center_y}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *y* is specified, sets the y coordinate of the centering position to the specified number and returns this force. If *y* is not specified, returns the current y coordinate, which defaults to zero.

## *center*.strength(*strength*) {#center_strength}

[Examples](https://observablehq.com/@d3/forcecenter-strength) · [Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *strength* is specified, sets the center force’s strength. A reduced strength of e.g. 0.05 softens the movements on interactive graphs in which new nodes enter or exit the graph. If *strength* is not specified, returns the force’s current strength, which defaults to 1.

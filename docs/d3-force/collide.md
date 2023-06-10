<script setup>

import ExampleCollideForce from "../components/ExampleCollideForce.vue";

</script>

# Collide force

<ExampleCollideForce />

The collide force treats nodes as circles with a given [radius](#collide_radius), rather than points, and prevents nodes from overlapping. More formally, two nodes *a* and *b* are separated so that the distance between *a* and *b* is at least *radius*(*a*) + *radius*(*b*). To reduce jitter, this is by default a “soft” constraint with a configurable [strength](#collide_strength) and [iteration count](#collide_iterations).

## forceCollide(*radius*) {#forceCollide}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · Creates a new circle collide force with the specified [*radius*](#collide_radius). If *radius* is not specified, it defaults to the constant one for all nodes.

```js
const collide = d3.forceCollide((d) => d.r);
```

## *collide*.radius(*radius*) {#collide_radius}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *radius* is specified, sets the radius accessor to the specified number or function, re-evaluates the radius accessor for each node, and returns this force. If *radius* is not specified, returns the current radius accessor, which defaults to:

```js
function radius() {
  return 1;
}
```

The radius accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the radius of each node is only recomputed when the force is initialized or when this method is called with a new *radius*, and not on every application of the force.

## *collide*.strength(*strength*) {#collide_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *strength* is specified, sets the force strength to the specified number in the range [0,1] and returns this force. If *strength* is not specified, returns the current strength which defaults to 1.

Overlapping nodes are resolved through iterative relaxation. For each node, the other nodes that are anticipated to overlap at the next tick (using the anticipated positions ⟨*x* + *vx*,*y* + *vy*⟩) are determined; the node’s velocity is then modified to push the node out of each overlapping node. The change in velocity is dampened by the force’s strength such that the resolution of simultaneous overlaps can be blended together to find a stable solution.

## *collide*.iterations(*iterations*) {#collide_iterations}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *iterations* is specified, sets the number of iterations per application to the specified number and returns this force. If *iterations* is not specified, returns the current iteration count which defaults to 1. Increasing the number of iterations greatly increases the rigidity of the constraint and avoids partial overlap of nodes, but also increases the runtime cost to evaluate the force.

# d3-force

This module implements a [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) numerical integrator for simulating physical forces on particles. Force simulations can be used to visualize [networks](https://observablehq.com/@d3/force-directed-graph) and [hierarchies](https://observablehq.com/@d3/force-directed-tree):

[<img alt="Force-Directed Graph" src="https://raw.githubusercontent.com/d3/d3-force/master/img/graph.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-graph)

[<img alt="Force-Directed Tree" src="https://raw.githubusercontent.com/d3/d3-force/master/img/tree.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-tree)

You can also simulate circles (disks) with collision, such as for [bubble charts](http://www.nytimes.com/interactive/2012/09/06/us/politics/convention-word-counts.html):

[<img alt="Collision Detection" src="https://raw.githubusercontent.com/d3/d3-force/master/img/collide.png" width="420" height="219">](https://observablehq.com/@d3/collision-detection)

You can even use it as a rudimentary physics engine, say to simulate cloth:

[<img alt="Force-Directed Lattice" src="https://raw.githubusercontent.com/d3/d3-force/master/img/lattice.png" width="480" height="250">](https://observablehq.com/@d3/force-directed-lattice)

To use this module, create a [simulation](#simulation) for an array of [nodes](./d3-force/simulation.md#simulation_nodes), and compose the desired [forces](./d3-force/simulation.md#simulation_force). Then [listen](./d3-force/simulation.md#simulation_on) for tick events to render the nodes as they update in your preferred graphics system, such as Canvas or SVG.

See one of:

* [Force simulations](./d3-force/simulation.md)
* [Center force](./d3-force/center.md)
* [Collide force](./d3-force/collide.md)
* [Link force](./d3-force/link.md)
* [Many-body force](./d3-force/many-body.md)
* [Position forces](./d3-force/position.md)

## Custom forces

A *force* is a function that modifies nodes’ positions or velocities. It can simulate a physical force such as electrical charge or gravity, or it can resolve a geometric constraint such as keeping nodes within a bounding box or keeping linked nodes a fixed distance apart. For example, here is a force that moves nodes towards the origin:

```js
function force(alpha) {
  for (let i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
    node = nodes[i];
    node.vx -= node.x * k;
    node.vy -= node.y * k;
  }
}
```

Forces typically read the node’s current position ⟨*x*,*y*⟩ and then mutate the node’s velocity ⟨*vx*,*vy*⟩. Forces may also “peek ahead” to the anticipated next position of the node, ⟨*x* + *vx*,*y* + *vy*⟩; this is necessary for resolving geometric constraints through [iterative relaxation](https://en.wikipedia.org/wiki/Relaxation_\(iterative_method\)). Forces may also modify the position directly, which is sometimes useful to avoid adding energy to the simulation, such as when recentering the simulation in the viewport.

### *force*(*alpha*) {#_force}

Applies this force, optionally observing the specified *alpha*. Typically, the force is applied to the array of nodes previously passed to [*force*.initialize](#force_initialize), however, some forces may apply to a subset of nodes, or behave differently. For example, [forceLink](./d3-force/link.md) applies to the source and target of each link.

### *force*.initialize(*nodes*) {#force_initialize}

Supplies the array of *nodes* and *random* source to this force. This method is called when a force is bound to a simulation via [*simulation*.force](./d3-force/simulation.md#simulation_force) and when the simulation’s nodes change via [*simulation*.nodes](./d3-force/simulation.md#simulation_nodes). A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.

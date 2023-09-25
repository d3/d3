<script setup>

import ExampleDisjointForce from "./components/ExampleDisjointForce.vue";

</script>

# d3-force

<ExampleDisjointForce />

This module implements a [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) numerical integrator for simulating physical forces on particles. Force simulations can be used to visualize [networks](https://observablehq.com/@d3/force-directed-graph/2?intent=fork) and [hierarchies](https://observablehq.com/@d3/force-directed-tree?intent=fork), and to resolve [collisions](./d3-force/collide.md) as in [bubble charts](http://www.nytimes.com/interactive/2012/09/06/us/politics/convention-word-counts.html).

<!-- [<img alt="Force-Directed Graph" src="https://raw.githubusercontent.com/d3/d3-force/master/img/graph.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-graph/2?intent=fork) -->

<!-- [<img alt="Force-Directed Tree" src="https://raw.githubusercontent.com/d3/d3-force/master/img/tree.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-tree) -->

<!-- [<img alt="Collision Detection" src="https://raw.githubusercontent.com/d3/d3-force/master/img/collide.png" width="420" height="219">](https://observablehq.com/@d3/collision-detection) -->

<!-- You can even use it as a rudimentary physics engine, say to simulate cloth: -->

<!-- [<img alt="Force-Directed Lattice" src="https://raw.githubusercontent.com/d3/d3-force/master/img/lattice.png" width="480" height="250">](https://observablehq.com/@d3/force-directed-lattice) -->

To use this module, create a [simulation](./d3-force/simulation.md) for an array of [nodes](./d3-force/simulation.md#simulation_nodes) and apply the desired [forces](./d3-force/simulation.md#simulation_force). Then [listen](./d3-force/simulation.md#simulation_on) for tick events to render the nodes as they update in your preferred graphics system, such as Canvas or SVG.

See one of:

* [Force simulations](./d3-force/simulation.md)
* [Center force](./d3-force/center.md)
* [Collide force](./d3-force/collide.md)
* [Link force](./d3-force/link.md)
* [Many-body force](./d3-force/many-body.md)
* [Position forces](./d3-force/position.md)

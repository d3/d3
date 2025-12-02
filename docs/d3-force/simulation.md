# Force simulations

A force simulation implements a [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) numerical integrator for simulating physical forces on particles (nodes). The simulation assumes a constant unit time step Δ*t* = 1 for each step and a constant unit mass *m* = 1 for all particles. As a result, a force *F* acting on a particle is equivalent to a constant acceleration *a* over the time interval Δ*t*, and can be simulated simply by adding to the particle’s velocity, which is then added to the particle’s position.

## forceSimulation(*nodes*) {#forceSimulation}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Creates a new simulation with the specified array of [*nodes*](#simulation_nodes) and no [forces](#simulation_force). If *nodes* is not specified, it defaults to the empty array.

:::warning
This function is impure; it mutates the passed-in *nodes*. See [*simulation*.nodes](#simulation_nodes).
:::

```js
const simulation = d3.forceSimulation(nodes);
```

The simulator [starts](#simulation_restart) automatically; use [*simulation*.on](#simulation_on) to listen for tick events as the simulation runs. If you wish to run the simulation manually instead, call [*simulation*.stop](#simulation_stop), and then call [*simulation*.tick](#simulation_tick) as desired.

## *simulation*.restart() {#simulation_restart}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Restarts the simulation’s internal timer and returns the simulation. In conjunction with [*simulation*.alphaTarget](#simulation_alphaTarget) or [*simulation*.alpha](#simulation_alpha), this method can be used to “reheat” the simulation during interaction, such as when dragging a node, or to resume the simulation after temporarily pausing it with [*simulation*.stop](#simulation_stop).

## *simulation*.stop() {#simulation_stop}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Stops the simulation’s internal timer, if it is running, and returns the simulation. If the timer is already stopped, this method does nothing. This method is useful for running the simulation manually; see [*simulation*.tick](#simulation_tick).

## *simulation*.tick(*iterations*) {#simulation_tick}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Manually steps the simulation by the specified number of *iterations*, and returns the simulation. If *iterations* is not specified, it defaults to 1 (single step).

For each iteration, it increments the current [*alpha*](#simulation_alpha) by ([*alphaTarget*](#simulation_alphaTarget) - *alpha*) × [*alphaDecay*](#simulation_alphaDecay); then invokes each registered [force](#simulation_force), passing the new *alpha*; then decrements each [node](#simulation_nodes)’s velocity by *velocity* × [*velocityDecay*](#simulation_velocityDecay); lastly increments each node’s position by *velocity*.

This method does not dispatch [events](#simulation_on); events are only dispatched by the internal timer when the simulation is started automatically upon [creation](#forceSimulation) or by calling [*simulation*.restart](#simulation_restart). The natural number of ticks when the simulation is started is ⌈*log*([*alphaMin*](#simulation_alphaMin)) / *log*(1 - [*alphaDecay*](#simulation_alphaDecay))⌉; by default, this is 300.

This method can be used in conjunction with [*simulation*.stop](#simulation_stop) to compute a [static force layout](https://observablehq.com/@d3/static-force-directed-graph). For large graphs, static layouts should be computed [in a web worker](https://observablehq.com/@d3/force-directed-web-worker) to avoid freezing the user interface.

## *simulation*.nodes(*nodes*) {#simulation_nodes}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *nodes* is specified, sets the simulation’s nodes to the specified array of objects, initializing their positions and velocities if necessary, and then [re-initializes](#force_initialize) any bound [forces](#simulation_force); returns the simulation. If *nodes* is not specified, returns the simulation’s array of nodes as specified to the [constructor](#forceSimulation).

:::warning
This function is impure; it mutates the passed-in *nodes* to assign the index *node*.index, the position *node*.x & *node*.y, and the velocity *node*.vx & *node*.vy. The position and velocity are further updated as the simulation runs by [*simulation*.tick](#simulation_tick).
:::

Each *node* must be an object. The following properties are assigned by the simulation:

* `index` - the node’s zero-based index into *nodes*
* `x` - the node’s current *x*-position
* `y` - the node’s current *y*-position
* `vx` - the node’s current *x*-velocity
* `vy` - the node’s current *y*-velocity

The position ⟨*x*,*y*⟩ and velocity ⟨*vx*,*vy*⟩ may be subsequently modified by [forces](#custom-forces) and by the simulation. If either *vx* or *vy* is NaN, the velocity is initialized to ⟨0,0⟩. If either *x* or *y* is NaN, the position is initialized in a [phyllotaxis arrangement](https://observablehq.com/@d3/force-layout-phyllotaxis), so chosen to ensure a deterministic, uniform distribution.

To fix a node in a given position, you may specify two additional properties:

* `fx` - the node’s fixed *x*-position
* `fy` - the node’s fixed *y*-position

At the end of each [tick](#simulation_tick), after the application of any forces, a node with a defined *node*.fx has *node*.x reset to this value and *node*.vx set to zero; likewise, a node with a defined *node*.fy has *node*.y reset to this value and *node*.vy set to zero. To unfix a node that was previously fixed, set *node*.fx and *node*.fy to null, or delete these properties.

If the specified array of *nodes* is modified, such as when nodes are added to or removed from the simulation, this method must be called again with the new (or changed) array to notify the simulation and bound forces of the change; the simulation does not make a defensive copy of the specified array.

## *simulation*.alpha(*alpha*) {#simulation_alpha}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · *alpha* is roughly analogous to temperature in [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing#Overview). It decreases over time as the simulation “cools down”. When *alpha* reaches *alphaMin*, the simulation stops; see [*simulation*.restart](#simulation_restart).

If *alpha* is specified, sets the current alpha to the specified number in the range [0,1] and returns this simulation. If *alpha* is not specified, returns the current alpha value, which defaults to 1.

## *simulation*.alphaMin(*min*) {#simulation_alphaMin}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *min* is specified, sets the minimum *alpha* to the specified number in the range [0,1] and returns this simulation. If *min* is not specified, returns the current minimum *alpha* value, which defaults to 0.001. The simulation’s internal timer stops when the current [*alpha*](#simulation_alpha) is less than the minimum *alpha*. The default [alpha decay rate](#simulation_alphaDecay) of ~0.0228 corresponds to 300 iterations.

## *simulation*.alphaDecay(*decay*) {#simulation_alphaDecay}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *decay* is specified, sets the [*alpha*](#simulation_alpha) decay rate to the specified number in the range [0,1] and returns this simulation. If *decay* is not specified, returns the current *alpha* decay rate, which defaults to 0.0228… = 1 - *pow*(0.001, 1 / 300) where 0.001 is the default [minimum *alpha*](#simulation_alphaMin).

The alpha decay rate determines how quickly the current alpha interpolates towards the desired [target *alpha*](#simulation_alphaTarget); since the default target *alpha* is zero, by default this controls how quickly the simulation cools. Higher decay rates cause the simulation to stabilize more quickly, but risk getting stuck in a local minimum; lower values cause the simulation to take longer to run, but typically converge on a better layout. To have the simulation run forever at the current *alpha*, set the *decay* rate to zero; alternatively, set a [target *alpha*](#simulation_alphaTarget) greater than the [minimum *alpha*](#simulation_alphaMin).

## *simulation*.alphaTarget(*target*) {#simulation_alphaTarget}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *target* is specified, sets the current target [*alpha*](#simulation_alpha) to the specified number in the range [0,1] and returns this simulation. If *target* is not specified, returns the current target alpha value, which defaults to 0.

## *simulation*.velocityDecay(*decay*) {#simulation_velocityDecay}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *decay* is specified, sets the velocity decay factor to the specified number in the range [0,1] and returns this simulation. If *decay* is not specified, returns the current velocity decay factor, which defaults to 0.4. The decay factor is akin to atmospheric friction; after the application of any forces during a [tick](#simulation_tick), each node’s velocity is multiplied by 1 - *decay*. As with lowering the [alpha decay rate](#simulation_alphaDecay), less velocity decay may converge on a better solution, but risks numerical instabilities and oscillation.

## *simulation*.force(*name*, *force*) {#simulation_force}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *force* is specified, assigns the [force](#custom-forces) for the specified *name* and returns this simulation. If *force* is not specified, returns the force with the specified name, or undefined if there is no such force. (By default, new simulations have no forces.) For example, to create a new simulation to layout a graph, you might say:

```js
const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter());
```

To remove the force with the given *name*, pass null as the *force*. For example, to remove the charge force:

```js
simulation.force("charge", null);
```

## *simulation*.find(*x*, *y*, *radius*) {#simulation_find}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Returns the node closest to the position ⟨*x*,*y*⟩ with the given search *radius*. If *radius* is not specified, it defaults to infinity. If there is no node within the search area, returns undefined.

## *simulation*.randomSource(*source*) {#simulation_randomSource}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *source* is specified, sets the function used to generate random numbers; this should be a function that returns a number between 0 (inclusive) and 1 (exclusive). If *source* is not specified, returns this simulation’s current random source which defaults to a fixed-seed [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator). See also [*random*.source](../d3-random.md#random_source).

## *simulation*.on(*typenames*, *listener*) {#simulation_on}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *listener* is specified, sets the event *listener* for the specified *typenames* and returns this simulation. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the `this` context as the simulation.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `tick.foo` and `tick.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

* `tick` - after each tick of the simulation’s internal timer.
* `end` - after the simulation’s timer stops when *alpha* < [*alphaMin*](#simulation_alphaMin).

Note that *tick* events are not dispatched when [*simulation*.tick](#simulation_tick) is called manually; events are only dispatched by the internal timer and are intended for interactive rendering of the simulation. To affect the simulation, register [forces](#simulation_force) instead of modifying nodes’ positions or velocities inside a tick event listener.

See [*dispatch*.on](../d3-dispatch.md#dispatch_on) for details.

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

Applies this force, optionally observing the specified *alpha*. Typically, the force is applied to the array of nodes previously passed to [*force*.initialize](#force_initialize), however, some forces may apply to a subset of nodes, or behave differently. For example, [forceLink](./link.md) applies to the source and target of each link.

### *force*.initialize(*nodes*) {#force_initialize}

Supplies the array of *nodes* and *random* source to this force. This method is called when a force is bound to a simulation via [*simulation*.force](#simulation_force) and when the simulation’s nodes change via [*simulation*.nodes](#simulation_nodes). A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.

# Control Flow

For advanced usage, transitions provide methods for custom control flow.

## *selection*.interrupt(name) {#selection_interrupt}

[Source](https://github.com/d3/d3-transition/blob/main/src/selection/interrupt.js)

Interrupts the active transition of the specified *name* on the selected elements, and cancels any pending transitions with the specified *name*, if any. If a name is not specified, null is used.

Interrupting a transition on an element has no effect on any transitions on any descendant elements. For example, an [axis transition](https://github.com/d3/d3-axis) consists of multiple independent, synchronized transitions on the descendants of the axis [G element](https://www.w3.org/TR/SVG/struct.html#Groups) (the tick lines, the tick labels, the domain path, *etc.*). To interrupt the axis transition, you must therefore interrupt the descendants:

```js
selection.selectAll("*").interrupt();
```

The [universal selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors), `*`, selects all descendant elements. If you also want to interrupt the G element itself:

```js
selection.interrupt().selectAll("*").interrupt();
```

## interrupt(node, name) {#interrupt}

[Source](https://github.com/d3/d3-transition/blob/main/src/interrupt.js)

Interrupts the active transition of the specified *name* on the specified *node*, and cancels any pending transitions with the specified *name*, if any. If a name is not specified, null is used. See also [*selection*.interrupt](#selection_interrupt).

## *transition*.end() {#transition_end}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/end.js)

Returns a promise that resolves when every selected element finishes transitioning. If any element’s transition is cancelled or interrupted, the promise rejects.

#### transition.on(typenames, listener)

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/on.js)

Adds or removes a *listener* to each selected element for the specified event *typenames*. The *typenames* is one of the following string event types:

* `start` - when the transition starts.
* `end` - when the transition ends.
* `interrupt` - when the transition is interrupted.
* `cancel` - when the transition is cancelled.

See [The Life of a Transition](#the-life-of-a-transition) for more. Note that these are *not* native DOM events as implemented by [*selection*.on](./d3-selection.md#selection_on) and [*selection*.dispatch](./d3-selection.md#selection_dispatch), but transition events!

The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `start.foo` and `start.bar`. To specify multiple typenames, separate typenames with spaces, such as `interrupt end` or `start.foo start.bar`.

When a specified transition event is dispatched on a selected node, the specified *listener* will be invoked for the transitioning element, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. Listeners always see the latest datum for their element, but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener.

If an event listener was previously registered for the same *typename* on a selected element, the old listener is removed before the new listener is added. To remove a listener, pass null as the *listener*. To remove all listeners for a given name, pass null as the *listener* and `.foo` as the *typename*, where `foo` is the name; to remove all listeners with no name, specify `.` as the *typename*.

If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename* on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.

#### transition.each(function)

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/each.js)

Invokes the specified *function* for each selected element, passing in the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously. Equivalent to [*selection*.each](./d3-selection.md#selection_each).

#### transition.call(function, arguments…)

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/call.js)

Invokes the specified *function* exactly once, passing in this transition along with any optional *arguments*. Returns this transition. This is equivalent to invoking the function by hand but facilitates method chaining. For example, to set several attributes in a reusable function:

```js
function color(transition, fill, stroke) {
  transition
      .style("fill", fill)
      .style("stroke", stroke);
}
```

Now say:

```js
d3.selectAll("div").transition().call(color, "red", "blue");
```

This is equivalent to:

```js
color(d3.selectAll("div").transition(), "red", "blue");
```

Equivalent to [*selection*.call](./d3-selection.md#selection_call).

#### transition.empty()

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/empty.js)

Returns true if this transition contains no (non-null) elements. Equivalent to [*selection*.empty](./d3-selection.md#selection_empty).

#### transition.nodes()

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/nodes.js)

Returns an array of all (non-null) elements in this transition. Equivalent to [*selection*.nodes](./d3-selection.md#selection_nodes).

#### transition.node()

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/node.js)

Returns the first (non-null) element in this transition. If the transition is empty, returns null. Equivalent to [*selection*.node](./d3-selection.md#selection_node).

#### transition.size()

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/size.js)

Returns the total number of elements in this transition. Equivalent to [*selection*.size](./d3-selection.md#selection_size).

# d3-transition

A transition is a [selection](./d3-selection.md)-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over a given duration.

To apply a transition, select elements, call [*selection*.transition](#selection_transition), and then make the desired changes. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

Transitions support most selection methods (such as [*transition*.attr](#transition_attr) and [*transition*.style](#transition_style) in place of [*selection*.attr](./d3-selection/modifying.md#selection_attr) and [*selection*.style](./d3-selection/modifying.md#selection_style)), but not all methods are supported; for example, you must [append](./d3-selection/modifying.md#selection_append) elements or [bind data](./d3-selection/joining.md) before a transition starts. A [*transition*.remove](#transition_remove) operator is provided for convenient removal of elements when the transition ends.

To compute intermediate state, transitions leverage a variety of [built-in interpolators](./d3-interpolate.md). [Colors](./d3-interpolate/color.md#interpolateRgb), [numbers](./d3-interpolate/value.md#interpolateNumber), and [transforms](./d3-interpolate/transform.md) are automatically detected. [Strings](./d3-interpolate/value.md#interpolateString) with embedded numbers are also detected, as is common with many styles (such as padding or font sizes) and paths. To specify a custom interpolator, use [*transition*.attrTween](#transition_attrTween), [*transition*.styleTween](#transition_styleTween) or [*transition*.tween](#transition_tween).

See one of:

* [Selecting Elements](./d3-transition/selecting.md)
* [Modifying Elements](./d3-transition/modifying.md)
* [Timing](./d3-transition/timing.md)
* [Control Flow](./d3-transition/control-flow.md)

## The Life of a Transition

Immediately after creating a transition, such as by [*selection*.transition](#selection_transition) or [*transition*.transition](#transition_transition), you may configure the transition using methods such as [*transition*.delay](#transition_delay), [*transition*.duration](#transition_duration), [*transition*.attr](#transition_attr) and [*transition*.style](#transition_style). Methods that specify target values (such as *transition*.attr) are evaluated synchronously; however, methods that require the starting value for interpolation, such as [*transition*.attrTween](#transition_attrTween) and [*transition*.styleTween](#transition_styleTween), must be deferred until the transition starts.

Shortly after creation, either at the end of the current frame or during the next frame, the transition is scheduled. At this point, the delay and `start` event listeners may no longer be changed; attempting to do so throws an error with the message “too late: already scheduled” (or if the transition has ended, “transition not found”).

When the transition subsequently starts, it interrupts the active transition of the same name on the same element, if any, dispatching an `interrupt` event to registered listeners. (Note that interrupts happen on start, not creation, and thus even a zero-delay transition will not immediately interrupt the active transition: the old transition is given a final frame. Use [*selection*.interrupt](#selection_interrupt) to interrupt immediately.) The starting transition also cancels any pending transitions of the same name on the same element that were created before the starting transition. The transition then dispatches a `start` event to registered listeners. This is the last moment at which the transition may be modified: the transition’s timing, tweens, and listeners may not be changed when it is running; attempting to do so throws an error with the message “too late: already running” (or if the transition has ended, “transition not found”). The transition initializes its tweens immediately after starting.

During the frame the transition starts, but *after* all transitions starting this frame have been started, the transition invokes its tweens for the first time. Batching tween initialization, which typically involves reading from the DOM, improves performance by avoiding interleaved DOM reads and writes.

For each frame that a transition is active, it invokes its tweens with an [eased](#transition_ease) *t*-value ranging from 0 to 1. Within each frame, the transition invokes its tweens in the order they were registered.

When a transition ends, it invokes its tweens a final time with a (non-eased) *t*-value of 1. It then dispatches an `end` event to registered listeners. This is the last moment at which the transition may be inspected: after ending, the transition is deleted from the element, and its configuration is destroyed. (A transition’s configuration is also destroyed on interrupt or cancel.) Attempting to inspect a transition after it is destroyed throws an error with the message “transition not found”.

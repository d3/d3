# d3-transition

A transition is a [selection](./d3-selection.md)-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over a given duration.

To apply a transition, select elements, call [*selection*.transition](./d3-transition/selecting.md#selection_transition), and then make the desired changes. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

Transitions support most selection methods (such as [*transition*.attr](./d3-transition/modifying.md#transition_attr) and [*transition*.style](./d3-transition/modifying.md#transition_style) in place of [*selection*.attr](./d3-selection/modifying.md#selection_attr) and [*selection*.style](./d3-selection/modifying.md#selection_style)), but not all methods are supported; for example, you must [append](./d3-selection/modifying.md#selection_append) elements or [bind data](./d3-selection/joining.md) before a transition starts. A [*transition*.remove](./d3-transition/modifying.md#transition_remove) operator is provided for convenient removal of elements when the transition ends.

To compute intermediate state, transitions leverage a variety of [built-in interpolators](./d3-interpolate.md). [Colors](./d3-interpolate/color.md#interpolateRgb), [numbers](./d3-interpolate/value.md#interpolateNumber), and [transforms](./d3-interpolate/transform.md) are automatically detected. [Strings](./d3-interpolate/value.md#interpolateString) with embedded numbers are also detected, as is common with many styles (such as padding or font sizes) and paths. To specify a custom interpolator, use [*transition*.attrTween](./d3-transition/modifying.md#transition_attrTween), [*transition*.styleTween](./d3-transition/modifying.md#transition_styleTween) or [*transition*.tween](./d3-transition/modifying.md#transition_tween).

See one of:

* [Selecting elements](./d3-transition/selecting.md)
* [Modifying elements](./d3-transition/modifying.md)
* [Timing](./d3-transition/timing.md)
* [Control flow](./d3-transition/control-flow.md)

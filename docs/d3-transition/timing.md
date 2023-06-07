# Timing

The [easing](#transition_ease), [delay](#transition_delay) and [duration](#transition_duration) of a transition is configurable. For example, a per-element delay can be used to [stagger the reordering](https://observablehq.com/@d3/sortable-bar-chart) of elements, improving perception. See [Animated Transitions in Statistical Data Graphics](http://vis.berkeley.edu/papers/animated_transitions/) for recommendations.

## *transition*.delay(value) {#transition_delay}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/delay.js)

For each selected element, sets the transition delay to the specified *value* in milliseconds. The *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The function’s return value is then used to set each element’s transition delay. If a delay is not specified, it defaults to zero.

If a *value* is not specified, returns the current value of the delay for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

Setting the delay to a multiple of the index `i` is a convenient way to stagger transitions across a set of elements. For example:

```js
transition.delay(function(d, i) { return i * 10; });
```

Of course, you can also compute the delay as a function of the data, or [sort the selection](./d3-selection.md#selection_sort) before computed an index-based delay.

## *transition*.duration(value) {#transition_duration}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/duration.js)

For each selected element, sets the transition duration to the specified *value* in milliseconds. The *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The function’s return value is then used to set each element’s transition duration. If a duration is not specified, it defaults to 250ms.

If a *value* is not specified, returns the current value of the duration for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

## *transition*.ease(value) {#transition_ease}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/ease.js)

Specifies the transition [easing function](https://github.com/d3/d3-ease) for all selected elements. The *value* must be specified as a function. The easing function is invoked for each frame of the animation, being passed the normalized time *t* in the range [0, 1]; it must then return the eased time *tʹ* which is typically also in the range [0, 1]. A good easing function should return 0 if *t* = 0 and 1 if *t* = 1. If an easing function is not specified, it defaults to [d3.easeCubic](https://github.com/d3/d3-ease#easeCubic).

If a *value* is not specified, returns the current easing function for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

## *transition*.easeVarying(factory) {#transition_easeVarying}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/easeVarying.js "Source")

Specifies a factory for the transition [easing function](https://github.com/d3/d3-ease). The *factory* must be a function. It is invoked for each node of the selection, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. It must return an easing function.

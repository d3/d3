# Links

[<img alt="Tidy Tree" src="https://raw.githubusercontent.com/d3/d3-hierarchy/master/img/tree.png">](https://observablehq.com/@d3/tidy-tree)

The **link** shape generates a smooth cubic Bézier curve from a source point to a target point. The tangents of the curve at the start and end are either [vertical](#linkVertical), [horizontal](#linkHorizontal) or [radial](#linkRadial).

### d3.link(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Returns a new [link generator](#_link) using the specified <i>curve</i>. For example, to visualize [links](https://github.com/d3/d3-hierarchy/blob/main/README.md#node_links) in a [tree diagram](https://github.com/d3/d3-hierarchy/blob/main/README.md#tree) rooted on the top edge of the display, you might say:

```js
const link = d3.link(d3.curveBumpY)
    .x(d => d.x)
    .y(d => d.y);
```

### d3.linkVertical()

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Shorthand for [d3.link](#link) with [d3.curveBumpY](#curveBumpY); suitable for visualizing [links](https://github.com/d3/d3-hierarchy/blob/main/README.md#node_links) in a [tree diagram](https://github.com/d3/d3-hierarchy/blob/main/README.md#tree) rooted on the top edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpY);
```

### d3.linkHorizontal()

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Shorthand for [d3.link](#link) with [d3.curveBumpX](#curveBumpX); suitable for visualizing [links](https://github.com/d3/d3-hierarchy/blob/main/README.md#node_links) in a [tree diagram](https://github.com/d3/d3-hierarchy/blob/main/README.md#tree) rooted on the left edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpX);
```

### link(arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Generates a link for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the link generator’s accessor functions along with the `this` object. For example, with the default settings, an object expected:

```js
link({
  source: [100, 100],
  target: [300, 300]
});
```

### link.source(source)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *source* is specified, sets the source accessor to the specified function and returns this link generator. If *source* is not specified, returns the current source accessor, which defaults to:

```js
function source(d) {
  return d.source;
}
```

### link.target(target)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *target* is specified, sets the target accessor to the specified function and returns this link generator. If *target* is not specified, returns the current target accessor, which defaults to:

```js
function target(d) {
  return d.target;
}
```

### link.x(x)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *x* is specified, sets the *x*-accessor to the specified function or number and returns this link generator. If *x* is not specified, returns the current *x*-accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

### link.y(y)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *y* is specified, sets the *y*-accessor to the specified function or number and returns this link generator. If *y* is not specified, returns the current *y*-accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

### link.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *context* is specified, sets the context and returns this link generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated link](#_link) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated link is returned. See also [d3-path](https://github.com/d3/d3-path).

### link.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this link generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#link_context) is null, as when this link generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

### d3.linkRadial()

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Returns a new [link generator](#_link) with radial tangents. For example, to visualize [links](https://github.com/d3/d3-hierarchy/blob/main/README.md#node_links) in a [tree diagram](https://github.com/d3/d3-hierarchy/blob/main/README.md#tree) rooted in the center of the display, you might say:

```js
const link = d3.linkRadial()
    .angle(d => d.x)
    .radius(d => d.y);
```

### linkRadial.angle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Equivalent to [*link*.x](#link_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

### linkRadial.radius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js)

Equivalent to [*link*.y](#link_y), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

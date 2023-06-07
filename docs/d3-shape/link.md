# Links

[Examples](https://observablehq.com/@d3/tidy-tree) · The link shape generates a smooth cubic Bézier curve from a source point to a target point. The tangents of the curve at the start and end are either [vertical](#linkVertical) or [horizontal](#linkHorizontal). See also [radial links](./radial-link.md).

## link(*curve*) {#link}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Returns a new [link generator](#_link) using the specified <i>curve</i>. For example, to visualize [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the top edge of the display, you might say:

```js
const link = d3.link(d3.curveBumpY)
    .x((d) => d.x)
    .y((d) => d.y);
```

## linkVertical() {#linkVertical}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Shorthand for [link](#link) with [curveBumpY](./curve.md#curveBumpY); suitable for visualizing [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the top edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpY);
```

## linkHorizontal() {#linkHorizontal}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Shorthand for [link](#link) with [curveBumpX](./curve.md#curveBumpX); suitable for visualizing [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the left edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpX);
```

## *link*(...*arguments*) {#_link}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Generates a link for the given *arguments*. The *arguments* are arbitrary; they are propagated to the link generator’s accessor functions along with the `this` object. With the default settings, an object with *source* and *target* properties is expected.

```js
link({source: [100, 100], target: [300, 300]}) // "M100,100C200,100,200,300,300,300"
```

## *link*.source(*source*) {#link_source}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *source* is specified, sets the source accessor to the specified function and returns this link generator.

```js
const link = d3.linkHorizontal().source((d) => d[0]);
```

If *source* is not specified, returns the current source accessor.

```js
link.source() // (d) => d[0]
```

The source accessor defaults to:

```js
function source(d) {
  return d.source;
}
```

## *link*.target(*target*) {#link_target}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *target* is specified, sets the target accessor to the specified function and returns this link generator.

```js
const link = d3.linkHorizontal().target((d) => d[1]);
```

If *target* is not specified, returns the current target accessor.

```js
link.target() // (d) => d[1]
```

The target accessor defaults to:

```js
function target(d) {
  return d.target;
}
```

## *link*.x(*x*) {#link_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *x* is specified, sets the *x*-accessor to the specified function or number and returns this link generator.

```js
const link = d3.linkHorizontal().x((d) => x(d.x));
```

If *x* is not specified, returns the current x accessor.

```js
link.x() // (d) => x(d.x)
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

## *link*.y(*y*) {#link_y}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *y* is specified, sets the *y*-accessor to the specified function or number and returns this link generator.

```js
const link = d3.linkHorizontal().y((d) => y(d.y));
```

If *y* is not specified, returns the current y accessor.

```js
link.y() // (d) => y(d.y)
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

## *link*.context(*context*) {#link_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *context* is specified, sets the context and returns this link generator.

```js
const context = canvas.getContext("2d");
const link = d3.link().context(context);
```

If *context* is not specified, returns the current context.

```js
link.context() // context
```

The context defaults to null. If the context is not null, then the [generated link](#_link) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated link is returned. See also [d3-path](../d3-path.md).

## *link*.digits(*digits*) {#link_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this link generator.

```js
const link = d3.link().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
link.digits() // 3
```

This option only applies when the associated [*context*](#link_context) is null, as when this link generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

# Lines

<!-- https://observablehq.com/@d3/line-chart -->

[Examples](https://observablehq.com/@d3/line-chart/2) · The line generator produces a [spline](https://en.wikipedia.org/wiki/Spline_(mathematics)) or [polyline](https://en.wikipedia.org/wiki/Polygonal_chain) as in a line chart. Lines also appear in many other visualization types, such as the links in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling). See also [radial lines](./radial-line.md).

## line(*x*, *y*) {#line}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · Constructs a new line generator with the given *x* and *y* accessor.

```js
const line = d3.line((d) => x(d.Date), (d) => y(d.Close));
```

If *x* or *y* are not specified, the respective defaults will be used. The above can be expressed more explicitly as:

```js
const line = d3.line()
    .x((d) => x(d.Date))
    .y((d) => y(d.Close));
```

## *line*(*data*) {#_line}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · Generates a line for the given array of *data*.

```js
svg.append("path").attr("d", line(data)).attr("stroke", "currentColor");
```

If the line generator has a [context](#line_context), then the line is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

:::warning CAUTION
Depending on this line generator’s associated [curve](#line_curve), the given input *data* may need to be sorted by *x*-value before being passed to the line generator.
:::

## *line*.x(*x*) {#line_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *x* is specified, sets the x accessor to the specified function or number and returns this line generator.

```js
const line = d3.line().x((d) => x(d.Date));
```

If *x* is not specified, returns the current x accessor.

```js
line.x() // (d) => x(d.Date)
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

When a line is [generated](#_line), the x accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.

## *line*.y(y) {#line_y}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *y* is specified, sets the y accessor to the specified function or number and returns this line generator.

```js
const line = d3.line().y((d) => y(d.Close));
```

When a line is [generated](#_line), the y accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *y* is not specified, returns the current y accessor.

```js
line.y() // (d) => y(d.Close)
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

The default y accessor assumes that the input data are two-element arrays of numbers. See [*line*.x](#line_x) for more information.

## *line*.defined(*defined*) {#line_defined}

[Examples](https://observablehq.com/@d3/line-chart-missing-data/2) · [Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this line generator.

```js
const line = d3.line().defined((d) => !isNaN(d.Close));
```

When a line is [generated](#_line), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x](#line_x) and [y](#line_y) accessors will subsequently be evaluated and the point will be added to the current line segment. Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.

If *defined* is not specified, returns the current defined accessor.

```js
line.defined() // (d) => !isNaN(d.Close)
```

The defined accessor defaults to the constant true, and assumes that the input data is always defined:

```js
function defined() {
  return true;
}
```

Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](./curve.md#curveCardinalOpen) only render a visible segment if it contains multiple points.

## *line*.curve(*curve*) {#line_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *curve* is specified, sets the [curve factory](./curve.md) and returns this line generator.

```js
const line = d3.line().curve(d3.curveStep);
```

If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](./curve.md#curveLinear).

```js
line.curve() // d3.curveStep
```

## *line*.context(context) {#line_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *context* is specified, sets the context and returns this line generator.

```js
const context = canvas.getContext("2d");
const line = d3.line().context(context);
```

If *context* is not specified, returns the current context.

```js
line.context() // context
```

The context defaults to null. If the context is not null, then the [generated line](#_line) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated line is returned.

## *line*.digits(*digits*) {#line_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this line generator.

```js
const line = d3.line().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
line.digits() // 3
```

This option only applies when the associated [*context*](#line_context) is null, as when this line generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

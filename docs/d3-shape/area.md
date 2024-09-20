# Areas

<!-- https://observablehq.com/@d3/stacked-area-chart -->
<!-- https://observablehq.com/@d3/difference-chart -->

[Examples](https://observablehq.com/@d3/area-chart/2) · The area generator produces an area defined by a *topline* and a *baseline* as in an area chart. Typically, the two lines share the same [*x*-values](#area_x) ([x0](#area_x0) = [x1](#area_x1)), differing only in *y*-value ([y0](#area_y0) and [y1](#area_y1)); most commonly, y0 is defined as a constant representing zero (the y scale’s output for zero). The *topline* is defined by x1 and y1 and is rendered first; the *baseline* is defined by x0 and y0 and is rendered second with the points in reverse order. With a [curveLinear](./curve.md#curveLinear) [curve](#area_curve), this produces a clockwise polygon. See also [radial areas](./radial-area.md).

## area(*x*, *y0*, *y1*) {#area}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Constructs a new area generator with the given *x*, *y0*, and *y1* accessors or numbers.

```js
const area = d3.area((d) => x(d.Date), y(0), (d) => y(d.Close));
```

If *x*, *y0* or *y1* are not specified, the respective defaults will be used. The above can be expressed more explicitly as:

```js
const area = d3.area()
    .x((d) => x(d.Date))
    .y0(y(0))
    .y1((d) => y(d.Close));
```

## *area*(*data*) {#_area}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Generates an area for the given array of *data*.

```js
svg.append("path").attr("d", area(data));
```

If the area generator has a [context](#area_context), then the area is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

:::warning CAUTION
Depending on this area generator’s associated [curve](#area_curve), the given input *data* may need to be sorted by *x*-value before being passed to the area generator.
:::

## *area*.x(*x*) {#area_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets [x0](#area_x0) to *x* and [x1](#area_x1) to null and returns this area generator.

```js
const area = d3.area().x((d) => x(d.Date));
```

If *x* is not specified, returns the current x0 accessor.

```js
area.x() // (d) => x(d.Date)
```

## *area*.x0(*x*) {#area_x0}

:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.x](#area_x) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets the x0 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().x0(x(0));
```

When an area is [generated](#_area), the x0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *x* is not specified, returns the current x0 accessor.

```js
area.x0() // () => 20
```

The x0 accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

The default x0 accessor assumes that the input data are two-element arrays of numbers [[x0, y0], [x1, y1], …]. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor as shown above.

## *area*.x1(*x*) {#area_x1}

:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.x](#area_x) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets the x1 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().x1((d) => x(d.Close));
```

When an area is [generated](#_area), the x1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *x* is not specified, returns the current x1 accessor.

```js
area.x1() // (d) => x(d.Close)
```

The x1 accessor defaults to null, indicating that the previously-computed [x0](#area_x0) value should be reused for the x1 value; this default is intended for horizontally-oriented areas.

## *area*.y(*y*) {#area_y}
:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.y0](#area_y0) and [*area*.y1](#area_y1) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets [y0](#area_y0) to *y* and [y1](#area_y1) to null and returns this area generator.

```js
const area = d3.area().y((d) => y(d.Date));
```

If *y* is not specified, returns the current y0 accessor.

```js
area.y() // (d) => y(d.Date)
```

## *area*.y0(*y*) {#area_y0}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets the y0 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().y0(y(0));
```

When an area is [generated](#_area), the y0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. For a horizontally-oriented area with a constant baseline (*i.e.*, an area that is not stacked, and not a ribbon or band), y0 is typically set to the output of the y scale for zero.

If *y* is not specified, returns the current y0 accessor.

```js
area.y0() // () => 360
```

The y0 accessor defaults to:

```js
function y() {
  return 0;
}
```

In the default SVG coordinate system, note that the default zero represents the top of the chart rather than the bottom, producing a flipped (or “hanging”) area.

## *area*.y1(*y*) {#area_y1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets the y1 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().y1((d) => y(d.Close));
```

When an area is [generated](#_area), the y1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *y* is not specified, returns the current y1 accessor.

```js
area.y1() // (d) => y(d.Close)
```

The y1 accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

The default y1 accessor assumes that the input data are two-element arrays of numbers [[x0, y0], [x1, y1], …]. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor as shown above. A null accessor is also allowed, indicating that the previously-computed [y0](#area_y0) value should be reused for the y1 value; this can be used for a vertically-oriented area, as when time goes down↓ instead of right→.

## *area*.defined(*defined*) {#area_defined}

[Examples](https://observablehq.com/@d3/area-chart-missing-data/2) · [Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this area generator.

```js
const area = d3.area().defined((d) => !isNaN(d.Close));
```

When an area is [generated](#_area), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x0](#area_x0), [x1](#area_x1), [y0](#area_y0) and [y1](#area_y1) accessors will subsequently be evaluated and the point will be added to the current area segment. Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point. As a result, the generated area may have several discrete segments.

If *defined* is not specified, returns the current defined accessor.

```js
area.defined() // (d) => !isNaN(d.Close)
```

The defined accessor defaults to the constant true, and assumes that the input data is always defined:

```js
function defined() {
  return true;
}
```

Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](./curve.md#curveCardinalOpen) only render a visible segment if it contains multiple points.

## *area*.curve(*curve*) {#area_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *curve* is specified, sets the [curve factory](./curve.md) and returns this area generator.

```js
const area = d3.area().curve(d3.curveStep);
```

If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](./curve.md#curveLinear).

```js
area.curve() // d3.curveStep
```

## *area*.context(context) {#area_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *context* is specified, sets the context and returns this area generator.

```js
const context = canvas.getContext("2d");
const area = d3.area().context(context);
```

If *context* is not specified, returns the current context.

```js
area.context() // context
```

The context defaults to null. If the context is not null, then the [generated area](#_area) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated area is returned.

## *area*.digits(digits) {#area_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this area generator.

```js
const area = d3.area().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
area.digits() // 3
```

This option only applies when the associated [*context*](#area_context) is null, as when this area generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## *area*.lineX0() {#area_lineX0}

An alias for [*area*.lineY0](#area_lineY0).

## *area*.lineY0() {#area_lineY0}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y0*-accessor](#area_y0).

## *area*.lineX1() {#area_lineX1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x1*-accessor](#area_x1), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y0*-accessor](#area_y0).

## *area*.lineY1() {#area_lineY1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y1*-accessor](#area_y1).

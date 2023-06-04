# Lines

[<img width="295" height="154" alt="Line Chart" src="./img/line.png">](https://observablehq.com/@d3/line-chart)

The line generator produces a [spline](https://en.wikipedia.org/wiki/Spline_\(mathematics\)) or [polyline](https://en.wikipedia.org/wiki/Polygonal_chain), as in a line chart. Lines also appear in many other visualization types, such as the links in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling).

### d3.line(x, y)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

Constructs a new line generator with the default settings. If *x* or *y* are specified, sets the corresponding accessors to the specified function or number and returns this line generator.

### line(data)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

Generates a line for the given array of *data*. Depending on this line generator’s associated [curve](#line_curve), the given input *data* may need to be sorted by *x*-value before being passed to the line generator. If the line generator has a [context](#line_context), then the line is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

### line.x(x)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

If *x* is specified, sets the x accessor to the specified function or number and returns this line generator. If *x* is not specified, returns the current x accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

When a line is [generated](#_line), the x accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor. For example, if `x` is a [time scale](https://github.com/d3/d3-scale#time-scales) and `y` is a [linear scale](https://github.com/d3/d3-scale#linear-scales):

```js
const data = [
  {date: new Date(2007, 3, 24), value: 93.24},
  {date: new Date(2007, 3, 25), value: 95.35},
  {date: new Date(2007, 3, 26), value: 98.84},
  {date: new Date(2007, 3, 27), value: 99.92},
  {date: new Date(2007, 3, 30), value: 99.80},
  {date: new Date(2007, 4,  1), value: 99.47},
  …
];

const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));
```

### line.y(y)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

If *y* is specified, sets the y accessor to the specified function or number and returns this line generator. If *y* is not specified, returns the current y accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

When a line is [generated](#_line), the y accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default y accessor assumes that the input data are two-element arrays of numbers. See [*line*.x](#line_x) for more information.

### line.defined(defined)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this line generator. If *defined* is not specified, returns the current defined accessor, which defaults to:

```js
function defined() {
  return true;
}
```

The default accessor thus assumes that the input data is always defined. When a line is [generated](#_line), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x](#line_x) and [y](#line_y) accessors will subsequently be evaluated and the point will be added to the current line segment. Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point. As a result, the generated line may have several discrete segments. For example:

[<img src="./img/line-defined.png" width="480" height="250" alt="Line with Missing Data">](https://observablehq.com/@d3/line-with-missing-data)

Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](#curveCardinalOpen) only render a visible segment if it contains multiple points.

### line.curve(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

If *curve* is specified, sets the [curve factory](#curves) and returns this line generator. If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](#curveLinear).

### line.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js), [Examples](https://observablehq.com/@d3/d3-line)

If *context* is specified, sets the context and returns this line generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated line](#_line) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated line is returned.

### line.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this line generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#line_context) is null, as when this line generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## Radial lines

### d3.lineRadial()

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js), [Examples](https://observablehq.com/@d3/d3-lineradial)

<img alt="Radial Line" width="250" height="250" src="./img/line-radial.png">

Constructs a new radial line generator with the default settings. A radial line generator is equivalent to the standard Cartesian [line generator](#line), except the [x](#line_x) and [y](#line_y) accessors are replaced with [angle](#lineRadial_angle) and [radius](#lineRadial_radius) accessors. Radial lines are always positioned relative to ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to change the origin.

### lineRadial(data)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L4), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*](#_line).

### lineRadial.angle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L7), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.x](#line_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

### lineRadial.radius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L8), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.y](#line_y), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

### lineRadial.defined(defined)

Equivalent to [*line*.defined](#line_defined).

### lineRadial.curve(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.curve](#line_curve). Note that [curveMonotoneX](#curveMonotoneX) or [curveMonotoneY](#curveMonotoneY) are not recommended for radial lines because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial lines.

### lineRadial.context(context)

Equivalent to [*line*.context](#line_context).

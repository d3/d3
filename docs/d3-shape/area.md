# Areas

[<img alt="Area Chart" width="295" height="154" src="./img/area.png">](https://observablehq.com/@d3/area-chart)[<img alt="Stacked Area Chart" width="295" height="154" src="./img/area-stacked.png">](https://observablehq.com/@d3/stacked-area-chart)[<img alt="Difference Chart" width="295" height="154" src="./img/area-difference.png">](https://observablehq.com/@d3/difference-chart)

The area generator produces an area, as in an area chart. An area is defined by two bounding [lines](#lines), either splines or polylines. Typically, the two lines share the same [*x*-values](#area_x) ([x0](#area_x0) = [x1](#area_x1)), differing only in *y*-value ([y0](#area_y0) and [y1](#area_y1)); most commonly, y0 is defined as a constant representing [zero](http://www.vox.com/2015/11/19/9758062/y-axis-zero-chart). The first line (the <i>topline</i>) is defined by x1 and y1 and is rendered first; the second line (the <i>baseline</i>) is defined by x0 and y0 and is rendered second, with the points in reverse order. With a [curveLinear](#curveLinear) [curve](#area_curve), this produces a clockwise polygon.

### d3.area(x, y0, y1)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

Constructs a new area generator with the default settings. If *x*, *y0* or *y1* are specified, sets the corresponding accessors to the specified function or number and returns this area generator.

### area(data)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

Generates an area for the given array of *data*. Depending on this area generator’s associated [curve](#area_curve), the given input *data* may need to be sorted by *x*-value before being passed to the area generator. If the area generator has a [context](#line_context), then the area is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

### area.x(x)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *x* is specified, sets [x0](#area_x0) to *x* and [x1](#area_x1) to null and returns this area generator. If *x* is not specified, returns the current x0 accessor.

### area.x0(x)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *x* is specified, sets the x0 accessor to the specified function or number and returns this area generator. If *x* is not specified, returns the current x0 accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

When an area is [generated](#_area), the x0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default x0 accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor. For example, if `x` is a [time scale](https://github.com/d3/d3-scale#time-scales) and `y` is a [linear scale](https://github.com/d3/d3-scale#linear-scales):

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

const area = d3.area()
    .x(d => x(d.date))
    .y1(d => y(d.value))
    .y0(y(0));
```

### area.x1(x)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *x* is specified, sets the x1 accessor to the specified function or number and returns this area generator. If *x* is not specified, returns the current x1 accessor, which defaults to null, indicating that the previously-computed [x0](#area_x0) value should be reused for the x1 value.

When an area is [generated](#_area), the x1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

### area.y(y)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *y* is specified, sets [y0](#area_y0) to *y* and [y1](#area_y1) to null and returns this area generator. If *y* is not specified, returns the current y0 accessor.

### area.y0(y)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *y* is specified, sets the y0 accessor to the specified function or number and returns this area generator. If *y* is not specified, returns the current y0 accessor, which defaults to:

```js
function y() {
  return 0;
}
```

When an area is [generated](#_area), the y0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

### area.y1(y)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *y* is specified, sets the y1 accessor to the specified function or number and returns this area generator. If *y* is not specified, returns the current y1 accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

A null accessor is also allowed, indicating that the previously-computed [y0](#area_y0) value should be reused for the y1 value. When an area is [generated](#_area), the y1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

### area.defined(defined)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this area generator. If *defined* is not specified, returns the current defined accessor, which defaults to:

```js
function defined() {
  return true;
}
```

The default accessor thus assumes that the input data is always defined. When an area is [generated](#_area), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x0](#area_x0), [x1](#area_x1), [y0](#area_y0) and [y1](#area_y1) accessors will subsequently be evaluated and the point will be added to the current area segment. Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point. As a result, the generated area may have several discrete segments. For example:

[<img src="./img/area-defined.png" width="480" height="250" alt="Area with Missing Data">](https://observablehq.com/@d3/area-with-missing-data)

Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](#curveCardinalOpen) only render a visible segment if it contains multiple points.

### area.curve(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *curve* is specified, sets the [curve factory](#curves) and returns this area generator. If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](#curveLinear).

### area.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *context* is specified, sets the context and returns this area generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated area](#_area) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated area is returned.

### area.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this area generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#area_context) is null, as when this area generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

### area.lineX0()

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)
<br><a name="area_lineY0" href="#area_lineY0">#</a> <i>area</i>.<b>lineY0</b>() · [Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

Returns a new [line generator](#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](#line_y) is this area’s [*y0*-accessor](#area_y0).

### area.lineX1()

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

Returns a new [line generator](#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](#line_x) is this area’s [*x1*-accessor](#area_x1), and the line’s [*y*-accessor](#line_y) is this area’s [*y0*-accessor](#area_y0).

### area.lineY1()

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js)

Returns a new [line generator](#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](#line_y) is this area’s [*y1*-accessor](#area_y1).

## Radial areas

### d3.areaRadial()

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

<img alt="Radial Area" width="250" height="250" src="./img/area-radial.png">

Constructs a new radial area generator with the default settings. A radial area generator is equivalent to the standard Cartesian [area generator](#area), except the [x](#area_x) and [y](#area_y) accessors are replaced with [angle](#areaRadial_angle) and [radius](#areaRadial_radius) accessors. Radial areas are always positioned relative to ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to change the origin.

### areaRadial(data)

Equivalent to [*area*](#_area).

### areaRadial.angle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.x](#area_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

### areaRadial.startAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.x0](#area_x0), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

### areaRadial.endAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.x1](#area_x1), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

### areaRadial.radius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.y](#area_y), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

### areaRadial.innerRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.y0](#area_y0), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

### areaRadial.outerRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.y1](#area_y1), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

### areaRadial.defined(defined)

Equivalent to [*area*.defined](#area_defined).

### areaRadial.curve(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Equivalent to [*area*.curve](#area_curve). Note that [curveMonotoneX](#curveMonotoneX) or [curveMonotoneY](#curveMonotoneY) are not recommended for radial areas because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial areas.

### areaRadial.context(context)

Equivalent to [*line*.context](#line_context).

### areaRadial.lineStartAngle()

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)
<br><a name="areaRadial_lineInnerRadius" href="#areaRadial_lineInnerRadius">#</a> <i>areaRadial</i>.<b>lineInnerRadius</b>() · [Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Returns a new [radial line generator](#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

### areaRadial.lineEndAngle()

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Returns a new [radial line generator](#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](#lineRadial_angle) is this area’s [end angle accessor](#areaRadial_endAngle), and the line’s [radius accessor](#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

### areaRadial.lineOuterRadius()

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js)

Returns a new [radial line generator](#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](#lineRadial_radius) is this area’s [outer radius accessor](#areaRadial_outerRadius).

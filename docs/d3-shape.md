# d3-shape

Visualizations typically consist of discrete graphical marks, such as [symbols](#symbols), [arcs](#arcs), [lines](#lines) and [areas](#areas). While the rectangles of a bar chart may be easy enough to generate directly using [SVG](http://www.w3.org/TR/SVG/paths.html#PathData) or [Canvas](http://www.w3.org/TR/2dcontext/#canvaspathmethods), other shapes are complex, such as rounded annular sectors and centripetal Catmull–Rom splines. This module provides a variety of shape generators for your convenience.

As with other aspects of D3, these shapes are driven by data: each shape generator exposes accessors that control how the input data are mapped to a visual representation. For example, you might define a line generator for a time series by [scaling](https://github.com/d3/d3-scale) fields of your data to fit the chart:

```js
const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));
```

This line generator can then be used to compute the `d` attribute of an SVG path element:

```js
path.datum(data).attr("d", line);
```

Or you can use it to render to a Canvas 2D context:

```js
line.context(context)(data);
```

For more, read [Introducing d3-shape](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12).

Note: all the methods that accept arrays also accept iterables and convert them to arrays internally.

## Arcs

[<img alt="Pie Chart" src="./img/pie.png" width="295" height="295">](https://observablehq.com/@d3/pie-chart)[<img alt="Donut Chart" src="./img/donut.png" width="295" height="295">](https://observablehq.com/@d3/donut-chart)

The arc generator produces a [circular](https://en.wikipedia.org/wiki/Circular_sector) or [annular](https://en.wikipedia.org/wiki/Annulus_\(mathematics\)) sector, as in a pie or donut chart. If the absolute difference between the [start](#arc_startAngle) and [end](#arc_endAngle) angles (the *angular span*) is greater than [τ](https://en.wikipedia.org/wiki/Turn_\(geometry\)#Tau_proposal), the arc generator will produce a complete circle or annulus. If it is less than τ, the arc’s angular length will be equal to the absolute difference between the two angles (going clockwise if the signed difference is positive and anticlockwise if it is negative). If the absolute difference is less than τ, the arc may have [rounded corners](#arc_cornerRadius) and [angular padding](#arc_padAngle). Arcs are always centered at ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to move the arc to a different position.

See also the [pie generator](#pies), which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.

### d3.arc()

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

Constructs a new arc generator with the default settings.

### arc(...arguments)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

Generates an arc for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the arc generator’s accessor functions along with the `this` object. For example, with the default settings, an object with radii and angles is expected:

```js
const arc = d3.arc();

arc({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
}); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the radii and angles are instead defined as constants, you can generate an arc without any arguments:

```js
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2);

arc(); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the arc generator has a [context](#arc_context), then the arc is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

### arc.centroid(...arguments)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

Computes the midpoint [*x*, *y*] of the center line of the arc that would be [generated](#_arc) by the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the arc generator’s accessor functions along with the `this` object. To be consistent with the generated arc, the accessors must be deterministic, *i.e.*, return the same value given the same arguments. The midpoint is defined as ([startAngle](#arc_startAngle) + [endAngle](#arc_endAngle)) / 2 and ([innerRadius](#arc_innerRadius) + [outerRadius](#arc_outerRadius)) / 2. For example:

[<img alt="Circular Sector Centroids" src="./img/centroid-circular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)[<img alt="Annular Sector Centroids" src="./img/centroid-annular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)

Note that this is **not the geometric center** of the arc, which may be outside the arc; this method is merely a convenience for positioning labels.

### arc.innerRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *radius* is specified, sets the inner radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current inner radius accessor, which defaults to:

```js
function innerRadius(d) {
  return d.innerRadius;
}
```

Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

### arc.outerRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *radius* is specified, sets the outer radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current outer radius accessor, which defaults to:

```js
function outerRadius(d) {
  return d.outerRadius;
}
```

Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart, often in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant outer radius is used for a pie or donut chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

### arc.cornerRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *radius* is specified, sets the corner radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current corner radius accessor, which defaults to:

```js
function cornerRadius() {
  return 0;
}
```

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius. For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded. The corner circles are shown in this diagram:

[<img alt="Rounded Circular Sectors" src="./img/rounded-circular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)[<img alt="Rounded Annular Sectors" src="./img/rounded-annular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)

The corner radius may not be larger than ([outerRadius](#arc_outerRadius) - [innerRadius](#arc_innerRadius)) / 2. In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect. This is occurs more often with the inner corners. See the [arc corners animation](https://observablehq.com/@d3/arc-corners) for illustration.

### arc.startAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *angle* is specified, sets the start angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.

### arc.endAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *angle* is specified, sets the end angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.

### arc.padAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *angle* is specified, sets the pad angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return d && d.padAngle;
}
```

The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as [padRadius](#arc_padRadius) * padAngle. This distance is subtracted equally from the [start](#arc_startAngle) and [end](#arc_endAngle) of the arc. If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored.

If the [inner radius](#arc_innerRadius) or angular span is small relative to the pad angle, it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector. For this reason, padding is typically only applied to annular sectors (*i.e.*, when innerRadius is positive), as shown in this diagram:

[<img alt="Padded Circular Sectors" src="./img/padded-circular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)[<img alt="Padded Annular Sectors" src="./img/padded-annular-sector.png" width="250" height="250">](https://observablehq.com/@d3/pie-settings)

The recommended minimum inner radius when using padding is outerRadius \* padAngle / sin(θ), where θ is the angular span of the smallest arc before padding. For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels. See the [arc padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration.

Often, the pad angle is not set directly on the arc generator, but is instead computed by the [pie generator](#pies) so as to ensure that the area of padded arcs is proportional to their value; see [*pie*.padAngle](#pie_padAngle). See the [pie padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration. If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.

### arc.padRadius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *radius* is specified, sets the pad radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt([innerRadius](#arc_innerRadius) * innerRadius + [outerRadius](#arc_outerRadius) * outerRadius). The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius * [padAngle](#arc_padAngle).

### arc.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *context* is specified, sets the context and returns this arc generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated arc](#_arc) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated arc is returned.

### arc.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this arc generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#arc_context) is null, as when this arc generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## Pies

The pie generator does not produce a shape directly, but instead computes the necessary angles to represent a tabular dataset as a pie or donut chart; these angles can then be passed to an [arc generator](#arcs).

### d3.pie()

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

Constructs a new pie generator with the default settings.

### pie(data, arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

Generates a pie for the given array of *data*, returning an array of objects representing each datum’s arc angles. Any additional *arguments* are arbitrary; they are simply propagated to the pie generator’s accessor functions along with the `this` object. The length of the returned array is the same as *data*, and each element *i* in the returned array corresponds to the element *i* in the input data. Each object in the returned array has the following properties:

* `data` - the input datum; the corresponding element in the input data array.
* `value` - the numeric [value](#pie_value) of the arc.
* `index` - the zero-based [sorted index](#pie_sort) of the arc.
* `startAngle` - the [start angle](#pie_startAngle) of the arc.
* `endAngle` - the [end angle](#pie_endAngle) of the arc.
* `padAngle` - the [pad angle](#pie_padAngle) of the arc.

This representation is designed to work with the arc generator’s default [startAngle](#arc_startAngle), [endAngle](#arc_endAngle) and [padAngle](#arc_padAngle) accessors. The angular units are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify angles in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

Given a small dataset of numbers, here is how to compute the arc angles to render this data as a pie chart:

```js
const data = [1, 1, 2, 3, 5, 8, 13, 21];
const arcs = d3.pie()(data);
```

The first pair of parens, `pie()`, [constructs](#pie) a default pie generator. The second, `pie()(data)`, [invokes](#_pie) this generator on the dataset, returning an array of objects:

```json
[
  {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```

Note that the returned array is in the same order as the data, even though this pie chart is [sorted](#pie_sortValues) by descending value, starting with the arc for the last datum (value 21) at 12 o’clock.

### pie.value(value)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *value* is specified, sets the value accessor to the specified function or number and returns this pie generator. If *value* is not specified, returns the current value accessor, which defaults to:

```js
function value(d) {
  return d;
}
```

When a pie is [generated](#_pie), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf). If your data are not simply numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum. For example:

```js
const data = [
  {"number":  4, "name": "Locke"},
  {"number":  8, "name": "Reyes"},
  {"number": 15, "name": "Ford"},
  {"number": 16, "name": "Jarrah"},
  {"number": 23, "name": "Shephard"},
  {"number": 42, "name": "Kwon"}
];

const arcs = d3.pie()
    .value(d => d.number)
    (data);
```

This is similar to [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) your data to values before invoking the pie generator:

```js
const arcs = d3.pie()(data.map(d => d.number));
```

The benefit of an accessor is that the input data remains associated with the returned objects, thereby making it easier to access other fields of the data, for example to set the color or to add text labels.

### pie.sort(compare)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *compare* is specified, sets the data comparator to the specified function and returns this pie generator. If *compare* is not specified, returns the current data comparator, which defaults to null. If both the data comparator and the value comparator are null, then arcs are positioned in the original input order. Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the data comparator implicitly sets the [value comparator](#pie_sortValues) to null.

The *compare* function takes two arguments *a* and *b*, each elements from the input data array. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified. For example, to sort arcs by their associated name:

```js
pie.sort((a, b) => a.name.localeCompare(b.name));
```

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

### pie.sortValues(compare)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *compare* is specified, sets the value comparator to the specified function and returns this pie generator. If *compare* is not specified, returns the current value comparator, which defaults to descending value. The default value comparator is implemented as:

```js
function compare(a, b) {
  return b - a;
}
```

If both the data comparator and the value comparator are null, then arcs are positioned in the original input order. Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the value comparator implicitly sets the [data comparator](#pie_sort) to null.

The value comparator is similar to the [data comparator](#pie_sort), except the two arguments *a* and *b* are values derived from the input data array using the [value accessor](#pie_value), not the data elements. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified. For example, to sort arcs by ascending value:

```js
pie.sortValues((a, b) => a - b);
```

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

### pie.startAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *angle* is specified, sets the overall start angle of the pie to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle() {
  return 0;
}
```

The start angle here means the *overall* start angle of the pie, *i.e.*, the start angle of the first arc. The start angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

### pie.endAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *angle* is specified, sets the overall end angle of the pie to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle() {
  return 2 * Math.PI;
}
```

The end angle here means the *overall* end angle of the pie, *i.e.*, the end angle of the last arc. The end angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

The value of the end angle is constrained to [startAngle](#pie_startAngle) ± τ, such that |endAngle - startAngle| ≤ τ.

### pie.padAngle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js)

If *angle* is specified, sets the pad angle to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return 0;
}
```

The pad angle here means the angular separation between each adjacent arc. The total amount of padding reserved is the specified *angle* times the number of elements in the input data array, and at most |endAngle - startAngle|; the remaining space is then divided proportionally by [value](#pie_value) such that the relative area of each arc is preserved. See the [pie padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration. The pad angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians.

## Lines

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

## Areas

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

## Curves

While [lines](#lines) are defined as a sequence of two-dimensional [*x*, *y*] points, and [areas](#areas) are similarly defined by a topline and a baseline, there remains the task of transforming this discrete representation into a continuous shape: *i.e.*, how to interpolate between the points. A variety of curves are provided for this purpose.

Curves are typically not constructed or used directly, instead being passed to [*line*.curve](#line_curve) and [*area*.curve](#area_curve). For example:

```js
const line = d3.line(d => d.date, d => d.value)
    .curve(d3.curveCatmullRom.alpha(0.5));
```

### d3.curveBasis(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basis.js)

<img src="./img/basis.png" width="888" height="240" alt="basis">

Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. The first and last points are triplicated such that the spline starts at the first point and ends at the last point, and is tangent to the line between the first and second points, and to the line between the penultimate and last points.

### d3.curveBasisClosed(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisClosed.js)

<img src="./img/basisClosed.png" width="888" height="240" alt="basisClosed">

Produces a closed cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop with C2 continuity.

### d3.curveBasisOpen(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisOpen.js)

<img src="./img/basisOpen.png" width="888" height="240" alt="basisOpen">

Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. Unlike [basis](#basis), the first and last points are not repeated, and thus the curve typically does not intersect these points.

### d3.curveBumpX(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js)

<img src="./img/bumpX.png" width="888" height="240" alt="bumpX">

Produces a Bézier curve between each pair of points, with horizontal tangents at each point.

### d3.curveBumpY(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js)

<img src="./img/bumpY.png" width="888" height="240" alt="bumpY">

Produces a Bézier curve between each pair of points, with vertical tangents at each point.

### d3.curveBundle(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js)

<img src="./img/bundle.png" width="888" height="240" alt="bundle">

Produces a straightened cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points, with the spline straightened according to the curve’s [*beta*](#curveBundle_beta), which defaults to 0.85. This curve is typically used in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling) to disambiguate connections, as proposed by [Danny Holten](https://www.win.tue.nl/vis1/home/dholten/) in [Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data](https://www.win.tue.nl/vis1/home/dholten/papers/bundles_infovis.pdf). This curve does not implement [*curve*.areaStart](#curve_areaStart) and [*curve*.areaEnd](#curve_areaEnd); it is intended to work with [d3.line](#lines), not [d3.area](#areas).

### bundle.beta(beta)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js)

Returns a bundle curve with the specified *beta* in the range [0, 1], representing the bundle strength. If *beta* equals zero, a straight line between the first and last point is produced; if *beta* equals one, a standard [basis](#basis) spline is produced. For example:

```js
const line = d3.line().curve(d3.curveBundle.beta(0.5));
```

### d3.curveCardinal(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinal.js)

<img src="./img/cardinal.png" width="888" height="240" alt="cardinal">

Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points, with one-sided differences used for the first and last piece. The default [tension](#curveCardinal_tension) is 0.

### d3.curveCardinalClosed(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalClosed.js)

<img src="./img/cardinalClosed.png" width="888" height="240" alt="cardinalClosed">

Produces a closed cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop. The default [tension](#curveCardinal_tension) is 0.

### d3.curveCardinalOpen(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js)

<img src="./img/cardinalOpen.png" width="888" height="240" alt="cardinalOpen">

Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. Unlike [curveCardinal](#curveCardinal), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point. The default [tension](#curveCardinal_tension) is 0.

### cardinal.tension(tension)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js)

Returns a cardinal curve with the specified *tension* in the range [0, 1]. The *tension* determines the length of the tangents: a *tension* of one yields all zero tangents, equivalent to [curveLinear](#curveLinear); a *tension* of zero produces a uniform [Catmull–Rom](#curveCatmullRom) spline. For example:

```js
const line = d3.line().curve(d3.curveCardinal.tension(0.5));
```

### d3.curveCatmullRom(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js)

<img src="./img/catmullRom.png" width="888" height="240" alt="catmullRom">

Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. in [On the Parameterization of Catmull–Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/), with one-sided differences used for the first and last piece.

### d3.curveCatmullRomClosed(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomClosed.js)

<img src="./img/catmullRomClosed.png" width="888" height="330" alt="catmullRomClosed">

Produces a closed cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. When a line segment ends, the first three control points are repeated, producing a closed loop.

### d3.curveCatmullRomOpen(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomOpen.js)

<img src="./img/catmullRomOpen.png" width="888" height="240" alt="catmullRomOpen">

Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. Unlike [curveCatmullRom](#curveCatmullRom), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point.

### catmullRom.alpha(alpha)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js)

Returns a cubic Catmull–Rom curve with the specified *alpha* in the range [0, 1]. If *alpha* is zero, produces a uniform spline, equivalent to [curveCardinal](#curveCardinal) with a tension of zero; if *alpha* is one, produces a chordal spline; if *alpha* is 0.5, produces a [centripetal spline](https://en.wikipedia.org/wiki/Centripetal_Catmull–Rom_spline). Centripetal splines are recommended to avoid self-intersections and overshoot. For example:

```js
const line = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
```

### d3.curveLinear(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linear.js)

<img src="./img/linear.png" width="888" height="240" alt="linear">

Produces a polyline through the specified points.

### d3.curveLinearClosed(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linearClosed.js)

<img src="./img/linearClosed.png" width="888" height="240" alt="linearClosed">

Produces a closed polyline through the specified points by repeating the first point when the line segment ends.

### d3.curveMonotoneX(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js)

<img src="./img/monotoneX.png" width="888" height="240" alt="monotoneX">

Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *y*, assuming monotonicity in *x*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

### d3.curveMonotoneY(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js)

<img src="./img/monotoneY.png" width="888" height="240" alt="monotoneY">

Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *x*, assuming monotonicity in *y*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

### d3.curveNatural(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/natural.js)

<img src="./img/natural.png" width="888" height="240" alt="natural">

Produces a [natural](https://en.wikipedia.org/wiki/Spline_interpolation) [cubic spline](http://mathworld.wolfram.com/CubicSpline.html) with the second derivative of the spline set to zero at the endpoints.

### d3.curveStep(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

<img src="./img/step.png" width="888" height="240" alt="step">

Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes at the midpoint of each pair of adjacent *x*-values.

### d3.curveStepAfter(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

<img src="./img/stepAfter.png" width="888" height="240" alt="stepAfter">

Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes after the *x*-value.

### d3.curveStepBefore(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

<img src="./img/stepBefore.png" width="888" height="240" alt="stepBefore">

Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes before the *x*-value.

## Custom curves

Curves are typically not used directly, instead being passed to [*line*.curve](#line_curve) and [*area*.curve](#area_curve). However, you can define your own curve implementation should none of the built-in curves satisfy your needs using the following interface. You can also use this low-level interface with a built-in curve type as an alternative to the line and area generators.

### curve.areaStart()

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js#L7)

Indicates the start of a new area segment. Each area segment consists of exactly two [line segments](#curve_lineStart): the topline, followed by the baseline, with the baseline points in reverse order.

### curve.areaEnd()

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

Indicates the end of the current area segment.

### curve.lineStart()

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

Indicates the start of a new line segment. Zero or more [points](#curve_point) will follow.

### curve.lineEnd()

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

Indicates the end of the current line segment.

### curve.point(x, y)

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js)

Indicates a new point in the current line segment with the given *x*- and *y*-values.

## Links

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

## Radial links

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

## Radial points

### d3.pointRadial(angle, radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/pointRadial.js), [Examples](https://observablehq.com/@d3/radial-area-chart)

Returns the point [<i>x</i>, <i>y</i>] for the given *angle* in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise, and the given *radius*.

## Symbols

Symbols provide a categorical shape encoding as is commonly used in scatterplots. Symbols are always centered at ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to move the symbol to a different position.

### d3.symbol(type, size)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js), [Examples](https://observablehq.com/@d3/fitted-symbols)

Constructs a new symbol generator of the specified [type](#symbol_type) and [size](#symbol_size). If not specified, *type* defaults to a circle, and *size* defaults to 64.

### symbol(arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

Generates a symbol for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the symbol generator’s accessor functions along with the `this` object. For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels. If the symbol generator has a [context](#symbol_context), then the symbol is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

### symbol.type(type)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *type* is specified, sets the symbol type to the specified function or symbol type and returns this symbol generator. If *type* is a function, the symbol generator’s arguments and *this* are passed through. (See [*selection*.attr](https://github.com/d3/d3-selection/blob/main/README.md#selection_attr) if you are using d3-selection.) If *type* is not specified, returns the current symbol type accessor, which defaults to:

```js
function type() {
  return circle;
}
```

See [symbolsFill](#symbolsFill) and [symbolsStroke](#symbolsStroke) for built-in symbol types. To implement a custom symbol type, pass an object that implements [*symbolType*.draw](#symbolType_draw).

### symbol.size(size)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *size* is specified, sets the size to the specified function or number and returns this symbol generator. If *size* is a function, the symbol generator’s arguments and *this* are passed through. (See [*selection*.attr](https://github.com/d3/d3-selection/blob/main/README.md#selection_attr) if you are using d3-selection.) If *size* is not specified, returns the current size accessor, which defaults to:

```js
function size() {
  return 64;
}
```

Specifying the size as a function is useful for constructing a scatterplot with a size encoding. If you wish to scale the symbol to fit a given bounding box, rather than by area, try [SVG’s getBBox](https://observablehq.com/d/1fac2626b9e1b65f).

### symbol.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *context* is specified, sets the context and returns this symbol generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated symbol](#_symbol) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated symbol is returned.

### symbol.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this symbol generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#symbol_context) is null, as when this symbol generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

### d3.symbolsFill

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

<a href="#symbolCircle"><img src="./img/circle.png" width="100" height="100"></a>
<a href="#symbolCross"><img src="./img/cross.png" width="100" height="100"></a>
<a href="#symbolDiamond"><img src="./img/diamond.png" width="100" height="100"></a>
<a href="#symbolSquare"><img src="./img/square.png" width="100" height="100"></a>
<a href="#symbolStar"><img src="./img/star.png" width="100" height="100"></a>
<a href="#symbolTriangle"><img src="./img/triangle.png" width="100" height="100"></a>
<a href="#symbolWye"><img src="./img/wye.png" width="100" height="100"></a>

An array containing a set of symbol types designed for filling: [circle](#symbolCircle), [cross](#symbolCross), [diamond](#symbolDiamond), [square](#symbolSquare), [star](#symbolStar), [triangle](#symbolTriangle), and [wye](#symbolWye). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

### d3.symbolsStroke

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

An array containing a set of symbol types designed for stroking: [circle](#symbolCircle), [plus](#symbolPlus), [times](#symbolTimes), [triangle2](#symbolTriangle2), [asterisk](#symbolAsterisk), [square2](#symbolSquare2), and [diamond2](#symbolDiamond2). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

### d3.symbolAsterisk

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/asterisk.js)

The asterisk symbol type; intended for stroking.

### d3.symbolCircle

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/circle.js)

The circle symbol type; intended for either filling or stroking.

### d3.symbolCross

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/cross.js)

The Greek cross symbol type, with arms of equal length; intended for filling.

### d3.symbolDiamond

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js)

The rhombus symbol type; intended for filling.

### d3.symbolDiamond2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js)

The rotated square symbol type; intended for stroking.

### d3.symbolPlus

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/plus.js)

The plus symbol type; intended for stroking.

### d3.symbolSquare

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square.js)

The square symbol type; intended for filling.

### d3.symbolSquare2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square2.js)

The square2 symbol type; intended for stroking.

### d3.symbolStar

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/star.js)

The pentagonal star (pentagram) symbol type; intended for filling.

### d3.symbolTriangle

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle.js)

The up-pointing triangle symbol type; intended for filling.

### d3.symbolTriangle2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle2.js)

The up-pointing triangle symbol type; intended for stroking.

### d3.symbolWye

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/wye.js)

The Y-shape symbol type; intended for filling.

### d3.symbolTimes

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/times.js)

The X-shape symbol type; intended for stroking.

## Custom symbol types

Symbol types are typically not used directly, instead being passed to [*symbol*.type](#symbol_type). However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface. You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.

### symbolType.draw(context, size)

Renders this symbol type to the specified *context* with the specified *size* in square pixels. The *context* implements the [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) interface. (Note that this is a subset of the CanvasRenderingContext2D interface!)

## Stacks

[<img alt="Stacked Bar Chart" src="./img/stacked-bar.png" width="295" height="154">](https://observablehq.com/@d3/stacked-bar-chart)[<img alt="Streamgraph" src="./img/stacked-stream.png" width="295" height="154">](https://observablehq.com/@mbostock/streamgraph-transitions)

Some shape types can be stacked, placing one shape adjacent to another. For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by product category, stacking bars vertically. This is equivalent to subdividing a bar chart by an ordinal dimension (such as product category) and applying a color encoding.

Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories, as only the bottom layer of the stack is aligned. So, chose the [stack order](#stack_order) carefully, and consider a [streamgraph](#stackOffsetWiggle). (See also [grouped charts](https://observablehq.com/@d3/grouped-bar-chart).)

Like the [pie generator](#pies), the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an [area generator](#areas) or use directly, say to position bars.

### d3.stack()

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

Constructs a new stack generator with the default settings.

### stack(data, arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

Generates a stack for the given array of *data*, returning an array representing each series. Any additional *arguments* are arbitrary; they are simply propagated to accessors along with the `this` object.

The series are determined by the [keys accessor](#stack_keys); each series *i* in the returned array corresponds to the *i*th key. Each series is an array of points, where each point *j* corresponds to the *j*th element in the input *data*. Lastly, each point is represented as an array [*y0*, *y1*] where *y0* is the lower value (baseline) and *y1* is the upper value (topline); the difference between *y0* and *y1* corresponds to the computed [value](#stack_value) for this point. The key for each series is available as *series*.key, and the [index](#stack_order) as *series*.index. The input data element for each point is available as *point*.data.

For example, consider the following table representing monthly sales of fruits:

Month   | Apples | Bananas | Cherries | Durians
--------|--------|---------|----------|---------
 1/2015 |   3840 |    1920 |      960 |     400
 2/2015 |   1600 |    1440 |      960 |     400
 3/2015 |    640 |     960 |      640 |     400
 4/2015 |    320 |     480 |      640 |     400

This might be represented in JavaScript as an array of objects:

```js
const data = [
  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, durians: 400},
  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, durians: 400},
  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, durians: 400},
  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, durians: 400}
];
```

To produce a stack for this data:

```js
const stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "durians"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

const series = stack(data);
```

The resulting array has one element per *series*. Each series has one point per month, and each point has a lower and upper value defining the baseline and topline:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // durians
]
```

Each series in then typically passed to an [area generator](#areas) to render an area chart, or used to construct rectangles for a bar chart.

### stack.keys(keys)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *keys* is specified, sets the keys accessor to the specified function or array and returns this stack generator. If *keys* is not specified, returns the current keys accessor, which defaults to the empty array. A series (layer) is [generated](#_stack) for each key. Keys are typically strings, but they may be arbitrary values. The series’ key is passed to the [value accessor](#stack_value), along with each data point, to compute the point’s value.

### stack.value(value)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *value* is specified, sets the value accessor to the specified function or number and returns this stack generator. If *value* is not specified, returns the current value accessor, which defaults to:

```js
function value(d, key) {
  return d[key];
}
```

Thus, by default the stack generator assumes that the input data is an array of objects, with each object exposing named properties with numeric values; see [*stack*](#_stack) for an example.

### stack.order(order)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *order* is specified, sets the order accessor to the specified function or array and returns this stack generator. If *order* is not specified, returns the current order accessor, which defaults to [stackOrderNone](#stackOrderNone); this uses the order given by the [key accessor](#stack_key). See [stack orders](#stack-orders) for the built-in orders.

If *order* is a function, it is passed the generated series array and must return an array of numeric indexes representing the stack order. For example, the default order is defined as:

```js
function orderNone(series) {
  let n = series.length;
  const o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
```

The stack order is computed prior to the [offset](#stack_offset); thus, the lower value for all points is zero at the time the order is computed. The index attribute for each series is also not set until after the order is computed.

### stack.offset(offset)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *offset* is specified, sets the offset accessor to the specified function and returns this stack generator. If *offset* is not specified, returns the current offset acccesor, which defaults to [stackOffsetNone](#stackOffsetNone); this uses a zero baseline. See [stack offsets](#stack-offsets) for the built-in offsets.

The offset function is passed the generated series array and the order index array; it is then responsible for updating the lower and upper values in the series array. For example, the default offset is defined as:

```js
function offsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (let i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (let j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = s0[j][1];
    }
  }
}
```

## Stack orders

Stack orders are typically not used directly, but are instead passed to [*stack*.order](#stack_order).

### d3.stackOrderAppearance(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/appearance.js)

Returns a series order such that the earliest series (according to the maximum value) is at the bottom.

### d3.stackOrderAscending(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/ascending.js)

Returns a series order such that the smallest series (according to the sum of values) is at the bottom.

### d3.stackOrderDescending(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/descending.js)

Returns a series order such that the largest series (according to the sum of values) is at the bottom.

### d3.stackOrderInsideOut(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/insideOut.js)

Returns a series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the [wiggle offset](#stackOffsetWiggle). See [Stacked Graphs—Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Byron & Wattenberg for more information.

### d3.stackOrderNone(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/none.js)

Returns the given series order [0, 1, … *n* - 1] where *n* is the number of elements in *series*. Thus, the stack order is given by the [key accessor](#stack_keys).

### d3.stackOrderReverse(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/reverse.js)

Returns the reverse of the given series order [*n* - 1, *n* - 2, … 0] where *n* is the number of elements in *series*. Thus, the stack order is given by the reverse of the [key accessor](#stack_keys).

## Stack offsets

Stack offsets are typically not used directly, but are instead passed to [*stack*.offset](#stack_offset).

### d3.stackOffsetExpand(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/expand.js)

Applies a zero baseline and normalizes the values for each point such that the topline is always one.

### d3.stackOffsetDiverging(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/diverging.js)

Positive values are stacked above zero, negative values are [stacked below zero](https://observablehq.com/@d3/diverging-stacked-bar-chart), and zero values are stacked at zero.

### d3.stackOffsetNone(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/none.js)

Applies a zero baseline.

### d3.stackOffsetSilhouette(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/silhouette.js)

Shifts the baseline down such that the center of the streamgraph is always at zero.

### d3.stackOffsetWiggle(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/wiggle.js)

Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the [inside-out order](#stackOrderInsideOut). See [Stacked Graphs—Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Bryon & Wattenberg for more information.

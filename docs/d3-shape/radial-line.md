# Radial lines

[Examples](https://observablehq.com/@d3/d3-lineradial) · A radial line generator is like the Cartesian [line generator](./line.md) except the [x](./line.md#line_x) and [y](./line.md#line_y) accessors are replaced with [angle](#lineRadial_angle) and [radius](#lineRadial_radius) accessors. Radial lines are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## lineRadial() {#lineRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Constructs a new radial line generator with the default settings.

```js
const line = d3.lineRadial();
```

## *lineRadial*(*data*) {#_lineRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*](./line.md#_line).

```js
svg.append("path").attr("d", line(data)).attr("stroke", "currentColor");
```

## *lineRadial*.angle(*angle*) {#lineRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.x](./line.md#line_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

```js
const line = d3.lineRadial().angle((d) => a(d.Date));
```

## *lineRadial*.radius(*radius*) {#lineRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.y](./line.md#line_y), except the accessor returns the radius: the distance from the origin.

```js
const line = d3.lineRadial().radius((d) => r(d.temperature));
```

## *lineRadial*.defined(*defined*) {#lineRadial_defined}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.defined](./line.md#line_defined).

```js
const line = d3.lineRadial().defined((d) => !isNaN(d.temperature));
```

## *lineRadial*.curve(*curve*) {#lineRadial_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.curve](./line.md#line_curve). Note that [curveMonotoneX](../d3-shape/curve.md#curveMonotoneX) or [curveMonotoneY](../d3-shape/curve.md#curveMonotoneY) are not recommended for radial lines because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial lines.

```js
const line = d3.lineRadial().curve(d3.curveBasis);
```

## *lineRadial*.context(*context*) {#lineRadial_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.context](./line.md#line_context).

```js
const context = canvas.getContext("2d");
const line = d3.lineRadial().context(context);
```

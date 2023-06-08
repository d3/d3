# Radial areas

[Examples](https://observablehq.com/@d3/radial-area-chart) · A radial area generator is like the Cartesian [area generator](./area.md) except the [x](./area.md#area_x) and [y](./area.md#area_y) accessors are replaced with [angle](#areaRadial_angle) and [radius](#areaRadial_radius) accessors. Radial areas are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## areaRadial() {#areaRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Constructs a new radial area generator with the default settings.

```js
const area = d3.areaRadial();
```

## *areaRadial*(*data*) {#_areaRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*](./area.md#_area).

```js
svg.append("path").attr("d", area(data));
```

## *areaRadial*.angle(*angle*) {#areaRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x](./area.md#area_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

```js
const area = d3.areaRadial().angle((d) => a(d.Date));
```

## *areaRadial*.startAngle(*angle*) {#areaRadial_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x0](./area.md#area_x0), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

## *areaRadial*.endAngle(*angle*) {#areaRadial_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x1](./area.md#area_x1), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

## *areaRadial*.radius(*radius*) {#areaRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y](./area.md#area_y), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.temperature));
```

## *areaRadial*.innerRadius(*radius*) {#areaRadial_innerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y0](./area.md#area_y0), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.low));
```

## *areaRadial*.outerRadius(*radius*) {#areaRadial_outerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y1](./area.md#area_y1), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.high));
```

## *areaRadial*.defined(*defined*) {#areaRadial_defined}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.defined](./area.md#area_defined).

```js
const area = d3.areaRadial().defined((d) => !isNaN(d.temperature));
```

## *areaRadial*.curve(*curve*) {#areaRadial_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.curve](./area.md#area_curve). Note that [curveMonotoneX](./curve.md#curveMonotoneX) or [curveMonotoneY](./curve.md#curveMonotoneY) are not recommended for radial areas because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial areas.

```js
const area = d3.areaRadial().curve(d3.curveBasisClosed);
```

## *areaRadial*.context(*context*) {#areaRadial_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.context](./area.md#area_context).

```js
const context = canvas.getContext("2d");
const area = d3.areaRadial().context(context);
```

## *areaRadial*.lineInnerRadius() {#areaRadial_lineInnerRadius}

An alias for [*areaRadial*.lineStartAngle](#areaRadial_lineStartAngle).

## *areaRadial*.lineStartAngle() {#areaRadial_lineStartAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

## *areaRadial*.lineEndAngle() {#areaRadial_lineEndAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [end angle accessor](#areaRadial_endAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

## *areaRadial*.lineOuterRadius() {#areaRadial_lineOuterRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [outer radius accessor](#areaRadial_outerRadius).

# Radial lines

A radial line generator is equivalent to the standard Cartesian [line generator](./line.md), except the [x](./line.md#line_x) and [y](./line.md#line_y) accessors are replaced with [angle](#lineRadial_angle) and [radius](#lineRadial_radius) accessors. Radial lines are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

### d3.lineRadial()

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js), [Examples](https://observablehq.com/@d3/d3-lineradial)

<img alt="Radial Line" width="250" height="250" src="./img/line-radial.png">

Constructs a new radial line generator with the default settings.

### lineRadial(data)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L4), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*](#_line).

### lineRadial.angle(angle)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L7), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.x](./line.md#line_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

### lineRadial.radius(radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js#L8), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.y](./line.md#line_y), except the accessor returns the radius: the distance from the origin ⟨0,0⟩.

### lineRadial.defined(defined)

Equivalent to [*line*.defined](./line.md#line_defined).

### lineRadial.curve(curve)

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js), [Examples](https://observablehq.com/@d3/d3-lineradial)

Equivalent to [*line*.curve](./line.md#line_curve). Note that [curveMonotoneX](#curveMonotoneX) or [curveMonotoneY](#curveMonotoneY) are not recommended for radial lines because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial lines.

### lineRadial.context(context)

Equivalent to [*line*.context](./line.md#line_context).

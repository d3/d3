# Radial lines

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

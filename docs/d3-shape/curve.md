
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

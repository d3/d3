<script setup>

import {ref} from "vue";
import ExampleCurve from "../components/ExampleCurve.vue";

const alpha = ref(0.5);
const beta = ref(0.85);
const tension = ref(0);
const ticks = [0, 0.25, 0.5, 0.75, 1];

</script>

# Curves

Curves turn a discrete (pointwise) representation of a [line](./line.md) or [area](./area.md) into a continuous shape: curves specify how to interpolate between two-dimensional [*x*, *y*] points.

Curves are typically not constructed or used directly. Instead, one of the built-in curves is being passed to [*line*.curve](./line.md#line_curve) or [*area*.curve](./area.md#area_curve).

```js
const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.5));
```

If desired, you can implement a [custom curve](#custom-curves). For an example of using a curve directly, see [Context to Curve](https://observablehq.com/@d3/context-to-curve).

## *curveBasis*(*context*) {#curveBasis}

<ExampleCurve :curves='[{curve: "basis"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basis.js) · Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. The first and last points are triplicated such that the spline starts at the first point and ends at the last point, and is tangent to the line between the first and second points, and to the line between the penultimate and last points.

## *curveBasisClosed*(*context*) {#curveBasisClosed}

<ExampleCurve :curves='[{curve: "basis-closed"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisClosed.js) · Produces a closed cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop with C2 continuity.

## *curveBasisOpen*(*context*) {#curveBasisOpen}

<ExampleCurve :curves='[{curve: "basis-open"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisOpen.js) · Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. Unlike [basis](#curveBasis), the first and last points are not repeated, and thus the curve typically does not intersect these points.

## *curveBumpX*(*context*) {#curveBumpX}

<ExampleCurve :curves='[{curve: "bump-x"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js) · Produces a Bézier curve between each pair of points, with horizontal tangents at each point.

## *curveBumpY*(*context*) {#curveBumpY}

<ExampleCurve :curves='[{curve: "bump-y"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js) · Produces a Bézier curve between each pair of points, with vertical tangents at each point.

## *curveBundle*(*context*) {#curveBundle}

<ExampleCurve label="beta" :curves='ticks.map((t) => ({curve: "bundle", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js) · Produces a straightened cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points, with the spline straightened according to the curve’s [*beta*](#curveBundle_beta), which defaults to 0.85. This curve is typically used in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling) to disambiguate connections, as proposed by [Danny Holten](https://www.win.tue.nl/vis1/home/dholten/) in [Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data](https://www.win.tue.nl/vis1/home/dholten/papers/bundles_infovis.pdf). This curve does not implement [*curve*.areaStart](#curve_areaStart) and [*curve*.areaEnd](#curve_areaEnd); it is intended to work with [d3.line](./line.md), not [d3.area](./area.md).

## curveBundle.beta(*beta*) {#curveBundle_beta}

<p>
  <label class="label-input">
    <span>Beta:</span>
    <input type="range" v-model.number="beta" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{beta.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "bundle", tension: beta}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js) · Returns a bundle curve with the specified *beta* in the range [0, 1], representing the bundle strength. If *beta* equals zero, a straight line between the first and last point is produced; if *beta* equals one, a standard [basis](#curveBasis) spline is produced. For example:

```js
const line = d3.line().curve(d3.curveBundle.beta(0.5));
```

## *curveCardinal*(*context*) {#curveCardinal}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinal.js) · Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points, with one-sided differences used for the first and last piece. The default [tension](#curveCardinal_tension) is 0.

## *curveCardinalClosed*(*context*) {#curveCardinalClosed}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal-closed", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalClosed.js) · Produces a closed cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop. The default [tension](#curveCardinal_tension) is 0.

## *curveCardinalOpen*(*context*) {#curveCardinalOpen}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal-open", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js) · Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. Unlike [curveCardinal](#curveCardinal), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point. The default [tension](#curveCardinal_tension) is 0.

## curveCardinal.tension(*tension*) {#curveCardinal_tension}

<p>
  <label class="label-input">
    <span>Tension:</span>
    <input type="range" v-model.number="tension" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{tension.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "cardinal", tension}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js) · Returns a cardinal curve with the specified *tension* in the range [0, 1]. The *tension* determines the length of the tangents: a *tension* of one yields all zero tangents, equivalent to [curveLinear](#curveLinear); a *tension* of zero produces a uniform [Catmull–Rom](#curveCatmullRom) spline. For example:

```js
const line = d3.line().curve(d3.curveCardinal.tension(0.5));
```

## *curveCatmullRom*(*context*) {#curveCatmullRom}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js) · Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. in [On the Parameterization of Catmull–Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/), with one-sided differences used for the first and last piece.

## *curveCatmullRomClosed*(*context*) {#curveCatmullRomClosed}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom-closed", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomClosed.js) · Produces a closed cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. When a line segment ends, the first three control points are repeated, producing a closed loop.

## *curveCatmullRomOpen*(*context*) {#curveCatmullRomOpen}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom-open", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomOpen.js) · Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. Unlike [curveCatmullRom](#curveCatmullRom), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point.

## curveCatmullRom.alpha(*alpha*) {#curveCatmullRom_alpha}

<p>
  <label class="label-input">
    <span>Alpha:</span>
    <input type="range" v-model.number="alpha" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{alpha.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "catmull-rom", tension: alpha}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js) · Returns a cubic Catmull–Rom curve with the specified *alpha* in the range [0, 1]. If *alpha* is zero, produces a uniform spline, equivalent to [curveCardinal](#curveCardinal) with a tension of zero; if *alpha* is one, produces a chordal spline; if *alpha* is 0.5, produces a [centripetal spline](https://en.wikipedia.org/wiki/Centripetal_Catmull–Rom_spline). Centripetal splines are recommended to avoid self-intersections and overshoot. For example:

```js
const line = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
```

## *curveLinear*(*context*) {#curveLinear}

<ExampleCurve :curves='[{curve: "linear"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linear.js) · Produces a polyline through the specified points.

## *curveLinearClosed*(*context*) {#curveLinearClosed}

<ExampleCurve :curves='[{curve: "linear-closed"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linearClosed.js) · Produces a closed polyline through the specified points by repeating the first point when the line segment ends.

## *curveMonotoneX*(*context*) {#curveMonotoneX}

<ExampleCurve :curves='[{curve: "monotone-x"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js) · Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *y*, assuming monotonicity in *x*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

## *curveMonotoneY*(*context*) {#curveMonotoneY}

<ExampleCurve :points='[[100, 200], [340, 200], [460, 160], [460, 120], [420, 80], [580, 40], [820, 40]]' :curves='[{curve: "monotone-y"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js) · Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *x*, assuming monotonicity in *y*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

## *curveNatural*(*context*) {#curveNatural}

<ExampleCurve :curves='[{curve: "natural"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/natural.js) · Produces a [natural](https://en.wikipedia.org/wiki/Spline_interpolation) [cubic spline](http://mathworld.wolfram.com/CubicSpline.html) with the second derivative of the spline set to zero at the endpoints.

## *curveStep*(*context*) {#curveStep}

<ExampleCurve :curves='[{curve: "step"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes at the midpoint of each pair of adjacent *x*-values.

## *curveStepAfter*(*context*) {#curveStepAfter}

<ExampleCurve :curves='[{curve: "step-after"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes after the *x*-value.

## *curveStepBefore*(*context*) {#curveStepBefore}

<ExampleCurve :curves='[{curve: "step-before"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes before the *x*-value.

## Custom curves

Curves are typically not used directly, instead being passed to [*line*.curve](./line.md#line_curve) and [*area*.curve](./area.md#area_curve). However, you can define your own curve implementation should none of the built-in curves satisfy your needs using the following interface; see the [curveLinear source](https://github.com/d3/d3-shape/blob/main/src/curve/linear.js) for an example implementation. You can also use this low-level interface with a built-in curve type as an alternative to the line and area generators.

### *curve*.areaStart() {#curve_areaStart}

Indicates the start of a new area segment. Each area segment consists of exactly two [line segments](#curve_lineStart): the topline, followed by the baseline, with the baseline points in reverse order.

### *curve*.areaEnd() {#curve_areaEnd}

Indicates the end of the current area segment.

### *curve*.lineStart() {#curve_lineStart}

Indicates the start of a new line segment. Zero or more [points](#curve_point) will follow.

### *curve*.lineEnd() {#curve_lineEnd}

Indicates the end of the current line segment.

### *curve*.point(*x*, *y*) {#curve_point}

Indicates a new point in the current line segment with the given *x*- and *y*-values.

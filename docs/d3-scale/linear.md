# Linear scales

Linear scales map a continuous, quantitative input [domain](#linear_domain) to a continuous output [range](#linear_range) using a linear transformation (translate and scale). If the range is also numeric, the mapping may be [inverted](#linear_invert). Linear scales are a good default choice for continuous quantitative data because they preserve proportional differences. Each range value *y* can be expressed as a function of the domain value *x*: *y* = *mx* + *b*.

<!-- A continuous scale is not constructed directly; instead, try a [linear](#linear-scales), [power](#power-scales), [log](#log-scales), [identity](#identity-scales), [radial](#radial-scales), [time](#time-scales) or [sequential color](#sequential-scales) scale. -->

## scaleLinear(*domain*, *range*) {#scaleLinear}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/linear.js) · Constructs a new linear scale with the specified [domain](#linear_domain) and [range](#linear_range), the [default](../d3-interpolate/value.md#interpolate) [interpolator](#linear_interpolate), and [clamping](#linear_clamp) disabled.

```js
d3.scaleLinear([0, 100], ["red", "blue"])
```

If a single argument is specified, it is interpreted as the *range*. If either *domain* or *range* are not specified, each defaults to [0, 1].

```js
d3.scaleLinear(["red", "blue"]) // default domain of [0, 1]
```

## *linear*(*value*) {#_linear}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Given a *value* from the [domain](#linear_domain), returns the corresponding value from the [range](#linear_range). For example, to apply a position encoding:

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x(20); // 80
x(50); // 320
```

To apply a color encoding:

```js
const color = d3.scaleLinear([10, 100], ["brown", "steelblue"]);
color(20); // "rgb(154, 52, 57)"
color(50); // "rgb(123, 81, 103)"
```

If the given *value* is outside the domain, and [clamping](#linear_clamp) is not enabled, the mapping will be extrapolated such that the returned value is outside the range.

## *linear*.invert(*value*) {#linear_invert}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Given a *value* from the [range](#linear_range), returns the corresponding value from the [domain](#linear_domain). Inversion is useful for interaction, say to determine the data value corresponding to the position of the mouse. For example, to invert a position encoding:

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x.invert(80); // 20
x.invert(320); // 50
```

If the given *value* is outside the range, and [clamping](#linear_clamp) is not enabled, the mapping may be extrapolated such that the returned value is outside the domain. This method is only supported if the range is numeric. If the range is not numeric, returns NaN.

For a valid value *y* in the range, <i>linear</i>(<i>linear</i>.invert(<i>y</i>)) approximately equals *y*; similarly, for a valid value *x* in the domain, <i>linear</i>.invert(<i>linear</i>(<i>x</i>)) approximately equals *x*. The scale and its inverse may not be exact due to the limitations of floating point precision.

## *linear*.domain(*domain*) {#linear_domain}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *domain* is specified, sets the scale’s domain to the specified array of numbers and returns this scale.

```js
const x = d3.scaleLinear().domain([10, 130]);
```

The array must contain two or more elements. If the elements in the given array are not numbers, they will be coerced to numbers.

Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale. For example, to create a [diverging color scale](./diverging.md) that interpolates between white and red for negative values, and white and green for positive values, say:

```js
const color = d3.scaleLinear([-1, 0, 1], ["red", "white", "green"]);
color(-0.5); // "rgb(255, 128, 128)"
color(+0.5); // "rgb(128, 192, 128)"
```

Internally, a piecewise scale performs a [binary search](../d3-array/bisect.md) for the range interpolator corresponding to the given domain value. Thus, the domain must be in ascending or descending order. If the domain and range have different lengths *N* and *M*, only the first *min(N,M)* elements in each are observed.

If *domain* is not specified, returns a copy of the scale’s current domain.

```js
color.domain() // [-1, 0, 1]
```

## *linear*.range(range) {#linear_range}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *range* is specified, sets the scale’s range to the specified array of values and returns this scale.

```js
const x = d3.scaleLinear().range([0, 960]);
```

The array must contain two or more elements. Unlike the [domain](#linear_domain), elements in the given array need not be numbers; any value that is supported by the underlying [interpolator](#linear_interpolate) will work, though note that numeric ranges are required for [invert](#linear_invert).

If *range* is not specified, returns a copy of the scale’s current range.

```js
x.range() // [0, 960]
```

See [*linear*.interpolate](#linear_interpolate) for more examples.

## *linear*.rangeRound(*range*) {#linear_rangeRound}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Sets the scale’s [*range*](#linear_range) to the specified array of values while also setting the scale’s [interpolator](#linear_interpolate) to [interpolateRound](../d3-interpolate/value.md#interpolateRound); returns this scale.

```js
const x = d3.scaleLinear().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
linear.range(range).interpolate(d3.interpolateRound)
```

The rounding interpolator is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that this interpolator can only be used with numeric ranges.

## *linear*.clamp(*clamp*) {#linear_clamp}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *clamp* is specified, enables or disables clamping accordingly; returns this scale.

```js
const x = d3.scaleLinear([0, 960]).clamp(true);
```

If clamping is disabled and the scale is passed a value outside the [domain](#linear_domain), the scale may return a value outside the [range](#linear_range) through extrapolation. If clamping is enabled, the return value of the scale is always within the scale’s range. Clamping similarly applies to [*linear*.invert](#linear_invert). For example:

```js
const x = d3.scaleLinear([10, 130], [0, 960]); // clamping disabled by default
x(-10); // -160, outside range
x.invert(-160); // -10, outside domain
x.clamp(true); // enable clamping
x(-10); // 0, clamped to range
x.invert(-160); // 10, clamped to domain
```

If *clamp* is not specified, returns whether or not the scale currently clamps values to within the range.

```js
x.clamp() // true, perhaps
```

## *linear*.unknown(*value*) {#linear_unknown}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *value* is specified, sets the output value of the scale for undefined or NaN input values and returns this scale. This is useful for specifying how missing or invalid data is displayed.

```js
const color = d3.scaleLinear([0, 100], ["red", "blue"]).unknown("#ccc");
color(NaN); // "#ccc"
```

If *value* is not specified, returns the current unknown value, which defaults to undefined.

```js
color.unknown() // "#ccc"
```

## *linear*.interpolate(*interpolate*) {#linear_interpolate}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *interpolate* is specified, sets the scale’s [range](#linear_range) interpolator factory.

```js
const color = d3.scaleLinear(["red", "blue"]).interpolate(d3.interpolateHcl);
```

The scale’s interpolator factory is used to create interpolators for each adjacent pair of values from the range; these interpolators then map a normalized domain parameter *t* in [0, 1] to the corresponding value in the range. If *factory* is not specified, returns the scale’s current interpolator factory, which defaults to [d3.interpolate](../d3-interpolate/value.md#interpolate). See [d3-interpolate](../d3-interpolate.md) for more interpolators.

For example, consider a diverging color scale with three colors in the range:

```js
const color = d3.scaleLinear([-100, 0, +100], ["red", "white", "green"]);
```

Two interpolators are created internally by the scale, equivalent to:

```js
const i0 = d3.interpolate("red", "white");
const i1 = d3.interpolate("white", "green");
```

A common reason to specify a custom interpolator is to change the color space of interpolation. For example, to use [HCL](../d3-interpolate/color.md#interpolateHcl):

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateHcl);
```

Or for [Cubehelix](../d3-interpolate/color.md#interpolateCubehelix) with a custom gamma:

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateCubehelix.gamma(3));
```

:::warning CAUTION
The [default interpolator](../d3-interpolate/value.md#interpolate) **may reuse return values**. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place. If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance); however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
:::

## *linear*.ticks(*count*) {#linear_ticks}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/linear.js) · Returns approximately *count* representative values from the scale’s [domain](#linear_domain).

```js
const x = d3.scaleLinear([10, 100], ["red", "blue"]);
x.ticks(); // [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

If *count* is not specified, it defaults to 10. The returned tick values are uniformly spaced, have human-readable values (such as multiples of powers of 10), and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data. The specified *count* is only a hint; the scale may return more or fewer values depending on the domain. See also d3-array’s [ticks](../d3-array/ticks.md).

## *linear*.tickFormat(*count*, *specifier*) {#linear_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · Returns a [number format](../d3-format.md) function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values. The specified *count* should have the same value as the count that is used to generate the [tick values](#linear_ticks).

```js
const x = d3.scaleLinear([0.1, 1], ["red", "blue"]);
const f = x.tickFormat();
f(0.1); // "0.1"
f(1); // "1.0"
```

An optional *specifier* allows a [custom format](../d3-format.md#locale_format) where the precision of the format is automatically set by the scale as appropriate for the tick interval. For example, to format percentage change, you might say:

```js
const x = d3.scaleLinear([-1, 1], [0, 960]);
const T = x.ticks(5); // [-1, -0.5, 0, 0.5, 1]
const f = x.tickFormat(5, "+%");
T.map(f); // ["−100%", "−50%", "+0%", "+50%", "+100%"]
```

If *specifier* uses the format type `s`, the scale will return a [SI-prefix format](../d3-format.md#locale_formatPrefix) based on the largest value in the domain. If the *specifier* already specifies a precision, this method is equivalent to [*locale*.format](../d3-format.md#locale_format).

See also [d3.tickFormat](#tickFormat).

## *linear*.nice(count) {#linear_nice}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/nice.js) · Extends the [domain](#linear_domain) so that it starts and ends on nice round values.

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice();
x.domain(); // [0.2, 1]
```

This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data, say using [extent](../d3-array/summarize.md#extent), and may be irregular. If the domain has more than two values, nicing the domain only affects the first and last value.

An optional tick *count* argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned [ticks](#linear_ticks) will exactly cover the domain.

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice(40);
x.domain(); // [0.24, 0.98]
```

Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using [*linear*.domain](#linear_domain). You must re-nice the scale after setting the new domain, if desired.

## *linear*.copy() {#linear_copy}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Returns an exact copy of this scale.

```js
const x1 = d3.scaleLinear([0, 100], ["red", "blue"]);
const x2 = x1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

## tickFormat(*start*, *stop*, *count*, *specifier*) {#tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · Returns a [number format](../d3-format.md) function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values, as determined by [d3.tickStep](../d3-array/ticks.md#tickStep).

```js
const f = d3.tickFormat(0, 1, 20);
f(1); // "1.00"
```

An optional *specifier* allows a [custom format](../d3-format.md#locale_format) where the precision of the format is automatically set by the scale as appropriate for the tick interval. For example, to format percentage change, you might say:

```js
const f = d3.tickFormat(-1, 1, 5, "+%");
f(-0.5); // "-50%"
```

If *specifier* uses the format type `s`, the scale will return a [SI-prefix format](../d3-format.md#locale_formatPrefix) based on the larger absolute value of *start* and *stop*. If the *specifier* already specifies a precision, this method is equivalent to [*locale*.format](../d3-format.md#locale_format).

## scaleIdentity(*range*) {#scaleIdentity}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/identity.js) · Constructs a new identity scale with the specified [range](#linear_range) (and by extension, [domain](#linear_domain)).

```js
const x = d3.scaleIdentity([0, 960]);
```

Identity scales are a special case of [linear scales](#linear-scales) where the domain and range are identical; the scale and its invert method are thus the identity function. These scales are occasionally useful when working with pixel coordinates, say in conjunction with an axis. Identity scales do not support [rangeRound](#linear_rangeRound), [clamp](#linear_clamp) or [interpolate](#linear_interpolate).

If *range* is not specified, it defaults to [0, 1].

## scaleRadial(*domain*, *range*) {#scaleRadial}

[Examples](https://observablehq.com/@d3/radial-stacked-bar-chart) · [Source](https://github.com/d3/d3-scale/blob/main/src/radial.js) · Constructs a new radial scale with the specified [domain](#linear_domain) and [range](#linear_range).

```js
const r = d3.scaleRadial([100, 200], [0, 480]);
```

Radial scales are a variant of [linear scales](#linear-scales) where the range is internally squared so that an input value corresponds linearly to the squared output value. These scales are useful when you want the input value to correspond to the area of a graphical mark and the mark is specified by radius, as in a radial bar chart. Radial scales do not support [interpolate](#linear_interpolate).

If *domain* or *range* is not specified, each defaults to [0, 1].

# d3-scale: Diverging scales

Diverging scales, like [sequential scales](#sequential-scales), are similar to [continuous scales](#continuous-scales) in that they map a continuous, numeric input domain to a continuous output range. However, unlike continuous scales, the input domain and output range of a diverging scale always has exactly three elements, and the output range is typically specified as an interpolator rather than an array of values. These scales do not expose [invert](#continuous_invert) and [interpolate](#continuous_interpolate) methods.

### d3.scaleDiverging(domain, interpolator)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

Constructs a new diverging scale with the specified [*domain*](#diverging_domain) and [*interpolator*](#diverging_interpolator) function or array. If *domain* is not specified, it defaults to [0, 0.5, 1]. If *interpolator* is not specified, it defaults to the identity function. When the scale is [applied](#_diverging), the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the extreme negative value, 0.5 represents the neutral value, and 1 represents the extreme positive value. For example, using [d3.interpolateSpectral](https://github.com/d3/d3-scale-chromatic/blob/main/README.md#interpolateSpectral):

```js
var spectral = d3.scaleDiverging(d3.interpolateSpectral);
```

If *interpolator* is an array, it represents the scale’s three-element output range and is converted to an interpolator function using [d3.interpolate](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) and [d3.piecewise](https://github.com/d3/d3-interpolate/blob/main/README.md#piecewise).

### diverging(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*](#_continuous).

### diverging.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.domain](#continuous_domain). Note that a diverging scale’s domain must be numeric and must contain exactly three values. The default domain is [0, 0.5, 1].

### diverging.clamp(clamp)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.clamp](#continuous_clamp).

### diverging.interpolator(interpolator)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

If *interpolator* is specified, sets the scale’s interpolator to the specified function. If *interpolator* is not specified, returns the scale’s current interpolator.

### diverging.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.range](#continuous_range). If *range* is specified, the given three-element array is converted to an interpolator function using [d3.interpolate](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) and [d3.piecewise](https://github.com/d3/d3-interpolate/blob/main/README.md#piecewise).

### diverging.rangeRound(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.range](#continuous_rangeRound). If *range* is specified, implicitly uses [d3.interpolateRound](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolateRound) as the interpolator.

### diverging.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.copy](#continuous_copy).

### diverging.unknown()

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

See [*continuous*.unknown](#continuous_unknown).

### d3.scaleDivergingLog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

A [diverging scale](#diverging-scales) with a logarithmic transform, analogous to a [log scale](#log-scales).

### d3.scaleDivergingPow(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

A [diverging scale](#diverging-scales) with an exponential transform, analogous to a [power scale](#pow-scales).

### d3.scaleDivergingSqrt(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

A [diverging scale](#diverging-scales) with a square-root transform, analogous to a [d3.scaleSqrt](#scaleSqrt).

### d3.scaleDivergingSymlog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js), [Examples](https://observablehq.com/@d3/diverging-scales)

A [diverging scale](#diverging-scales) with a symmetric logarithmic transform, analogous to a [symlog scale](#symlog-scales).

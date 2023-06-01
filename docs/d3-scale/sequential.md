# d3-scale: Sequential scales

Sequential scales, like [diverging scales](#diverging-scales), are similar to [continuous scales](#continuous-scales) in that they map a continuous, numeric input domain to a continuous output range. However, unlike continuous scales, the input domain and output range of a sequential scale always has exactly two elements, and the output range is typically specified as an interpolator rather than an array of values. These scales do not expose [invert](#continuous_invert) and [interpolate](#continuous_interpolate) methods.

### d3.scaleSequential(domain, interpolator)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

Constructs a new sequential scale with the specified [*domain*](#sequential_domain) and [*interpolator*](#sequential_interpolator) function or array. If *domain* is not specified, it defaults to [0, 1]. If *interpolator* is not specified, it defaults to the identity function. When the scale is [applied](#_sequential), the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the minimum value and 1 represents the maximum value. For example, to implement the ill-advised [HSL](https://github.com/d3/d3-color/blob/main/README.md#hsl) rainbow scale:

```js
var rainbow = d3.scaleSequential(function(t) {
  return d3.hsl(t * 360, 1, 0.5) + "";
});
```

A more aesthetically-pleasing and perceptually-effective cyclical hue encoding is to use [d3.interpolateRainbow](https://github.com/d3/d3-scale-chromatic/blob/main/README.md#interpolateRainbow):

```js
var rainbow = d3.scaleSequential(d3.interpolateRainbow);
```

If *interpolator* is an array, it represents the scale’s two-element output range and is converted to an interpolator function using [d3.interpolate](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate).

### sequential(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*](#_continuous).

### sequential.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*.domain](#continuous_domain). Note that a sequential scale’s domain must be numeric and must contain exactly two values.

### sequential.clamp(clamp)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*.clamp](#continuous_clamp).

### sequential.interpolator(interpolator)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

If *interpolator* is specified, sets the scale’s interpolator to the specified function. If *interpolator* is not specified, returns the scale’s current interpolator.

### sequential.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*.range](#continuous_range). If *range* is specified, the given two-element array is converted to an interpolator function using [d3.interpolate](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate).

### sequential.rangeRound(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*.rangeRound](#continuous_rangeRound). If *range* is specified, implicitly uses [d3.interpolateRound](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolateRound) as the interpolator.

### sequential.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

See [*continuous*.copy](#continuous_copy).

### d3.scaleSequentialLog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

A [sequential scale](#sequential-scales) with a logarithmic transform, analogous to a [log scale](#log-scales).

### d3.scaleSequentialPow(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

A [sequential scale](#sequential-scales) with an exponential transform, analogous to a [power scale](#pow-scales).

### d3.scaleSequentialSqrt(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

A [sequential scale](#sequential-scales) with a square-root transform, analogous to a [d3.scaleSqrt](#scaleSqrt).

### d3.scaleSequentialSymlog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js), [Examples](https://observablehq.com/@d3/sequential-scales)

A [sequential scale](#sequential-scales) with a symmetric logarithmic transform, analogous to a [symlog scale](#symlog-scales).

### d3.scaleSequentialQuantile(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js), [Examples](https://observablehq.com/@d3/sequential-scales)

A [sequential scale](#sequential-scales) using a *p*-quantile transform, analogous to a [quantile scale](#quantile-scales).

### sequentialQuantile.quantiles(n)

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js), [Examples](https://observablehq.com/@d3/sequential-scales)

Returns an array of *n* + 1 quantiles. For example, if *n* = 4, returns an array of five numbers: the minimum value, the first quartile, the median, the third quartile, and the maximum.

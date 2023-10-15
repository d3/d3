# Sequential scales

Sequential scales are similar to [linear scales](./linear.md) in that they map a continuous, numeric input domain to a continuous output range. Unlike linear scales, the input domain and output range of a sequential scale always have exactly two elements, and the output range is typically specified as an interpolator rather than an array of values. Sequential scales are typically used for a color encoding; see also [d3-scale-chromatic](../d3-scale-chromatic.md). These scales do not expose [invert](./linear.md#linear_invert) and [interpolate](./linear.md#linear_interpolate) methods. There are also [log](#scaleSequentialLog), [pow](#scaleSequentialPow), [symlog](#scaleSequentialSymlog), and [quantile](#scaleSequentialQuantile) variants of sequential scales.

## scaleSequential(*domain*, *interpolator*) {#scaleSequential}

[Examples](https://observablehq.com/@d3/sequential-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js) · Constructs a new sequential scale with the specified *domain* and [*interpolator*](#sequential_interpolator) function or array.

```js
const color = d3.scaleSequential([0, 100], d3.interpolateBlues);
```

If *domain* is not specified, it defaults to [0, 1].

```js
const color = d3.scaleSequential(d3.interpolateBlues);
```

If *interpolator* is not specified, it defaults to the identity function.

```js
const identity = d3.scaleSequential();
```

When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the minimum value and 1 represents the maximum value. For example, to implement the ill-advised angry rainbow scale (please use [interpolateRainbow](../d3-scale-chromatic/cyclical.md#interpolateRainbow) instead):

```js
const rainbow = d3.scaleSequential((t) => d3.hsl(t * 360, 1, 0.5) + "");
```

If *interpolator* is an array, it represents the scale’s two-element output range and is converted to an interpolator function using [interpolate](../d3-interpolate/value.md#interpolate).

```js
const color = d3.scaleSequential(["red", "blue"]);
```

A sequential scale’s domain must be numeric and must contain exactly two values.

## *sequential*.interpolator(*interpolator*) {#sequential_interpolator}

If *interpolator* is specified, sets the scale’s interpolator to the specified function.

```js
const color = d3.scaleSequential().interpolator(d3.interpolateBlues);
```

If *interpolator* is not specified, returns the scale’s current interpolator.

```js
color.interpolator() // d3.interpolateBlues
```

## *sequential*.range(*range*) {#sequential_range}

See [*linear*.range](./linear.md#linear_range). If *range* is specified, the given two-element array is converted to an interpolator function using [interpolate](../d3-interpolate/value.md#interpolate).

```js
const color = d3.scaleSequential().range(["red", "blue"]);
```

The above is equivalent to:

```js
const color = d3.scaleSequential(d3.interpolate("red", "blue"));
```

## *sequential*.rangeRound(*range*) {#sequential_rangeRound}

See [*linear*.rangeRound](./linear.md#linear_rangeRound). If *range* is specified, implicitly uses [interpolateRound](../d3-interpolate/value.md#interpolateRound) as the interpolator.

## scaleSequentialLog(*domain*, *range*) {#scaleSequentialLog}

Returns a new sequential scale with a logarithmic transform, analogous to a [log scale](./log.md).

## scaleSequentialPow(*domain*, *range*) {#scaleSequentialPow}

Returns a new sequential scale with an exponential transform, analogous to a [power scale](./pow.md).

## scaleSequentialSqrt(*domain*, *range*) {#scaleSequentialSqrt}

Returns a new sequential scale with a square-root transform, analogous to a [sqrt scale](./pow.md#scaleSqrt).

## scaleSequentialSymlog(*domain*, *range*) {#scaleSequentialSymlog}

Returns a new sequential scale with a symmetric logarithmic transform, analogous to a [symlog scale](./symlog.md).

## scaleSequentialQuantile(*domain*, *range*) {#scaleSequentialQuantile}

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js) · Returns a new sequential scale with a *p*-quantile transform, analogous to a [quantile scale](./quantile.md).

## *sequentialQuantile*.quantiles(*n*) {#sequentialQuantile_quantiles}

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js) · Returns an array of *n* + 1 quantiles.

```js
const color = d3.scaleSequentialQuantile()
    .domain(penguins.map((d) => d.body_mass_g))
    .interpolator(d3.interpolateBlues);

color.quantiles(4); // [2700, 3550, 4050, 4750, 6300]
```

For example, if *n* = 4, returns an array of five numbers: the minimum value, the first quartile, the median, the third quartile, and the maximum.

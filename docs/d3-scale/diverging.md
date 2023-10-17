# Diverging scales

Diverging scales are similar to [linear scales](./linear.md) in that they map a continuous, numeric input domain to a continuous output range. Unlike linear scales, the input domain and output range of a diverging scale always have exactly three elements, and the output range is typically specified as an interpolator rather than an array of values. Diverging scales are typically used for a color encoding; see also [d3-scale-chromatic](../d3-scale-chromatic.md). These scales do not expose [invert](./linear.md#linear_invert) and [interpolate](./linear.md#linear_interpolate) methods. There are also [log](#scaleDivergingLog), [pow](#scaleDivergingPow), and [symlog](#scaleDivergingSymlog) variants of diverging scales.

## scaleDiverging(*domain*, *interpolator*) {#scaleDiverging}

[Examples](https://observablehq.com/@d3/diverging-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js) · Constructs a new diverging scale with the specified [*domain*](./linear.md#linear_domain) and [*interpolator*](#diverging_interpolator) function or array.

```js
const color = d3.scaleDiverging([-1, 0, 1], d3.interpolateRdBu);
```

If *domain* is not specified, it defaults to [0, 0.5, 1].

```js
const color = d3.scaleDiverging(d3.interpolateRdBu);
```

If *interpolator* is not specified, it defaults to the identity function.

```js
const identity = d3.scaleDiverging();
```

When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the extreme negative value, 0.5 represents the neutral value, and 1 represents the extreme positive value.

If *interpolator* is an array, it represents the scale’s three-element output range and is converted to an interpolator function using [d3.interpolate](../d3-interpolate/value.md#interpolate) and [d3.piecewise](../d3-interpolate/value.md#piecewise).

```js
const color = d3.scaleDiverging(["blue", "white", "red"]);
```

A diverging scale’s domain must be numeric and must contain exactly three values.

## *diverging*.interpolator(*interpolator*) {#diverging_interpolator}

If *interpolator* is specified, sets the scale’s interpolator to the specified function.

```js
const color = d3.scaleDiverging().interpolator(d3.interpolateRdBu);
```

If *interpolator* is not specified, returns the scale’s current interpolator.

```js
color.interpolator() // d3.interpolateRdBu
```

## *diverging*.range(*range*) {#diverging_range}

See [*linear*.range](./linear.md#linear_range). If *range* is specified, the given three-element array is converted to an interpolator function using [piecewise](../d3-interpolate/value.md#piecewise).

```js
const color = d3.scaleDiverging().range(["blue", "white", "red"]);
```

The above is equivalent to:

```js
const color = d3.scaleDiverging(d3.piecewise(["blue", "white", "red"]));
```

## *diverging*.rangeRound(*range*) {#diverging_rangeRound}

See [*linear*.range](./linear.md#linear_rangeRound). If *range* is specified, implicitly uses [interpolateRound](../d3-interpolate/value.md#interpolateRound) as the interpolator.

## scaleDivergingLog(*domain*, *range*) {#scaleDivergingLog}

Returns a new diverging scale with a logarithmic transform, analogous to a [log scale](./log.md).

## scaleDivergingPow(*domain*, *range*) {#scaleDivergingPow}

Returns a new diverging scale with an exponential transform, analogous to a [power scale](./pow.md).

## scaleDivergingSqrt(*domain*, *range*) {#scaleDivergingSqrt}

Returns a new diverging scale with a square-root transform, analogous to a [sqrt scale](./pow.md#scaleSqrt).

## scaleDivergingSymlog(*domain*, *range*) {#scaleDivergingSymlog}

Returns a new diverging scale with a symmetric logarithmic transform, analogous to a [symlog scale](./symlog.md).

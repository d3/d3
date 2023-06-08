# Quantile scales

Quantile scales map a sampled input domain to a discrete range. The domain is considered continuous and thus the scale will accept any reasonable input value; however, the domain is specified as a discrete set of sample values. The number of values in (the cardinality of) the output range determines the number of quantiles that will be computed from the domain. To compute the quantiles, the domain is sorted, and treated as a [population of discrete values](https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population); see [quantile](../d3-array/summarize.md#quantile). See [this quantile choropleth](https://observablehq.com/@d3/quantile-choropleth) for an example.

## scaleQuantile(*domain*, *range*) {#scaleQuantile}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Constructs a new quantile scale with the specified [*domain*](#quantile_domain) and [*range*](#quantile_range).

```js
const color = d3.scaleQuantile(penguins.map((d) => d.body_mass_g), d3.schemeBlues[5]);
```

If either *domain* or *range* is not specified, each defaults to the empty array. The quantile scale is invalid until both a domain and range are specified.

## *quantile*(*value*) {#_quantile}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Given a *value* in the input [domain](#quantile_domain), returns the corresponding value in the output [range](#quantile_range).

```js
color(3000); // "#eff3ff"
color(4000); // "#6baed6"
color(5000); // "#08519c"
```

## *quantile*.invertExtent(*value*) {#quantile_invertExtent}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns the extent of values in the [domain](#quantile_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantile_range): the inverse of [*quantile*](#_quantile).

```js
color.invertExtent("#eff3ff"); // [2700, 3475]
color.invertExtent("#6baed6"); // [3800, 4300]
color.invertExtent("#08519c"); // [4950, 6300]
```

This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

## *quantile*.domain(*domain*) {#quantile_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · If *domain* is specified, sets the domain of the quantile scale to the specified set of discrete numeric values and returns this scale.

```js
const color = d3.scaleQuantile(d3.schemeBlues[5]);
color.domain(penguins.map((d) => d.body_mass_g));
```

The array must not be empty, and must contain at least one numeric value; NaN, null and undefined values are ignored and not considered part of the sample population. If the elements in the given array are not numbers, they will be coerced to numbers. A copy of the input array is sorted and stored internally.

If *domain* is not specified, returns the scale’s current domain (the set of observed values).

```js
color.domain() // [2700, 2850, 2850, 2900, 2900, 2900, 2900, …]
```

## *quantile*.range(*range*) {#quantile_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · If *range* is specified, sets the discrete values in the range.

```js
const color = d3.scaleQuantile();
color.range(d3.schemeBlues[5]);
```

The array must not be empty, and may contain any type of value. The number of values in (the cardinality, or length, of) the *range* array determines the number of quantiles that are computed. For example, to compute quartiles, *range* must be an array of four elements such as [0, 1, 2, 3].

If *range* is not specified, returns the current range.

```js
color.range() // ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]
```

## *quantile*.quantiles() {#quantile_quantiles}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns the quantile thresholds.

```js
color.quantiles() // [3475, 3800, 4300, 4950]
```

If the [range](#quantile_range) contains *n* discrete values, the returned array will contain *n* - 1 thresholds. Values less than the first threshold are considered in the first quantile; values greater than or equal to the first threshold but less than the second threshold are in the second quantile, and so on. Internally, the thresholds array is used with [bisect](../d3-array/bisect.md) to find the output quantile associated with the given input value.

## *quantile*.copy() {#quantile_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleQuantile(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

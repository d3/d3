# Threshold scales

Threshold scales are similar to [quantize scales](./quantize.md), except they allow you to map arbitrary subsets of the domain to discrete values in the range. The input domain is still continuous, and divided into slices based on a set of threshold values. See [this choropleth](https://observablehq.com/@d3/threshold-choropleth) for an example.

## scaleThreshold(*domain*, *range*) {#scaleThreshold}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Constructs a new threshold scale with the specified [*domain*](#threshold_domain) and [*range*](#threshold_range).

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "blue"]);
```

If *domain* is not specified, it defaults to [0.5].

```js
const color = d3.scaleThreshold(["red", "blue"]);
color(0); // "red"
color(1); // "blue"
```

If *range* is not specified, it defaults to [0, 1].

## *threshold*(*value*) {#_threshold}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Given a *value* in the input [domain](#threshold_domain), returns the corresponding value in the output [range](#threshold_range). For example:

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "green"]);
color(-1); // "red"
color(0); // "white"
color(0.5); // "white"
color(1); // "green"
color(1000); // "green"
```

## *threshold*.invertExtent(*value*) {#threshold_invertExtent}

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Returns the extent of values in the [domain](#threshold_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#threshold_range), representing the inverse mapping from range to domain.

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "green"]);
color.invertExtent("red"); // [undefined, 0]
color.invertExtent("white"); // [0, 1]
color.invertExtent("green"); // [1, undefined]
```

This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse. The extent below the lowest threshold is undefined (unbounded), as is the extent above the highest threshold.

## *threshold*.domain(*domain*) {#threshold_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · If *domain* is specified, sets the scale’s domain to the specified array of values.

```js
const color = d3.scaleThreshold(["red", "white", "green"]).domain([0, 1]);
```

The values must be in ascending order or the behavior of the scale is undefined. The values are typically numbers, but any naturally ordered values (such as strings) will work; a threshold scale can be used to encode any type that is ordered. If the number of values in the scale’s range is *n* + 1, the number of values in the scale’s domain must be *n*. If there are fewer than *n* elements in the domain, the additional values in the range are ignored. If there are more than *n* elements in the domain, the scale may return undefined for some inputs.

If *domain* is not specified, returns the scale’s current domain.

```js
color.domain() // [0, 1]
```

## *threshold*.range(*range*) {#threshold_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · If *range* is specified, sets the scale’s range to the specified array of values.

```js
const color = d3.scaleThreshold().range(["red", "white", "green"]);
```

If the number of values in the scale’s domain is *n*, the number of values in the scale’s range must be *n* + 1. If there are fewer than *n* + 1 elements in the range, the scale may return undefined for some inputs. If there are more than *n* + 1 elements in the range, the additional values are ignored. The elements in the given array need not be numbers; any value or type will work.

If *range* is not specified, returns the scale’s current range.

```js
color.range() // ["red", "white", "green"]
```

## *threshold*.copy() {#threshold_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleThreshold(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

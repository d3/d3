# Quantize scales

Quantize scales are similar to [linear scales](./linear.md), except they use a discrete rather than continuous range. The continuous input domain is divided into uniform segments based on the number of values in (*i.e.*, the cardinality of) the output range. Each range value *y* can be expressed as a quantized linear function of the domain value *x*: *y* = *m round(x)* + *b*. See [the quantized choropleth](https://observablehq.com/@d3/choropleth/2) for an example.

## scaleQuantize(*domain*, *range*) {#scaleQuantize}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Constructs a new quantize scale with the specified [*domain*](#quantize_domain) and [*range*](#quantize_range).

```js
const color = d3.scaleQuantize([0, 100], d3.schemeBlues[9]);
```

If either *domain* or *range* is not specified, each defaults to [0, 1].

```js
const color = d3.scaleQuantize(d3.schemeBlues[9]);
```

## *quantize*(*value*) {#_quantize}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Given a *value* in the input [domain](#quantize_domain), returns the corresponding value in the output [range](#quantize_range). For example, to apply a color encoding:

```js
const color = d3.scaleQuantize([0, 1], ["brown", "steelblue"]);
color(0.49); // "brown"
color(0.51); // "steelblue"
```

Or dividing the domain into three equally-sized parts with different range values to compute an appropriate stroke width:

```js
const width = d3.scaleQuantize([10, 100], [1, 2, 4]);
width(20); // 1
width(50); // 2
width(80); // 4
```

## *quantize*.invertExtent(*value*) {#quantize_invertExtent}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns the extent of values in the [domain](#quantize_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantize_range): the inverse of [*quantize*](#_quantize). This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

```js
const width = d3.scaleQuantize([10, 100], [1, 2, 4]);
width.invertExtent(2); // [40, 70]
```

## *quantize*.domain(*domain*) {#quantize_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · If *domain* is specified, sets the scale’s domain to the specified two-element array of numbers.

```js
const color = d3.scaleQuantize(d3.schemeBlues[9]);
color.domain([0, 100]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. The numbers must be in ascending order or the behavior of the scale is undefined.

If *domain* is not specified, returns the scale’s current domain.

```js
color.domain() // [0, 100]
```

## *quantize*.range(*range*) {#quantize_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · If *range* is specified, sets the scale’s range to the specified array of values.

```js
const color = d3.scaleQuantize();
color.range(d3.schemeBlues[5]);
```

The array may contain any number of discrete values. The elements in the given array need not be numbers; any value or type will work.

If *range* is not specified, returns the scale’s current range.

```js
color.range() // ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]
```

## *quantize*.thresholds() {#quantize_thresholds}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns the array of computed thresholds within the [domain](#quantize_domain).

```js
color.thresholds() // [0.2, 0.4, 0.6, 0.8]
```

The number of returned thresholds is one less than the length of the [range](#quantize_range): values less than the first threshold are assigned the first element in the range, whereas values greater than or equal to the last threshold are assigned the last element in the range.

## *quantize*.copy() {#quantize_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleQuantize(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

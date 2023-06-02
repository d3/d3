# Band scales

Band scales are like [ordinal scales](./ordinal.md) except the output range is continuous and numeric. The scale divides the continuous range into uniform bands. Band scales are typically used for bar charts with an ordinal or categorical dimension. See Observable Plot’s [discrete scales](https://observablehq.com/plot/features/scales#discrete-scales) for an interactive demo.

## d3.scaleBand(domain, range) {#scaleBand}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Constructs a new band scale with the specified [*domain*](#band_domain) and [*range*](#band_range), no [padding](#band_padding), no [rounding](#band_round) and center [alignment](#band_align).

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
```

If a single argument is specified, it is interpreted as the *range*. If *domain* is not specified, it defaults to the empty domain. If *range* is not specified, it defaults to the unit range [0, 1].

## *band*(*value*) {#_band}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Given a *value* in the input [domain](#band_domain), returns the start of the corresponding band derived from the output [range](#band_range).

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
x("a"); // 0
x("b"); // 320
x("c"); // 640
x("d"); // undefined
```

If the given *value* is not in the scale’s domain, returns undefined.

## *band*.domain(domain) {#band_domain}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *domain* is specified, sets the domain to the specified array of values and returns this scale.

```js
const x = d3.scaleBand([0, 960]).domain(["a", "b", "c"]);
```

The first element in *domain* will be mapped to the first band, the second domain value to the second band, and so on. Domain values are stored internally in an [InternMap](https://github.com/mbostock/internmap) from primitive value to index; the resulting index is then used to determine the band. Thus, a band scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding band. If *domain* is not specified, this method returns the current domain.

## *band*.range(range) {#band_range}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *range* is specified, sets the scale’s range to the specified two-element array of numbers and returns this scale.

```js
const x = d3.scaleBand().range([0, 960]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. If *range* is not specified, returns the scale’s current range, which defaults to [0, 1].

## *band*.rangeRound(range) {#band_rangeRound}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Sets the scale’s [*range*](#band_range) to the specified two-element array of numbers while also enabling [rounding](#band_round); returns this scale.

```js
const x = d3.scaleBand().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
band.range(range).round(true)
```

Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles.

## *band*.round(round) {#band_round}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *round* is specified, enables or disables rounding accordingly and returns this scale.

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).round(true);
```

If *round* is not specified, returns whether rounding is enabled.

```js
x.round() // true
```

If rounding is enabled, the start and stop of each band will be integers. Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding! Use [*band*.align](#band_align) to specify how the leftover space is distributed.

## *band*.paddingInner(padding) {#band_paddingInner}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the inner padding to the specified number which must be less than or equal to 1 and returns this scale.

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).paddingInner(0.1);
```

If *padding* is not specified, returns the current inner padding which defaults to 0.

```js
x.paddingInner() // 0.1
```

The inner padding specifies the proportion of the range that is reserved for blank space between bands; a value of 0 means no blank space between bands, and a value of 1 means a [bandwidth](#band_bandwidth) of zero.

## *band*.paddingOuter(padding) {#band_paddingOuter}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the outer padding to the specified number which is typically in the range [0, 1] and returns this scale.

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).paddingOuter(0.1);
```

If *padding* is not specified, returns the current outer padding which defaults to 0.

```js
x.paddingOuter() // 0.1
```

The outer padding specifies the amount of blank space, in terms of multiples of the [step](#band_step), to reserve before the first band and after the last band.

## *band*.padding(padding) {#band_padding}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · A convenience method for setting the [inner](#band_paddingInner) and [outer](#band_paddingOuter) padding to the same *padding* value.

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).padding(0.1);
```

If *padding* is not specified, returns the inner padding.

```js
x.padding() // 0.1
```

## *band*.align(align) {#band_align}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *align* is specified, sets the alignment to the specified value which must be in the range [0, 1], and returns this scale.

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).align(0);
```

If *align* is not specified, returns the current alignment which defaults to 0.5.

```js
x.align() // 0
```

The alignment specifies how outer padding is distributed in the range. A value of 0.5 indicates that the outer padding should be equally distributed before the first band and after the last band; *i.e.*, the bands should be centered within the range. A value of 0 or 1 may be used to shift the bands to one side, say to position them adjacent to an axis. For more, [see this explainer](https://observablehq.com/@d3/band-align).

## *band*.bandwidth() {#band_bandwidth}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the width of each band.

```js
x.bandwidth() // 320, perhaps
```

## *band*.step() {#band_step}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the distance between the starts of adjacent bands.

```js
x.step() // 320, perhaps
```

## *band*.copy() {#band_copy}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns an exact copy of this scale.

```js
const x1 = d3.scaleBand(["a", "b", "c"], [0, 960]);
const x2 = x1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

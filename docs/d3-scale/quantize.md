# d3-scale: Quantize scales

Quantize scales are similar to [linear scales](#linear-scales), except they use a discrete rather than continuous range. The continuous input domain is divided into uniform segments based on the number of values in (*i.e.*, the cardinality of) the output range. Each range value *y* can be expressed as a quantized linear function of the domain value *x*: *y* = *m round(x)* + *b*. See [this choropleth](https://observablehq.com/@d3/choropleth) for an example.

### d3.scaleQuantize(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Constructs a new quantize scale with the specified [*domain*](#quantize_domain) and [*range*](#quantize_range). If either *domain* or *range* is not specified, each defaults to [0, 1]. Thus, the default quantize scale is equivalent to the [Math.round](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round) function.

### quantize(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Given a *value* in the input [domain](#quantize_domain), returns the corresponding value in the output [range](#quantize_range). For example, to apply a color encoding:

```js
var color = d3.scaleQuantize()
    .domain([0, 1])
    .range(["brown", "steelblue"]);

color(0.49); // "brown"
color(0.51); // "steelblue"
```

Or dividing the domain into three equally-sized parts with different range values to compute an appropriate stroke width:

```js
var width = d3.scaleQuantize()
    .domain([10, 100])
    .range([1, 2, 4]);

width(20); // 1
width(50); // 2
width(80); // 4
```

### quantize.invertExtent(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns the extent of values in the [domain](#quantize_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantize_range): the inverse of [*quantize*](#_quantize). This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

```js
var width = d3.scaleQuantize()
    .domain([10, 100])
    .range([1, 2, 4]);

width.invertExtent(2); // [40, 70]
```

### quantize.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *domain* is specified, sets the scale’s domain to the specified two-element array of numbers. If the elements in the given array are not numbers, they will be coerced to numbers. The numbers must be in ascending order or the behavior of the scale is undefined. If *domain* is not specified, returns the scale’s current domain.

### quantize.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *range* is specified, sets the scale’s range to the specified array of values. The array may contain any number of discrete values. The elements in the given array need not be numbers; any value or type will work. If *range* is not specified, returns the scale’s current range.

### quantize.ticks(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/scale-ticks)

Equivalent to [*continuous*.ticks](#continuous_ticks).

### quantize.tickFormat(count, specifier)

[Source](https://github.com/d3/d3-scale/blob/main/src/linear.js), [Examples](https://observablehq.com/@d3/scale-ticks)

Equivalent to [*continuous*.tickFormat](#continuous_tickFormat).

### quantize.nice()

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Equivalent to [*continuous*.nice](#continuous_nice).

### quantize.thresholds()

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns the array of computed thresholds within the [domain](#quantize_domain).

### quantize.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.

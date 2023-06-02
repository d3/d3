# Quantile scales

Quantile scales map a sampled input domain to a discrete range. The domain is considered continuous and thus the scale will accept any reasonable input value; however, the domain is specified as a discrete set of sample values. The number of values in (the cardinality of) the output range determines the number of quantiles that will be computed from the domain. To compute the quantiles, the domain is sorted, and treated as a [population of discrete values](https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population); see d3-array’s [quantile](https://github.com/d3/d3-array/blob/main/README.md#quantile). See [this quantile choropleth](https://observablehq.com/@d3/quantile-choropleth) for an example.

### d3.scaleQuantile(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Constructs a new quantile scale with the specified [*domain*](#quantile_domain) and [*range*](#quantile_range). If either *domain* or *range* is not specified, each defaults to the empty array. The quantile scale is invalid until both a domain and range are specified.

### quantile(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Given a *value* in the input [domain](#quantile_domain), returns the corresponding value in the output [range](#quantile_range).

### quantile.invertExtent(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns the extent of values in the [domain](#quantile_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantile_range): the inverse of [*quantile*](#_quantile). This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

### quantile.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *domain* is specified, sets the domain of the quantile scale to the specified set of discrete numeric values. The array must not be empty, and must contain at least one numeric value; NaN, null and undefined values are ignored and not considered part of the sample population. If the elements in the given array are not numbers, they will be coerced to numbers. A copy of the input array is sorted and stored internally. If *domain* is not specified, returns the scale’s current domain.

### quantile.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *range* is specified, sets the discrete values in the range. The array must not be empty, and may contain any type of value. The number of values in (the cardinality, or length, of) the *range* array determines the number of quantiles that are computed. For example, to compute quartiles, *range* must be an array of four elements such as [0, 1, 2, 3]. If *range* is not specified, returns the current range.

### quantile.quantiles()

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns the quantile thresholds. If the [range](#quantile_range) contains *n* discrete values, the returned array will contain *n* - 1 thresholds. Values less than the first threshold are considered in the first quantile; values greater than or equal to the first threshold but less than the second threshold are in the second quantile, and so on. Internally, the thresholds array is used with [bisect](https://github.com/d3/d3-array/blob/main/README.md#bisect) to find the output quantile associated with the given input value.

### quantile.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.

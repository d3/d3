# Threshold scales

Threshold scales are similar to [quantize scales](#quantize-scales), except they allow you to map arbitrary subsets of the domain to discrete values in the range. The input domain is still continuous, and divided into slices based on a set of threshold values. See [this choropleth](https://observablehq.com/@d3/threshold-choropleth) for an example.

### d3.scaleThreshold(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Constructs a new threshold scale with the specified [*domain*](#threshold_domain) and [*range*](#threshold_range). If *domain* is not specified, it defaults to [0.5]. If *range* is not specified, it defaults to [0, 1]. Thus, the default threshold scale is equivalent to the [Math.round](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round) function for numbers; for example threshold(0.49) returns 0, and threshold(0.51) returns 1.

### threshold(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Given a *value* in the input [domain](#threshold_domain), returns the corresponding value in the output [range](#threshold_range). For example:

```js
var color = d3.scaleThreshold()
    .domain([0, 1])
    .range(["red", "white", "green"]);

color(-1);   // "red"
color(0);    // "white"
color(0.5);  // "white"
color(1);    // "green"
color(1000); // "green"
```

### threshold.invertExtent(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/choropleth)

Returns the extent of values in the [domain](#threshold_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#threshold_range), representing the inverse mapping from range to domain. This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse. For example:

```js
var color = d3.scaleThreshold()
    .domain([0, 1])
    .range(["red", "white", "green"]);

color.invertExtent("red"); // [undefined, 0]
color.invertExtent("white"); // [0, 1]
color.invertExtent("green"); // [1, undefined]
```

### threshold.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *domain* is specified, sets the scale’s domain to the specified array of values. The values must be in ascending order or the behavior of the scale is undefined. The values are typically numbers, but any naturally ordered values (such as strings) will work; a threshold scale can be used to encode any type that is ordered. If the number of values in the scale’s range is N+1, the number of values in the scale’s domain must be N. If there are fewer than N elements in the domain, the additional values in the range are ignored. If there are more than N elements in the domain, the scale may return undefined for some inputs. If *domain* is not specified, returns the scale’s current domain.

### threshold.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

If *range* is specified, sets the scale’s range to the specified array of values. If the number of values in the scale’s domain is N, the number of values in the scale’s range must be N+1. If there are fewer than N+1 elements in the range, the scale may return undefined for some inputs. If there are more than N+1 elements in the range, the additional values are ignored. The elements in the given array need not be numbers; any value or type will work. If *range* is not specified, returns the scale’s current range.

### threshold.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js), [Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales)

Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.

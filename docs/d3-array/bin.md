# Binning data

Bin quantitative values into consecutive, non-overlapping intervals, as in histograms. (See also Observable Plot’s [bin transform](https://observablehq.com/plot/transforms/bin).)

## bin() {#bin}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

[Examples](https://observablehq.com/@d3/d3-bin) · [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) · Constructs a new bin generator with the default settings. The returned bin generator supports method chaining, so this constructor is typically chained with [*bin*.value](#bin_value) to assign a value accessor. The returned generator is also a function; [pass it data](#_bin) to bin.

## *bin*(*data*) {#_bin}

```js
const bins = d3.bin().value((d) => d.culmen_length_mm)(penguins);
```

Bins the given iterable of *data* samples. Returns an array of bins, where each bin is an array containing the associated elements from the input *data*. Thus, the `length` of the bin is the number of elements in that bin. Each bin has two additional attributes:

* `x0` - the lower bound of the bin (inclusive).
* `x1` - the upper bound of the bin (exclusive, except for the last bin).

Any null or non-comparable values in the given *data*, or those outside the [domain](#bin_domain), are ignored.

## *bin*.value(*value*) {#bin_value}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

If *value* is specified, sets the value accessor to the specified function or constant and returns this bin generator.

```js
bin.value() // (d) => d.culmen_length_mm
```

If *value* is not specified, returns the current value accessor, which defaults to the identity function.

When bins are [generated](#_bin), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default value accessor assumes that the input data are orderable (comparable), such as numbers or dates. If your data are not, then you should specify an accessor that returns the corresponding orderable value for a given datum.

This is similar to mapping your data to values before invoking the bin generator, but has the benefit that the input data remains associated with the returned bins, thereby making it easier to access other fields of the data.

## *bin*.domain(*domain*) {#bin_domain}

```js
const bin = d3.bin().domain([0, 1]);
```

If *domain* is specified, sets the domain accessor to the specified function or array and returns this bin generator.

```js
bin.domain() // [0, 1]
```

If *domain* is not specified, returns the current domain accessor, which defaults to [extent](./summarize.md#extent). The bin domain is defined as an array [*min*, *max*], where *min* is the minimum observable value and *max* is the maximum observable value; both values are inclusive. Any value outside of this domain will be ignored when the bins are [generated](#_bin).

For example, to use a bin generator with a [linear scale](../d3-scale/linear.md) `x`, you might say:

```js
const bin = d3.bin().domain(x.domain()).thresholds(x.ticks(20));
```

You can then compute the bins from an array of numbers like so:

```js
const bins = bin(numbers);
```

If the default [extent](./summarize.md#extent) domain is used and the [thresholds](#bin_thresholds) are specified as a count (rather than explicit values), then the computed domain will be [niced](./ticks.md#nice) such that all bins are uniform width.

Note that the domain accessor is invoked on the materialized array of [values](#bin_value), not on the input data array.

## *bin*.thresholds(*count*) {#bin_thresholds}

```js
const bin = d3.bin().thresholds([0, 0.5, 1]);
```

If *thresholds* is specified, sets the [threshold generator](#bin_thresholds) to the specified function or array and returns this bin generator.

```js
bin.thresholds() // () => [0, 0.5, 1]
```

If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](#thresholdSturges). (Thus by default, the values to be binned must be numbers!) Thresholds are defined as an array of values [*x0*, *x1*, …]. Any value less than *x0* will be placed in the first bin; any value greater than or equal to *x0* but less than *x1* will be placed in the second bin; and so on. Thus, the [generated bins](#_bin) will have *thresholds*.length + 1 bins.

Any threshold values outside the [domain](#bin_domain) are ignored. The first *bin*.x0 is always equal to the minimum domain value, and the last *bin*.x1 is always equal to the maximum domain value.

```js
const bin = d3.bin().thresholds(20);
```

If a *count* is specified instead of an array of *thresholds*, then the [domain](#bin_domain) will be uniformly divided into approximately *count* bins; see [ticks](./ticks.md).

```js
const bin = d3.bin().thresholds((values) => [d3.median(values)]);
```

You may also implement your own threshold generator taking three arguments: the array of input [*values*](#bin_value) derived from the data, and the [domain](#bin_domain) represented as *min* and *max*. The generator may then return either the array of numeric thresholds or the *count* of bins; in the latter case the domain is divided uniformly into approximately *count* bins; see [ticks](./ticks.md#ticks). For instance, you might want to use time ticks when binning time-series data; see [example](https://observablehq.com/@d3/d3-bin-time-thresholds).

## thresholdFreedmanDiaconis(*values*, *min*, *max*) {#thresholdFreedmanDiaconis}

```js
const bin = d3.bin().thresholds(d3.thresholdFreedmanDiaconis);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/freedmanDiaconis.js) · Returns the number of bins according to the [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdScott(*values*, *min*, *max*) {#thresholdScott}

```js
const bin = d3.bin().thresholds(d3.thresholdScott);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/scott.js) · Returns the number of bins according to [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdSturges(*values*, *min*, *max*) {#thresholdSturges}

```js
const bin = d3.bin().thresholds(d3.thresholdSturges);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/sturges.js) · Returns the number of bins according to [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

# d3-array: Summarizing {#top}

These methods compute basic summary statistics.

## min(iterable, accessor) {#min}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/min.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-extent) -->

Returns the minimum value in the given *iterable* using natural order.

```js
d3.min([3, 2, 1, 1, 6, 2, 4]) // 1
```

Unlike [Math.min](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/min), d3.min does not coerce the inputs to numbers; for example, the minimum of the strings `["20", "3"]` is `"20"`, while the minimum of the numbers `[20, 3]` is `3`.

```js
d3.min(["bob", "alice", "carol"]) // "alice"
```
```js
d3.min([new Date("2018-01-01"), new Date("2011-03-09")]) // 2011-03-09
```

Also unlike Math.min, this method ignores undefined, null and NaN values, which is useful for ignoring missing data.

```js
d3.min([3, 2, 1, NaN, 4]) // 1
```

An optional *accessor* function may be specified, which is similar to calling [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) before computing the minimum value. The accessor function is repeatedly passed an element from the given iterable (often *d*) and the zero-based index (*i*).

```js
d3.min(alphabet, (d) => d.frequency) // 0.00074
```

Because undefined values are ignored, you can use the accessor function to ignore values. For example, to get the frequency of the least-common letter than is not Z:

```js
d3.min(alphabet, (d) => d.letter === "Z" ? NaN : d.frequency) // 0.00095
```

If the iterable contains no comparable values, returns undefined.

```js
d3.min([]) // undefined
```
```js
d3.min(alphabet, (d) => d.doesnotexist) // undefined
```

See also [extent](#extent) and [least](#least).

## minIndex(iterable, accessor) {#minIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/minIndex.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-extent) -->

Like [min](#min), but returns the index of the minimum value rather than the value itself.

```js
d3.minIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```
```js
d3.minIndex(alphabet, (d) => d.frequency) // 25
```

This method can find the least element according to the given accessor, similar to [least](#least):

```js
alphabet[d3.minIndex(alphabet, (d) => d.frequency)] // {letter: "Z", frequency: 0.00074}
```

See also [leastIndex](#leastIndex).

## max(iterable, accessor) {#max}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/max.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-extent) -->

Returns the maximum value in the given *iterable* using natural order.

```js
d3.max([3, 2, 1, 1, 6, 2, 4]) // 6
```

Unlike [Math.max](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/max), d3.max does not coerce the inputs to numbers; for example, the maximum of the strings `["20", "3"]` is `"3"`, while the maximum of the numbers `[20, 3]` is `20`.

```js
d3.max(["bob", "alice", "carol"]) // "carol"
```
```js
d3.max([new Date("2018-01-01"), new Date("2011-03-09")]) // 2018-01-01
```

Also unlike Math.max, this method ignores undefined, null and NaN values, which is useful for ignoring missing data.

```js
d3.max([3, 2, 1, NaN, 4]) // 4
```

An optional *accessor* function may be specified, which is similar to calling [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) before computing the maximum value. The accessor function is repeatedly passed an element from the given iterable (often *d*) and the zero-based index (*i*).

```js
d3.max(alphabet, (d) => d.frequency) // 0.12702
```

Because undefined values are ignored, you can use the accessor function to ignore values. For example, to get the frequency of the most-common letter than is not E:

```js
d3.max(alphabet, (d) => d.letter === "E" ? NaN : d.frequency) // 0.09056
```

If the iterable contains no comparable values, returns undefined.

```js
d3.max([]) // undefined
```
```js
d3.max(alphabet, (d) => d.doesnotexist) // undefined
```

See also [extent](#extent) and [greatest](#greatest).

## maxIndex(iterable, accessor) {#maxIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/maxIndex.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-extent) -->

Like [max](#max), but returns the index of the maximum value rather than the value itself.

```js
d3.maxIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```
```js
d3.maxIndex(alphabet, (d) => d.frequency) // 0
```

This method can find the greatest element according to the given accessor, similar to [greatest](#greatest):

```js
alphabet[d3.maxIndex(alphabet, (d) => d.frequency)] // {letter: "E", frequency: 0.12702}
```

See also [greatestIndex](#greatestIndex).

## extent(iterable, accessor) {#extent}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/extent.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-extent) -->

Returns the [minimum](#min) and [maximum](#max) value in the given *iterable* using natural order.

```js
d3.extent([3, 2, 1, 1, 6, 2, 4]) // [1, 6]
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the extent.

```js
d3.extent(alphabet, (d) => d.frequency) // [0.00074, 0.12702]
```

If the iterable contains no comparable values, returns [undefined, undefined].

```js
d3.extent(alphabet, (d) => d.doesnotexist) // [undefined, undefined]
```

## mode(iterable, accessor) {#mode}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/mode.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mode) -->

Returns the mode of the given *iterable*, *i.e.* the value which appears the most often.

```js
d3.mode([1, 2, 2, 2, 3, 3]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mode.

```js
d3.mode(penguins, (d) => d.island) // "Biscoe"
```

In case of equality, returns the first of the relevant values.

```js
d3.mode([1, 2, 2, 2, 3, 3, 3]) // 2
```

If the iterable contains no comparable values, returns undefined.

```js
d3.mode([NaN, null]) // undefined
```

This method ignores undefined, null and NaN values; this is useful for ignoring missing data.

```js
d3.mode([1, 2, 2, 2, NaN, 3, null]) // 2
```

## sum(iterable, accessor) {#sum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/sum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-sum) -->

Returns the sum of the given *iterable* of numbers. If the iterable contains no numbers, returns 0. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the sum. This method ignores undefined and NaN values; this is useful for ignoring missing data.

See also [fsum](#fsum).

## mean(iterable, accessor) {#mean}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/mean.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the mean of the given *iterable* of numbers. If the iterable contains no numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mean. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## median(iterable, accessor) {#median}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/median.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the median of the given *iterable* of numbers using the [R-7 method](https://en.wikipedia.org/wiki/Quantile#Estimating_quantiles_from_a_sample). If the iterable contains no numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the median. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## medianIndex(array, accessor) {#medianIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/median.js) -->

Similar to *median*, but returns the index of the element to the left of the median.

## cumsum(iterable, accessor) {#cumsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/cumsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-cumsum) -->

Returns the cumulative sum of the given *iterable* of numbers, as a Float64Array of the same length. If the iterable contains no numbers, returns zeros. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the cumulative sum. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## quantile(iterable, p, accessor) {#quantile}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the *p*-quantile of the given *iterable* of numbers, where *p* is a number in the range [0, 1]. For example, the median can be computed using *p* = 0.5, the first quartile at *p* = 0.25, and the third quartile at *p* = 0.75. This particular implementation uses the [R-7 method](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population), which is the default for the R programming language and Excel. For example:

```js
var a = [0, 10, 30];
d3.quantile(a, 0); // 0
d3.quantile(a, 0.5); // 10
d3.quantile(a, 1); // 30
d3.quantile(a, 0.25); // 5
d3.quantile(a, 0.75); // 20
d3.quantile(a, 0.1); // 2
```

An optional *accessor* function may be specified, which is equivalent to calling *array*.map(*accessor*) before computing the quantile.

## quantileIndex(array, p, accessor) {#quantileIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) -->

Similar to *quantile*, but returns the index to the left of *p*.

## quantileSorted(array, p, accessor) {#quantileSorted}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Similar to *quantile*, but expects the input to be a **sorted** *array* of values. In contrast with *quantile*, the accessor is only called on the elements needed to compute the quantile.

## rank(iterable, comparator) {#rank}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/rank.js) -->
<!-- [Examples](https://observablehq.com/@d3/rank) -->

Returns an array with the rank of each value in the *iterable*, *i.e.* the zero-based index of the value when the iterable is sorted. Nullish values are sorted to the end and ranked NaN. An optional *comparator* or *accessor* function may be specified; the latter is equivalent to calling *array*.map(*accessor*) before computing the ranks. If *comparator* is not specified, it defaults to [ascending](#ascending). Ties (equivalent values) all get the same rank, defined as the first time the value is found.

```js
d3.rank([{x: 1}, {}, {x: 2}, {x: 0}], d => d.x); // [1, NaN, 2, 0]
d3.rank(["b", "c", "b", "a"]); // [1, 3, 1, 0]
d3.rank([1, 2, 3], d3.descending); // [2, 1, 0]
```

## variance(iterable, accessor) {#variance}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/variance.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns an [unbiased estimator of the population variance](http://mathworld.wolfram.com/SampleVariance.html) of the given *iterable* of numbers using [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm). If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the variance. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## deviation(iterable, accessor) {#deviation}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/deviation.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the standard deviation, defined as the square root of the [bias-corrected variance](#variance), of the given *iterable* of numbers. If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the standard deviation. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## fsum(values, accessor) {#fsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-fsum) -->

Returns a full precision summation of the given *values*.

```js
d3.fsum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]); // 1
d3.sum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]); // 0.9999999999999999
```

Although slower, d3.fsum can replace d3.sum wherever greater precision is needed. Uses <a href="#adder">d3.Adder</a>.

## fcumsum(values, accessor) {#fcumsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-fcumsum) -->

Returns a full precision cumulative sum of the given *values*.

```js
d3.fcumsum([1, 1e-14, -1]); // [1, 1.00000000000001, 1e-14]
d3.cumsum([1, 1e-14, -1]); // [1, 1.00000000000001, 9.992e-15]
```

Although slower, d3.fcumsum can replace d3.cumsum when greater precision is needed. Uses <a href="#adder">d3.Adder</a>.

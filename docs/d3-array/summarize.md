# Summarizing data

Compute summary statistics.

## count(*iterable*, *accessor*) {#count}

```js
d3.count(penguins, (d) => d.body_mass_g) // 342
```

[Examples](https://observablehq.com/@d3/d3-count) · [Source](https://github.com/d3/d3-array/blob/main/src/count.js) · Returns the number of valid number values (*i.e.*, not null, NaN, or undefined) in the specified *iterable*; accepts an accessor.

## min(*iterable*, *accessor*) {#min}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/min.js) · Returns the minimum value in the given *iterable* using natural order.

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

## minIndex(*iterable*, *accessor*) {#minIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/minIndex.js) · Like [min](#min), but returns the index of the minimum value rather than the value itself.

```js
d3.minIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```

This method can find the least element according to the given accessor, similar to [least](#least):

```js
d3.minIndex(alphabet, (d) => d.frequency) // 25
```
```js
alphabet[d3.minIndex(alphabet, (d) => d.frequency)] // {letter: "Z", frequency: 0.00074}
```

See also [leastIndex](#leastIndex).

## max(*iterable*, *accessor*) {#max}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/max.js) · Returns the maximum value in the given *iterable* using natural order.

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

## maxIndex(*iterable*, *accessor*) {#maxIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/maxIndex.js) · Like [max](#max), but returns the index of the maximum value rather than the value itself.

```js
d3.maxIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```

This method can find the greatest element according to the given accessor, similar to [greatest](#greatest):

```js
d3.maxIndex(alphabet, (d) => d.frequency) // 0
```
```js
alphabet[d3.maxIndex(alphabet, (d) => d.frequency)] // {letter: "E", frequency: 0.12702}
```

See also [greatestIndex](#greatestIndex).

## least(*iterable*, *comparator*) {#least}

[Examples](https://observablehq.com/@d3/d3-least) · [Source](https://github.com/d3/d3-array/blob/main/src/least.js) · Returns the least element of the specified *iterable* according to the specified *comparator*.

```js
d3.least(alphabet, (a, b) => a.frequency - b.frequency) // {letter: "Z", frequency: 0.00074}
```
```js
d3.least(alphabet, (a, b) => b.frequency - a.frequency) // {letter: "E", frequency: 0.12702}
```

If the *comparator* takes a single argument, is interpreted as an accessor and the returned elements are compared using natural order.

```js
d3.least(alphabet, (d) => d.frequency) // {letter: "Z", frequency: 0.00074}
```
```js
d3.least(alphabet, (d) => -d.frequency) // {letter: "E", frequency: 0.12702}
```

If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending).

```js
d3.least(alphabet.map((d) => d.frequency)) // 0.00074
```

If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined.

```js
d3.least([]) // undefined
```

This function is similar to [min](#min), except it allows the use of a comparator rather than an accessor.

## leastIndex(*iterable*, *comparator*) {#leastIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/leastIndex.js) · Returns the index of the least element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.leastIndex(array, (a, b) => a.foo - b.foo); // 0
d3.leastIndex(array, (a, b) => b.foo - a.foo); // 1
d3.leastIndex(array, (d) => d.foo); // 0
```

This function is similar to [minIndex](#minIndex), except it allows the use of a comparator rather than an accessor.

## greatest(*iterable*, *comparator*) {#greatest}

[Examples](https://observablehq.com/@d3/d3-least) · [Source](https://github.com/d3/d3-array/blob/main/src/greatest.js) · Returns the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatest(array, (a, b) => a.foo - b.foo); // {foo: 91}
d3.greatest(array, (a, b) => b.foo - a.foo); // {foo: 42}
d3.greatest(array, (d) => d.foo); // {foo: 91}
```

This function is similar to [max](#max), except it allows the use of a comparator rather than an accessor.

## greatestIndex(*iterable*, *comparator*) {#greatestIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/greatestIndex.js) · Returns the index of the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatestIndex(array, (a, b) => a.foo - b.foo); // 1
d3.greatestIndex(array, (a, b) => b.foo - a.foo); // 0
d3.greatestIndex(array, (d) => d.foo); // 1
```

This function is similar to [maxIndex](#maxIndex), except it allows the use of a comparator rather than an accessor.

## extent(*iterable*, *accessor*) {#extent}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/extent.js) · Returns the [minimum](#min) and [maximum](#max) value in the given *iterable* using natural order.

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

## mode(*iterable*, *accessor*) {#mode}

[Examples](https://observablehq.com/@d3/d3-mode) · [Source](https://github.com/d3/d3-array/blob/main/src/mode.js) · Returns the mode of the given *iterable*, *i.e.* the value which appears the most often. Ignores undefined, null and NaN values.

```js
d3.mode([1, 2, 2, 2, 3, 3]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mode.

```js
d3.mode(penguins, (d) => d.island) // "Biscoe"
```

In case of equality, returns the first of the relevant values. If the iterable contains no comparable values, returns undefined.

## sum(*iterable*, *accessor*) {#sum}

[Examples](https://observablehq.com/@d3/d3-sum) · [Source](https://github.com/d3/d3-array/blob/main/src/sum.js) · Returns the sum of the given *iterable* of numbers. Ignores undefined, null and NaN values.

```js
d3.sum([1, 2, 2, 2, NaN, 3, null]) // 10
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the sum.

```js
d3.sum(penguins, (d) => d.body_mass_g) // 1437000
```

If the iterable contains no numbers, returns 0. See also [fsum](./add.md#fsum).

## mean(*iterable*, *accessor*) {#mean}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/mean.js) · Returns the mean of the given *iterable* of numbers. Ignores undefined, null and NaN values.

```js
d3.mean([1, 2, 2, 2, NaN, 3, null]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mean.

```js
d3.mean(penguins, (d) => d.body_mass_g) // 4201.754385964912
```

If the iterable contains no numbers, returns undefined.

## median(*iterable*, *accessor*) {#median}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/median.js) · Returns the median of the given *iterable* of numbers using the [R-7 method](https://en.wikipedia.org/wiki/Quantile#Estimating_quantiles_from_a_sample). Ignores undefined, null and NaN values.

```js
d3.median([1, 2, 2, 2, NaN, 3, null]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the median.

```js
d3.median(penguins, (d) => d.body_mass_g) // 4050
```

If the iterable contains no numbers, returns undefined.

## medianIndex(array, accessor) {#medianIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/median.js) · Like [median](#median), but returns the index of the element to the left of the median.

```js
d3.medianIndex([1, 2, 2, 2, NaN, 3, null]) // 2
```

## cumsum(*iterable*, *accessor*) {#cumsum}

[Examples](https://observablehq.com/@d3/d3-cumsum) · [Source](https://github.com/d3/d3-array/blob/main/src/cumsum.js) · Returns the cumulative sum of the given *iterable* of numbers, as a Float64Array of the same length.

```js
d3.cumsum([1, 1, 2, 3, 5]) // [1, 2, 4, 7, 12]
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the cumulative sum.

```js
d3.cumsum(penguins, (d) => d.body_mass_g) // [3750, 7550, 10800, 10800, …]
```

This method ignores undefined and NaN values; this is useful for ignoring missing data. If the iterable contains no numbers, returns zeros. See also [fcumsum](./add.md#fcumsum).

## quantile(*iterable*, *p*, *accessor*) {#quantile}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Returns the *p*-quantile of the given *iterable* of numbers, where *p* is a number in the range [0, 1]. For example, the median can be computed using *p* = 0.5, the first quartile at *p* = 0.25, and the third quartile at *p* = 0.75. This particular implementation uses the [R-7 method](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population), which is the default for the R programming language and Excel.

```js
const numbers = [0, 10, 30];
d3.quantile(numbers, 0); // 0
d3.quantile(numbers, 0.5); // 10
d3.quantile(numbers, 1); // 30
d3.quantile(numbers, 0.25); // 5
d3.quantile(numbers, 0.75); // 20
d3.quantile(numbers, 0.1); // 2
```

An optional *accessor* function may be specified, which is equivalent to calling [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) before computing the quantile.

## quantileIndex(*array*, *p*, *accessor*) {#quantileIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Similar to *quantile*, but returns the index to the left of *p*.

## quantileSorted(*array*, *p*, *accessor*) {#quantileSorted}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Similar to *quantile*, but expects the input to be a **sorted** *array* of values. In contrast with *quantile*, the accessor is only called on the elements needed to compute the quantile.

## rank(*iterable*, *comparator*) {#rank}

[Examples](https://observablehq.com/@d3/rank) · [Source](https://github.com/d3/d3-array/blob/main/src/rank.js) · Returns an array with the rank of each value in the *iterable*, *i.e.* the zero-based index of the value when the iterable is sorted. Nullish values are sorted to the end and ranked NaN. An optional *comparator* or *accessor* function may be specified; the latter is equivalent to calling [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) before computing the ranks. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). Ties (equivalent values) all get the same rank, defined as the first time the value is found.

```js
d3.rank([{x: 1}, {}, {x: 2}, {x: 0}], d => d.x); // [1, NaN, 2, 0]
d3.rank(["b", "c", "b", "a"]); // [1, 3, 1, 0]
d3.rank([1, 2, 3], d3.descending); // [2, 1, 0]
```

## variance(*iterable*, *accessor*) {#variance}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/variance.js) · Returns an [unbiased estimator of the population variance](http://mathworld.wolfram.com/SampleVariance.html) of the given *iterable* of numbers using [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm). If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the variance. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## deviation(*iterable*, *accessor*) {#deviation}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/deviation.js) · Returns the standard deviation, defined as the square root of the [bias-corrected variance](#variance), of the given *iterable* of numbers. If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the standard deviation. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## every(*iterable*, *test*) {#every}

[Source](https://github.com/d3/d3-array/blob/main/src/every.js) · Returns true if the given *test* function returns true for every value in the given *iterable*. This method returns as soon as *test* returns a non-truthy value or all values are iterated over. Equivalent to [*array*.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every):

```js
d3.every(new Set([1, 3, 5, 7]), x => x & 1) // true
```

## some(*iterable*, *test*) {#some}

[Source](https://github.com/d3/d3-array/blob/main/src/some.js) · Returns true if the given *test* function returns true for any value in the given *iterable*. This method returns as soon as *test* returns a truthy value or all values are iterated over. Equivalent to [*array*.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some):

```js
d3.some(new Set([0, 2, 3, 4]), x => x & 1) // true
```

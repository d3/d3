# d3-array

Data in JavaScript is often represented by an iterable such as an [array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), [set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set), or [generator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator), and so iterable manipulation is a common task when analyzing or visualizing data. For example, you might take a contiguous slice (subset) of an array, filter an array using a predicate function, or map an array to a parallel set of values using a transform function.

## Arrays

Before looking at the methods that d3-array provides, familiarize yourself with the [array methods built-in to JavaScript](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array). This includes **mutation methods** that modify the array:

* [*array*.pop](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) - Remove the last element from the array.
* [*array*.push](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/push) - Add one or more elements to the end of the array.
* [*array*.reverse](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) - Reverse the order of the elements of the array.
* [*array*.shift](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) - Remove the first element from the array.
* [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) - Sort the elements of the array.
* [*array*.splice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) - Add or remove elements from the array.
* [*array*.unshift](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) - Add one or more elements to the front of the array.

There are also **access methods** that return some representation of the array:

* [*array*.concat](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) - Join the array with other array(s) or value(s).
* [*array*.join](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/join) - Join all elements of the array into a string.
* [*array*.slice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) - Extract a section of the array.
* [*array*.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - Find the first occurrence of a value within the array.
* [*array*.lastIndexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) - Find the last occurrence of a value within the array.

And finally **iteration methods** that apply functions to elements in the array:

* [*array*.filter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - Create a new array with only the elements for which a predicate is true.
* [*array*.forEach](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - Call a function for each element in the array.
* [*array*.every](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every) - See if every element in the array satisfies a predicate.
* [*array*.map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - Create a new array by applying a function to every element in the array.
* [*array*.some](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some) - See if at least one element in the array satisfies a predicate.
* [*array*.reduce](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - Iteratively reduce the array to a single value (from left-to-right).
* [*array*.reduceRight](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) - Iteratively reduce the array to a single value (from right-to-left).

## Statistics

These methods compute basic summary statistics.

### min(iterable, accessor) {#min}

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

### minIndex(iterable, accessor) {#minIndex}

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

### max(iterable, accessor) {#max}

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

### maxIndex(iterable, accessor) {#maxIndex}

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

### extent(iterable, accessor) {#extent}

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

### mode(iterable, accessor) {#mode}

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

### sum(iterable, accessor) {#sum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/sum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-sum) -->

Returns the sum of the given *iterable* of numbers. If the iterable contains no numbers, returns 0. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the sum. This method ignores undefined and NaN values; this is useful for ignoring missing data.

See also [fsum](#fsum).

### mean(iterable, accessor) {#mean}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/mean.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the mean of the given *iterable* of numbers. If the iterable contains no numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mean. This method ignores undefined and NaN values; this is useful for ignoring missing data.

### median(iterable, accessor) {#median}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/median.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the median of the given *iterable* of numbers using the [R-7 method](https://en.wikipedia.org/wiki/Quantile#Estimating_quantiles_from_a_sample). If the iterable contains no numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the median. This method ignores undefined and NaN values; this is useful for ignoring missing data.

### medianIndex(array, accessor) {#medianIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/median.js) -->

Similar to *median*, but returns the index of the element to the left of the median.

### cumsum(iterable, accessor) {#cumsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/cumsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-cumsum) -->

Returns the cumulative sum of the given *iterable* of numbers, as a Float64Array of the same length. If the iterable contains no numbers, returns zeros. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the cumulative sum. This method ignores undefined and NaN values; this is useful for ignoring missing data.

### quantile(iterable, p, accessor) {#quantile}

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

### quantileIndex(array, p, accessor) {#quantileIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) -->

Similar to *quantile*, but returns the index to the left of *p*.

### quantileSorted(array, p, accessor) {#quantileSorted}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Similar to *quantile*, but expects the input to be a **sorted** *array* of values. In contrast with *quantile*, the accessor is only called on the elements needed to compute the quantile.

### rank(iterable, comparator) {#rank}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/rank.js) -->
<!-- [Examples](https://observablehq.com/@d3/rank) -->

Returns an array with the rank of each value in the *iterable*, *i.e.* the zero-based index of the value when the iterable is sorted. Nullish values are sorted to the end and ranked NaN. An optional *comparator* or *accessor* function may be specified; the latter is equivalent to calling *array*.map(*accessor*) before computing the ranks. If *comparator* is not specified, it defaults to [ascending](#ascending). Ties (equivalent values) all get the same rank, defined as the first time the value is found.

```js
d3.rank([{x: 1}, {}, {x: 2}, {x: 0}], d => d.x); // [1, NaN, 2, 0]
d3.rank(["b", "c", "b", "a"]); // [1, 3, 1, 0]
d3.rank([1, 2, 3], d3.descending); // [2, 1, 0]
```

### variance(iterable, accessor) {#variance}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/variance.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns an [unbiased estimator of the population variance](http://mathworld.wolfram.com/SampleVariance.html) of the given *iterable* of numbers using [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm). If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the variance. This method ignores undefined and NaN values; this is useful for ignoring missing data.

### deviation(iterable, accessor) {#deviation}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/deviation.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) -->

Returns the standard deviation, defined as the square root of the [bias-corrected variance](#variance), of the given *iterable* of numbers. If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the standard deviation. This method ignores undefined and NaN values; this is useful for ignoring missing data.

### fsum(values, accessor) {#fsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-fsum) -->

Returns a full precision summation of the given *values*.

```js
d3.fsum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]); // 1
d3.sum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]); // 0.9999999999999999
```

Although slower, d3.fsum can replace d3.sum wherever greater precision is needed. Uses <a href="#adder">d3.Adder</a>.

### fcumsum(values, accessor) {#fcumsum}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-fcumsum) -->

Returns a full precision cumulative sum of the given *values*.

```js
d3.fcumsum([1, 1e-14, -1]); // [1, 1.00000000000001, 1e-14]
d3.cumsum([1, 1e-14, -1]); // [1, 1.00000000000001, 9.992e-15]
```

Although slower, d3.fcumsum can replace d3.cumsum when greater precision is needed. Uses <a href="#adder">d3.Adder</a>.

## Adders

### new Adder() {#Adder}

Creates a full precision adder for [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) floating point numbers, setting its initial value to 0.

### *adder*.add(number) {#adder_add}

Adds the specified *number* to the adder’s current value and returns the adder.

### *adder*.valueOf() {#adder_valueOf}

Returns the IEEE 754 double precision representation of the adder’s current value. Most useful as the short-hand notation `+adder`.

## Search

Methods for searching arrays for a specific element.

### least(iterable, comparator) {#least}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/least.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-least) -->

Returns the least element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined. If *comparator* is not specified, it defaults to [ascending](#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.least(array, (a, b) => a.foo - b.foo); // {foo: 42}
d3.least(array, (a, b) => b.foo - a.foo); // {foo: 91}
d3.least(array, a => a.foo); // {foo: 42}
```

This function is similar to [min](#min), except it allows the use of a comparator rather than an accessor.

### leastIndex(iterable, comparator) {#leastIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/leastIndex.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-least) -->

Returns the index of the least element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.leastIndex(array, (a, b) => a.foo - b.foo); // 0
d3.leastIndex(array, (a, b) => b.foo - a.foo); // 1
d3.leastIndex(array, a => a.foo); // 0
```

This function is similar to [minIndex](#minIndex), except it allows the use of a comparator rather than an accessor.

### greatest(iterable, comparator) {#greatest}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/greatest.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-least) -->

Returns the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined. If *comparator* is not specified, it defaults to [ascending](#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatest(array, (a, b) => a.foo - b.foo); // {foo: 91}
d3.greatest(array, (a, b) => b.foo - a.foo); // {foo: 42}
d3.greatest(array, a => a.foo); // {foo: 91}
```

This function is similar to [max](#max), except it allows the use of a comparator rather than an accessor.

### greatestIndex(iterable, comparator) {#greatestIndex}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/greatestIndex.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-least) -->

Returns the index of the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatestIndex(array, (a, b) => a.foo - b.foo); // 1
d3.greatestIndex(array, (a, b) => b.foo - a.foo); // 0
d3.greatestIndex(array, a => a.foo); // 1
```

This function is similar to [maxIndex](#maxIndex), except it allows the use of a comparator rather than an accessor.

## Bisectors

### bisectLeft(array, x, lo, hi) {#bisectLeft}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->

Returns the insertion point for *x* in *array* to maintain sorted order. The arguments *lo* and *hi* may be used to specify a subset of the array which should be considered; by default the entire array is used. If *x* is already present in *array*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first argument to [splice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) assuming that *array* is already sorted. The returned insertion point *i* partitions the *array* into two halves so that all *v* < *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* >= *x* for *v* in *array*.slice(*i*, *hi*) for the right side.

### bisect(array, x, lo, hi) {#bisect}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bisect) -->

Alias for [bisectRight](#bisectRight).

### bisectRight(array, x, lo, hi) {#bisectRight}

Similar to [bisectLeft](#bisectLeft), but returns an insertion point which comes after (to the right of) any existing entries of *x* in *array*. The returned insertion point *i* partitions the *array* into two halves so that all *v* <= *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* > *x* for *v* in *array*.slice(*i*, *hi*) for the right side.

### bisectCenter(array, x, lo, hi) {#bisectCenter}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->
<!-- [Examples](https://observablehq.com/@d3/multi-line-chart) -->

Returns the index of the value closest to *x* in the given *array* of numbers. The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used.

See [*bisector*.center](#bisector_center).

### bisector(accessor) {#bisector}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Returns a new bisector using the specified *accessor* or *comparator* function. This method can be used to bisect arrays of objects instead of being limited to simple arrays of primitives. For example, given the following array of objects:

```js
var data = [
  {date: new Date(2011, 1, 1), value: 0.5},
  {date: new Date(2011, 2, 1), value: 0.6},
  {date: new Date(2011, 3, 1), value: 0.7},
  {date: new Date(2011, 4, 1), value: 0.8}
];
```

A suitable bisect function could be constructed as:

```js
var bisectDate = d3.bisector(function(d) { return d.date; }).right;
```

This is equivalent to specifying a comparator:

```js
var bisectDate = d3.bisector(function(d, x) { return d.date - x; }).right;
```

And then applied as *bisectDate*(*array*, *date*), returning an index. Note that the comparator is always passed the search value *x* as the second argument. Use a comparator rather than an accessor if you want values to be sorted in an order different than natural order, such as in descending rather than ascending order.

### *bisector*.left(array, x, lo, hi) {#bisector_left}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Equivalent to [bisectLeft](#bisectLeft), but uses this bisector’s associated comparator.

### *bisector*.right(array, x, lo, hi) {#bisector_right}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Equivalent to [bisectRight](#bisectRight), but uses this bisector’s associated comparator.

### *bisector*.center(array, x, lo, hi) {#bisector_center}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Returns the index of the closest value to *x* in the given sorted *array*. This expects that the bisector’s associated accessor returns a quantitative value, or that the bisector’s associated comparator returns a signed distance; otherwise, this method is equivalent to *bisector*.left.

## Sorting

### quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {#quickselect}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quickselect.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-quickselect) -->

See [mourner/quickselect](https://github.com/mourner/quickselect/blob/master/README.md).

### ascending(a, b) {#ascending}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ascending.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ascending) -->

Returns -1 if *a* is less than *b*, or 1 if *a* is greater than *b*, or 0. This is the comparator function for natural order, and can be used in conjunction with the built-in [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method to arrange elements in ascending order. It is implemented as:

```js
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
```

Note that if no comparator function is specified to the built-in sort method, the default order is lexicographic (alphabetical), not natural! This can lead to surprising behavior when sorting an array of numbers.

### descending(a, b) {#descending}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/descending.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ascending) -->

Returns -1 if *a* is greater than *b*, or 1 if *a* is less than *b*, or 0. This is the comparator function for reverse natural order, and can be used in conjunction with the built-in array sort method to arrange elements in descending order. It is implemented as:

```js
function descending(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
```

Note that if no comparator function is specified to the built-in sort method, the default order is lexicographic (alphabetical), not natural! This can lead to surprising behavior when sorting an array of numbers.

## Transformations

Methods for transforming arrays and for generating new arrays.

### group(iterable, ...keys) {#group}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Groups the specified *iterable* of values into an [InternMap](#InternMap) from *key* to array of value. For example, given some data:

```js
data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
]
```

To group the data by name:

```js
d3.group(data, d => d.name)
```

This produces:

```js
Map(3) {
  "jim" => Array(1)
  "carl" => Array(1)
  "stacy" => Array(2)
}
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
d3.group(data, d => d.name, d => d.date)
```

This produces:

```js
Map(3) {
  "jim" => Map(1) {
    "11/12/2015" => Array(1)
  }
  "carl" => Map(1) {
    "11/12/2015" => Array(1)
  }
  "stacy" => Map(1) {
    "01/04/2016" => Array(2)
  }
}
```

To convert a Map to an Array, use [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). For example:

```js
Array.from(d3.group(data, d => d.name))
```

This produces:

```js
[
  ["jim", Array(1)],
  ["carl", Array(1)],
  ["stacy", Array(2)]
]
```

You can also simultaneously convert the [*key*, *value*] to some other representation by passing a map function to Array.from:

```js
Array.from(d3.group(data, d => d.name), ([key, value]) => ({key, value}))
```

This produces:

```js
[
  {key: "jim", value: Array(1)},
  {key: "carl", value: Array(1)},
  {key: "stacy", value: Array(2)}
]
```

[*selection*.data](https://github.com/d3/d3-selection/blob/main/README.md#selection_data) accepts iterables directly, meaning that you can use a Map (or Set or other iterable) to perform a data join without first needing to convert to an array.

### groups(iterable, ...keys) {#groups}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Equivalent to [group](#group), but returns nested arrays instead of nested maps.

### flatGroup(iterable, ...keys) {#flatGroup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-flatgroup) -->

Equivalent to [group](#group), but returns a flat array of [*key0*, *key1*, …, *values*] instead of nested maps.

### index(iterable, ...keys) {#index}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group) -->

Equivalent to [group](#group) but returns a unique value per compound key instead of an array, throwing if the key is not unique.

For example, given the data defined above,

```js
d3.index(data, d => d.amount)
```

returns

```js
Map(4) {
  "34.0" => Object {name: "jim", amount: "34.0", date: "11/12/2015"}
  "120.11" => Object {name: "carl", amount: "120.11", date: "11/12/2015"}
  "12.01" => Object {name: "stacy", amount: "12.01", date: "01/04/2016"}
  "34.05" => Object {name: "stacy", amount: "34.05", date: "01/04/2016"}
}
```

On the other hand,

```js
d3.index(data, d => d.name)
```

throws an error because two objects share the same name.

### indexes(iterable, ...keys) {#indexes}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group) -->

Equivalent to [index](#index), but returns nested arrays instead of nested maps.

### rollup(iterable, reduce, ...keys) {#rollup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

[Groups](#group) and reduces the specified *iterable* of values into an InternMap from *key* to value. For example, given some data:

```js
data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
]
```

To count the number of elements by name:

```js
d3.rollup(data, v => v.length, d => d.name)
```

This produces:

```js
Map(3) {
  "jim" => 1
  "carl" => 1
  "stacy" => 2
}
```

If more than one *key* is specified, a nested Map is returned. For example:

```js
d3.rollup(data, v => v.length, d => d.name, d => d.date)
```

This produces:

```js
Map(3) {
  "jim" => Map(1) {
    "11/12/2015" => 1
  }
  "carl" => Map(1) {
    "11/12/2015" => 1
  }
  "stacy" => Map(1) {
    "01/04/2016" => 2
  }
}
```

To convert a Map to an Array, use [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). See [d3.group](#group) for examples.

### rollups(iterable, reduce, ...keys) {#rollups}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Equivalent to [rollup](#rollup), but returns nested arrays instead of nested maps.

### flatRollup(iterable, reduce, ...keys) {#flatRollup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-flatgroup) -->

Equivalent to [rollup](#rollup), but returns a flat array of [*key0*, *key1*, …, *value*] instead of nested maps.

### groupSort(iterable, comparator, key) {#groupSort}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/groupSort.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-groupsort) -->

Groups the specified *iterable* of elements according to the specified *key* function, sorts the groups according to the specified *comparator*, and then returns an array of keys in sorted order. For example, if you had a table of barley yields for different varieties, sites, and years, to sort the barley varieties by ascending median yield:

```js
d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.variety)
```

For descending order, negate the group value:

```js
d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.variety)
```

If a *comparator* is passed instead of an *accessor* (i.e., if the second argument is a function that takes exactly two arguments), it will be asked to compare two groups *a* and *b* and should return a negative value if *a* should be before *b*, a positive value if *a* should be after *b*, or zero for a partial ordering.

### count(iterable, accessor) {#count}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/count.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-count) -->

Returns the number of valid number values (*i.e.*, not null, NaN, or undefined) in the specified *iterable*; accepts an accessor.

For example:

```js
d3.count([{n: "Alice", age: NaN}, {n: "Bob", age: 18}, {n: "Other"}], d => d.age) // 1
```
### cross(...iterables, reducer) {#cross}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/cross.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-cross) -->

Returns the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the specified *iterables*. For example, if two iterables *a* and *b* are specified, for each element *i* in the iterable *a* and each element *j* in the iterable *b*, in order, invokes the specified *reducer* function passing the element *i* and element *j*. If a *reducer* is not specified, it defaults to a function which creates a two-element array for each pair:

```js
function pair(a, b) {
  return [a, b];
}
```

For example:

```js
d3.cross([1, 2], ["x", "y"]); // returns [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]
d3.cross([1, 2], ["x", "y"], (a, b) => a + b); // returns ["1x", "1y", "2x", "2y"]
```

### merge(iterables) {#merge}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/merge.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-merge) -->

Merges the specified iterable of *iterables* into a single array. This method is similar to the built-in array concat method; the only difference is that it is more convenient when you have an array of arrays.

```js
d3.merge([[1], [2, 3]]); // returns [1, 2, 3]
```

### pairs(iterable, reducer) {#pairs}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/pairs.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-pairs) -->

For each adjacent pair of elements in the specified *iterable*, in order, invokes the specified *reducer* function passing the element *i* and element *i* - 1. If a *reducer* is not specified, it defaults to a function which creates a two-element array for each pair:

```js
function pair(a, b) {
  return [a, b];
}
```

For example:

```js
d3.pairs([1, 2, 3, 4]); // returns [[1, 2], [2, 3], [3, 4]]
d3.pairs([1, 2, 3, 4], (a, b) => b - a); // returns [1, 1, 1];
```

If the specified iterable has fewer than two elements, returns the empty array.

### permute(source, keys) {#permute}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/permute.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-permute) -->

Returns a permutation of the specified *source* object (or array) using the specified iterable of *keys*. The returned array contains the corresponding property of the source object for each key in *keys*, in order. For example:

```js
permute(["a", "b", "c"], [1, 2, 0]); // returns ["b", "c", "a"]
```

It is acceptable to have more keys than source elements, and for keys to be duplicated or omitted.

This method can also be used to extract the values from an object into an array with a stable order. Extracting keyed values in order can be useful for generating data arrays in nested selections. For example:

```js
let object = {yield: 27, variety: "Manchuria", year: 1931, site: "University Farm"};
let fields = ["site", "variety", "yield"];

d3.permute(object, fields); // returns ["University Farm", "Manchuria", 27]
```

### shuffle(array, start, stop) {#shuffle}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-shuffle) -->

Randomizes the order of the specified *array* in-place using the [Fisher–Yates shuffle](https://bost.ocks.org/mike/shuffle/) and returns the *array*. If *start* is specified, it is the starting index (inclusive) of the *array* to shuffle; if *start* is not specified, it defaults to zero. If *stop* is specified, it is the ending index (exclusive) of the *array* to shuffle; if *stop* is not specified, it defaults to *array*.length. For example, to shuffle the first ten elements of the *array*: shuffle(*array*, 0, 10).

### shuffler(random) {#shuffler}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) -->

Returns a [shuffle function](#shuffle) given the specified random source. For example, using [d3.randomLcg](https://github.com/d3/d3-random/blob/main/README.md#randomLcg):

```js
const random = d3.randomLcg(0.9051667019185816);
const shuffle = d3.shuffler(random);

shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // returns [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]
```

### ticks(start, stop, count) {#ticks}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Returns an array of approximately *count* + 1 uniformly-spaced, nicely-rounded values between *start* and *stop* (inclusive). Each value is a power of ten multiplied by 1, 2 or 5. See also [d3.tickIncrement](#tickIncrement), [d3.tickStep](#tickStep) and [*linear*.ticks](https://github.com/d3/d3-scale/blob/main/README.md#linear_ticks).

Ticks are inclusive in the sense that they may include the specified *start* and *stop* values if (and only if) they are exact, nicely-rounded values consistent with the inferred [step](#tickStep). More formally, each returned tick *t* satisfies *start* ≤ *t* and *t* ≤ *stop*.

### tickIncrement(start, stop, count) {#tickIncrement}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Like [d3.tickStep](#tickStep), except requires that *start* is always less than or equal to *stop*, and if the tick step for the given *start*, *stop* and *count* would be less than one, returns the negative inverse tick step instead. This method is always guaranteed to return an integer, and is used by [d3.ticks](#ticks) to guarantee that the returned tick values are represented as precisely as possible in IEEE 754 floating point.

### tickStep(start, stop, count) {#tickStep}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Returns the difference between adjacent tick values if the same arguments were passed to [d3.ticks](#ticks): a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5. Note that due to the limited precision of IEEE 754 floating point, the returned value may not be exact decimals; use [d3-format](https://github.com/d3/d3-format) to format numbers for human consumption.

### nice(start, stop, count) {#nice}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/nice.js) -->

Returns a new interval [*niceStart*, *niceStop*] covering the given interval [*start*, *stop*] and where *niceStart* and *niceStop* are guaranteed to align with the corresponding [tick step](#tickStep). Like [d3.tickIncrement](#tickIncrement), this requires that *start* is less than or equal to *stop*.

### range(start, stop, step) {#range}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/range.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-range) -->

Returns an array containing an arithmetic progression, similar to the Python built-in [range](http://docs.python.org/library/functions.html#range). This method is often used to iterate over a sequence of uniformly-spaced numeric values, such as the indexes of an array or the ticks of a linear scale. (See also [d3.ticks](#ticks) for nicely-rounded values.)

If *step* is omitted, it defaults to 1. If *start* is omitted, it defaults to 0. The *stop* value is exclusive; it is not included in the result. If *step* is positive, the last element is the largest *start* + *i* \* *step* less than *stop*; if *step* is negative, the last element is the smallest *start* + *i* \* *step* greater than *stop*. If the returned array would contain an infinite number of values, an empty range is returned.

The arguments are not required to be integers; however, the results are more predictable if they are. The values in the returned array are defined as *start* + *i* \* *step*, where *i* is an integer from zero to one minus the total number of elements in the returned array. For example:

```js
d3.range(0, 1, 0.2) // [0, 0.2, 0.4, 0.6000000000000001, 0.8]
```

This unexpected behavior is due to IEEE 754 double-precision floating point, which defines 0.2 * 3 = 0.6000000000000001. Use [d3-format](https://github.com/d3/d3-format) to format numbers for human consumption with appropriate rounding; see also [linear.tickFormat](https://github.com/d3/d3-scale/blob/main/README.md#linear_tickFormat) in [d3-scale](https://github.com/d3/d3-scale).

Likewise, if the returned array should have a specific length, consider using [array.map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on an integer range. For example:

```js
d3.range(0, 1, 1 / 49); // BAD: returns 50 elements!
d3.range(49).map(function(d) { return d / 49; }); // GOOD: returns 49 elements.
```

### transpose(matrix) {#transpose}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/transpose.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-transpose) -->

Uses the [zip](#zip) operator as a two-dimensional [matrix transpose](http://en.wikipedia.org/wiki/Transpose).

### zip(arrays…) {#zip}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/zip.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-transpose) -->

Returns an array of arrays, where the *i*th array contains the *i*th element from each of the argument *arrays*. The returned array is truncated in length to the shortest array in *arrays*. If *arrays* contains only a single array, the returned array contains one-element arrays. With no arguments, the returned array is empty.

```js
d3.zip([1, 2], [3, 4]); // returns [[1, 3], [2, 4]]
```

## Blurs

### blur(data, radius) {#blur}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blur) -->

Blurs an array of *data* in-place by applying three iterations of a moving average transform, for a fast approximation of a gaussian kernel of the given *radius*, a non-negative number, and returns the array.

```js
const randomWalk = d3.cumsum({length: 1000}, () => Math.random() - 0.5);
blur(randomWalk, 5);
```

Copy the data if you don’t want to smooth it in-place:
```js
const smoothed = blur(randomWalk.slice(), 5);
```

### blur2({data, width, height}, rx, ry) {#blur2}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blur) -->

Blurs a matrix of the given *width* and *height* in-place, by applying an horizontal blur of radius *rx* and a vertical blur or radius *ry* (which defaults to *rx*). The matrix *data* is stored in a flat array, used to determine the *height* if it is not specified. Returns the blurred {data, width, height}.

```js
data = [
  1, 0, 0,
  0, 0, 0,
  0, 0, 1
];
blur2({data, width: 3}, 1);
```

### blurImage(imageData, rx, ry) {#blurImage}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blurimage) -->

Blurs an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) structure in-place, blurring each of the RGBA layers independently by applying an horizontal blur of radius *rx* and a vertical blur or radius *ry* (which defaults to *rx*). Returns the blurred ImageData.

```js
const imData = context.getImageData(0, 0, width, height);
blurImage(imData, 5);
```

## Iterables

These are equivalent to built-in array methods, but work with any iterable including Map, Set, and Generator.

### every(iterable, test) {#every}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/every.js) -->

Returns true if the given *test* function returns true for every value in the given *iterable*. This method returns as soon as *test* returns a non-truthy value or all values are iterated over. Equivalent to [*array*.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every):

```js
d3.every(new Set([1, 3, 5, 7]), x => x & 1) // true
```

### some(iterable, test) {#some}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/some.js) -->

Returns true if the given *test* function returns true for any value in the given *iterable*. This method returns as soon as *test* returns a truthy value or all values are iterated over. Equivalent to [*array*.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some):

```js
d3.some(new Set([0, 2, 3, 4]), x => x & 1) // true
```

### filter(iterable, test) {#filter}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/filter.js) -->

Returns a new array containing the values from *iterable*, in order, for which the given *test* function returns true. Equivalent to [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter):

```js
d3.filter(new Set([0, 2, 3, 4]), x => x & 1) // [3]
```

### map(iterable, mapper) {#map}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/map.js) -->

Returns a new array containing the mapped values from *iterable*, in order, as defined by given *mapper* function. Equivalent to [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from):

```js
d3.map(new Set([0, 2, 3, 4]), x => x & 1) // [0, 0, 1, 0]
```

### reduce(iterable, reducer, initialValue) {#reduce}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/reduce.js) -->

Returns the reduced value defined by given *reducer* function, which is repeatedly invoked for each value in *iterable*, being passed the current reduced value and the next value. Equivalent to [*array*.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce):

```js
d3.reduce(new Set([0, 2, 3, 4]), (p, v) => p + v, 0) // 9
```

### reverse(iterable) {#reverse}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/reverse.js) -->

Returns an array containing the values in the given *iterable* in reverse order. Equivalent to [*array*.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), except that it does not mutate the given *iterable*:

```js
d3.reverse(new Set([0, 2, 3, 1])) // [1, 3, 2, 0]
```

### sort(iterable, comparator) {#sort}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/sort.js) -->

Returns an array containing the values in the given *iterable* in the sorted order defined by the given *comparator* or *accessor* function. If *comparator* is not specified, it defaults to [d3.ascending](#ascending). Equivalent to [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), except that it does not mutate the given *iterable*, and the comparator defaults to natural order instead of lexicographic order:

```js
d3.sort(new Set([0, 2, 3, 1])) // [0, 1, 2, 3]
```

If an *accessor* (a function that does not take exactly two arguments) is specified,

```js
d3.sort(data, d => d.value)
```

it is equivalent to a *comparator* using [natural order](#ascending):

```js
d3.sort(data, (a, b) => d3.ascending(a.value, b.value))
```

The *accessor* is only invoked once per element, and thus the returned sorted order is consistent even if the accessor is nondeterministic.

Multiple accessors may be specified to break ties:

```js
d3.sort(points, ({x}) => x, ({y}) => y)
```

This is equivalent to:

```js
d3.sort(data, (a, b) => d3.ascending(a.x, b.x) || d3.ascending(a.y, b.y))
```

## Sets

This methods implement basic set operations for any iterable.

### difference(iterable, ...others) {#difference}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/difference.js) -->

Returns a new InternSet containing every value in *iterable* that is not in any of the *others* iterables.

```js
d3.difference([0, 1, 2, 0], [1]) // Set {0, 2}
```

### union(...iterables) {#union}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/union.js) -->

Returns a new InternSet containing every (distinct) value that appears in any of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.union([0, 2, 1, 0], [1, 3]) // Set {0, 2, 1, 3}
```

### intersection(...iterables) {#intersection}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/intersection.js) -->

Returns a new InternSet containing every (distinct) value that appears in all of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.intersection([0, 2, 1, 0], [1, 3]) // Set {1}
```

### superset(a, b) {#superset}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/superset.js) -->

Returns true if *a* is a superset of *b*: if every value in the given iterable *b* is also in the given iterable *a*.

```js
d3.superset([0, 2, 1, 3, 0], [1, 3]) // true
```

### subset(a, b) {#subset}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/subset.js) -->

Returns true if *a* is a subset of *b*: if every value in the given iterable *a* is also in the given iterable *b*.

```js
d3.subset([1, 3], [0, 2, 1, 3, 0]) // true
```

### disjoint(a, b) {#disjoint}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/disjoint.js) -->

Returns true if *a* and *b* are disjoint: if *a* and *b* contain no shared value.

```js
d3.disjoint([1, 3], [2, 4]) // true
```

## Bins

[<img src="https://raw.githubusercontent.com/d3/d3-array/main/img/histogram.png" width="480" height="250" alt="Histogram">](http://bl.ocks.org/mbostock/3048450)

Binning groups discrete samples into a smaller number of consecutive, non-overlapping intervals. They are often used to visualize the distribution of numerical data as histograms.

### bin() {#bin}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

Constructs a new bin generator with the default settings.

### *bin*(data) {#bin_}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

Bins the given iterable of *data* samples. Returns an array of bins, where each bin is an array containing the associated elements from the input *data*. Thus, the `length` of the bin is the number of elements in that bin. Each bin has two additional attributes:

* `x0` - the lower bound of the bin (inclusive).
* `x1` - the upper bound of the bin (exclusive, except for the last bin).

Any null or non-comparable values in the given *data*, or those outside the [domain](#bin_domain), are ignored.

### *bin*.value(value) {#bin_value}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

If *value* is specified, sets the value accessor to the specified function or constant and returns this bin generator. If *value* is not specified, returns the current value accessor, which defaults to the identity function.

When bins are [generated](#_bin), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default value accessor assumes that the input data are orderable (comparable), such as numbers or dates. If your data are not, then you should specify an accessor that returns the corresponding orderable value for a given datum.

This is similar to mapping your data to values before invoking the bin generator, but has the benefit that the input data remains associated with the returned bins, thereby making it easier to access other fields of the data.

### *bin*.domain(domain) {#bin_domain}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

If *domain* is specified, sets the domain accessor to the specified function or array and returns this bin generator. If *domain* is not specified, returns the current domain accessor, which defaults to [extent](#extent). The bin domain is defined as an array [*min*, *max*], where *min* is the minimum observable value and *max* is the maximum observable value; both values are inclusive. Any value outside of this domain will be ignored when the bins are [generated](#_bin).

For example, if you are using the bin generator in conjunction with a [linear scale](https://github.com/d3/d3-scale/blob/main/README.md#linear-scales) `x`, you might say:

```js
var bin = d3.bin()
    .domain(x.domain())
    .thresholds(x.ticks(20));
```

You can then compute the bins from an array of numbers like so:

```js
var bins = bin(numbers);
```

If the default [extent](#extent) domain is used and the [thresholds](#bin_thresholds) are specified as a count (rather than explicit values), then the computed domain will be [niced](#nice) such that all bins are uniform width.

Note that the domain accessor is invoked on the materialized array of [values](#bin_value), not on the input data array.

### *bin*.thresholds(count) {#bin_thresholds}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

If *thresholds* is specified, sets the [threshold generator](#bin-thresholds) to the specified function or array and returns this bin generator. If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](#thresholdSturges). (Thus by default, the values to be binned must be numbers!) Thresholds are defined as an array of values [*x0*, *x1*, …]. Any value less than *x0* will be placed in the first bin; any value greater than or equal to *x0* but less than *x1* will be placed in the second bin; and so on. Thus, the [generated bins](#_bin) will have *thresholds*.length + 1 bins. See [bin thresholds](#bin-thresholds) for more information.

Any threshold values outside the [domain](#bin_domain) are ignored. The first *bin*.x0 is always equal to the minimum domain value, and the last *bin*.x1 is always equal to the maximum domain value.

If a *count* is specified instead of an array of *thresholds*, then the [domain](#bin_domain) will be uniformly divided into approximately *count* bins; see [ticks](#ticks).

## Bin thresholds

These functions are typically not used directly; instead, pass them to [*bin*.thresholds](#bin_thresholds).

### thresholdFreedmanDiaconis(values, min, max) {#thresholdFreedmanDiaconis}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/threshold/freedmanDiaconis.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

Returns the number of bins according to the [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

### thresholdScott(values, min, max) {#thresholdScott}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/threshold/scott.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

Returns the number of bins according to [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

### thresholdSturges(values) {#thresholdSturges}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/threshold/sturges.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bin) -->

Returns the number of bins according to [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

You may also implement your own threshold generator taking three arguments: the array of input [*values*](#bin_value) derived from the data, and the [observable domain](#bin_domain) represented as *min* and *max*. The generator may then return either the array of numeric thresholds or the *count* of bins; in the latter case the domain is divided uniformly into approximately *count* bins; see [ticks](#ticks).

For instance, when binning date values, you might want to use the ticks from a time scale ([Example](https://observablehq.com/@d3/d3-bin-time-thresholds)).

## Interning

### new d3.InternMap(iterable, key) {#InternMap}

<!-- [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) -->
<!-- [Examples](https://observablehq.com/d/d4c5f6ad343866b9) -->

The [InternMap and InternSet](https://github.com/mbostock/internmap) classes extend the native JavaScript Map and Set classes, respectively, allowing Dates and other non-primitive keys by bypassing the [SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) when determining key equality. d3.group, d3.rollup and d3.index use an InternMap rather than a native Map. These two classes are exported for convenience.

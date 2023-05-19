# d3-array: Transforming {#top}

Methods for transforming arrays and for generating new arrays.

## count(iterable, accessor) {#count}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/count.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-count) -->

Returns the number of valid number values (*i.e.*, not null, NaN, or undefined) in the specified *iterable*; accepts an accessor.

For example:

```js
d3.count([{n: "Alice", age: NaN}, {n: "Bob", age: 18}, {n: "Other"}], d => d.age) // 1
```
## cross(...iterables, reducer) {#cross}

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

## merge(iterables) {#merge}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/merge.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-merge) -->

Merges the specified iterable of *iterables* into a single array. This method is similar to the built-in array concat method; the only difference is that it is more convenient when you have an array of arrays.

```js
d3.merge([[1], [2, 3]]); // returns [1, 2, 3]
```

## pairs(iterable, reducer) {#pairs}

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

## permute(source, keys) {#permute}

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

## shuffle(array, start, stop) {#shuffle}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-shuffle) -->

Randomizes the order of the specified *array* in-place using the [Fisher–Yates shuffle](https://bost.ocks.org/mike/shuffle/) and returns the *array*. If *start* is specified, it is the starting index (inclusive) of the *array* to shuffle; if *start* is not specified, it defaults to zero. If *stop* is specified, it is the ending index (exclusive) of the *array* to shuffle; if *stop* is not specified, it defaults to *array*.length. For example, to shuffle the first ten elements of the *array*: shuffle(*array*, 0, 10).

## shuffler(random) {#shuffler}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) -->

Returns a [shuffle function](#shuffle) given the specified random source. For example, using [d3.randomLcg](https://github.com/d3/d3-random/blob/main/README.md#randomLcg):

```js
const random = d3.randomLcg(0.9051667019185816);
const shuffle = d3.shuffler(random);

shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // returns [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]
```

## ticks(start, stop, count) {#ticks}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Returns an array of approximately *count* + 1 uniformly-spaced, nicely-rounded values between *start* and *stop* (inclusive). Each value is a power of ten multiplied by 1, 2 or 5. See also [d3.tickIncrement](#tickIncrement), [d3.tickStep](#tickStep) and [*linear*.ticks](https://github.com/d3/d3-scale/blob/main/README.md#linear_ticks).

Ticks are inclusive in the sense that they may include the specified *start* and *stop* values if (and only if) they are exact, nicely-rounded values consistent with the inferred [step](#tickStep). More formally, each returned tick *t* satisfies *start* ≤ *t* and *t* ≤ *stop*.

## tickIncrement(start, stop, count) {#tickIncrement}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Like [d3.tickStep](#tickStep), except requires that *start* is always less than or equal to *stop*, and if the tick step for the given *start*, *stop* and *count* would be less than one, returns the negative inverse tick step instead. This method is always guaranteed to return an integer, and is used by [d3.ticks](#ticks) to guarantee that the returned tick values are represented as precisely as possible in IEEE 754 floating point.

## tickStep(start, stop, count) {#tickStep}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ticks) -->

Returns the difference between adjacent tick values if the same arguments were passed to [d3.ticks](#ticks): a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5. Note that due to the limited precision of IEEE 754 floating point, the returned value may not be exact decimals; use [d3-format](https://github.com/d3/d3-format) to format numbers for human consumption.

## nice(start, stop, count) {#nice}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/nice.js) -->

Returns a new interval [*niceStart*, *niceStop*] covering the given interval [*start*, *stop*] and where *niceStart* and *niceStop* are guaranteed to align with the corresponding [tick step](#tickStep). Like [d3.tickIncrement](#tickIncrement), this requires that *start* is less than or equal to *stop*.

## range(start, stop, step) {#range}

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

## transpose(matrix) {#transpose}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/transpose.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-transpose) -->

Uses the [zip](#zip) operator as a two-dimensional [matrix transpose](http://en.wikipedia.org/wiki/Transpose).

## zip(arrays…) {#zip}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/zip.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-transpose) -->

Returns an array of arrays, where the *i*th array contains the *i*th element from each of the argument *arrays*. The returned array is truncated in length to the shortest array in *arrays*. If *arrays* contains only a single array, the returned array contains one-element arrays. With no arguments, the returned array is empty.

```js
d3.zip([1, 2], [3, 4]); // returns [[1, 3], [2, 4]]
```

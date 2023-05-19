# d3-array: Transforming {#top}

Methods for transforming arrays and for generating new arrays.

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

## every(iterable, test) {#every}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/every.js) -->

Returns true if the given *test* function returns true for every value in the given *iterable*. This method returns as soon as *test* returns a non-truthy value or all values are iterated over. Equivalent to [*array*.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every):

```js
d3.every(new Set([1, 3, 5, 7]), x => x & 1) // true
```

## some(iterable, test) {#some}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/some.js) -->

Returns true if the given *test* function returns true for any value in the given *iterable*. This method returns as soon as *test* returns a truthy value or all values are iterated over. Equivalent to [*array*.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some):

```js
d3.some(new Set([0, 2, 3, 4]), x => x & 1) // true
```

## filter(iterable, test) {#filter}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/filter.js) -->

Returns a new array containing the values from *iterable*, in order, for which the given *test* function returns true. Equivalent to [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter):

```js
d3.filter(new Set([0, 2, 3, 4]), x => x & 1) // [3]
```

## map(iterable, mapper) {#map}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/map.js) -->

Returns a new array containing the mapped values from *iterable*, in order, as defined by given *mapper* function. Equivalent to [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from):

```js
d3.map(new Set([0, 2, 3, 4]), x => x & 1) // [0, 0, 1, 0]
```

## reduce(iterable, reducer, initialValue) {#reduce}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/reduce.js) -->

Returns the reduced value defined by given *reducer* function, which is repeatedly invoked for each value in *iterable*, being passed the current reduced value and the next value. Equivalent to [*array*.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce):

```js
d3.reduce(new Set([0, 2, 3, 4]), (p, v) => p + v, 0) // 9
```

# Transforming data

Transform arrays and generate new arrays.

## cross(...*iterables*, *reducer*) {#cross}

[Examples](https://observablehq.com/@d3/d3-cross) · [Source](https://github.com/d3/d3-array/blob/main/src/cross.js) · Returns the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the specified *iterables*.

```js
d3.cross([1, 2], ["x", "y"]) // [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]
```

If a *reducer* is specified, it is invoked for each combination of elements from each of the given *iterables*, and returns the corresponding reduced value.

```js
d3.cross([1, 2], ["x", "y"], (a, b) => a + b) // ["1x", "1y", "2x", "2y"]
```

## merge(*iterables*) {#merge}

[Examples](https://observablehq.com/@d3/d3-merge) · [Source](https://github.com/d3/d3-array/blob/main/src/merge.js) · Merges the specified iterable of *iterables* into a new flat array. This method is similar to the built-in [*array*.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method, but is more convenient when you have an array of arrays or an iterable of iterables.

```js
d3.merge([[1], [2, 3]]) // [1, 2, 3]
```

```js
d3.merge(new Set([new Set([1]), new Set([2, 3])])) // [1, 2, 3]
```

## pairs(*iterable*, *reducer*) {#pairs}

[Examples](https://observablehq.com/@d3/d3-pairs) · [Source](https://github.com/d3/d3-array/blob/main/src/pairs.js) · Returns an array of adjacent pairs of elements from the specified *iterable*, in order. If the specified iterable has fewer than two elements, returns the empty array.

```js
d3.pairs([1, 2, 3, 4]) // [[1, 2], [2, 3], [3, 4]]
```

If a *reducer* function is specified, it is successively passed an element *i - 1* and element *i* from the *iterable*.

```js
d3.pairs([1, 1, 2, 3, 5], (a, b) => b - a) // [0, 1, 1, 2]
```

## transpose(*matrix*) {#transpose}

[Examples](https://observablehq.com/@d3/d3-transpose) · [Source](https://github.com/d3/d3-array/blob/main/src/transpose.js) · Uses the [zip](#zip) operator as a two-dimensional [matrix transpose](http://en.wikipedia.org/wiki/Transpose).

```js
d3.transpose([["Alice", "Bob", "Carol"], [32, 13, 14]]) // [["Alice", 32], ["Bob", 13], ["Carol", 14]]
```
```js
d3.transpose([["Alice", 32], ["Bob", 13], ["Carol", 14]]) // [["Alice", "Bob", "Carol"], [32, 13, 14]]
```

## zip(...*arrays*) {#zip}

[Examples](https://observablehq.com/@d3/d3-transpose) · [Source](https://github.com/d3/d3-array/blob/main/src/zip.js) · Returns an array of arrays, where the *i*th array contains the *i*th element from each of the argument *arrays*. The returned array is truncated in length to the shortest array in *arrays*. If *arrays* contains only a single array, the returned array contains one-element arrays. With no arguments, the returned array is empty.

```js
d3.zip(["Alice", "Bob", "Carol"], [32, 13, 14]) // [["Alice", 32], ["Bob", 13], ["Carol", 14]]
```

## filter(*iterable*, *test*) {#filter}

[Source](https://github.com/d3/d3-array/blob/main/src/filter.js) · Returns a new array containing the values from *iterable*, in order, for which the given *test* function returns true.

```js
d3.filter(new Set([0, 2, 3, 4]), (d) => d & 1) // [3]
```

Like [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), but works with any iterable.

## map(*iterable*, *mapper*) {#map}

[Source](https://github.com/d3/d3-array/blob/main/src/map.js) · Returns a new array containing the mapped values from *iterable*, in order, as defined by given *mapper* function.

```js
d3.map(new Set([0, 2, 3, 4]), (d) => d & 1) // [0, 0, 1, 0]
```

Like [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), but works with any iterable.

## reduce(*iterable*, *reducer*, *initialValue*) {#reduce}

[Source](https://github.com/d3/d3-array/blob/main/src/reduce.js) · Returns the reduced value defined by given *reducer* function, which is repeatedly invoked for each value in *iterable*, being passed the current reduced value and the next value.

```js
d3.reduce(new Set([0, 2, 3, 4]), (p, v) => p + v, 0) // 9
```

Like [*array*.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), but works with any iterable.

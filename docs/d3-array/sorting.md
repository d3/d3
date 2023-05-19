# d3-array: Sorting {#top}

## quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {#quickselect}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/quickselect.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-quickselect) -->

See [mourner/quickselect](https://github.com/mourner/quickselect/blob/master/README.md).

## ascending(a, b) {#ascending}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/ascending.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ascending) -->

Returns -1 if *a* is less than *b*, or 1 if *a* is greater than *b*, or 0. This is the comparator function for natural order, and can be used in conjunction with the built-in [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method to arrange elements in ascending order. It is implemented as:

```js
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
```

Note that if no comparator function is specified to the built-in sort method, the default order is lexicographic (alphabetical), not natural! This can lead to surprising behavior when sorting an array of numbers.

## descending(a, b) {#descending}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/descending.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-ascending) -->

Returns -1 if *a* is greater than *b*, or 1 if *a* is less than *b*, or 0. This is the comparator function for reverse natural order, and can be used in conjunction with the built-in array sort method to arrange elements in descending order. It is implemented as:

```js
function descending(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
```

Note that if no comparator function is specified to the built-in sort method, the default order is lexicographic (alphabetical), not natural! This can lead to surprising behavior when sorting an array of numbers.

# d3-array: Sort {#top}

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

## reverse(iterable) {#reverse}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/reverse.js) -->

Returns an array containing the values in the given *iterable* in reverse order. Equivalent to [*array*.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), except that it does not mutate the given *iterable*:

```js
d3.reverse(new Set([0, 2, 3, 1])) // [1, 3, 2, 0]
```

## sort(iterable, comparator) {#sort}

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

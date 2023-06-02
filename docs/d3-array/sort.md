# Sorting data

Sort values; see also [bisect](./bisect.md).

## ascending(*a*, *b*) {#ascending}

[Examples](https://observablehq.com/@d3/d3-ascending) · [Source](https://github.com/d3/d3-array/blob/main/src/ascending.js) · Returns -1 if *a* is less than *b*, 1 if *a* is greater than *b*, 0 if *a* and *b* are equivalent, and otherwise NaN.

```js
[39, 21, 1, 104, 22].sort(d3.ascending) // [1, 21, 22, 39, 104]
```

This is the comparator function for natural order, and can be used with [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to arrange elements in ascending order.

## descending(*a*, *b*) {#descending}

[Examples](https://observablehq.com/@d3/d3-ascending) · [Source](https://github.com/d3/d3-array/blob/main/src/descending.js) · Returns -1 if *a* is greater than *b*, 1 if *a* is less than *b*, 0 if *a* and *b* are equivalent, and otherwise NaN.

```js
[39, 21, 1, 104, 22].sort(d3.descending) // [104, 39, 22, 21, 1]
```

This is the comparator function for natural order, and can be used with [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to arrange elements in descending order.

## permute(*source*, *keys*) {#permute}

[Examples](https://observablehq.com/@d3/d3-permute) · [Source](https://github.com/d3/d3-array/blob/main/src/permute.js) · Returns a permutation of the specified *source* array or object using the specified iterable of *keys*. The returned array contains the corresponding property of the source object for each key in *keys*, in order.

```js
d3.permute(["a", "b", "c"], [1, 2, 0]) // returns ["b", "c", "a"]
```

The given *source* need not be an array; for example, given an object

```js
const object = {yield: 27, variety: "Manchuria", year: 1931, site: "University Farm"};
```

three fields could be extract like so

```js
d3.permute(object, ["site", "variety", "yield"]) // ["University Farm", "Manchuria", 27]
```

## quickselect(*array*, *k*, *lo*, *hi*, *compare*) {#quickselect}

[Examples](https://observablehq.com/@d3/d3-quickselect) · [Source](https://github.com/d3/d3-array/blob/main/src/quickselect.js) · Rearranges the elements of *array* between *lo* and *hi* (inclusive) in-place such that *array*[*k*] is the (*k* - *lo* + 1)-th smallest value and *array*.slice(*lo*, *k*) are the *k* smallest elements, according to the given *compare* function, and returns the given *array*. If *lo* is not specified, it defaults to zero; if *hi* is not specified, it defaults to *array*.length - 1; if *compare* is not specified, it defaults to [ascending](#ascending).

For example, given an array of numbers:

```js
const numbers = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
```

To select the smallest 8 elements:

```js
d3.quickselect(numbers, 8)
```

The rearranged *numbers* is

```js
[39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
//                               ^^ numbers[k]
```

where *numbers*[8] is 53: greater than the preceding *k* elements and less than the following elements. Implemented by [Volodymyr Agafonkin’s quickselect](https://github.com/mourner/quickselect).

## reverse(*iterable*) {#reverse}

[Source](https://github.com/d3/d3-array/blob/main/src/reverse.js) · Returns an array containing the values in the given *iterable* in reverse order.

```js
d3.reverse(new Set([0, 2, 3, 1])) // [1, 3, 2, 0]
```

Equivalent to [*array*.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), except that it does not mutate the given input and works with any iterable.

## shuffle(*array*, *start*, *stop*) {#shuffle}

[Examples](https://observablehq.com/@d3/d3-shuffle) · [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) · Randomizes the order of the specified *array* in-place using the [Fisher–Yates shuffle](https://bost.ocks.org/mike/shuffle/) and returns the *array*.

```js
d3.shuffle([..."abcdefg"]) // ["e", "c", "a", "d", "b", "g", "f"], perhaps
```

If *start* is specified, it is the starting index (inclusive) of the *array* to shuffle; if *start* is not specified, it defaults to zero. If *stop* is specified, it is the ending index (exclusive) of the *array* to shuffle; if *stop* is not specified, it defaults to *array*.length. For example, to shuffle the first ten elements of the *array*: shuffle(*array*, 0, 10).

## shuffler(*random*) {#shuffler}

[Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) · Returns a [shuffle function](#shuffle) given the specified random source.

```js
d3.shuffler(d3.randomLcg(42))([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) // [5, 3, 7, 6, 8, 9, 1, 4, 0, 2]
```

Often used with [d3.randomLcg](../d3-random.md) for a deterministic shuffle.

## sort(*iterable*, *comparator*) {#sort}

[Source](https://github.com/d3/d3-array/blob/main/src/sort.js) · Returns an array containing the values in the given *iterable* in the sorted order defined by the given *comparator* or *accessor* function. If *comparator* is not specified, it defaults to [d3.ascending](#ascending).

```js
d3.sort(new Set([0, 2, 3, 1])) // [0, 1, 2, 3]
```

If an *accessor* (a function that does not take exactly two arguments) is specified,

```js
d3.sort(data, (d) => d.value)
```

it is equivalent to a *comparator* using [natural order](#ascending):

```js
d3.sort(data, (a, b) => d3.ascending(a.value, b.value))
```

The *accessor* is only invoked once per element, and thus the returned sorted order is consistent even if the accessor is nondeterministic. Multiple accessors may be specified to break ties.

```js
d3.sort(points, ({x}) => x, ({y}) => y)
```

The above is equivalent to:

```js
d3.sort(data, (a, b) => d3.ascending(a.x, b.x) || d3.ascending(a.y, b.y))
```

Unlike [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), d3.sort does not mutate the given input, the comparator defaults to natural order instead of lexicographic order, and the input can be any iterable.

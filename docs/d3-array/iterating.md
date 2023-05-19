# d3-array: Iterating {#top}

These are equivalent to built-in array methods, but work with any iterable including Map, Set, and Generator.

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

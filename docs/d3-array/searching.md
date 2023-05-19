# d3-array: Searching {#top}

Methods for searching arrays for a specific element.

## minIndex(*iterable*, *accessor*) {#minIndex}

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

## maxIndex(*iterable*, *accessor*) {#maxIndex}

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

## least(*iterable*, *comparator*) {#least}

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

## leastIndex(*iterable*, *comparator*) {#leastIndex}

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

## greatest(*iterable*, *comparator*) {#greatest}

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

## greatestIndex(*iterable*, *comparator*) {#greatestIndex}

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

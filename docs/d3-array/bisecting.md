# d3-array: Bisecting {#top}

Bisection, or binary search, quickly finds a given value in a sorted array.

## bisector(accessor) {#bisector}

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

## *bisector*.right(array, x, lo, hi) {#bisector_right}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Equivalent to [bisectRight](#bisectRight), but uses this bisector’s associated comparator.

## *bisector*.left(array, x, lo, hi) {#bisector_left}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Equivalent to [bisectLeft](#bisectLeft), but uses this bisector’s associated comparator.

## *bisector*.center(array, x, lo, hi) {#bisector_center}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) -->

Returns the index of the closest value to *x* in the given sorted *array*. This expects that the bisector’s associated accessor returns a quantitative value, or that the bisector’s associated comparator returns a signed distance; otherwise, this method is equivalent to *bisector*.left.

## bisect(array, x, lo, hi) {#bisect}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-bisect) -->

Alias for [bisectRight](#bisectRight).

## bisectRight(array, x, lo, hi) {#bisectRight}

Similar to [bisectLeft](#bisectLeft), but returns an insertion point which comes after (to the right of) any existing entries of *x* in *array*. The returned insertion point *i* partitions the *array* into two halves so that all *v* <= *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* > *x* for *v* in *array*.slice(*i*, *hi*) for the right side.

## bisectLeft(array, x, lo, hi) {#bisectLeft}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->

Returns the insertion point for *x* in *array* to maintain sorted order. The arguments *lo* and *hi* may be used to specify a subset of the array which should be considered; by default the entire array is used. If *x* is already present in *array*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first argument to [splice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) assuming that *array* is already sorted. The returned insertion point *i* partitions the *array* into two halves so that all *v* < *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* >= *x* for *v* in *array*.slice(*i*, *hi*) for the right side.

## bisectCenter(array, x, lo, hi) {#bisectCenter}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/bisect.js) -->
<!-- [Examples](https://observablehq.com/@d3/multi-line-chart) -->

Returns the index of the value closest to *x* in the given *array* of numbers. The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used.

See [*bisector*.center](#bisector_center).

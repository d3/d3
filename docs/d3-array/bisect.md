# Bisecting data

Bisection, or binary search, quickly finds a given value in a sorted array. It is often used to find the position at which to insert a new value into an array while maintaining sorted order.

## bisector(*accessor*) {#bisector}

[Examples](https://observablehq.com/@d3/d3-bisect) · [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) · Returns a new bisector using the specified *accessor* function.

```js
const bisector = d3.bisector((d) => d.Date);
```

If the given *accessor* takes two arguments, it is interpreted as a comparator function for comparing an element *d* in the data with a search value *x*. Use a comparator rather than an accessor if you want values to be sorted in an order different than natural order, such as in descending rather than ascending order. The above is equivalent to:

```js
const bisector = d3.bisector((d, x) => d.Date - x);
```

The bisector can be used to bisect sorted arrays of objects (in contrast to [bisect](#bisect), which is for bisecting primitives).

## *bisector*.right(*array*, *x*, *lo*, *hi*) {#bisector_right}

```js
d3.bisector((d) => d.Date).right(aapl, new Date("2014-01-02")) // 163
```

Like [bisectRight](#bisectRight), but using this bisector’s accessor. The code above finds the index of the row immediately following Jan. 2, 2014 in the [*aapl* sample dataset](https://observablehq.com/@observablehq/sample-datasets#aapl).

## *bisector*.left(*array*, *x*, *lo*, *hi*) {#bisector_left}

```js
d3.bisector((d) => d.Date).left(aapl, new Date("2014-01-02")) // 162
```

Like [bisectLeft](#bisectLeft), but using this bisector’s accessor. The code above finds the index of the row for Jan. 2, 2014 in the [*aapl* sample dataset](https://observablehq.com/@observablehq/sample-datasets#aapl).

## *bisector*.center(*array*, *x*, *lo*, *hi*) {#bisector_center}

```js
d3.bisector((d) => d.Date).center(aapl, new Date("2013-12-31")) // 161
```

Returns the index of the closest value to *x* in the given sorted *array*. This expects that the bisector’s accessor returns a quantitative value, or that the bisector’s comparator returns a signed distance; otherwise, this method is equivalent to [*bisector*.left](#bisector_left). The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used.

## bisect(*array*, *x*, *lo*, *hi*) {#bisect}

```js
d3.bisect(aapl.map((d) => d.Date), new Date("2014-01-02")) // 163
```

Alias for [bisectRight](#bisectRight).

## bisectRight(*array*, *x*, *lo*, *hi*) {#bisectRight}

```js
d3.bisectRight(aapl.map((d) => d.Date), new Date("2014-01-02")) // 163
```

Like [bisectLeft](#bisectLeft), but returns an insertion point which comes after (to the right of) any existing entries equivalent to *x* in *array*. The returned insertion point *i* partitions the *array* into two halves so that all *v* <= *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* > *x* for *v* in *array*.slice(*i*, *hi*) for the right side. See also [*bisector*.right](#bisector_right).

## bisectLeft(*array*, *x*, *lo*, *hi*) {#bisectLeft}

```js
d3.bisectLeft(aapl.map((d) => d.Date), new Date("2014-01-02")) // 162
```

Returns the insertion point for *x* in *array* to maintain sorted order. The arguments *lo* and *hi* may be used to specify a subset of the array which should be considered; by default the entire array is used. If *x* is already present in *array*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first argument to [*array*.splice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) assuming that *array* is already sorted. The returned insertion point *i* partitions the *array* into two halves so that all *v* < *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* >= *x* for *v* in *array*.slice(*i*, *hi*) for the right side. See also [*bisector*.left](#bisector_left).

## bisectCenter(*array*, *x*, *lo*, *hi*) {#bisectCenter}

```js
d3.bisectCenter(aapl.map((d) => d.Date), new Date("2013-12-31")) // 161
```

Returns the index of the value closest to *x* in the given *array* of numbers. The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used. See also [*bisector*.center](#bisector_center).

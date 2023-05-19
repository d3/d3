# d3-array: Ticks {#top}

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

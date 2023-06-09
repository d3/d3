# Ticks {#Ticks}

Generate representative values from a continuous interval.

## ticks(*start*, *stop*, *count*) {#ticks}

[Examples](https://observablehq.com/@d3/d3-ticks) · [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Returns an array of approximately *count* + 1 uniformly-spaced, nicely-rounded values between *start* and *stop* (inclusive). Each value is a power of ten multiplied by 1, 2 or 5.

```js
d3.ticks(1, 9, 5) // [2, 4, 6, 8]
```
```js
d3.ticks(1, 9, 20) // [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
```

Ticks are inclusive in the sense that they may include the specified *start* and *stop* values if (and only if) they are exact, nicely-rounded values consistent with the inferred [step](#tickStep). More formally, each returned tick *t* satisfies *start* ≤ *t* and *t* ≤ *stop*.

## tickIncrement(*start*, *stop*, *count*) {#tickIncrement}

[Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Like [d3.tickStep](#tickStep), except requires that *start* is always less than or equal to *stop*, and if the tick step for the given *start*, *stop* and *count* would be less than one, returns the negative inverse tick step instead.

```js
d3.tickIncrement(1, 9, 5) // 2
```
```js
d3.tickIncrement(1, 9, 20) // -2, meaning a tick step 0.5
```

This method is always guaranteed to return an integer, and is used by [d3.ticks](#ticks) to guarantee that the returned tick values are represented as precisely as possible in IEEE 754 floating point.

## tickStep(*start*, *stop*, *count*) {#tickStep}

[Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Returns the difference between adjacent tick values if the same arguments were passed to [d3.ticks](#ticks): a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5.

```js
d3.tickStep(1, 9, 5) // 2
```

If *stop* is less than *start*, may return a negative tick step to indicate descending ticks.

```js
d3.tickStep(9, 1, 5) // -2
```

Note that due to the limited precision of IEEE 754 floating point, the returned value may not be exact decimals; use [d3-format](../d3-format.md) to format numbers for human consumption.

## nice(*start*, *stop*, *count*) {#nice}

[Source](https://github.com/d3/d3-array/blob/main/src/nice.js) · Returns a new interval [*niceStart*, *niceStop*] covering the given interval [*start*, *stop*] and where *niceStart* and *niceStop* are guaranteed to align with the corresponding [tick step](#tickStep).

```js
d3.nice(1, 9, 5) // [0, 10]
```

Like [d3.tickIncrement](#tickIncrement), this requires that *start* is less than or equal to *stop*.

## range(*start*, *stop*, *step*) {#range}

[Examples](https://observablehq.com/@d3/d3-range) · [Source](https://github.com/d3/d3-array/blob/main/src/range.js) · Returns an array containing an arithmetic progression, similar to the Python built-in [range](http://docs.python.org/library/functions.html#range). This method is often used to iterate over a sequence of uniformly-spaced numeric values, such as the indexes of an array or the ticks of a linear scale. (See also [d3.ticks](#ticks) for nicely-rounded values.)

```js
d3.range(6) // [0, 1, 2, 3, 4, 5]
```

If *step* is omitted, it defaults to 1. If *start* is omitted, it defaults to 0. The *stop* value is exclusive; it is not included in the result. If *step* is positive, the last element is the largest *start* + *i* \* *step* less than *stop*; if *step* is negative, the last element is the smallest *start* + *i* \* *step* greater than *stop*.

```js
d3.range(5, -1, -1) // [5, 4, 3, 2, 1, 0]
```

If the returned array would contain an infinite number of values, an empty range is returned.

```js
d3.range(Infinity) // []
```

The arguments are not required to be integers; however, the results are more predictable if they are. The values in the returned array are defined as *start* + *i* \* *step*, where *i* is an integer from zero to one minus the total number of elements in the returned array.

```js
d3.range(0, 1, 0.2) // [0, 0.2, 0.4, 0.6000000000000001, 0.8]
```

This behavior is due to IEEE 754 double-precision floating point, which defines 0.2 * 3 = 0.6000000000000001. Use [d3-format](../d3-format.md) to format numbers for human consumption with appropriate rounding; see also [*linear*.tickFormat](../d3-scale/linear.md#linear_tickFormat) in [d3-scale](../d3-scale.md). Likewise, if the returned array should have a specific length, consider using [*array*.map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on an integer range.

```js
d3.range(0, 1, 1 / 49) // 👎 returns 50 elements!
```
```js
d3.range(49).map((d) => d / 49) // 👍 returns 49 elements
```

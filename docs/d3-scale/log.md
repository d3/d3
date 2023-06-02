# Logarithmic scales

Logarithmic (“log”) scales are like [linear scales](./linear.md) except that a logarithmic transform is applied to the input domain value before the output range value is computed. The mapping to the range value *y* can be expressed as a function of the domain value *x*: *y* = *m* log(<i>x</i>) + *b*.

:::warning CAUTION
As log(0) = -∞, a log scale domain must be **strictly-positive or strictly-negative**; the domain must not include or cross zero. A log scale with a positive domain has a well-defined behavior for positive values, and a log scale with a negative domain has a well-defined behavior for negative values. (For a negative domain, input and output values are implicitly multiplied by -1.) The behavior of the scale is undefined if you pass a negative value to a log scale with a positive domain or vice versa.
:::

## scaleLog(*domain*, *range*) {#scaleLog}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Constructs a new log scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [base](#log_base) 10, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleLog([1, 10], [0, 960]);
```

If *domain* is not specified, it defaults to [1, 10]. If *range* is not specified, it defaults to [0, 1].

## *log*.base(*base*) {#log_base}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · If *base* is specified, sets the base for this logarithmic scale to the specified value.

```js
const x = d3.scaleLog([1, 1024], [0, 960]).base(2);
```

If *base* is not specified, returns the current base, which defaults to 10. Note that due to the nature of a logarithmic transform, the base does not affect the encoding of the scale; it only affects which [ticks](#log_ticks) are chosen.

## *log*.ticks(*count*) {#log_ticks}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.ticks](./linear.md#linear_ticks), but customized for a log scale.

```js
const x = d3.scaleLog([1, 100], [0, 960]);
const T = x.ticks(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

If the [base](#log_base) is an integer, the returned ticks are uniformly spaced within each integer power of base; otherwise, one tick per power of base is returned. The returned ticks are guaranteed to be within the extent of the domain. If the orders of magnitude in the [domain](./linear.md#linear_domain) is greater than *count*, then at most one tick per power is returned. Otherwise, the tick values are unfiltered, but note that you can use [*log*.tickFormat](./linear.md#linear_tickFormat) to filter the display of tick labels. If *count* is not specified, it defaults to 10.

## *log*.tickFormat(*count*, *specifier*) {#log_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.tickFormat](./linear.md#linear_tickFormat), but customized for a log scale. The specified *count* typically has the same value as the count that is used to generate the [tick values](#log_ticks).

```js
const x = d3.scaleLog([1, 100], [0, 960]);
const T = x.ticks(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, …]
const f = x.tickFormat();
T.map(f); // ["1", "2", "3", "4", "5", "", "", "", "", "10", …]
```

If there are too many ticks, the formatter may return the empty string for some of the tick labels; however, note that the ticks are still shown to convey the logarithmic transform accurately. To disable filtering, specify a *count* of Infinity.

When specifying a count, you may also provide a format *specifier* or format function. For example, to get a tick formatter that will display 20 ticks of a currency, say `log.tickFormat(20, "$,f")`. If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format. This provides a convenient way of specifying a format whose precision will be automatically set by the scale.

## *log*.nice() {#log_nice}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.nice](./linear.md#linear_nice), except extends the domain to integer powers of [base](#log_base).

```js
const x = d3.scaleLog([0.201479, 0.996679], [0, 960]).nice();
x.domain(); // [0.1, 1]
```

If the domain has more than two values, nicing the domain only affects the first and last value. Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using [*log*.domain](./linear.md#linear_domain). You must re-nice the scale after setting the new domain, if desired.


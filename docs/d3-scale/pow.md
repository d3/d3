# Power scales

Power (“pow”) scales are similar to [linear scales](./linear.md), except an exponential transform is applied to the input domain value before the output range value is computed. Each range value *y* can be expressed as a function of the domain value *x*: *y* = *mx^k* + *b*, where *k* is the [exponent](#pow_exponent) value. Power scales also support negative domain values, in which case the input value and the resulting output value are multiplied by -1.

### scalePow(*domain*, *range*) {#scalePow}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · Constructs a new pow scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [exponent](#pow_exponent) 1, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scalePow([0, 100], ["red", "blue"]).exponent(2);
```

If either *domain* or *range* are not specified, each defaults to [0, 1].

### scaleSqrt(*domain*, *range*) {#scaleSqrt}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · Constructs a new pow scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [exponent](#pow_exponent) 0.5, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleSqrt([0, 100], ["red", "blue"]);
```

If either *domain* or *range* are not specified, each defaults to [0, 1]. This is a convenience method equivalent to `d3.scalePow(…).exponent(0.5)`.

### *pow*.exponent(*exponent*) {#pow_exponent}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · If *exponent* is specified, sets the current exponent to the given numeric value and returns this scale.

```js
const x = d3.scalePow([0, 100], ["red", "blue"]).exponent(2);
```

If *exponent* is not specified, returns the current exponent, which defaults to 1.

```js
x.exponent() // 2
```

If the *exponent* is 1, the pow scale is effectively a [linear](./linear.md) scale.

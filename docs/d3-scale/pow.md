# d3-scale: Power scales

Power (“pow”) scales are similar to [linear scales](#linear-scales), except an exponential transform is applied to the input domain value before the output range value is computed. Each range value *y* can be expressed as a function of the domain value *x*: *y* = *mx^k* + *b*, where *k* is the [exponent](#pow_exponent) value. Power scales also support negative domain values, in which case the input value and the resulting output value are multiplied by -1.

### d3.scalePow(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

Constructs a new [continuous scale](#continuous-scales) with the specified [domain](#continuous_domain) and [range](#continuous_range), the [exponent](#pow_exponent) 1, the [default](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) [interpolator](#continuous_interpolate) and [clamping](#continuous_clamp) disabled. If either *domain* or *range* are not specified, each defaults to [0, 1]. (Note that this is effectively a [linear](#linear-scales) scale until you set a different exponent.)

### pow(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*](#_continuous).

### pow.invert(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.invert](#continuous_invert).

### pow.exponent(exponent)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

If *exponent* is specified, sets the current exponent to the given numeric value. If *exponent* is not specified, returns the current exponent, which defaults to 1. (Note that this is effectively a [linear](#linear-scales) scale until you set a different exponent.)

### pow.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.domain](#continuous_domain).

### pow.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.range](#continuous_range).

### pow.rangeRound(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.rangeRound](#continuous_rangeRound).

### pow.clamp(clamp)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.clamp](#continuous_clamp).

### pow.interpolate(interpolate)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.interpolate](#continuous_interpolate).

### pow.ticks(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/scale-ticks)

See [*continuous*.ticks](#continuous_ticks).

### pow.tickFormat(count, specifier)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/scale-ticks)

See [*continuous*.tickFormat](#continuous_tickFormat).

### pow.nice(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.nice](#continuous_nice).

### pow.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.copy](#continuous_copy).

### d3.scaleSqrt(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/pow.js), [Examples](https://observablehq.com/@d3/continuous-scales)

Constructs a new [continuous](#continuous-scales) [power scale](#power-scales) with the specified [domain](#continuous_domain) and [range](#continuous_range), the [exponent](#pow_exponent) 0.5, the [default](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) [interpolator](#continuous_interpolate) and [clamping](#continuous_clamp) disabled. If either *domain* or *range* are not specified, each defaults to [0, 1]. This is a convenience method equivalent to `d3.scalePow(…).exponent(0.5)`.

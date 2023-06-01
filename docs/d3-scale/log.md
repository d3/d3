# d3-scale: Logarithmic scales

Logarithmic (“log”) scales are similar to [linear scales](#linear-scales), except a logarithmic transform is applied to the input domain value before the output range value is computed. The mapping to the range value *y* can be expressed as a function of the domain value *x*: *y* = *m* log(<i>x</i>) + *b*.

As log(0) = -∞, a log scale domain must be **strictly-positive or strictly-negative**; the domain must not include or cross zero. A log scale with a positive domain has a well-defined behavior for positive values, and a log scale with a negative domain has a well-defined behavior for negative values. (For a negative domain, input and output values are implicitly multiplied by -1.) The behavior of the scale is undefined if you pass a negative value to a log scale with a positive domain or vice versa.

### d3.scaleLog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

Constructs a new [continuous scale](#continuous-scales) with the specified [domain](#log_domain) and [range](#log_range), the [base](#log_base) 10, the [default](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) [interpolator](#log_interpolate) and [clamping](#log_clamp) disabled. If *domain* is not specified, it defaults to [1, 10]. If *range* is not specified, it defaults to [0, 1].

### log(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*](#_continuous).

### log.invert(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.invert](#continuous_invert).

### log.base(base)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

If *base* is specified, sets the base for this logarithmic scale to the specified value. If *base* is not specified, returns the current base, which defaults to 10.

### log.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.domain](#continuous_domain).

### log.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.range](#continuous_range).

### log.rangeRound(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.rangeRound](#continuous_rangeRound).

### log.clamp(clamp)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.clamp](#continuous_clamp).

### log.interpolate(interpolate)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.interpolate](#continuous_interpolate).

### log.ticks(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/scale-ticks)

Like [*continuous*.ticks](#continuous_ticks), but customized for a log scale. If the [base](#log_base) is an integer, the returned ticks are uniformly spaced within each integer power of base; otherwise, one tick per power of base is returned. The returned ticks are guaranteed to be within the extent of the domain. If the orders of magnitude in the [domain](#log_domain) is greater than *count*, then at most one tick per power is returned. Otherwise, the tick values are unfiltered, but note that you can use [*log*.tickFormat](#log_tickFormat) to filter the display of tick labels. If *count* is not specified, it defaults to 10.

### log.tickFormat(count, specifier)

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/scale-ticks)

Like [*continuous*.tickFormat](#continuous_tickFormat), but customized for a log scale. The specified *count* typically has the same value as the count that is used to generate the [tick values](#continuous_ticks). If there are too many ticks, the formatter may return the empty string for some of the tick labels; however, note that the ticks are still shown. To disable filtering, specify a *count* of Infinity. When specifying a count, you may also provide a format *specifier* or format function. For example, to get a tick formatter that will display 20 ticks of a currency, say `log.tickFormat(20, "$,f")`. If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format. This provides a convenient way of specifying a format whose precision will be automatically set by the scale.

### log.nice()

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/d3-scalelinear)

Like [*continuous*.nice](#continuous_nice), except extends the domain to integer powers of [base](#log_base). For example, for a domain of [0.201479…, 0.996679…], and base 10, the nice domain is [0.1, 1]. If the domain has more than two values, nicing the domain only affects the first and last value.

### log.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/log.js), [Examples](https://observablehq.com/@d3/continuous-scales)

See [*continuous*.copy](#continuous_copy).

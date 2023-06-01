# d3-scale: Symlog scales

See [A bi-symmetric log transformation for wide-range data](https://www.researchgate.net/profile/John_Webber4/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data/links/0fcfd50d791c85082e000000.pdf) by Webber for more.

### d3.scaleSymlog(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js), [Examples](https://observablehq.com/@d3/continuous-scales)

Constructs a new [continuous scale](#continuous-scales) with the specified [domain](#continuous_domain) and [range](#continuous_range), the [constant](#symlog_constant) 1, the [default](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) [interpolator](#continuous_interpolate) and [clamping](#continuous_clamp) disabled. If *domain* is not specified, it defaults to [0, 1]. If *range* is not specified, it defaults to [0, 1].

### symlog.constant(constant)

[Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js), [Examples](https://observablehq.com/@d3/continuous-scales)

If *constant* is specified, sets the symlog constant to the specified number and returns this scale; otherwise returns the current value of the symlog constant, which defaults to 1. See “A bi-symmetric log transformation for wide-range data” by Webber for more.

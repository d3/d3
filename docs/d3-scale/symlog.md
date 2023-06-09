# Symlog scales

See [A bi-symmetric log transformation for wide-range data](https://www.researchgate.net/profile/John_Webber4/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data/links/0fcfd50d791c85082e000000.pdf) by Webber for details. Unlike a [log scale](./log.md), a symlog scale domain can include zero.

## scaleSymlog(*domain*, *range*) {#scaleSymlog}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js) · Constructs a new continuous scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [constant](#symlog_constant) 1, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleSymlog([0, 100], [0, 960]);
```

If a single argument is specified, it is interpreted as the *range*. If either *domain* or *range* are not specified, each defaults to [0, 1].

```js
const color = d3.scaleSymlog(["red", "blue"]) // default domain of [0, 1]
```

## *symlog*.constant(*constant*) {#symlog_constant}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js) · If *constant* is specified, sets the symlog constant to the specified number and returns this scale. The constant defaults to 1.

```js
const x = d3.scaleSymlog([0, 100], [0, 960]).constant(2);
```

If *constant* is not specified, returns the current value of the symlog constant.

```js
x.constant() // 2
```

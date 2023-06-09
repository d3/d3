# Ordinal scales

Unlike [continuous scales](./linear.md), ordinal scales have a discrete domain and range. For example, an ordinal scale might map a set of named categories to a set of colors, or determine the horizontal positions of columns in a column chart.

## scaleOrdinal(*domain*, *range*) {#scaleOrdinal}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Constructs a new ordinal scale with the specified [*domain*](#ordinal_domain) and [*range*](#ordinal_range).

```js
const color = d3.scaleOrdinal(["a", "b", "c"], ["red", "green", "blue"]);
```

If *domain* is not specified, it defaults to the empty array. If *range* is not specified, it defaults to the empty array; an ordinal scale always returns undefined until a non-empty range is defined.

## *ordinal*(*value*) {#_ordinal}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Given a *value* in the input [domain](#ordinal_domain), returns the corresponding value in the output [range](#ordinal_range).

```js
color("a") // "red"
```

If the given *value* is not in the scale’s [domain](#ordinal_domain), returns the [unknown value](#ordinal_unknown); or, if the unknown value is [implicit](#scaleImplicit) (the default), then the *value* is implicitly added to the domain and the next-available value in the range is assigned to *value*, such that this and subsequent invocations of the scale given the same input *value* return the same output value.

## *ordinal*.domain(*domain*) {#ordinal_domain}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *domain* is specified, sets the domain to the specified array of values.

```js
const color = d3.scaleOrdinal(["red", "green", "blue"]).domain(["a", "b", "c"]);
color("a"); // "red"
color("b"); // "green"
color("c"); // "blue"
```

The first element in *domain* will be mapped to the first element in the range, the second domain value to the second range value, and so on. Domain values are stored internally in an [InternMap](../d3-array/intern.md) from primitive value to index; the resulting index is then used to retrieve a value from the range. Thus, an ordinal scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding range value.

```js
color.domain() // ["a", "b", "c"]
```

If *domain* is not specified, this method returns the current domain.

Setting the domain on an ordinal scale is optional if the [unknown value](#ordinal_unknown) is [implicit](#scaleImplicit) (the default). In this case, the domain will be inferred implicitly from usage by assigning each unique value passed to the scale a new value from the range.

```js
const color = d3.scaleOrdinal(["red", "green", "blue"]);
color("b"); // "red"
color("a"); // "green"
color("c"); // "blue"
color.domain(); // inferred ["b", "a", "c"]
```

:::warning CAUTION
An explicit domain is recommended for deterministic behavior; inferring the domain from usage is dependent on ordering.
:::

## *ordinal*.range(*range*) {#ordinal_range}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *range* is specified, sets the range of the ordinal scale to the specified array of values.

```js
const color = d3.scaleOrdinal().range(["red", "green", "blue"]);
```

The first element in the domain will be mapped to the first element in *range*, the second domain value to the second range value, and so on. If there are fewer elements in the range than in the domain, the scale will reuse values from the start of the range. If *range* is not specified, this method returns the current range.

## *ordinal*.unknown(*value*) {#ordinal_unknown}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *value* is specified, sets the output value of the scale for unknown input values and returns this scale.

```js
const color = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10).unknown(null);
color("a"); // "#4e79a7"
color("b"); // "#f28e2c"
color("c"); // "#e15759"
color("d"); // null
```

If *value* is not specified, returns the current unknown value, which defaults to [implicit](#scaleImplicit). The implicit value enables implicit domain construction; see [*ordinal*.domain](#ordinal_domain).

## *ordinal*.copy() {#ordinal_copy}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Returns an exact copy of this ordinal scale.

```js
const c1 = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

## scaleImplicit {#scaleImplicit}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · A special value for [*ordinal*.unknown](#ordinal_unknown) that enables implicit domain construction: unknown values are implicitly added to the domain.

```js
const color = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10);
color.unknown(); // d3.scaleImplicit
```

:::warning CAUTION
An explicit domain is recommended for deterministic behavior; inferring the domain from usage is dependent on ordering.
:::

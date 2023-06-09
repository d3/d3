<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import PlotRender from "../components/PlotRender.js";

const domain = ref("a,b,c,d,e,f");
const padding = ref(0.1);
const align = ref(0.5);
const round = ref(false);

</script>

# Point scales

Point scales are a variant of [band scales](./band.md) with the bandwidth fixed to zero. Point scales are typically used for scatterplots with an ordinal or categorical dimension.

## scalePoint(*domain*, *range*) {#scalePoint}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Constructs a new point scale with the specified [*domain*](#point_domain) and [*range*](#point_range), no [padding](#point_padding), no [rounding](#point_round) and center [alignment](#point_align). If *domain* is not specified, it defaults to the empty domain. If *range* is not specified, it defaults to the unit range [0, 1].

## *point*(*value*) {#_point}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Given a *value* in the input [domain](#point_domain), returns the corresponding point derived from the output [range](#point_range).

```js
const x = d3.scalePoint(["a", "b", "c"], [0, 960]);
x("a"); // 0
x("b"); // 480
x("c"); // 960
x("d"); // undefined
```

If the given *value* is not in the scale’s domain, returns undefined.

## *point*.domain(*domain*) {#point_domain}

<p>
  <label class="label-input">
    Domain:
    <input type="text" v-model="domain">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.1,
    domain: d3.csvParseRows(domain).flat()
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX(d3.csvParseRows(domain).flat(), {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *domain* is specified, sets the domain to the specified array of values.

```js-vue
const x = d3.scalePoint([0, 960]).domain([{{d3.csvParseRows(domain).flat().map(JSON.stringify).join(", ")}}]);
```

The first element in *domain* will be mapped to the first point, the second domain value to the second point, and so on. Domain values are stored internally in an [InternMap](../d3-array/intern.md) from primitive value to index; the resulting index is then used to determine the point. Thus, a point scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding point. If *domain* is not specified, this method returns the current domain.

## *point*.range(*range*) {#point_range}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *range* is specified, sets the scale’s range to the specified two-element array of numbers and returns this scale.

```js
const x = d3.scalePoint().range([0, 960]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. If *range* is not specified, returns the scale’s current range, which defaults to [0, 1].

## *point*.rangeRound(*range*) {#point_rangeRound}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Sets the scale’s [*range*](#point_range) to the specified two-element array of numbers while also enabling [rounding](#point_round); returns this scale.

```js
const x = d3.scalePoint().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
point.range(range).round(true)
```

Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles.

## *point*.round(*round*) {#point_round}

<p>
  <label class="label-input">
    Round:
    <input type="checkbox" v-model="round">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    round
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *round* is specified, enables or disables rounding accordingly.

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).round({{round}});
```

If *round* is not specified, returns whether rounding is enabled.

```js-vue
x.round() // {{round}}
```

If rounding is enabled, the position of each point will be integers. Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding! Use [*point*.align](#point_align) to specify how the leftover space is distributed.

## *point*.padding(*padding*) {#point_padding}

<p>
  <label class="label-input">
    <span>Padding:</span>
    <input type="range" v-model.number="padding" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the outer padding to the specified number which is typically in the range [0, 1].

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).padding({{padding}});
```

If *padding* is not specified, returns the current outer padding which defaults to 0.

```js-vue
x.padding() // {{padding}}
```

The outer padding specifies the amount of blank space, in terms of multiples of the [step](./band.md#band_step), to reserve before the first point and after the last point. Equivalent to [*band*.paddingOuter](./band.md#band_paddingOuter).

## *point*.align(*align*) {#point_align}

<p>
  <label class="label-input">
    <span>Align:</span>
    <input type="range" v-model.number="align" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{align.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    align,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *align* is specified, sets the alignment to the specified value which must be in the range [0, 1].

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).align({{align}});
```

If *align* is not specified, returns the current alignment which defaults to 0.5.

```js-vue
x.align() // {{align}}
```

The alignment specifies how any leftover unused space in the range is distributed. A value of 0.5 indicates that the leftover space should be equally distributed before the first point and after the last point; *i.e.*, the points should be centered within the range. A value of 0 or 1 may be used to shift the points to one side, say to position them adjacent to an axis.

## *point*.bandwidth() {#point_bandwidth}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns zero.

## *point*.step() {#point_step}

<PlotRender :options='{
  grid: true,
  marginTop: 10.5,
  x: {
    padding: 0.2,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"}),
    Plot.dotX(["a"], {stroke: "var(--vp-c-brand)", symbol: {draw(context, size) { const x = Plot.scale({x: {type: "point", padding: 0.2, round: false, domain: "abcdefghij", range: [20, 688 - 20]}}); context.moveTo(6, -22 - 3); context.lineTo(0, -22); context.lineTo(6, -22 + 3); context.moveTo(0, -22); context.lineTo(x.step, -22); context.moveTo(x.step - 6, -22 - 3); context.lineTo(x.step, -22); context.lineTo(x.step - 6, -22 + 3); }}})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the distance between adjacent points.

## *point*.copy() {#point_copy}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.

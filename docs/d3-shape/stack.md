<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import PlotRender from "../components/PlotRender.js";

const riaa = shallowRef([]);

onMounted(() => {
  d3.csv("../data/riaa-us-revenue.csv", d3.autoType).then((data) => (riaa.value = data));
});

</script>

# Stacks

<!-- https://observablehq.com/@mbostock/streamgraph-transitions -->

[Examples](https://observablehq.com/@d3/stacked-bar-chart/2) · Stacking converts lengths into contiguous position intervals. For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by category, stacking bars vertically and applying a categorical color encoding. Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories as only the bottom layer of the stack is aligned. So, chose the [stack order](#stack_order) carefully, and consider a [streamgraph](#stackOffsetWiggle). (See also [grouped charts](https://observablehq.com/@d3/grouped-bar-chart/2).)

Like the [pie generator](./pie.md), the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an [area generator](./area.md) or use directly, say to position bars.

## stack() {#stack}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · Constructs a new stack generator with the default settings. See [*stack*](#_stack) for usage.

## *stack*(*data*, ...*arguments*) {#_stack}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · Generates a stack for the given array of *data* and returns an array representing each series. Any additional *arguments* are arbitrary; they are propagated to accessors along with the `this` object.

For example, consider this tidy table of monthly fruit sales:

date    | fruit    |   sales
--------|----------|--------:
 1/2015 | apples   |    3840
 1/2015 | bananas  |    1920
 1/2015 | cherries |     960
 1/2015 | durians  |     400
 2/2015 | apples   |    1600
 2/2015 | bananas  |    1440
 2/2015 | cherries |     960
 2/2015 | durians  |     400
 3/2015 | apples   |     640
 3/2015 | bananas  |     960
 3/2015 | cherries |     640
 3/2015 | durians  |     400
 4/2015 | apples   |     320
 4/2015 | bananas  |     480
 4/2015 | cherries |     640
 4/2015 | durians  |     400

This could be represented in JavaScript as an array of objects, perhaps parsed from [CSV](../d3-dsv.md):

```js
const data = [
  {date: new Date("2015-01-01"), fruit: "apples", sales: 3840},
  {date: new Date("2015-01-01"), fruit: "bananas", sales: 1920},
  {date: new Date("2015-01-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-01-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-02-01"), fruit: "apples", sales: 1600},
  {date: new Date("2015-02-01"), fruit: "bananas", sales: 1440},
  {date: new Date("2015-02-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-02-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-03-01"), fruit: "apples", sales: 640},
  {date: new Date("2015-03-01"), fruit: "bananas", sales: 960},
  {date: new Date("2015-03-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-03-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-04-01"), fruit: "apples", sales: 320},
  {date: new Date("2015-04-01"), fruit: "bananas", sales: 480},
  {date: new Date("2015-04-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-04-01"), fruit: "durians", sales: 400}
];
```

To compute the stacked series (a series, or layer, for each *fruit*; and a stack, or column, for each *date*), we can [index](../d3-array/group.md#index) the data by *date* and then *fruit*, compute the distinct *fruit* names across the data set, and lastly get the *sales* value for each *date* and *fruit*.

```js
const series = d3.stack()
    .keys(d3.union(data.map(d => d.fruit))) // apples, bananas, cherries, …
    .value(([, group], key) => group.get(key).sales)
  (d3.index(data, d => d.date, d => d.fruit));
```

:::tip
See [union](../d3-array/sets.md#union) and [index](../d3-array/group.md#index) from d3-array.
:::

The resulting array has one element per *series*. Each series has one point per month, and each point has a lower and upper value defining the baseline and topline:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]]  // durians
]
```

Each series in then typically passed to an [area generator](./area.md) to render an area chart, or used to construct rectangles for a bar chart.

```js
svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
    .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(D => D)
  .join("rect")
    .attr("x", d => x(d.data[0]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());
```

The series are determined by the [keys accessor](#stack_keys); each series *i* in the returned array corresponds to the *i*th key. Each series is an array of points, where each point *j* corresponds to the *j*th element in the input *data*. Lastly, each point is represented as an array [*y0*, *y1*] where *y0* is the lower value (baseline) and *y1* is the upper value (topline); the difference between *y0* and *y1* corresponds to the computed [value](#stack_value) for this point. The key for each series is available as *series*.key, and the [index](#stack_order) as *series*.index. The input data element for each point is available as *point*.data.

## *stack*.keys(*keys*) {#stack_keys}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *keys* is specified, sets the keys accessor to the specified function or array and returns this stack generator.

```js
const stack = d3.stack().keys(["apples", "bananas", "cherries", "durians"]);
```

If *keys* is not specified, returns the current keys accessor.

```js
stack.keys() // () => ["apples", "bananas", "cherries", "durians"]
```

The keys accessor defaults to the empty array. A series (layer) is [generated](#_stack) for each key. Keys are typically strings, but they may be arbitrary values; see [InternMap](../d3-array/intern.md). The series’ key is passed to the [value accessor](#stack_value), along with each data point, to compute the point’s value.

## *stack*.value(*value*) {#stack_value}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *value* is specified, sets the value accessor to the specified function or number and returns this stack generator.

```js
const stack = d3.stack().value((d, key) => d[key]);
```

If *value* is not specified, returns the current value accessor.

```js
stack.value() // (d, key) => d[key]
```

The value accessor defaults to:

```js
function value(d, key) {
  return d[key];
}
```

:::warning CAUTION
The default value accessor assumes that the input data is an array of objects exposing named properties with numeric values. This is a “wide” rather than “tidy” representation of data and is no longer recommended. See [*stack*](#_stack) for an example using tidy data.
:::

## *stack*.order(*order*) {#stack_order}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *order* is specified, sets the order accessor to the specified function or array and returns this stack generator.

```js
const stack = d3.stack().order(d3.stackOrderNone);
```

If *order* is a function, it is passed the generated series array and must return an array of numeric indexes representing the stack order. For example, to use reverse key order:

```js
const stack = d3.stack().order(series => d3.range(series.length).reverse());
```

The stack order is computed prior to the [offset](#stack_offset); thus, the lower value for all points is zero at the time the order is computed. The index attribute for each series is also not set until after the order is computed.

If *order* is not specified, returns the current order accessor.

```js
stack.order() // d3.stackOrderNone
```

The order accessor defaults to [stackOrderNone](#stackOrderNone); this uses the order given by the [key accessor](#stack_keys). See [stack orders](#stack-orders) for the built-in orders.

## *stack*.offset(*offset*) {#stack_offset}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *offset* is specified, sets the offset accessor to the specified function and returns this stack generator.

```js
const stack = d3.stack().offset(d3.stackOffsetExpand);
```

The offset function is passed the generated series array and the order index array; it is then responsible for updating the lower and upper values in the series array. See the built-in offsets for a reference implementation.

If *offset* is not specified, returns the current offset acccesor.

```js
stack.offset() // d3.stackOffsetExpand
```

The offset accessor defaults to [stackOffsetNone](#stackOffsetNone); this uses a zero baseline. See [stack offsets](#stack-offsets) for the built-in offsets.

## Stack orders

Stack orders are typically not used directly, but are instead passed to [*stack*.order](#stack_order).

### stackOrderAppearance(*series*) {#stackOrderAppearance}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderAppearance);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/appearance.js) · Returns a series order such that the earliest series (according to the maximum value) is at the bottom.

### stackOrderAscending(*series*) {#stackOrderAscending}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "sum"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderAscending);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/ascending.js) · Returns a series order such that the smallest series (according to the sum of values) is at the bottom.

### stackOrderDescending(*series*) {#stackOrderDescending}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "-sum"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderDescending);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/descending.js) · Returns a series order such that the largest series (according to the sum of values) is at the bottom.

### stackOrderInsideOut(*series*) {#stackOrderInsideOut}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "wiggle", order: "inside-out"}),
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderInsideOut);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/insideOut.js) · Returns a series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the [wiggle offset](#stackOffsetWiggle). See [Stacked Graphs — Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Byron & Wattenberg for more information.

### stackOrderNone(*series*) {#stackOrderNone}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: null}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderNone);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/none.js) · Returns the given series order [0, 1, … *n* - 1] where *n* is the number of elements in *series*. Thus, the stack order is given by the [key accessor](#stack_keys).

### stackOrderReverse(*series*) {#stackOrderReverse}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: null, reverse: true}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderReverse);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/reverse.js) · Returns the reverse of the given series order [*n* - 1, *n* - 2, … 0] where *n* is the number of elements in *series*. Thus, the stack order is given by the reverse of the [key accessor](#stack_keys).

## Stack offsets

Stack offsets are typically not used directly, but are instead passed to [*stack*.offset](#stack_offset).

### stackOffsetExpand(*series*, *order*) {#stackOffsetExpand}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (%)",
    percent: true
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "expand", order: "-appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetExpand);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/expand.js) · Applies a zero baseline and normalizes the values for each point such that the topline is always one.

### stackOffsetDiverging(*series*, *order*) {#stackOffsetDiverging}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: (d) => (d.group === "Disc" ? -1 : 1) * d.revenue, z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetDiverging);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/diverging.js) · Positive values are stacked above zero, negative values are [stacked below zero](https://observablehq.com/@d3/diverging-stacked-bar-chart/2), and zero values are stacked at zero.

### stackOffsetNone(*series*, *order*) {#stackOffsetNone}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetNone);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/none.js) · Applies a zero baseline.

### stackOffsetSilhouette(*series*, *order*) {#stackOffsetSilhouette}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "center", order: "appearance"})
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetSilhouette);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/silhouette.js) · Shifts the baseline down such that the center of the streamgraph is always at zero.

### stackOffsetWiggle(*series*, *order*) {#stackOffsetWiggle}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "wiggle"})
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetWiggle);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/wiggle.js) · Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the [inside-out order](#stackOrderInsideOut). See [Stacked Graphs — Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Bryon & Wattenberg for more information.

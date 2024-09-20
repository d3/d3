<script setup>

import ExampleArcs from "../components/ExampleArcs.vue";
import {ref} from "vue";

const padAngle = ref(0.03);

</script>

# Pies

[Examples](https://observablehq.com/@d3/donut-chart/2) · The pie generator computes the necessary angles to represent a tabular dataset as a pie or donut chart; these angles can then be passed to an [arc generator](./arc.md). (The pie generator does not produce a shape directly.)

## pie() {#pie}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · Constructs a new pie generator with the default settings.

```js
const pie = d3.pie();
```

## *pie*(*data*, ...*arguments*) {#_pie}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · Generates a pie for the given array of *data*, returning an array of objects representing each datum’s arc angles. For example, given a set of numbers, here is how to compute the angles for a pie chart:

```js
const data = [1, 1, 2, 3, 5, 8, 13, 21];
const pie = d3.pie();
const arcs = pie(data);
```

The resulting `arcs` is an array of objects:

```json
[
  {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```

Each object in the returned array has the following properties:

* `data` - the input datum; the corresponding element in the input data array.
* `value` - the numeric [value](#pie_value) of the arc.
* `index` - the zero-based [sorted index](#pie_sort) of the arc.
* `startAngle` - the [start angle](#pie_startAngle) of the arc.
* `endAngle` - the [end angle](#pie_endAngle) of the arc.
* `padAngle` - the [pad angle](#pie_padAngle) of the arc.

This representation is designed to work with the arc generator’s default [startAngle](./arc.md#arc_startAngle), [endAngle](./arc.md#arc_endAngle) and [padAngle](./arc.md#arc_padAngle) accessors. Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

The length of the returned array is the same as *data*, and each element *i* in the returned array corresponds to the element *i* in the input data. The returned array of arcs is in the same order as the data, even when the pie chart is [sorted](#pie_sortValues).

Any additional *arguments* are arbitrary; they are propagated to the pie generator’s accessor functions along with the `this` object.

## *pie*.value(*value*) {#pie_value}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *value* is specified, sets the value accessor to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().value((d) => d.value);
```

When a pie is [generated](#_pie), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *value* is not specified, returns the current value accessor.

```js
pie.value() // (d) => d.value
```

The value accessor defaults to:

```js
function value(d) {
  return d;
}
```

The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf). If your data are not numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum. For example, given a CSV file with *number* and *name* fields:

```
number,name
4,Locke
8,Reyes
15,Ford
16,Jarrah
23,Shephard
42,Kwon
```

You might say:

```js
const data = await d3.csv("lost.csv", d3.autoType);
const pie = d3.pie().value((d) => d.number);
const arcs = pie(data);
```

This is similar to [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) your data to values before invoking the pie generator:

```js
const arcs = d3.pie()(data.map((d) => d.number));
```

The benefit of an accessor is that the input data remains associated with the returned objects, thereby making it easier to access other fields of the data, for example to set the color or to add text labels.

## *pie*.sort(*compare*) {#pie_sort}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *compare* is specified, sets the data comparator to the specified function and returns this pie generator.

```js
const pie = d3.pie().sort((a, b) => d3.ascending(a.name, b.name));
```

The data comparator takes two arguments *a* and *b*, each elements from the input data array. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified.

If *compare* is not specified, returns the current data comparator.

```js
pie.sort() // (a, b) => d3.ascending(a.name, b.name))
```

The data comparator defaults to null. If both the data comparator and the [value comparator](#pie_sortValues) are null, then arcs are positioned in the original input order. Setting the data comparator implicitly sets the value comparator to null.

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it only affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

## *pie*.sortValues(*compare*) {#pie_sortValues}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *compare* is specified, sets the value comparator to the specified function and returns this pie generator.

```js
const pie = d3.pie().sortValues(d3.ascending);
```

The value comparator is similar to the [data comparator](#pie_sort), except the two arguments *a* and *b* are values derived from the input data array using the [value accessor](#pie_value) rather than the data elements. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified.

If *compare* is not specified, returns the current value comparator.

```js
pie.sortValues() // d3.ascending
```

The value comparator defaults to [descending](../d3-array/sort.md#descending). If both the [data comparator](#pie_sort) and the value comparator are null, then arcs are positioned in the original input order. Setting the value comparator implicitly sets the [data comparator](#pie_sort) to null.

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

## *pie*.startAngle(*angle*) {#pie_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the overall start angle of the pie to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().startAngle(0);
```

The start angle is the *overall* start angle of the pie, *i.e.*, the start angle of the first arc. It is typically expressed as a constant number but can also be expressed as a function of data. When a function, the start angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current start angle accessor.

```js
pie.startAngle() // () => 0
```

The start angle accessor defaults to:

```js
function startAngle() {
  return 0;
}
```

Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *pie*.endAngle(*angle*) {#pie_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the overall end angle of the pie to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().endAngle(Math.PI);
```

The end angle here means the *overall* end angle of the pie, *i.e.*, the end angle of the last arc. It is typically expressed as a constant number but can also be expressed as a function of data. When a function, the end angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current end angle accessor.

```js
pie.endAngle() // () => Math.PI
```

The end angle accessor defaults to:

```js
function endAngle() {
  return 2 * Math.PI;
}
```

Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. The value of the end angle is constrained to [startAngle](#pie_startAngle) ± τ, such that |endAngle - startAngle| ≤ τ.

## *pie*.padAngle(*angle*) {#pie_padAngle}

<p>
  <label class="label-input">
    <span>Pad angle:</span>
    <input type="range" v-model.number="padAngle" min="0" max="0.1" step="0.001">
    <span style="font-variant-numeric: tabular-nums;">{{padAngle.toFixed(3)}}</span>
  </label>
</p>

<ExampleArcs :padAngle="padAngle" />

[Examples](https://observablehq.com/@d3/arc-pad-angle) · [Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the pad angle to the specified function or number and returns this pie generator.

```js-vue
const pie = d3.pie().padAngle({{padAngle}});
```

The pad angle specifies the angular separation in radians between adjacent arcs. The total amount of padding is the specified *angle* times the number of elements in the input data array, and at most |[endAngle](#pie_endAngle) - [startAngle](#pie_startAngle)|; the remaining space is divided proportionally by [value](#pie_value) such that the relative area of each arc is preserved.

The pad angle is typically expressed as a constant number but can also be expressed as a function of data. When a function, the pad angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current pad angle accessor.

```js-vue
pie.padAngle() // () => {{padAngle}}
```

The pad angle accessor defaults to:

```js
function padAngle() {
  return 0;
}
```

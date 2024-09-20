<script setup>

import ExampleArcs from "../components/ExampleArcs.vue";
import {ref} from "vue";

const cornerRadius = ref(18);
const padAngle = ref(0.03);
const padRadius = ref(200);

</script>

# Arcs

The arc generator produces a [circular](https://en.wikipedia.org/wiki/Circular_sector) or [annular](https://en.wikipedia.org/wiki/Annulus_(mathematics)) sector, as in a [pie](https://observablehq.com/@d3/pie-chart/2) or [donut](https://observablehq.com/@d3/donut-chart/2) chart. Arcs are centered at the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to move the arc to a different position.

```js
svg.append("path")
    .attr("transform", "translate(100,100)")
    .attr("d", d3.arc()({
      innerRadius: 100,
      outerRadius: 200,
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2
    }));
```

If the absolute difference between the [start](#arc_startAngle) and [end](#arc_endAngle) angles (the *angular span*) is greater than 2π, the arc generator will produce a complete circle or annulus. If it is less than 2π, the arc’s angular length will be equal to the absolute difference between the two angles (going clockwise if the signed difference is positive and anticlockwise if it is negative). If the absolute difference is less than 2π, the arc may have [rounded corners](#arc_cornerRadius) and [angular padding](#arc_padAngle).

See also the [pie generator](./pie.md), which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.

## arc() {#arc}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Constructs a new arc generator with the default settings. With default settings:

```js
const arc = d3.arc();
```

Or, with the radii and angles configured as constants:

```js
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2);
```

## *arc*(...*arguments*) {#_arc}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Generates an arc for the given *arguments*. The *arguments* are arbitrary; they are propagated to the arc generator’s accessor functions along with the `this` object. For example, with the default settings, an object with radii and angles is expected:

```js
const arc = d3.arc();

arc({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
}); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the radii and angles are instead defined as constants, you can generate an arc without any arguments:

```js
d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2)
  (); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the arc generator has a [context](#arc_context), then the arc is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

## *arc*.centroid(...*arguments*) {#arc_centroid}

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Computes the midpoint [*x*, *y*] of the center line of the arc that would be [generated](#_arc) by the given *arguments*.

The *arguments* are arbitrary; they are propagated to the arc generator’s accessor functions along with the `this` object. To be consistent with the generated arc, the accessors must be deterministic, *i.e.*, return the same value given the same arguments. The midpoint is defined as ([startAngle](#arc_startAngle) + [endAngle](#arc_endAngle)) / 2 and ([innerRadius](#arc_innerRadius) + [outerRadius](#arc_outerRadius)) / 2. For example:

Note that this is **not the geometric center** of the arc, which may be outside the arc; this method is merely a convenience for positioning labels.

## *arc*.innerRadius(*radius*) {#arc_innerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the inner radius to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().innerRadius(40);
```

If *radius* is not specified, returns the current inner radius accessor.

```js
arc.innerRadius() // () => 40
```

The inner radius accessor defaults to:

```js
function innerRadius(d) {
  return d.innerRadius;
}
```

Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a [sqrt scale](../d3-scale/pow.md). More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

## *arc*.outerRadius(*radius*) {#arc_outerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the outer radius to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().outerRadius(240);
```

If *radius* is not specified, returns the current outer radius accessor.

```js
arc.outerRadius() // () => 240
```

The outer radius accessor defaults to:

```js
function outerRadius(d) {
  return d.outerRadius;
}
```

Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart, often in conjunction with a [sqrt scale](../d3-scale/pow.md). More commonly, a constant outer radius is used for a pie or donut chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

## *arc*.cornerRadius(*radius*) {#arc_cornerRadius}

<p>
  <label class="label-input">
    <span>Corner radius:</span>
    <input type="range" v-model.number="cornerRadius" min="0" max="80" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{cornerRadius.toFixed(0)}}</span>
  </label>
</p>

<ExampleArcs :cornerRadius="cornerRadius" />

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the corner radius to the specified function or number and returns this arc generator.

```js-vue
const arc = d3.arc().cornerRadius({{cornerRadius}});
```

If *radius* is not specified, returns the current corner radius accessor.

```js-vue
arc.cornerRadius() // () => {{cornerRadius}}
```

The corner radius accessor defaults to:

```js
function cornerRadius() {
  return 0;
}
```

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius. For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded.

The corner radius may not be larger than ([outerRadius](#arc_outerRadius) - [innerRadius](#arc_innerRadius)) / 2. In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect. This occurs more often with the inner corners. See the [arc corners animation](https://observablehq.com/@d3/arc-corners) for illustration.

## *arc*.startAngle(*angle*) {#arc_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the start angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().startAngle(Math.PI / 4);
```

If *angle* is not specified, returns the current start angle accessor.

```js
arc.startAngle() // () => 0.7853981633974483
```

The start angle accessor defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ 2π, a complete circle or annulus is generated rather than a sector.

## *arc*.endAngle(*angle*) {#arc_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the end angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().endAngle(Math.PI);
```

If *angle* is not specified, returns the current end angle accessor.

```js
arc.endAngle() // () => 3.141592653589793
```

The end angle accessor defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ 2π, a complete circle or annulus is generated rather than a sector.

## *arc*.padAngle(*angle*) {#arc_padAngle}

<p>
  <label class="label-input">
    <span>Pad angle:</span>
    <input type="range" v-model.number="padAngle" min="0" max="0.1" step="0.001">
    <span style="font-variant-numeric: tabular-nums;">{{padAngle.toFixed(3)}}</span>
  </label>
</p>

<ExampleArcs :padAngle="padAngle" />

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the pad angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().padAngle(0);
```

If *angle* is not specified, returns the current pad angle accessor.

```js
arc.padAngle() // () => 0
```

The pad angle accessor defaults to:

```js
function padAngle() {
  return d && d.padAngle;
}
```

The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as [padRadius](#arc_padRadius) × padAngle. This distance is subtracted equally from the [start](#arc_startAngle) and [end](#arc_endAngle) of the arc. If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ 2π, the pad angle is ignored.

If the [inner radius](#arc_innerRadius) or angular span is small relative to the pad angle, it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector. For this reason, padding is typically only applied to annular sectors (*i.e.*, when innerRadius is positive), as shown in this diagram:

The recommended minimum inner radius when using padding is outerRadius \* padAngle / sin(θ), where θ is the angular span of the smallest arc before padding. For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels. See the [arc padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration.

Often, the pad angle is not set directly on the arc generator, but is instead computed by the [pie generator](./pie.md) so as to ensure that the area of padded arcs is proportional to their value; see [*pie*.padAngle](./pie.md#pie_padAngle). See the [pie padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration. If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.

## *arc*.padRadius(*radius*) {#arc_padRadius}

<p>
  <label class="label-input">
    <span>Pad radius:</span>
    <input type="range" v-model.number="padRadius" min="0" max="400" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{padRadius.toFixed()}}</span>
  </label>
</p>

<ExampleArcs :padAngle="0.05" :padRadius="padRadius" />

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the pad radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt([innerRadius](#arc_innerRadius) × innerRadius + [outerRadius](#arc_outerRadius) × outerRadius). The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius × [padAngle](#arc_padAngle).

## *arc*.context(*context*) {#arc_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *context* is specified, sets the context and returns this arc generator.

```js
const context = canvas.getContext("2d");
const arc = d3.arc().context(context);
```

If *context* is not specified, returns the current context, which defaults to null.

```js
arc.context() // context
```

If the context is not null, then the [generated arc](#_arc) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated arc is returned.

## *arc*.digits(*digits*) {#arc_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this arc generator.

```js
const arc = d3.arc().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
arc.digits() // 3
```

This option only applies when the associated [*context*](#arc_context) is null, as when this arc generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

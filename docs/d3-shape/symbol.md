<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "../components/PlotRender.js";

</script>

# Symbols

[Examples](https://observablehq.com/@d3/fitted-symbols) · Symbols provide a categorical shape encoding as in a scatterplot. Symbols are centered at the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to move the symbol to a different position.

## symbol(*type*, *size*) {#symbol}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · Constructs a new symbol generator of the specified [type](#symbol_type) and [size](#symbol_size). If not specified, *type* defaults to a circle, and *size* defaults to 64.

```js
svg.append("path").attr("d", d3.symbol(d3.symbolCross));
```

## *symbol*(...*arguments*) {#_symbol}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · Generates a symbol for the given *arguments*. The *arguments* are arbitrary; they are propagated to the symbol generator’s accessor functions along with the `this` object. With the default settings, invoking the symbol generator produces a circle of 64 square pixels.

```js
d3.symbol()() // "M4.514,0A4.514,4.514,0,1,1,-4.514,0A4.514,4.514,0,1,1,4.514,0"
```


If the symbol generator has a [context](#symbol_context), then the symbol is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

## *symbol*.type(*type*) {#symbol_type}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *type* is specified, sets the symbol type to the specified function or symbol type and returns this symbol generator.

```js
const symbol = d3.symbol().type(d3.symbolCross);
```

If *type* is a function, the symbol generator’s arguments and *this* are passed through. This is convenient for use with [*selection*.attr](../d3-selection/modifying.md#selection_attr), say in conjunction with an [ordinal scale](../d3-scale/ordinal.md) to produce a categorical symbol encoding.

```js
const symbolType = d3.scaleOrdinal(d3.symbolsFill);
const symbol = d3.symbol().type((d) => symbolType(d.category));
```

If *type* is not specified, returns the current symbol type accessor.

```js
symbol.type() // () => d3.symbolCross
```

The symbol type accessor defaults to:

```js
function type() {
  return circle;
}
```

See [symbolsFill](#symbolsFill) and [symbolsStroke](#symbolsStroke) for built-in symbol types. To implement a custom symbol type, pass an object that implements [*symbolType*.draw](#symbolType_draw).

## *symbol*.size(*size*) {#symbol_size}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *size* is specified, sets the size to the specified function or number and returns this symbol generator.

```js
const symbol = d3.symbol().size(100);
```

If *size* is a function, the symbol generator’s arguments and *this* are passed through. This is convenient for use with [*selection*.attr](../d3-selection/modifying.md#selection_attr), say in conjunction with a [linear scale](../d3-scale/linear.md) to produce a quantitative size encoding.

```js
const symbolSize = d3.scaleLinear([0, 100]);
const symbol = d3.symbol().size((d) => symbolSize(d.value));
```

If *size* is not specified, returns the current size accessor.

```js
symbol.size() // () => 100
```

The size accessor defaults to:

```js
function size() {
  return 64;
}
```

## *symbol*.context(*context*) {#symbol_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *context* is specified, sets the context and returns this symbol generator.

```js
const context = canvas.getContext("2d");
const symbol = d3.symbol().context(context);
```

If *context* is not specified, returns the current context.

```js
symbol.context() // context
```

The context defaults to null. If the context is not null, then the [generated symbol](#_symbol) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated symbol is returned.

## *symbol*.digits(*digits*) {#symbol_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this symbol generator.

```js
const symbol = d3.symbol().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
symbol.digits() // 3
```

This option only applies when the associated [*context*](#symbol_context) is null, as when this symbol generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## symbolsFill {#symbolsFill}

<PlotRender :options='{
  marks: [
    Plot.dotX(["circle", "cross", "diamond", "square", "star", "triangle", "wye"], {fill: "currentColor", symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · An array containing a set of symbol types designed for filling: [circle](#symbolCircle), [cross](#symbolCross), [diamond](#symbolDiamond), [square](#symbolSquare), [star](#symbolStar), [triangle](#symbolTriangle), and [wye](#symbolWye). Useful for a categorical shape encoding with an [ordinal scale](../d3-scale/ordinal.md).

```js
const symbolType = d3.scaleOrdinal(d3.symbolsFill);
```

## symbolsStroke {#symbolsStroke}

<PlotRender :options='{
  marks: [
    Plot.dotX(["circle", "plus", "times", "triangle2", "asterisk", "square2", "diamond2"], {stroke: "currentColor", symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · An array containing a set of symbol types designed for stroking: [circle](#symbolCircle), [plus](#symbolPlus), [times](#symbolTimes), [triangle2](#symbolTriangle2), [asterisk](#symbolAsterisk), [square2](#symbolSquare2), and [diamond2](#symbolDiamond2). Useful for a categorical shape encoding with an [ordinal scale](../d3-scale/ordinal.md).

```js
const symbolType = d3.scaleOrdinal(d3.symbolsStroke);
```

## symbolAsterisk {#symbolAsterisk}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["asterisk"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/asterisk.js) · The asterisk symbol type; intended for stroking.

## symbolCircle {#symbolCircle}

<PlotRender :options='{
  width: 80,
  height: 40,
  axis: null,
  x: {type: "band"},
  marks: [
    Plot.dotX(["circle"], {x: 0, stroke: "currentColor", r: 12, symbol: Plot.identity}),
    Plot.dotX(["circle"], {x: 1, fill: "currentColor", r: 12, symbol: Plot.identity}),
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/circle.js) · The circle symbol type; intended for either filling or stroking.

## symbolCross {#symbolCross}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["cross"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/cross.js) · The Greek cross symbol type, with arms of equal length; intended for filling.

## symbolDiamond {#symbolDiamond}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["diamond"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js) · The rhombus symbol type; intended for filling.

## symbolDiamond2 {#symbolDiamond2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["diamond2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js) · The rotated square symbol type; intended for stroking.

## symbolPlus {#symbolPlus}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["plus"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/plus.js) · The plus symbol type; intended for stroking.

## symbolSquare {#symbolSquare}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["square"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square.js) · The square symbol type; intended for filling.

## symbolSquare2 {#symbolSquare2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["square2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square2.js) · The square2 symbol type; intended for stroking.

## symbolStar {#symbolStar}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["star"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/star.js) · The pentagonal star (pentagram) symbol type; intended for filling.

## symbolTriangle {#symbolTriangle}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["triangle"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle.js) · The up-pointing triangle symbol type; intended for filling.

## symbolTriangle2 {#symbolTriangle2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["triangle2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle2.js) · The up-pointing triangle symbol type; intended for stroking.

## symbolWye {#symbolWye}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["wye"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/wye.js) · The Y-shape symbol type; intended for filling.

## symbolTimes {#symbolTimes}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["times"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/times.js) · The X-shape symbol type; intended for stroking.

## Custom symbols

Symbol types are typically not used directly, instead being passed to [*symbol*.type](#symbol_type). However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface. You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.

```js
const path = d3.pathRound(3);
const circle = d3.symbolCircle.draw(path, 64);
path.toString(); // "M4.514,0A4.514,4.514,0,1,1,-4.514,0A4.514,4.514,0,1,1,4.514,0"
```

### *symbolType*.draw(*context*, *size*) {#symbolType_draw}

Renders this symbol type to the specified *context* with the specified *size* in square pixels. The *context* implements the [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) interface. (Note that this is a subset of the CanvasRenderingContext2D interface!) See also [d3-path](../d3-path.md).

## pointRadial(*angle*, *radius*) {#pointRadial}

[Examples](https://observablehq.com/@d3/radial-area-chart) · [Source](https://github.com/d3/d3-shape/blob/main/src/pointRadial.js) · Returns the point [<i>x</i>, <i>y</i>] for the given *angle* in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise, and the given *radius*.

```js
d3.pointRadial(Math.PI / 3, 100) // [86.60254037844386, -50]
```

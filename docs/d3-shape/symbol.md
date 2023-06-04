# Symbols

Symbols provide a categorical shape encoding as is commonly used in scatterplots. Symbols are always centered at ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to move the symbol to a different position.

### d3.symbol(type, size)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js), [Examples](https://observablehq.com/@d3/fitted-symbols)

Constructs a new symbol generator of the specified [type](#symbol_type) and [size](#symbol_size). If not specified, *type* defaults to a circle, and *size* defaults to 64.

### symbol(arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

Generates a symbol for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the symbol generator’s accessor functions along with the `this` object. For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels. If the symbol generator has a [context](#symbol_context), then the symbol is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

### symbol.type(type)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *type* is specified, sets the symbol type to the specified function or symbol type and returns this symbol generator. If *type* is a function, the symbol generator’s arguments and *this* are passed through. (See [*selection*.attr](https://github.com/d3/d3-selection/blob/main/README.md#selection_attr) if you are using d3-selection.) If *type* is not specified, returns the current symbol type accessor, which defaults to:

```js
function type() {
  return circle;
}
```

See [symbolsFill](#symbolsFill) and [symbolsStroke](#symbolsStroke) for built-in symbol types. To implement a custom symbol type, pass an object that implements [*symbolType*.draw](#symbolType_draw).

### symbol.size(size)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *size* is specified, sets the size to the specified function or number and returns this symbol generator. If *size* is a function, the symbol generator’s arguments and *this* are passed through. (See [*selection*.attr](https://github.com/d3/d3-selection/blob/main/README.md#selection_attr) if you are using d3-selection.) If *size* is not specified, returns the current size accessor, which defaults to:

```js
function size() {
  return 64;
}
```

Specifying the size as a function is useful for constructing a scatterplot with a size encoding. If you wish to scale the symbol to fit a given bounding box, rather than by area, try [SVG’s getBBox](https://observablehq.com/d/1fac2626b9e1b65f).

### symbol.context(context)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *context* is specified, sets the context and returns this symbol generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated symbol](#_symbol) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated symbol is returned.

### symbol.digits(digits)

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this symbol generator. If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3. This option only applies when the associated [*context*](#symbol_context) is null, as when this symbol generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

### d3.symbolsFill

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

<a href="#symbolCircle"><img src="./img/circle.png" width="100" height="100"></a>
<a href="#symbolCross"><img src="./img/cross.png" width="100" height="100"></a>
<a href="#symbolDiamond"><img src="./img/diamond.png" width="100" height="100"></a>
<a href="#symbolSquare"><img src="./img/square.png" width="100" height="100"></a>
<a href="#symbolStar"><img src="./img/star.png" width="100" height="100"></a>
<a href="#symbolTriangle"><img src="./img/triangle.png" width="100" height="100"></a>
<a href="#symbolWye"><img src="./img/wye.png" width="100" height="100"></a>

An array containing a set of symbol types designed for filling: [circle](#symbolCircle), [cross](#symbolCross), [diamond](#symbolDiamond), [square](#symbolSquare), [star](#symbolStar), [triangle](#symbolTriangle), and [wye](#symbolWye). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

### d3.symbolsStroke

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js)

An array containing a set of symbol types designed for stroking: [circle](#symbolCircle), [plus](#symbolPlus), [times](#symbolTimes), [triangle2](#symbolTriangle2), [asterisk](#symbolAsterisk), [square2](#symbolSquare2), and [diamond2](#symbolDiamond2). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

### d3.symbolAsterisk

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/asterisk.js)

The asterisk symbol type; intended for stroking.

### d3.symbolCircle

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/circle.js)

The circle symbol type; intended for either filling or stroking.

### d3.symbolCross

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/cross.js)

The Greek cross symbol type, with arms of equal length; intended for filling.

### d3.symbolDiamond

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js)

The rhombus symbol type; intended for filling.

### d3.symbolDiamond2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js)

The rotated square symbol type; intended for stroking.

### d3.symbolPlus

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/plus.js)

The plus symbol type; intended for stroking.

### d3.symbolSquare

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square.js)

The square symbol type; intended for filling.

### d3.symbolSquare2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square2.js)

The square2 symbol type; intended for stroking.

### d3.symbolStar

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/star.js)

The pentagonal star (pentagram) symbol type; intended for filling.

### d3.symbolTriangle

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle.js)

The up-pointing triangle symbol type; intended for filling.

### d3.symbolTriangle2

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle2.js)

The up-pointing triangle symbol type; intended for stroking.

### d3.symbolWye

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/wye.js)

The Y-shape symbol type; intended for filling.

### d3.symbolTimes

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/times.js)

The X-shape symbol type; intended for stroking.

## Custom symbol types

Symbol types are typically not used directly, instead being passed to [*symbol*.type](#symbol_type). However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface. You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.

### symbolType.draw(context, size)

Renders this symbol type to the specified *context* with the specified *size* in square pixels. The *context* implements the [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) interface. (Note that this is a subset of the CanvasRenderingContext2D interface!)

### d3.pointRadial(angle, radius)

[Source](https://github.com/d3/d3-shape/blob/main/src/pointRadial.js), [Examples](https://observablehq.com/@d3/radial-area-chart)

Returns the point [<i>x</i>, <i>y</i>] for the given *angle* in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise, and the given *radius*.

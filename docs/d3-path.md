# d3-path

[Examples](https://observablehq.com/@d3/d3-path) · Say you have some code that draws to a 2D canvas:

```js
function drawCircle(context, radius) {
  context.moveTo(radius, 0);
  context.arc(0, 0, radius, 0, 2 * Math.PI);
}
```

The d3-path module lets you take this exact code and additionally render to [SVG](http://www.w3.org/TR/SVG/paths.html). It works by [serializing](#path_toString) [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls to [SVG path data](http://www.w3.org/TR/SVG/paths.html#PathData). For example:

```js
const path = d3.path();
drawCircle(path, 40);
path.toString(); // "M40,0A40,40,0,1,1,-40,0A40,40,0,1,1,40,0"
```

Now code you write once can be used with both Canvas (for performance) and SVG (for convenience). For a practical example, see [d3-shape](./d3-shape.md).

## path() {#path}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Constructs a new path serializer that implements [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods).

## *path*.moveTo(*x*, *y*) {#path_moveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Move to the specified point ⟨*x*, *y*⟩. Equivalent to [*context*.moveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-moveto) and SVG’s [“moveto” command](http://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands).

```js
path.moveTo(100, 100);
```

## *path*.closePath() {#path_closePath}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Ends the current subpath and causes an automatic straight line to be drawn from the current point to the initial point of the current subpath. Equivalent to [*context*.closePath](http://www.w3.org/TR/2dcontext/#dom-context-2d-closepath) and SVG’s [“closepath” command](http://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand).

```js
path.closePath();
```

## *path*.lineTo(*x*, *y*) {#path_lineTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a straight line from the current point to the specified point ⟨*x*, *y*⟩. Equivalent to [*context*.lineTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-lineto) and SVG’s [“lineto” command](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

```js
path.lineTo(200, 200);
```

## *path*.quadraticCurveTo(*cpx*, *cpy*, *x*, *y*) {#path_quadraticCurveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a quadratic Bézier segment from the current point to the specified point ⟨*x*, *y*⟩, with the specified control point ⟨*cpx*, *cpy*⟩. Equivalent to [*context*.quadraticCurveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-quadraticcurveto) and SVG’s [quadratic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands).

```js
path.quadraticCurveTo(200, 0, 200, 200);
```

## *path*.bezierCurveTo(*cpx1*, *cpy1*, *cpx2*, *cpy2*, *x*, *y*) {#path_bezierCurveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a cubic Bézier segment from the current point to the specified point ⟨*x*, *y*⟩, with the specified control points ⟨*cpx1*, *cpy1*⟩ and ⟨*cpx2*, *cpy2*⟩. Equivalent to [*context*.bezierCurveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-beziercurveto) and SVG’s [cubic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands).

```js
path.bezierCurveTo(200, 0, 0, 200, 200, 200);
```

## *path*.arcTo(*x1*, *y1*, *x2*, *y2*, *radius*) {#path_arcTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a circular arc segment with the specified *radius* that starts tangent to the line between the current point and the specified point ⟨*x1*, *y1*⟩ and ends tangent to the line between the specified points ⟨*x1*, *y1*⟩ and ⟨*x2*, *y2*⟩. If the first tangent point is not equal to the current point, a straight line is drawn between the current point and the first tangent point. Equivalent to [*context*.arcTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-arcto) and uses SVG’s [elliptical arc curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands).

```js
path.arcTo(150, 150, 300, 10, 40);
```

## *path*.arc(*x*, *y*, *radius*, *startAngle*, *endAngle*, *anticlockwise*) {#path_arc}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a circular arc segment with the specified center ⟨*x*, *y*⟩, *radius*, *startAngle* and *endAngle*. If *anticlockwise* is true, the arc is drawn in the anticlockwise direction; otherwise, it is drawn in the clockwise direction. If the current point is not equal to the starting point of the arc, a straight line is drawn from the current point to the start of the arc. Equivalent to [*context*.arc](http://www.w3.org/TR/2dcontext/#dom-context-2d-arc) and uses SVG’s [elliptical arc curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands).

```js
path.arc(80, 80, 70, 0, Math.PI * 2);
```

## *path*.rect(*x*, *y*, *w*, *h*) {#path_rect}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Creates a new subpath containing just the four points ⟨*x*, *y*⟩, ⟨*x* + *w*, *y*⟩, ⟨*x* + *w*, *y* + *h*⟩, ⟨*x*, *y* + *h*⟩, with those four points connected by straight lines, and then marks the subpath as closed. Equivalent to [*context*.rect](http://www.w3.org/TR/2dcontext/#dom-context-2d-rect) and uses SVG’s [“lineto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

```js
path.rect(10, 10, 140, 140);
```

## *path*.toString() {#path_toString}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Returns the string representation of this *path* according to SVG’s [path data specification](http://www.w3.org/TR/SVG/paths.html#PathData).

```js
path.toString() // "M40,0A40,40,0,1,1,-40,0A40,40,0,1,1,40,0"
```

## pathRound(*digits* = 3) {#pathRound}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Like [path](#path), except limits the digits after the decimal to the specified number of *digits*. Useful for reducing the size of generated SVG path data.

```js
const path = d3.pathRound(3);
```

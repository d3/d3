# Ribbons

A ribbon visually represents the volume of flow between two nodes in a [chord diagram](../d3-chord.md). Ribbons come in two varieties: [ribbon](#ribbon) represents a bidirectional flow, while [ribbonArrow](#ribbonArrow) represents a unidirectional flow. The latter is suitable for [chordDirected](./chord.md#chordDirected).

## ribbon() {#ribbon}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Creates a new ribbon generator with the default settings.

```js
const ribbon = d3.ribbon();
```

## *ribbon*(...*arguments*) {#_ribbon}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Generates a ribbon for the given *arguments*. The *arguments* are arbitrary; they are propagated to the ribbon generator’s accessor functions along with the `this` object. For example, with the default settings, a [chord object](./chord.md) is expected:

```js
ribbon({
  source: {startAngle: 0.7524114, endAngle: 1.1212972, radius: 240},
  target: {startAngle: 1.8617078, endAngle: 1.9842927, radius: 240}
}) // "M164.0162810494058,-175.21032946354026A240,240,0,0,1,216.1595644740915,-104.28347273835429Q0,0,229.9158815306728,68.8381247563705A240,240,0,0,1,219.77316791012538,96.43523560788266Q0,0,164.0162810494058,-175.21032946354026Z"
```

If the ribbon generator has a [context](#ribbon_context), then the ribbon is rendered to this context as a sequence of path method calls and this function returns void. Otherwise, a path data string is returned.

## *ribbon*.source(*source*) {#ribbon_source}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *source* is specified, sets the source accessor to the specified function and returns this ribbon generator. If *source* is not specified, returns the current source accessor, which defaults to:

```js
function source(d) {
  return d.source;
}
```

## *ribbon*.target(*target*) {#ribbon_target}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *target* is specified, sets the target accessor to the specified function and returns this ribbon generator. If *target* is not specified, returns the current target accessor, which defaults to:

```js
function target(d) {
  return d.target;
}
```

## *ribbon*.radius(*radius*) {#ribbon_radius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the source and target radius accessor to the specified function and returns this ribbon generator. For example to set a fixed radius of 240 pixels:

```js
const ribbon = d3.ribbon().radius(240);
```

Now the arguments you pass to [*ribbon*](#_ribbon) do not need to specify a *radius* property on the source and target.

```js
ribbon({
  source: {startAngle: 0.7524114, endAngle: 1.1212972},
  target: {startAngle: 1.8617078, endAngle: 1.9842927}
}) // "M164.0162810494058,-175.21032946354026A240,240,0,0,1,216.1595644740915,-104.28347273835429Q0,0,229.9158815306728,68.8381247563705A240,240,0,0,1,219.77316791012538,96.43523560788266Q0,0,164.0162810494058,-175.21032946354026Z"
```

If *radius* is not specified, returns the current source radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

## *ribbon*.sourceRadius(*radius*) {#ribbon_sourceRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the source radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current source radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

## *ribbon*.targetRadius(*radius*) {#ribbon_targetRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the target radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current target radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

By convention, the target radius in asymmetric chord diagrams is typically inset from the source radius, resulting in a gap between the end of the directed link and its associated group arc.

## *ribbon*.startAngle(*angle*) {#ribbon_startAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the start angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *ribbon*.endAngle(*angle*) {#ribbon_endAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the end angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *ribbon*.padAngle(*angle*) {#ribbon_padAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the pad angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return 0;
}
```

The pad angle specifies the angular gap between adjacent ribbons.

## *ribbon*.context(*context*) {#ribbon_context}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *context* is specified, sets the context and returns this ribbon generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated ribbon](#_ribbon) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated ribbon is returned. See also [d3-path](../d3-path.md).

## ribbonArrow() {#ribbonArrow}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Creates a new arrow ribbon generator with the default settings. See also [chordDirected](./chord.md#chordDirected).

## *ribbonArrow*.headRadius(*radius*) {#ribbonArrow_headRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the arrowhead radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current arrowhead radius accessor, which defaults to:

```js
function headRadius() {
  return 10;
}
```

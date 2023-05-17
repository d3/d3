# d3-axis

The axis component renders human-readable reference marks for [scales](https://github.com/d3/d3-scale). This alleviates one of the more tedious tasks in visualizing data.

Regardless of orientation, axes are always rendered at the origin. To change the position of the axis with respect to the chart, specify a [transform attribute](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) on the containing element. For example:

```js
d3.select("body").append("svg")
    .attr("width", 1440)
    .attr("height", 30)
  .append("g")
    .attr("transform", "translate(0,30)")
    .call(axis);
```

The elements created by the axis are considered part of its public API. You can apply external stylesheets or modify the generated axis elements to [customize the axis appearance](https://observablehq.com/@d3/styled-axes).

[<img alt="Custom Axis" src="https://raw.githubusercontent.com/d3/d3-axis/master/img/custom.png" width="420" height="219">](https://observablehq.com/@d3/styled-axes)

An axis consists of a [path element](https://www.w3.org/TR/SVG/paths.html#PathElement) of class “domain” representing the extent of the scale’s domain, followed by transformed [g elements](https://www.w3.org/TR/SVG/struct.html#Groups) of class “tick” representing each of the scale’s ticks. Each tick has a [line element](https://www.w3.org/TR/SVG/shapes.html#LineElement) to draw the tick line, and a [text element](https://www.w3.org/TR/SVG/text.html#TextElement) for the tick label. For example, here is a typical bottom-oriented axis:

```html
<g fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
  <path class="domain" stroke="currentColor" d="M0.5,6V0.5H880.5V6"></path>
  <g class="tick" opacity="1" transform="translate(0.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.0</text>
  </g>
  <g class="tick" opacity="1" transform="translate(176.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.2</text>
  </g>
  <g class="tick" opacity="1" transform="translate(352.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.4</text>
  </g>
  <g class="tick" opacity="1" transform="translate(528.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.6</text>
  </g>
  <g class="tick" opacity="1" transform="translate(704.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.8</text>
  </g>
  <g class="tick" opacity="1" transform="translate(880.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">1.0</text>
  </g>
</g>
```

The orientation of an axis is fixed; to change the orientation, remove the old axis and create a new axis.

## Axes

### d3.axisTop(scale)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

Constructs a new top-oriented axis generator for the given [scale](https://github.com/d3/d3-scale), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn above the horizontal domain path.

### d3.axisRight(scale)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

Constructs a new right-oriented axis generator for the given [scale](https://github.com/d3/d3-scale), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn to the right of the vertical domain path.

### d3.axisBottom(scale)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

Constructs a new bottom-oriented axis generator for the given [scale](https://github.com/d3/d3-scale), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn below the horizontal domain path.

### d3.axisLeft(scale)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

Constructs a new left-oriented axis generator for the given [scale](https://github.com/d3/d3-scale), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn to the left of the vertical domain path.

### axis(context)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

Render the axis to the given *context*, which may be either a [selection](https://github.com/d3/d3-selection) of SVG containers (either SVG or G elements) or a corresponding [transition](https://github.com/d3/d3-transition).

### axis.scale(scale)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *scale* is specified, sets the [scale](https://github.com/d3/d3-scale) and returns the axis. If *scale* is not specified, returns the current scale.

### axis.ticks(...arguments)

Sets the *arguments* that will be passed to [*scale*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#continuous_ticks) and [*scale*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) when the axis is [rendered](#_axis), and returns the axis generator. The meaning of the *arguments* depends on the [axis’ scale](#axis_scale) type: most commonly, the arguments are a suggested *count* for the number of ticks (or a [time *interval*](https://github.com/d3/d3-time) for time scales), and an optional [format *specifier*](https://github.com/d3/d3-format) to customize how the tick values are formatted.

This method has no effect if the scale does not implement *scale*.ticks, as with [band](https://github.com/d3/d3-scale/blob/master/README.md#band-scales) and [point](https://github.com/d3/d3-scale/blob/master/README.md#point-scales) scales. To set the tick values explicitly, use [*axis*.tickValues](#axis_tickValues). To set the tick format explicitly, use [*axis*.tickFormat](#axis_tickFormat).

For example, to generate twenty ticks with SI-prefix formatting on a linear scale, say:

```js
axis.ticks(20, "s");
```

To generate ticks every fifteen minutes with a time scale, say:

```js
axis.ticks(d3.timeMinute.every(15));
```

This method is also a convenience function for [*axis*.tickArguments](#axis_tickArguments). For example, this:

```js
axis.ticks(10);
```

Is equivalent to:

```js
axis.tickArguments([10]);
```

To generate tick values directly, use [*scale*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#continuous_ticks).

### axis.tickArguments(arguments)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *arguments* is specified, sets the *arguments* that will be passed to [*scale*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#continuous_ticks) and [*scale*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) when the axis is [rendered](#_axis), and returns the axis generator. The meaning of the *arguments* depends on the [axis’ scale](#axis_scale) type: most commonly, the arguments are a suggested *count* for the number of ticks (or a [time *interval*](https://github.com/d3/d3-time) for time scales), and an optional [format *specifier*](https://github.com/d3/d3-format) to customize how the tick values are formatted.

If *arguments* is specified, this method has no effect if the scale does not implement *scale*.ticks, as with [band](https://github.com/d3/d3-scale/blob/master/README.md#band-scales) and [point](https://github.com/d3/d3-scale/blob/master/README.md#point-scales) scales. To set the tick values explicitly, use [*axis*.tickValues](#axis_tickValues). To set the tick format explicitly, use [*axis*.tickFormat](#axis_tickFormat).

If *arguments* is not specified, returns the current tick arguments, which defaults to the empty array.

For example, to generate twenty ticks with SI-prefix formatting on a linear scale, say:

```js
axis.tickArguments([20, "s"]);
```

To generate ticks every fifteen minutes with a time scale, say:

```js
axis.tickArguments([d3.timeMinute.every(15)]);
```

See also [*axis*.ticks](#axis_ticks).

### axis.tickValues(values)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If a *values* iterable is specified, the specified values are used for ticks rather than using the scale’s automatic tick generator. If *values* is null, clears any previously-set explicit tick values and reverts back to the scale’s tick generator. If *values* is not specified, returns the current tick values, which defaults to null. For example, to generate ticks at specific values:

```js
var xAxis = d3.axisBottom(x)
    .tickValues([1, 2, 3, 5, 8, 13, 21]);
```

The explicit tick values take precedent over the tick arguments set by [*axis*.tickArguments](#axis_tickArguments). However, any tick arguments will still be passed to the scale’s [tickFormat](#axis_tickFormat) function if a tick format is not also set.

### axis.tickFormat(format)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *format* is specified, sets the tick format function and returns the axis. If *format* is not specified, returns the current format function, which defaults to null. A null format indicates that the scale’s default formatter should be used, which is generated by calling [*scale*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat). In this case, the arguments specified by [*axis*.tickArguments](#axis_tickArguments) are likewise passed to *scale*.tickFormat.

See [d3-format](https://github.com/d3/d3-format) and [d3-time-format](https://github.com/d3/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
axis.tickFormat(d3.format(",.0f"));
```

More commonly, a format specifier is passed to [*axis*.ticks](#axis_ticks):

```js
axis.ticks(10, ",f");
```

This has the advantage of setting the format precision automatically based on the tick interval.

### axis.tickSize(size)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *size* is specified, sets the [inner](#axis_tickSizeInner) and [outer](#axis_tickSizeOuter) tick size to the specified value and returns the axis. If *size* is not specified, returns the current inner tick size, which defaults to 6.

### axis.tickSizeInner(size)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *size* is specified, sets the inner tick size to the specified value and returns the axis. If *size* is not specified, returns the current inner tick size, which defaults to 6. The inner tick size controls the length of the tick lines, offset from the native position of the axis.

### axis.tickSizeOuter(size)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *size* is specified, sets the outer tick size to the specified value and returns the axis. If *size* is not specified, returns the current outer tick size, which defaults to 6. The outer tick size controls the length of the square ends of the domain path, offset from the native position of the axis. Thus, the “outer ticks” are not actually ticks but part of the domain path, and their position is determined by the associated scale’s domain extent. Thus, outer ticks may overlap with the first or last inner tick. An outer tick size of 0 suppresses the square ends of the domain path, instead producing a straight line.

### axis.tickPadding(padding)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *padding* is specified, sets the padding to the specified value in pixels and returns the axis. If *padding* is not specified, returns the current padding which defaults to 3 pixels.

### axis.offset(offset)

[Source](https://github.com/d3/d3-axis/blob/master/src/axis.js)

If *offset* is specified, sets the offset to the specified value in pixels and returns the axis. If *offset* is not specified, returns the current offset which defaults to 0 on devices with a [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) greater than 1, and 0.5px otherwise. This default offset ensures crisp edges on low-resolution devices.

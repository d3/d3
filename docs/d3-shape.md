# d3-shape

Visualizations can be represented by discrete graphical marks such as [symbols](./d3-shape/symbol.md), [arcs](./d3-shape/arc.md), [lines](./d3-shape/line.md), and [areas](./d3-shape/area.md). While the rectangles of a bar chart may sometimes be simple, other shapes are complex, such as rounded annular sectors and Catmull–Rom splines. The d3-shape module provides a variety of shape generators for your convenience.

As with other aspects of D3, these shapes are driven by data: each shape generator exposes accessors that control how the input data are mapped to a visual representation. For example, you might define a line generator for a time series by [scaling](./d3-scale.md) fields of your data to fit the chart:

```js
const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));
```

This line generator can then be used to compute the `d` attribute of an SVG path element:

```js
path.datum(data).attr("d", line);
```

Or you can use it to render to a Canvas 2D context:

```js
line.context(context)(data);
```

See one of:

- [Arcs](./d3-shape/arc.md) - circular or annular sectors, as in a pie or donut chart.
- [Areas](./d3-shape/area.md) - an area defined by a bounding topline and baseline, as in an area chart.
- [Curves](./d3-shape/curve.md) - interpolate between points to produce a continuous shape.
- [Lines](./d3-shape/line.md) - a spline or polyline, as in a line chart.
- [Links](./d3-shape/link.md) - a smooth cubic Bézier curve from a source to a target.
- [Pies](./d3-shape/pie.md) - compute angles for a pie or donut chart.
- [Stacks](./d3-shape/stack.md) - stack adjacent shapes, as in a stacked bar chart.
- [Symbols](./d3-shape/symbol.md) - a categorical shape encoding, as in a scatterplot.
- [Radial areas](./d3-shape/radial-area.md) - like [area](./d3-shape/area.md), but in polar coordinates.
- [Radial lines](./d3-shape/radial-line.md) - like [line](./d3-shape/line.md), but in polar coordinates.
- [Radial links](./d3-shape/radial-link.md) - like [link](./d3-shape/link.md), but in polar coordinates.

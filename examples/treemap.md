# Treemap

Introduced by [Ben Shneiderman](http://www.cs.umd.edu/hcil/treemap-history/), treemaps recursively partition space into rectangles according to each node’s associated value. D3 supports several treemap [tiling methods](https://d3js.org/d3-hierarchy/treemap#treemap-tiling). See also [nested](./nested-treemap), [zoomable](./zoomable-treemap) and [animated](./animated-treemap) treemaps, and the [bubble chart](./bubble-chart). 

<!-- If your data is flat, see the [treemap, CSV](https://observablehq.com/@d3/treemap-stratify?intent=fork) variant. -->

```js
const tile = view(Inputs.select(
  new Map([
    ["binary", d3.treemapBinary],
    ["squarify", d3.treemapSquarify],
    ["slice-dice", d3.treemapSliceDice],
    ["slice", d3.treemapSlice],
    ["dice", d3.treemapDice]
  ]),
  {label: "Tiling method", value: d3.treemapBinary}
));
```

```js
Plot.legend({color: {domain: color.domain(), range: color.range()}})
```

```js echo
// Set the height to the (default) width.
const height = width;

// Specify the color scale.
const color = d3.scaleOrdinal()
    .domain(data.children.map((d) => d.name))
    .range(d3.schemeObservable10);

// Compute the layout.
const root = d3.treemap()
    .tile(tile) // e.g., d3.treemapBinary
    .size([width, height])
    .padding(1)
    .round(true)
  (d3.hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value));

// Create the SVG container.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "currentColor")
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Add a cell for each leaf of the hierarchy.
const leaf = svg.selectAll("g")
  .data(root.leaves())
  .join("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

const format = d3.format(",d");

// Append a tooltip.
leaf.append("title")
    .text((d) => `${d.ancestors().reverse().map((d) => d.data.name).join(".")}\n${format(d.value)}`);

// Append a color rectangle.
leaf.append("rect")
    .attr("id", (d, i) => `leaf-${i}`)
    .attr("fill", (d) => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", 0.6)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

// Append a clipPath to ensure text does not overflow.
leaf.append("clipPath")
    .attr("id", (d, i) => `leaf-clip-${i}`)
  .append("use")
   .attr("xlink:href", (d, i) => `#leaf-${i}`);

// Append multiline text. The last line shows the value and has a specific formatting.
leaf.filter((d) => d.x1 - d.x0 > 7).append("text")
    .attr("clip-path", (d, i) => `url(#leaf-clip-${i})`)
  .selectAll("tspan")
  .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
  .join("tspan")
    .attr("x", 3)
    .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
    .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
    .text((d) => d);

display(svg.node());
```

The data here is provided as a JSON file.

```js echo
const data = FileAttachment("flare.json").json();
```

```js echo
data
```

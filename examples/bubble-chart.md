# Bubble chart

Bubble charts are non-hierarchical [packed circles](./pack). The area of each circle is proportional its value (here, file size). The organic appearance of these diagrams can be intriguing, but also consider a [treemap](./treemap) or a humble [bar chart](./bar-chart).

```js
Swatches(chart.scales.color)
```

```js
chart
```

```js echo
const chart = BubbleChart(flare);
```

The chart is generated from the **flare** dataset, which we load here as a [static CSV file](https://observablehq.com/framework/lib/csv) and filter to remove the empty nodes. Click on the `Array` symbol below to inspect:

```js
flare
```

```js echo
const flare = FileAttachment("/data/flare.csv").csv({typed: true})
    .then((data) => data.filter(({size}) => size !== null));
```

This function returns the chart as a DOM node, with a *scales* property that enables us to display the color legend at the top:

```js echo
function BubbleChart(data) {
  // Specify the dimensions of the chart.
  const width = 928;
  const height = width;
  const margin = 1; // to avoid clipping the root circle stroke
  const name = (d) => d.name.split(".").pop(); // "Strings" of "flare.util.Strings"
  const group = (d) => d.name.split(".")[1]; // "util" of "flare.util.Strings"
  const names = (d) => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

  // Specify the number format for values.
  const format = d3.format(",d");

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  // Create the pack layout.
  const pack = d3.pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  const root = pack(d3.hierarchy({children: data}).sum((d) => d.size));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle");

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll()
    .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

  // Add a title.
  node.append("title").text((d) => `${d.data.name}\n${format(d.size)}`);

  // Add a filled circle.
  node.append("circle")
      .attr("fill-opacity", 0.7)
      .attr("fill", (d) => color(group(d.data)))
      .attr("r", (d) => d.r);

  // Add a label.
  const text = node.append("text").attr("clip-path", (d) => `circle(${d.r})`);

  // Add a tspan for each CamelCase-separated word.
  text.selectAll()
    .data((d) => names(d.data))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text((d) => d);

  // Add a tspan for the node’s value.
  text.append("tspan")
      .attr("x", 0)
      .attr("y", (d) => `${names(d.data).length / 2 + 0.35}em`)
      .attr("fill-opacity", 0.7)
      .text((d) => format(d.value));

  return Object.assign(svg.node(), {scales: {color}});
}
```

A utility to create the color legend:

```js echo
import {Swatches} from "/components/color-legend.js";
```

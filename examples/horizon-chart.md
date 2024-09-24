# Horizon chart

Horizon charts are an alternative to [ridgeline plots](./ridgeline-plot) and small-multiple area charts that allow greater precision for a given vertical space by using colored bands. These charts can also be used with diverging color scales to [differentiate positive and negative values](./diverging-horizon-chart). Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js
const scheme = view(
  Inputs.select(
    new Map([
      ["Blues", d3.schemeBlues],
      ["Greens", d3.schemeGreens],
      ["Greys", d3.schemeGreys],
      ["Oranges", d3.schemeOranges],
      ["Purples", d3.schemePurples],
      ["Reds", d3.schemeReds],
      ["BuGn", d3.schemeBuGn],
      ["BuPu", d3.schemeBuPu],
      ["GnBu", d3.schemeGnBu],
      ["OrRd", d3.schemeOrRd],
      ["PuBu", d3.schemePuBu],
      ["PuBuGn", d3.schemePuBuGn],
      ["PuRd", d3.schemePuRd],
      ["RdPu", d3.schemeRdPu],
      ["YlGn", d3.schemeYlGn],
      ["YlGnBu", d3.schemeYlGnBu],
      ["YlOrBr", d3.schemeYlOrBr],
      ["YlOrRd", d3.schemeYlOrRd]
    ]),
    {label: "Color scheme"}
  )
);
```

```js
const bands = view(Inputs.range([1, 9], {value: 7, step: 1, label: "Bands"}));
```

```js echo
const colors = (dark
  ? [...scheme[Math.min(Math.max(3, bands) + dark, 9)]].reverse()
  : scheme[Math.max(3, bands)]
)
  .slice(Math.max(0, 3 - bands));

// Derive series, sorted by date.
const series = d3.rollup(
  data,
  (values, i) => d3.sort(values, (d) => d.date),
  (d) => d.location
);

// Specify the dimensions of the chart.
const marginTop = 30;
const marginRight = 10;
const marginBottom = 0;
const marginLeft = 10;
const width = 928;
const size = 25; // height of each band.
const height = series.size * size + marginTop + marginBottom; // depends on the number of series
const padding = 1;

// Create the horizontal (temporal) scale.
const x = d3
  .scaleUtc()
  .domain(d3.extent(data, (d) => d.date))
  .range([0, width]);

// Create the vertical scale; it describes the “total” height of the area,
// when bands are not superimposed. The area shape will start from the y=size position
// to represent 0 up to *bands* times the maximum band height.
const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.vehicles)])
  .range([size, size - bands * (size - padding)]);

const area = d3
  .area()
  .defined((d) => !isNaN(d.vehicles))
  .x((d) => x(d.date))
  .y0(size)
  .y1((d) => y(d.vehicles));

// A unique identifier (to avoid conflicts) for the clip rect and the reusable paths.
const uid = `O-${Math.random().toString(16).slice(2)}`;

// Create the SVG container.
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Create a G element for each location.
const g = svg
  .append("g")
  .selectAll("g")
  .data(series)
  .join("g")
  .attr("transform", (d, i) => `translate(0,${i * size + marginTop})`);

// Add a rectangular clipPath and the reference area.
const defs = g.append("defs");
defs
  .append("clipPath")
  .attr("id", (_, i) => `${uid}-clip-${i}`)
  .append("rect")
  .attr("y", padding)
  .attr("width", width)
  .attr("height", size - padding);

defs
  .append("path")
  .attr("id", (_, i) => `${uid}-path-${i}`)
  .attr("d", ([, values]) => area(values));

// Create a group for each location, in which the reference area will be replicated
// (with the SVG:use element) for each band, and translated.
g.append("g")
  .attr("clip-path", (_, i) => `url(${new URL(`#${uid}-clip-${i}`, location)})`)
  .selectAll("use")
  .data((_, i) => new Array(bands).fill(i))
  .enter()
  .append("use")
  .attr("xlink:href", (i) => `${new URL(`#${uid}-path-${i}`, location)}`)
  .attr("fill", (_, i) => colors[i])
  .attr("transform", (_, i) => `translate(0,${i * size})`);

// Add the labels.
g.append("text")
  .attr("x", 4)
  .attr("y", (size + padding) / 2)
  .attr("dy", "0.35em")
  .attr("fill", "currentColor")
  .text(([name]) => name);

// Add the horizontal axis.
svg
  .append("g")
  .attr("transform", `translate(0,${marginTop})`)
  .call(
    d3
      .axisTop(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
  )
  .call((g) =>
    g
      .selectAll(".tick")
      .filter((d) => x(d) < marginLeft || x(d) >= width - marginRight)
      .remove()
  )
  .call((g) => g.select(".domain").remove());

display(svg.node());
```

```js echo
const data = FileAttachment("/data/traffic.csv").csv({ typed: true });
```

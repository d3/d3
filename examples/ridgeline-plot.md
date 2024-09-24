# Ridgeline plot

Ridgeline plots are an alternative to [horizon charts](./horizon-chart) and small-multiple area charts that allow greater precision for a given vertical space at the expense of occlusion (overlapping areas).

This form is also known as a *joy plot* for its notable use on [the cover](/@mbostock/psr-b1919-21) of Joy Division’s [*Unknown Pleasures* album](https://en.wikipedia.org/wiki/Unknown_Pleasures). This name is controversial as it references the [sexual slavery practices](https://en.wikipedia.org/wiki/German_military_brothels_in_World_War_II) of the Nazis during World War II. However, Joy Division sought to [draw attention to](http://aviewfromtheannex.blogspot.com/2010/04/no-joy-division-was-not-into-fascism.html) the danger of fascism to society, not to celebrate it.

Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js echo
// Prepare the series:
const dates = Array.from(d3.group(traffic, d => +d.date).keys()).sort(d3.ascending);
const series = d3.groups(traffic, d => d.location).map(([name, values]) => {
  const value = new Map(values.map(d => [+d.date, d.vehicles]));
  return {name, values: dates.map(d => value.get(d))};
});

// Specify the chart’s dimensions.
const overlap = 8;
const width = 928;
const height = series.length * 17;
const marginTop = 40;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 120;

// Create the scales.
const x = d3.scaleTime()
    .domain(d3.extent(dates))
    .range([marginLeft, width - marginRight]);

const y = d3.scalePoint()
    .domain(series.map(d => d.name))
    .range([marginTop, height - marginBottom]);

const z = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d.values))]).nice()
    .range([0, -overlap * y.step()]);

// Create the area generator and its top-line generator.
const area = d3.area()
    .curve(d3.curveBasis)
    .defined(d => !isNaN(d))
    .x((d, i) => x(dates[i]))
    .y0(0)
    .y1(d => z(d));

const line = area.lineY1();

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Append the axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
    .call(g => g.select(".domain").remove());

// Append a layer for each series.
const group = svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
    .attr("transform", d => `translate(0,${y(d.name) + 1})`);

group.append("path")
    .attr("fill", dark ? "#282828" : "#ddd")
    .attr("d", d => area(d.values));

group.append("path")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
    .attr("d", d => line(d.values));

display(svg.node());
```

```js echo
const traffic = FileAttachment("/data/traffic.csv").csv({ typed: true });
```

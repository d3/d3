# Diverging horizon chart

This [horizon chart](./horizon-chart) represents negative values in purples and positive values in greens, and shows the price of several stocks relative to May 2013. Compare to a [line chart](./line-chart) and an [area chart](./area-chart).

Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js
const scheme = view(Inputs.select([
  "BrBG", "PRGn", "PiYG", "PuOr", "RdBu", "RdGy", "RdYlBu", "RdYlGn", "Spectral"
], {label: "scheme", value: "PiYG"}));
const mirror = view(Inputs.toggle({label: "Mirror negative"}));
const overlap = view(Inputs.range([1, 5], {label: "bands", value: 5, step: 1}));
```

```js echo
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

const g = svg.append("g")
  .selectAll("g")
  .data(data)
  .enter().append("g")
    .attr("transform", (d, i) => `translate(0,${i * (step + 1) + marginTop})`);

g.append("clipPath")
    .attr("id", d => (d.clip = uid("clip")).id)
  .append("rect")
    .attr("width", width)
    .attr("height", step);

g.append("defs").append("path")
    .attr("id", d => (d.path = uid("path")).id)
    .attr("d", d => area(d.values));

g.append("g")
    .attr("clip-path", d => d.clip)
  .selectAll("use")
  .data(d => Array.from(
    {length: overlap * 2}, 
    (_, i) => Object.assign({index: i < overlap ? -i - 1 : i - overlap}, d)
  ))
  .enter().append("use")
    .attr("fill", d => color(d.index))
    .attr("transform", d => mirror && d.index < 0
        ? `scale(1,-1) translate(0,${d.index * step})`
        : `translate(0,${(d.index + 1) * step})`)
    .attr("xlink:href", d => d.path.href);

g.append("text")
    .attr("x", 4)
    .attr("y", step / 2)
    .attr("dy", "0.35em")
    .attr("fill", "currentColor")
    .text(d => d.key);

svg.append("g")
    .call(xAxis);

  display(svg.node());
```

```js echo
const marginTop = 30;
const marginRight = 10;
const marginBottom = 0;
const marginLeft = 10;
const step = 59;

const height = data.length * (step + 1) + marginTop + marginBottom;

const color = i => d3[`scheme${scheme}`][overlap * 2 + 1][i + (i >= 0) + overlap];

const x = d3.scaleUtc()
    .domain([data[0].values[0].date, data[0].values[data[0].values.length - 1].date])
    .range([0, width]);

const xAxis = g => g
    .attr("transform", `translate(0,${marginTop})`)
    .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0))
    .call(g => g.selectAll(".tick").filter(d => x(d) < marginLeft || x(d) >= width - marginRight).remove())
    .call(g => g.select(".domain").remove());

const max = d3.max(data, d => d3.max(d.values, d => Math.abs(d.value)));
const y = d3.scaleLinear()
    .domain([-max, +max])
    .range([overlap * step, -overlap * step]);

const area = d3.area()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y0(0)
    .y1(d => y(d.value));
```

```js echo
const parseDate = d3.utcParse("%Y-%m-%d");
const data = Promise.all([
  FileAttachment("aapl.csv"),
  FileAttachment("amzn.csv"),
  FileAttachment("goog.csv"),
  FileAttachment("ibm.csv"),
  FileAttachment("msft.csv")
].map(async file => {
  const values = d3.csvParse(await file.text(), d => {
    const date = parseDate(d["Date"]);
    return {date, value: +d["Close"]};
  });
  const v = values[0].value;
  return {
    key: file.name.slice(0, -4),
    values: values.map(({date, value}) => ({date, value: Math.log(value / v)}))
  };
}));
```

```js echo
import {uid} from "./components/DOM.js"
```
# Index chart

This chart shows the weekly price of several technology stocks from 2013 to 2018 relative to each stock’s price on the highlighted date. Hover over the chart to change the date for comparison. Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

<div style="display: flex; min-height: 33px; font: 12px sans-serif; align-items: center;">
  ${value.toLocaleString("en", {timeZone: "UTC", month: "long", day: "numeric", year: "numeric"})}
</div>

```js
const value = view(IndexChart());
```

The data for this chart consists of five time series merged together. Here we load them from five static [CSV file attachments](https://observablehq.com/framework/lib/csv). Click on the `Array` symbol below to inspect the data’s structure.

```js
stocks
```

```js echo
const stocks = (
  await Promise.all([
    FileAttachment("/data/aapl.csv").csv({typed: true}).then((values) => ["AAPL", values]),
    FileAttachment("/data/amzn.csv").csv({typed: true}).then((values) => ["AMZN", values]),
    FileAttachment("/data/goog.csv").csv({typed: true}).then((values) => ["GOOG", values]),
    FileAttachment("/data/ibm.csv").csv({typed: true}).then((values) => ["IBM", values]),
    FileAttachment("/data/msft.csv").csv({typed: true}).then((values) => ["MSFT", values])
  ])
).flatMap(([Symbol, values]) => values.map((d) => ({Symbol, ...d})));
```

This chart is created with the `IndexChart` function:

```js echo
function IndexChart() {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the horizontal time scale.
  const x = d3.scaleUtc()
      .domain(d3.extent(stocks, (d) => d.Date))
      .range([marginLeft, width - marginRight])
      .clamp(true);

  // Normalize the series with respect to the value on the first date. Note that normalizing
  // the whole series with respect to a different date amounts to a simple vertical translation,
  // thanks to the logarithmic scale! See also https://observablehq.com/@d3/change-line-chart
  const series = d3.groups(stocks, (d) => d.Symbol)
      .map(([key, values]) => {
        const v = values[0].Close;
        return {key, values: values.map(({Date, Close}) => ({Date, value: Close / v}))};
      });

  // Create the vertical scale. For each series, compute the ratio *s* between its maximum and
  // minimum values; the path is going to move between [1 / s, 1] when the reference date
  // corresponds to its maximum and [1, s] when it corresponds to its minimum. To have enough
  // room, the scale is based on the series that has the maximum ratio *k*  (in this case, AMZN).
  const k = d3.max(series, ({values}) => d3.max(values, (d) => d.value) / d3.min(values, (d) => d.value));
  const y = d3.scaleLog()
      .domain([1 / k, k])
      .rangeRound([height - marginBottom, marginTop]);

  // Create a color scale to identify series.
  const z = d3.scaleOrdinal(d3.schemeCategory10).domain(series.map((d) => d.Symbol));

  // For each given series, the update function needs to identify the date—closest to the current
  // date—that actually contains a value. To do this efficiently, it uses a bisector:
  const bisect = d3.bisector((d) => d.Date).left;

  // Create the SVG container.
  const svg = d3.create("svg")
     .attr("width", width)
     .attr("height", height)
     .attr("viewBox", [0, 0, width, height])
     .attr("style", "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;");

  // Create the axes and central rule.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, (x) => +x.toFixed(6) + "×"))
      .call((g) => g.selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", (d) => (d === 1 ? null : 0.2))
          .attr("x2", width - marginLeft - marginRight))
      .call((g) => g.select(".domain").remove());

  const rule = svg.append("g")
      .append("line")
        .attr("y1", height)
        .attr("y2", 0)
        .attr("stroke", "currentColor");

  // Create a line and a label for each series.
  const serie = svg.append("g")
      .style("font", "bold 10px sans-serif")
    .selectAll("g")
    .data(series)
    .join("g");

  const line = d3.line()
    .x((d) => x(d.Date))
    .y((d) => y(d.value));

  serie.append("path")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke", (d) => z(d.key))
      .attr("d", (d) => line(d.values));

  serie.append("text")
      .datum((d) => ({key: d.key, value: d.values[d.values.length - 1].value}))
      .attr("fill", (d) => z(d.key))
      .attr("paint-order", "stroke")
      .attr("stroke", "var(--theme-background)")
      .attr("stroke-width", 3)
      .attr("x", x.range()[1] + 3)
      .attr("y", (d) => y(d.value))
      .attr("dy", "0.35em")
      .text((d) => d.key);

  // Define the update function, that translates each of the series vertically depending on the
  // ratio between its value at the current date and the value at date 0. Thanks to the log
  // scale, this gives the same result as a normalization by the value at the current date.
  function update(date) {
    date = d3.utcDay.round(date);
    rule.attr("transform", `translate(${x(date) + 0.5},0)`);
    serie.attr("transform", ({values}) => {
      const i = bisect(values, date, 0, values.length - 1);
      return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
    });
    svg.property("value", date).dispatch("input"); // for view()
  }

  // Create the introductory animation. It repeatedly calls the update function for dates ranging
  // from the last to the first date of the x scale.
  d3.transition()
      .ease(d3.easeCubicOut)
      .duration(1500)
      .tween("date", () => {
        const i = d3.interpolateDate(x.domain()[1], x.domain()[0]);
        return (t) => update(i(t));
      });

  // When the user mouses over the chart, update it according to the date that is
  // referenced by the horizontal position of the pointer.
  svg.on("mousemove touchmove", function (event) {
    update(x.invert(d3.pointer(event, this)[0]));
    d3.event.preventDefault();
  });

  // Sets the date to the start of the x axis. This is redundant with the transition above;
  // uncomment if you want to remove the transition.
  // update(x.domain()[0]);

  return svg.node();
}
```

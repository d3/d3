# Connected scatterplot

This is a recreation of Hannah Fairfield’s [*Driving Shifts Into Reverse*](https://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html), sans annotations. See also Fairfield’s [*Driving Safety, in Fits and Starts*](https://www.nytimes.com/interactive/2012/09/17/science/driving-safety-in-fits-and-starts.html), [Noah Veltman’s variation](https://blocks.roadtolarissa.com/veltman/87596f5a256079b95eb9) of this graphic, and [a paper on connected scatterplots](http://steveharoz.com/research/connected_scatterplot/) by Haroz *et al.*

```js
const replay = view(Inputs.button("Replay"));
```

```js
replay;
display(ConnectedScatterplot(driving));
```

```js run=false
ConnectedScatterplot(driving)
```

We create the chart with the `ConnectedScatterplot` function shown below. It takes tabular data as input — one row for each data point. The **side** column indicates where we want the year label to be displayed next to the point in the scatterplot (these values have been hand-picked to limit occlusion). The other columns are the **year**, the average **miles** per person and the cost of **gas** that year. Click on the `Array` symbol below to inspect the data:

```js
driving
```

```js echo
const driving = FileAttachment("/data/driving.csv").csv({typed: true});
```

<div style="font-size: 0.8em; padding-left: 1em; border-left: solid 2px var(--theme-foreground-fainter);">

👆 This code snippet loads a static Observable Framework CSV [`FileAttachment`](https://observablehq.com/framework/files), parsing typed values such as numbers. For your own chart you’ll want to create a similar data structure—maybe by reading from an API with [`d3.csv`](https://d3js.org/d3-dsv), or by running a [`sql`](https://observablehq.com/framework/sql) query on a database.

</div>

```js echo
function ConnectedScatterplot(driving) {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 720;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the positional encodings.
  const x = d3.scaleLinear()
      .domain(d3.extent(driving, (d) => d.miles))
      .nice()
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain(d3.extent(driving, (d) => d.gas))
      .nice()
      .range([height - marginBottom, marginTop]);

  const line = d3.line()
      .curve(d3.curveCatmullRom)
      .x((d) => x(d.miles))
      .y((d) => y(d.gas));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  const l = length(line(driving));

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").clone()
          .attr("y2", -height)
          .attr("stroke-opacity", 0.1))
      .call((g) => g.append("text")
          .attr("x", width - 4)
          .attr("y", -4)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("fill", "currentColor")
          .text("Miles per person per year"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "$.2f"))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").clone()
          .attr("x2", width).attr("stroke-opacity", 0.1))
      .call((g) => g.select(".tick:last-of-type text").clone()
          .attr("x", 4)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Cost per gallon"));

  svg.append("path")
      .datum(driving)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", `0,${l}`)
      .attr("d", line)
      .transition()
          .duration(5000)
          .ease(d3.easeLinear)
          .attr("stroke-dasharray", `${l},${l}`);

  svg.append("g")
      .attr("fill", "var(--theme-background)")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
    .selectAll("circle")
    .data(driving)
    .join("circle")
      .attr("cx", (d) => x(d.miles))
      .attr("cy", (d) => y(d.gas))
      .attr("r", 3);

  const label = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll()
    .data(driving)
    .join("text")
      .attr("transform", (d) => `translate(${x(d.miles)},${y(d.gas)})`)
      .attr("fill-opacity", 0)
      .text((d) => d.year)
      .attr("stroke", "var(--theme-background)")
      .attr("paint-order", "stroke")
      .attr("fill", "currentColor")
      .each(function (d) {
        const t = d3.select(this);
        switch (d.side) {
          case "top": t.attr("text-anchor", "middle").attr("dy", "-0.7em"); break;
          case "right": t.attr("dx", "0.5em").attr("dy", "0.32em").attr("text-anchor", "start"); break;
          case "bottom": t.attr("text-anchor", "middle").attr("dy", "1.4em"); break;
          case "left": t.attr("dx", "-0.5em").attr("dy", "0.32em").attr("text-anchor", "end"); break;
        }
      });

  label.transition()
      .delay((d, i) => (length(line(driving.slice(0, i + 1))) / l) * (5000 - 125))
      .attr("fill-opacity", 1);

  return svg.node();
}
```

The _length_ helper computes the total length of the given SVG _path_ string; this is needed to apply the transition of `stroke-dasharray` across the length of the stroke.

```js echo
function length(path) {
  return d3.create("svg:path").attr("d", path).node().getTotalLength();
}
```

<div class=tip>

For a simpler approach using Observable Plot’s concise API, see [Plot: Connected scatterplot](https://observablehq.com/@observablehq/plot-connected-scatterplot).

</div>

var w = 960,
    h = 40;

var chart = d3.chart.horizon()
    .width(w)
    .height(h)
    .bands(5)
    .mode("offset")
    .interpolate("basis");

var svg = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("unemployment.json", function(data) {

  // Offset so that positive is above-average and negative is below-average.
  var mean = data.rate.reduce(function(p, v) { return p + v; }, 0) / data.rate.length;

  // Transpose column values to rows.
  data = data.rate.map(function(rate, i) {
    return [Date.UTC(data.year[i], data.month[i] - 1), rate - mean];
  });

  // Render the chart.
  svg.data([data]).call(chart);

  // Enable mode buttons.
  d3.selectAll("#mode button")
      .data(["offset", "mirror"])
      .on("click", function(m) {
        svg.call(chart.duration(0).mode(m));
        d3.selectAll("#mode button")
            .classed("active", function(d) { return d == m; });
      });

  // Enable bands buttons.
  d3.selectAll("#bands button")
      .data([-1, 1])
      .on("click", function bands(db) {
        svg.call(chart.duration(1000).bands(Math.max(1, chart.bands() + db)));
      });
});

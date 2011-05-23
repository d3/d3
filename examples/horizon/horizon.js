var w = 960,
    h = 40;

var chart = d3.chart.horizon()
    .width(w)
    .height(h)
    .bands(5)
    .mode("offset")
    .interpolate("basis");

d3.json("unemployment.json", function(data) {

  // Offset so that positive is above-average and negative is below-average.
  var mean = data.rate.reduce(function(p, v) { return p + v; }, 0) / data.rate.length;

  // Transpose column values to rows.
  data = data.rate.map(function(rate, i) {
    return [Date.UTC(data.year[i], data.month[i] - 1), rate - mean];
  });

  d3.select("body").append("svg:svg")
      .data([data])
      .attr("class", "RdBu")
      .attr("width", w)
      .attr("height", h)
      .call(chart);
});

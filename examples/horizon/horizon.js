var w = 960,
    h = 40;

var chart = d3.chart.horizon()
    .size([w, h])
    .bands(9)
    .x(function(d) { return d.date; })
    .y(function(d) { return d.rate; });

d3.json("unemployment.json", function(data) {

  // Transpose column values to rows.
  data = data.rate.map(function(rate, i) {
    return {date: +new Date(data.year[i], data.month[i] - 1), rate: rate};
  });

  var svg = d3.select("body").selectAll("svg")
      .data([data])
    .enter().append("svg:svg")
      .attr("class", "Blues")
      .attr("width", w)
      .attr("height", h)
      .call(chart);
});

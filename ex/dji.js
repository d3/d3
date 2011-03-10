var w = 960,
    pw = 14,
    z = ~~((w - pw * 2) / 53),
    ph = z >> 1,
    h = z * 7;

var vis = d3.select("#chart")
  .selectAll("svg")
    .data(d3.range(1990, 2011))
  .enter().append("svg:svg")
    .attr("width", w)
    .attr("height", h + ph * 2)
    .attr("class", "RdGy")
  .append("svg:g")
    .attr("transform", "translate(" + pw + "," + ph + ")");

vis.append("svg:text")
    .attr("transform", "translate(-6," + h / 2 + ")rotate(-90)")
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

vis.selectAll("rect.day")
    .data(calendar.dates)
  .enter().append("svg:rect")
    .attr("x", function(d) { return d.week * z; })
    .attr("y", function(d) { return d.day * z; })
    .attr("class", "day")
    .attr("fill", "#fff")
    .attr("width", z)
    .attr("height", z);

vis.selectAll("path.month")
    .data(calendar.months)
  .enter().append("svg:path")
    .attr("class", "month")
    .attr("d", function(d) {
      return "M" + (d.firstWeek + 1) * z + "," + d.firstDay * z
          + "H" + d.firstWeek * z
          + "V" + 7 * z
          + "H" + d.lastWeek * z
          + "V" + (d.lastDay + 1) * z
          + "H" + (d.lastWeek + 1) * z
          + "V" + 0
          + "H" + (d.firstWeek + 1) * z
          + "Z";
    });

d3.csv("dji.csv", function(csv) {
  var data = d3.nest()
      .key(function(d) { return d.Date; })
      .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
      .map(csv);

  var color = d3.scale.quantize()
      .domain([-.05, .05])
      .range(d3.range(9));

  vis.selectAll("rect.day")
      .attr("class", function(d) { return "day q" + color(data[d.Date]) + "-9"; })
    .append("svg:title")
      .text(function(d) { return d.Date + ": " + (data[d.Date] * 100).toFixed(1) + "%"; });
});

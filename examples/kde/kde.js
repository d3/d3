// Based on http://bl.ocks.org/900762 by John Firebaugh
d3.json("../data/faithful.json", function(faithful) {
  data = faithful;

  var width = 800,
      height = 400;

  var x = d3.scale.linear()
      .domain([30, 110]).range([0, width]);

  var y = d3.scale.linear()
      .domain([0, .1])
      .range([0, height]);

  var bins = d3.layout.histogram().frequency(false).bins(x.ticks(60))(data),
      max = d3.max(bins, function(d) { return d.y; });

  var kde = science.stats.kde()
      .sample(data);

  var vis = d3.select("body")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  var bars = vis.selectAll("g.bar")
      .data(bins)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d, i) {
        return "translate(" + x(d.x) + "," + (height - y(d.y)) + ")";
      });

  bars.append("rect")
      .attr("fill", "steelblue")
      .attr("width", function(d) { return x(d.dx + 30) - 1; })
      .attr("height", function(d) { return y(d.y); });

  var line = d3.svg.line()
      .x(function(d) { return x(d[0]); })
      .y(function(d) { return height - y(d[1]); });

  vis.selectAll("path")
      .data(d3.values(science.stats.bandwidth))
    .enter().append("path")
      .attr("d", function(h) {
        return line(kde.bandwidth(h)(d3.range(30, 110, .1)));
      });
});

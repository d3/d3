var width = 960,
    height = 500;

var fill = d3.scale.ordinal()
    .range(colorbrewer.Greys[9].slice(1, 4));

var stroke = d3.scale.linear()
    .domain([0, 1e4])
    .range(["brown", "steelblue"]);

var treemap = d3.layout.treemap()
    .size([width, height])
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");

var line = d3.svg.line()
    .interpolate("bundle")
    .tension(.85)
    .x(function(d) { return d.x + d.dx / 2; })
    .y(function(d) { return d.y + d.dy / 2; });

d3.json("../data/flare-imports.json", function(classes) {
  var nodes = treemap.nodes(packages.root(classes)),
      links = packages.imports(nodes);

  div.selectAll("div")
      .data(nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? fill(d.key) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.key; });

  div.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute")
    .selectAll("path.link")
      .data(bundle(links))
    .enter().append("path")
      .style("stroke", function(d) { return stroke(d[0].value); })
      .attr("class", "link")
      .attr("d", line);
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

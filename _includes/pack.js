var w = 960,
    h = 960,
    format = d3.format(",d");

var pack = d3.layout.pack()
    .size([w - 4, h - 4])
    .value(function(d) { return d.size; });

var vis = d3.select("#chart").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "pack")
  .append("g")
    .attr("transform", "translate(2, 2)");

d3.json("../data/flare.json", function(json) {
  var node = vis.data([json]).selectAll("g.node")
      .data(pack.nodes)
    .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

  node.append("circle")
      .attr("r", function(d) { return d.r; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(d) { return d.name.substring(0, d.r / 3); });
});

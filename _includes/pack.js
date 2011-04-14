var w = 960,
    h = 960,
    format = d3.format(",d");

var pack = d3.layout.pack()
    .size([w - 4, h - 4])
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "pack")
  .append("svg:g")
    .attr("transform", "translate(2, 2)");

d3.json("flare.json", function(json) {
  var node = vis.data(d3.entries(json)).selectAll("g.node")
      .data(pack)
    .enter().append("svg:g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("svg:title")
      .text(function(d) { return d.data.key + (d.children ? "" : ": " + format(d.value)); });

  node.append("svg:circle")
      .attr("r", function(d) { return d.r; });

  node.filter(function(d) { return !d.children; }).append("svg:text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(d) { return d.data.key.substring(0, d.r / 3); });
});

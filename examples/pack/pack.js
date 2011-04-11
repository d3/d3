var w = 800,
    h = 800,
    format = d3.format(",d"),
    pack = d3.layout.pack()
      .size([w - 4, h - 4])
      .sort(null)
      .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
      .radius(function(d) { return Math.sqrt(d.value); });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)

d3.json("flare.json", function(json) {
  var node = vis.selectAll("g.pack")
      .data(d3.entries(json))
    .enter().append("svg:g")
      .attr("class", "pack")
      .attr("transform", "translate(2,2)")
    .selectAll("g.node")
      .data(pack)
    .enter().append("svg:g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("svg:title")
      .text(function(d) { return d.data.key + (d.children ? "" : ": " + format(d.value)); });

  node.append("svg:circle")
      .attr("r", function(d) { return d.radius; });

  node.filter(function(d) { return !d.children; }).append("svg:text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(d) { return d.data.key.substring(0, Math.sqrt(d.value) / 25); });
});

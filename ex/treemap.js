var w = 960,
    h = 500,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([w, h])
    .children(function(d) { return typeof d.value == "object" && d3.entries(d.value); })
    .value(function(d) { return d.value; });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

d3.json("flare.json", function(json) {
  div.data(d3.entries(json)).selectAll("div")
      .data(treemap)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.data.key) : null; })
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; })
      .text(function(d) { return d.children ? null : d.data.key; });
});

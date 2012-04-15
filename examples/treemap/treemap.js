var width = 960,
    height = 500,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");

d3.json("../data/flare.json", function(json) {
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.name; });

  d3.select("#size").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.size; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", true);
    d3.select("#count").classed("active", false);
  });

  d3.select("#count").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return 1; }))
      .transition()
        .duration(1500)
        .call(cell);

    d3.select("#size").classed("active", false);
    d3.select("#count").classed("active", true);
  });
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

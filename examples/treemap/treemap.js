var w = 960,
    h = 500,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .inline(true)
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

d3.json("flare.json", function(json) {
  div.data(hierarchy(json).children).selectAll("div")
      .data(treemap)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.key) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.key; });

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
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

// Convert a map of file sizes into a hierarchy.
function hierarchy(d, key) {
  var node = {key: key};
  if (isNaN(d)) {
    node.children = [];
    for (key in d) node.children.push(hierarchy(d[key], key));
  } else {
    node.size = d;
  }
  return node;
}

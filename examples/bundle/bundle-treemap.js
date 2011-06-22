var w = 960,
    h = 500,
    color = d3.scale.category20c(),
    stroke = d3.scale.linear().domain([0, 1e4]).range(["black", "steelblue"]),
    nodeMap = {},
    root = null;

var treemap = d3.layout.treemap()
    .size([w, h])
    .children(function(d) { return isNaN(d.value.size) ? d3.entries(d.value) : null; })
    .value(function(d) { return d.value.size; })
    .sticky(true);

var bundle = d3.layout.bundle()
    .outgoing(function(d) {
      if (!d.data.value.imports) return [];
      return d.data.value.imports.map(function(d) {
        return nodeMap[d];
      });
    });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

d3.json("dependency-data.json", function(json) {
  var tree = {};
  json.forEach(function(d) {
    var path = d.name.split("."),
        last = path.length - 1,
        node = tree;
    path.forEach(function(part, i) {
      if (i === last) {
        node[part] = d;
        return;
      }
      if (!(part in node)) {
        node[part] = {};
      }
      node = node[part];
    });
  });

  root = d3.entries(tree)[0];
  var nodes = treemap(root);

  nodes.forEach(function(node) {
    if (node.data.value.name) nodeMap[node.data.value.name] = node;
  });

  div.selectAll("div")
      .data(nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.data.key) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.data.key; });

  div.append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .style("position", "absolute")
    .selectAll("path.link")
      .data(bundle(nodes))
    .enter().append("svg:path")
      .style("stroke", function(d) { return stroke(d[0].value); })
      .attr("class", "link")
      .attr("d", line);

  d3.select("#size").on("click", function() {
    treemap.value(function(d) { return d.value.size; });
    transition();
    d3.select("#size").classed("active", true);
    d3.select("#count").classed("active", false);
  });

  d3.select("#count").on("click", function() {
    treemap.value(function(d) { return 1; });
    transition();
    d3.select("#size").classed("active", false);
    d3.select("#count").classed("active", true);
  });
});

function transition() {
  nodes = treemap(root);

  div.selectAll("div")
      .data(nodes)
    .transition()
      .duration(1500)
      .call(cell);

  div.selectAll("path.link")
      .data(bundle(nodes))
    .transition()
      .duration(1500)
      .style("stroke", function(d) { return stroke(d[0].value); })
      .attr("d", line);
}

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

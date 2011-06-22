var r = 960 / 2,
    stroke = d3.scale.linear().domain([0, 1e4]).range(["black", "steelblue"]),
    nodeMap = {};

var cluster = d3.layout.cluster()
    .size([360, r - 120])
    .sort(null)
    .value(function(d) { return d.value.size; })
    .children(function(d) { return isNaN(d.value.size) ? d3.entries(d.value) : null; });

var bundle = d3.layout.bundle()
    .outgoing(function(d) {
      if (!d.data.value.imports) return [];
      return d.data.value.imports.map(function(d) {
        return nodeMap[d];
      });
    });

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
      var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      return r * Math.cos(a);
    })
    .y(function(d) {
      var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      return r * Math.sin(a);
    });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", r * 2)
    .attr("height", r * 2)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

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
  var nodes = cluster(d3.entries(tree)[0]);

  nodes.forEach(function(node) {
    if (node.data.value.name) nodeMap[node.data.value.name] = node;
  });

  var link = vis.selectAll("path.link")
      .data(bundle(nodes))
    .enter().append("svg:path")
      .style("stroke", function(d) { return stroke(d[0].value); })
      .attr("class", "link")
      .attr("d", line);

  var node = vis.selectAll("g.node")
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.data.key; });
});

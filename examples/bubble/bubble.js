var r = 960,
    format = d3.format(",d"),
    fill = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([r, r]);

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", r)
    .attr("height", r)
    .attr("class", "bubble");

d3.json("flare.json", function(json) {
  var node = vis.selectAll("g.node")
      .data(bubble(classes(json))
      .filter(function(d) { return !d.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("svg:title")
      .text(function(d) { return d.data.className + ": " + format(d.value); });

  node.append("svg:circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return fill(d.data.packageName); });

  node.append("svg:text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(d) { return d.data.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    for (var childName in node) {
      var child = node[childName];
      if (isNaN(child)) {
        recurse(childName, child);
      } else {
        classes.push({
          className: childName,
          packageName: name,
          value: child
        });
      }
    }
  }

  recurse(null, root);
  return {children: classes};
}

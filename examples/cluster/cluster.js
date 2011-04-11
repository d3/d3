var w = 200,
    h = 2200,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]);

var cluster = d3.layout.cluster()
    .sort(null)
    .group(true)
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w + 40 + 120)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(40, 0)");

d3.json("flare.json", function(json) {
  var nodes = cluster(d3.entries(json)[0]);

  var link = vis.selectAll("g.link")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "link")
    .selectAll("line")
      .data(children)
    .enter();

  link.append("svg:line")
      .attr("x1", function(d) { return x(d.parent.depth); })
      .attr("y1", function(d) { return y(d.parent.breadth); })
      .attr("x2", function(d) { return x(d.parent.depth); })
      .attr("y2", function(d) { return y(d.child.breadth); });
  link.append("svg:line")
      .attr("x1", function(d) { return x(d.parent.depth); })
      .attr("y1", function(d) { return y(d.child.breadth); })
      .attr("x2", function(d) { return x(d.child.depth); })
      .attr("y2", function(d) { return y(d.child.breadth); });

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + x(d.depth) + "," + y(d.breadth) + ")"; })

  node.append("svg:circle")
      .attr("r", 4.5);

  node.append("svg:text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.key; });

  // Returns parent+child objects for any children of `d`.
  function children(d) {
    return (d.children || []).map(function(v) {
      return {
        parent: d,
        child: v
      };
    });
  }
});

var w = 700,
    h = 2300;

var tree = d3.layout.tree()
    .orient("left")
    .breadth(10)
    .depth(120)
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
    .value(function(d) { return d.value; });

var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(40, 100)");

d3.json("flare.json", function(json) {
  var nodes = tree(d3.entries(json)[0]);

  var link = vis.selectAll("g.link")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "link");

  link.selectAll("line")
      .data(children)
    .enter().append("svg:line")
      .attr("x1", function(d) { return d.parent.x; })
      .attr("y1", function(d) { return d.parent.y; })
      .attr("x2", function(d) { return d.child.x; })
      .attr("y2", function(d) { return d.child.y; });

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  node.append("svg:circle")
      .attr("class", "node")
      .attr("r", 5);

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

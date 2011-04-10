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
  var node = vis.data(d3.entries(json)).selectAll("g.node")
      .data(tree);
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  nodeEnter.selectAll("line.link")
      .data(function(d) {
        return (d.children || []).map(function(c) {
          return {x: c.x-d.x, y: c.y-d.y};
        });
      })
    .enter().append("svg:line")
      .attr("class", "link")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", function(d) { return d.x; })
      .attr("y2", function(d) { return d.y; });
  nodeEnter.append("svg:circle")
      .attr("class", "node")
      .attr("r", 5);
  nodeEnter.append("svg:text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.key; });

});

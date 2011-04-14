var r = 960 / 2;

var tree = d3.layout.tree()
    .size([360, r - 120])
    .sort(null)
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", r * 2)
    .attr("height", r * 2 - 150)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

d3.json("flare.json", function(json) {
  var nodes = tree(d3.entries(json)[0]);

  var link = vis.selectAll("g.link")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "link");

  link.selectAll("path")
      .data(children)
    .enter().append("svg:path")
      .attr("d", path);

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("svg:circle")
      .attr("r", 4.5);

  node.append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
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

  // Computes a pretty Bézier curve from parent to child. TODO reusable helper?
  function path(d) {
    var y0 = (d.parent.y + d.child.y) / 2,
        p0 = d.parent,
        p3 = d.child,
        p1 = {x: p0.x, y: y0},
        p2 = {x: p3.x, y: y0};
    return "M" + x(p0) + "," + y(p0)
         + "C" + x(p1) + "," + y(p1)
         + " " + x(p2) + "," + y(p2)
         + " " + x(p3) + "," + y(p3);
  }

  // Radial scales for x and y.
  function x(d) { return d.y * Math.cos((d.x - 90) / 180 * Math.PI); }
  function y(d) { return d.y * Math.sin((d.x - 90) / 180 * Math.PI); }
});

var w = 800,
    h = 800,
    m = 120;

var cluster = d3.layout.cluster()
    .sort(null)
    .group(true)
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w + 2 * m)
    .attr("height", h + 2 * m)
  .append("svg:g")
    .attr("transform", "translate(" + (w / 2 + m) + "," + (h / 2 + m) +")");

d3.json("flare.json", function(json) {
  var nodes = cluster(d3.entries(json)[0]);

  var link = vis.selectAll("g.link")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "link")
    .selectAll("line")
      .data(children)
    .enter();

  link.append("svg:path")
      .attr("d", path);

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")rotate(" + (a(d)-90) + ")"; })

  node.append("svg:circle")
      .attr("r", 4.5);

  node.append("svg:text")
      .attr("dx", function(d) { return a(d) < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return a(d) < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return a(d) < 180 ? null : "rotate(180)"; })
      //.attr("transform", function(d) { return "rotate(" + (a(d.breadth) - 90) + ")"; })
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
    var depth = (d.parent.depth + d.child.depth) / 2,
        p0 = d.parent,
        p3 = d.child,
        p1 = {breadth: p0.breadth, depth: depth},
        p2 = {breadth: p3.breadth, depth: depth};
    return "M" + x(p0) + "," + y(p0)
         + "C" + x(p1) + "," + y(p1)
         + " " + x(p2) + "," + y(p2)
         + " " + x(p3) + "," + y(p3);
  }

  // Radial scales for x and y.
  function a(d) { return d.breadth * 360; }
  function r(d) { return d.depth * w / 2; }
  function x(d) { return r(d) * Math.cos((a(d) - 90) / 180 * Math.PI); }
  function y(d) { return r(d) * Math.sin((a(d) - 90) / 180 * Math.PI); }
});

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

  link.append("svg:line")
      .attr("x1", function(d) { return x(d.parent); })
      .attr("y1", function(d) { return y(d.parent); })
      .attr("x2", function(d) { return x(d.child); })
      .attr("y2", function(d) { return y(d.child); });

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

  // Radial scales for x and y.
  function a(d) { return d.breadth * 360; }
  function r(d) { return d.depth * w / 2; }
  function x(d) { return r(d) * Math.cos((a(d) - 90) / 180 * Math.PI); }
  function y(d) { return r(d) * Math.sin((a(d) - 90) / 180 * Math.PI); }
});

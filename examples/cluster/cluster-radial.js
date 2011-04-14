var r = 960 / 2;

var cluster = d3.layout.cluster()
    .size([360, r - 120])
    .sort(null)
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; });

var diagonal = d3.svg.diagonal()
    .projection(function(d) {
      var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      return [r * Math.cos(a), r * Math.sin(a)];
    });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", r * 2)
    .attr("height", r * 2)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

d3.json("flare.json", function(json) {
  var nodes = cluster(d3.entries(json)[0]);

  var link = vis.selectAll("path.link")
      .data(cluster.links(nodes))
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal);

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
});

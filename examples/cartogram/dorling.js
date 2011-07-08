// Ratio of Obese (BMI >= 30) in U.S. Adults, CDC 2008
var data = [
  , .187, .198, , .133, .175, .151, , .1, .125, .171, , .172, .133, , .108,
  .142, .167, .201, .175, .159, .169, .177, .141, .163, .117, .182, .153, .195,
  .189, .134, .163, .133, .151, .145, .13, .139, .169, .164, .175, .135, .152,
  .169, , .132, .167, .139, .184, .159, .14, .146, .157, , .139, .183, .16, .143
];

var force = d3.layout.force()
    .gravity(.015)
    .distance(function(l) {
      return l.length;
    })
    .size([960, 500]);

var svg = d3.select("#chart")
  .append("svg:svg");

d3.json("../data/us-borders.json", function(borders) {
  d3.json("../data/us-state-centroids.json", function(states) {
    var project = d3.geo.albersUsa(),
        idToNode = {},
        links = [],
        nodes = states.features.map(function(d) {
      var xy = project(d.geometry.coordinates);
      return idToNode[d.id] = {x: xy[0], y: xy[1], r: Math.sqrt(data[+d.id] * 5000)};
    });

    states.features.forEach(function(d) {
      var stateBorders = borders[d.id];
      if (!stateBorders) return;
      stateBorders.forEach(function(b) {
        if (idToNode[d.id] && idToNode[b] && d.id < b) {
          var nodeA = idToNode[d.id],
              nodeB = idToNode[b],
              dx = nodeA.x - nodeB.x,
              dy = nodeA.y - nodeB.y,
              dist = Math.sqrt(dx * dx + dy * dy);
          links.push({source: nodeA, target: nodeB, length: dist});
        }
      });
    });

    force
        .nodes(nodes)
        .links(links)
        .start();

    svg.selectAll("circle")
        .data(nodes)
      .enter().append("svg:circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d, i) { return d.r; });
  });
});

force.on("tick", function(e) {
  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

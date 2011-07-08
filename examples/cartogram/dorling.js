// Ratio of Obese (BMI >= 30) in U.S. Adults, CDC 2008
var data = [
  , .187, .198, , .133, .175, .151, , .1, .125, .171, , .172, .133, , .108,
  .142, .167, .201, .175, .159, .169, .177, .141, .163, .117, .182, .153, .195,
  .189, .134, .163, .133, .151, .145, .13, .139, .169, .164, .175, .135, .152,
  .169, , .132, .167, .139, .184, .159, .14, .146, .157, , .139, .183, .16, .143
];

var color = d3.scale.linear()
    .domain([d3.min(data), d3.max(data)])
    .range(["#aad", "#556"]); 

var force = d3.layout.force()
    .gravity(0)
    .charge(0)
    .distance(function(l) {
      return l.length;
    })
    .size([960, 500]);

var svg = d3.select("#chart").append("svg:svg");

d3.json("../data/us-state-centroids.json", function(states) {
  var project = d3.geo.albersUsa(),
      idToNode = {},
      links = [],
      nodes = states.features.map(function(d) {
    var xy = project(d.geometry.coordinates);
    return idToNode[d.id] = {x: xy[0], y: xy[1], r: Math.sqrt(data[+d.id] * 5000), value: data[+d.id]};
  });

  force
      .nodes(nodes)
      .links(links)
      .start()
      .on("tick", function(e) {
    var k = .1 * e.alpha;
    nodes.forEach(function(a, i) {
      nodes.forEach(function(b, i) {
        // Check for collision
        var dx = a.x - b.x,
            dy = a.y - b.y,
            dr = a.r + b.r;
        if (dx * dx + dy * dy < dr * dr) {
          a.x += dx * k;
          a.y += dy * k;
        }
      });
    });

    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

  svg.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .style("fill", function(d) { return color(d.value); })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d, i) { return d.r; });
});

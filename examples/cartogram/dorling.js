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
    .charge(0)
    .gravity(0)
    .size([960, 500]);

var svg = d3.select("#chart").append("svg:svg")
    .attr("width", 960 + 100)
    .attr("height", 500 + 100)
  .append("svg:g")
    .attr("transform", "translate(50,50)");

d3.json("../data/us-state-centroids.json", function(states) {
  var project = d3.geo.albersUsa(),
      idToNode = {},
      links = [],
      nodes = states.features.map(function(d) {
    var xy = project(d.geometry.coordinates);
    return idToNode[d.id] = {
      x: xy[0],
      y: xy[1],
      gravity: {x: xy[0], y: xy[1]},
      r: Math.sqrt(data[+d.id] * 5000),
      value: data[+d.id]
    };
  });

  force
      .nodes(nodes)
      .links(links)
      .start()
      .on("tick", function(e) {
    var k = e.alpha,
        kg = k * .02;
    nodes.forEach(function(a, i) {
      // Apply gravity forces.
      a.x += (a.gravity.x - a.x) * kg;
      a.y += (a.gravity.y - a.y) * kg;
      nodes.slice(i + 1).forEach(function(b) {
        // Check for collisions.
        var dx = a.x - b.x,
            dy = a.y - b.y,
            l = Math.sqrt(dx * dx + dy * dy),
            d = a.r + b.r;
        if (l < d) {
          l = (l - d) / l * k;
          dx *= l;
          dy *= l;
          a.x -= dx;
          a.y -= dy;
          b.x += dx;
          b.y += dy;
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

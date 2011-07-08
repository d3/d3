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

var svg = d3.select("#chart").append("svg:svg");

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
      r: Math.sqrt(data[+d.id] * 2500),
      value: data[+d.id]
    };
  });

  force
      .nodes(nodes)
      .links(links)
      .start()
      .on("tick", function(e) {
    var k = e.alpha * .5,
        kg = k * .1;
    nodes.forEach(function(a, i) {
      // Apply gravity forces.
      a.x += (a.gravity.x - a.x) * kg;
      a.y += (a.gravity.y - a.y) * kg;
      nodes.slice(i + 1).forEach(function(b) {
        // Check for collision
        var dx = a.x - b.x,
            dy = a.y - b.y,
            d = a.r + b.r,
            lx = Math.abs(dx),
            ly = Math.abs(dy);
        if (lx < d && ly < d) {
          lx = (lx - d) / lx * k;
          ly = (ly - d) / ly * k;
          dx *= lx;
          dy *= ly;
          a.x -= dx;
          a.y -= dy;
          b.x += dx;
          b.y += dy;
        }
      });
    });

    svg.selectAll("rect")
        .attr("x", function(d) { return d.x - d.r; })
        .attr("y", function(d) { return d.y - d.r; });
  });

  svg.selectAll("rect")
      .data(nodes)
    .enter().append("svg:rect")
      .style("fill", function(d) { return color(d.value); })
      .attr("x", function(d) { return d.x - d.r; })
      .attr("y", function(d) { return d.y - d.r; })
      .attr("width", function(d) { return d.r * 2; })
      .attr("height", function(d) { return d.r * 2; });
});

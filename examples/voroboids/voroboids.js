var width = 960,
    height = 500,
    mouse = [null, null];

var fill = d3.scale.linear()
    .domain([0, 1e4])
    .range(["brown", "steelblue"]);

// Initialise boids.
var boids = d3.range(100).map(function() {
  return boid()
      .position([Math.random() * width, Math.random() * height])
      .velocity([Math.random() * 2 - 1, Math.random() * 2 - 1])
      .gravityCenter(mouse);
});

// Compute initial positions.
var vertices = boids.map(function(boid) {
  return boid(boids);
});

d3.select(window).on("blur", nullGravity);

var svg = d3.select("#vis")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "PiYG")
    .on("mousemove", function() {
      var m = d3.mouse(this);
      mouse[0] = m[0];
      mouse[1] = m[1];
    })
    .on("mouseout", nullGravity);

svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
  .enter().append("path")
    .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
    .data(vertices)
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 2);

d3.timer(function() {
  // Update boid positions.
  boids.forEach(function(boid, i) {
    vertices[i] = boid(boids);
  });

  // Update circle positions.
  svg.selectAll("circle")
      .data(vertices)
      .attr("transform", function(d) { return "translate(" + d + ")"; });

  // Update voronoi diagram.
  svg.selectAll("path")
      .data(d3.geom.voronoi(vertices))
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
      .style("fill", function(d) { return fill((d3.geom.polygon(d).area())); });
});

function nullGravity() {
  mouse[0] = mouse[1] = null;
}

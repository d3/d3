var w = 960,
    h = 500,
    mouse = [0, 0];

// Initialise boids.
var boids = d3.range(100).map(function(d) {
  return d3.ai.boid()
    .position([Math.random() * w, Math.random() * h])
    .velocity([Math.random() * 2 - 1, Math.random() * 2 - 1])
    .gravityCenter(mouse);
});

// Compute initial positions.
var vertices = boids.map(function(boid) {
  return boid(boids);
});

// Insert mouse position (gravity center).
vertices.unshift(mouse);

var svg = d3.select("#vis")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "PiYG")
    .on("mousemove", function() {
      var m = d3.svg.mouse(this);
      mouse[0] = m[0];
      mouse[1] = m[1];
    })
    .on("mouseout", function() {
      mouse[0] = null;
      mouse[1] = null;
    });

svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
  .enter().append("svg:path")
    .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
    .data(vertices)
  .enter().append("svg:circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 2);

function step() {
  // Update boid positions.
  boids.forEach(function(boid, i) {
    vertices[i + 1] = boid(boids);
  });

  // Update circle positions.
  svg.selectAll("circle")
      .data(vertices)
      .filter(function(d, i) { return i > 0; })
      .attr("transform", function(d) { return "translate(" + d + ")"; });

  // Update voronoi diagram.
  svg.selectAll("path")
      .data(d3.geom.voronoi(vertices)
        .map(function(d) { return "M" + d.join("L") + "Z"; }))
      .filter(function(d) { return this.getAttribute("d") != d; })
      .attr("d", function(d) { return d; });
}

d3.timer(step);

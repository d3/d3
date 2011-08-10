var w = 960,
    h = 500,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h - 40]);

// An SVG element with a bottom-right origin.
var svg = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .style("padding-right", "30px")
  .append("svg:g")
    .attr("transform", "translate(" + x(1) + "," + (h - 20) + ")scale(-1,-1)");

// A sliding container to hold the bars.
var body = svg.append("svg:g")
    .attr("transform", "translate(0,0)");

// A container to hold the y-axis rules.
var rules = svg.append("svg:g");

// A label for the current year.
var title = svg.append("svg:text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .attr("transform", "translate(" + x(1) + "," + y(1) + ")scale(-1,-1)")
    .text(2000);

d3.csv("population.csv", function(data) {

  // Convert strings to numbers.
  data.forEach(function(d) {
    d.people = +d.people;
    d.year = +d.year;
    d.age = +d.age;
  });

  // Compute the extent of the data set in age and years.
  var age0 = 0,
      age1 = d3.max(data, function(d) { return d.age; }),
      year0 = d3.min(data, function(d) { return d.year; }),
      year1 = d3.max(data, function(d) { return d.year; }),
      year = year1;

  // Update the scale domains.
  x.domain([0, age1 + 5]);
  y.domain([0, d3.max(data, function(d) { return d.people; })]);

  // Add rules to show the population values.
  rules = rules.selectAll(".rule")
      .data(y.ticks(10))
    .enter().append("svg:g")
      .attr("class", "rule")
      .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

  rules.append("svg:line")
      .attr("x2", w);

  rules.append("svg:text")
      .attr("x", 6)
      .attr("dy", ".35em")
      .attr("transform", "rotate(180)")
      .text(function(d) { return Math.round(d / 1e6) + "M"; });

  // Add labeled rects for each birthyear.
  var years = body.selectAll("g")
      .data(d3.range(year0 - age1, year1 + 5, 5))
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(year1 - d) + ",0)"; });

  years.selectAll("rect")
      .data(d3.range(2))
    .enter().append("svg:rect")
      .attr("x", 1)
      .attr("width", x(5) - 2)
      .attr("height", 1e-6);

  years.append("svg:text")
      .attr("y", -6)
      .attr("x", -x(5) / 2)
      .attr("transform", "rotate(180)")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .text(String);

  // Add labels to show the age.
  svg.append("svg:g").selectAll("text")
      .data(d3.range(0, age1 + 5, 5))
    .enter().append("svg:text")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + (x(d) + x(5) / 2) + ",-4)scale(-1,-1)"; })
      .attr("dy", ".71em")
      .text(String);

  // Nest by year then birthyear.
  data = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.year - d.age; })
      .rollup(function(v) { return v.map(function(d) { return d.people; }); })
      .map(data);

  // Allow the arrow keys to change the displayed year.
  d3.select(window).on("keydown", function() {
    switch (d3.event.keyCode) {
      case 37: year = Math.max(year0, year - 10); break;
      case 39: year = Math.min(year1, year + 10); break;
    }
    redraw();
  });

  redraw();

  function redraw() {
    if (!(year in data)) return;
    title.text(year);

    body.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + x(year - year1) + ",0)"; });

    years.selectAll("rect")
        .data(function(d) { return data[year][d] || [0, 0]; })
      .transition()
        .duration(750)
        .attr("height", y);
  }
});

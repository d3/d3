var w = 800,
    h = 600,
    p = 20,
    index = 3,
    duration = 1000;

var points = d3.range(1, 5).map(function(i) {
  return [
    i * w / 5,
    50 + Math.random() * (h - 100)
  ];
});

var wrapper = d3.select("#chart")
    .data([points])
  .append("svg:svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2);

var vis = wrapper.append("svg:g")
    .attr("transform", "translate(" + p + "," + p + ")");

var line = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

vis.append("svg:path")
    .attr("class", "line")

function update() {
  vis.select("path")
    .transition().duration(duration)
      .attr("d", line);

  var circle = vis.selectAll("circle")
      .data(points, function(d) { return d; });

  circle.enter().append("svg:circle")
      .attr("class", function(d, i) { return i === index ? "selected" : null; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; })
      .attr("r", 6.5)
      .attr("opacity", 1)
      .on("mousedown", function(d, i) {
        vis.selectAll("circle").filter(function(d, j) {
          return j === index;
        }).attr("class", null);
        var circle = d3.select(this)
            .attr("class", "selected");
        index = i;
        wrapper.on("mousemove", function() {
          var m = d3.svg.mouse(this);
          m[0] -= p;
          m[1] -= p;
          points[index] = m;
          circle
              .attr("cx", m[0])
              .attr("cy", m[1]);
          vis.select("path")
              .attr("d", line);
        });
        d3.event.preventDefault();
        d3.event.stopPropagation();
      });

  circle
      .attr("class", function(d, i) { return i === index ? "selected" : null; });

  circle.exit().transition()
      .duration(duration / 4)
      .attr("opacity", 1e-6)
      .remove();
}

update();

wrapper.on("mousedown", function() {
  var m = d3.svg.mouse(this);
  index = points.push([m[0] - p, m[1] - p]) - 1;
  update();
});

wrapper.on("mouseup", function() {
  wrapper.on("mousemove", null);
});

d3.select(window).on("keydown", function() {
  var e = d3.event;
  // code 8 is backspace, code 46 is delete
  if ((e.keyCode == 8 || e.keyCode == 46) && (index >= 0)) {
    points.splice(index--, 1);
    update();
    e.preventDefault();
  }
});

// Add interpolator dropdown
var interpolators = [
  "linear",
  "step-before",
  "step-after",
  "basis",
  "basis-closed",
  "cardinal",
  "cardinal-closed"
];

var select = d3.select("#interpolate");
  
select.selectAll("option")
    .data(interpolators)
  .enter().append("option")
    .attr("value", String)
    .text(String);

select.on("change", function() {
  line.interpolate(this.value);
  vis.select("path")
    .transition().duration(1000)
      .attr("d", line);
});

var w = 800,
    h = 600,
    p = 20;

var points = d3.range(1, 5).map(function(i) {
  return [
    i * w / 5,
    50 + Math.random() * (h - 100)
  ];
});

var selected = points[0];

var vis = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2)
    .on("mousedown", function(d) {
      var m = d3.svg.mouse(this),
          index = points.push([m[0] - p, m[1] - p]) - 1;
      selected = points[index];
      update();
    })
  .append("svg:g")
    .attr("transform", "translate(" + p + "," + p + ")");

var line = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

function update() {
  var path = vis.selectAll("path")
    .data(points.length ? [points] : []);

  path.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", line);

  path.attr("d", line);

  path.exit().remove();

  var circle = vis.selectAll("circle")
      .data(points, function(d) { return d; });

  circle.enter().append("svg:circle")
      .attr("class", function(d) { return d === selected ? "selected" : null; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; })
      .attr("r", 6.5)
      .on("mousedown", function(d) {
        var that = this;
        selected = d;
        update();
        var circle = d3.select(this);
        d3.select(window).on("mousemove", function() {
          var m = d3.svg.mouse(that);
          d[0] = Math.max(0, Math.min(m[0], w));
          d[1] = Math.max(0, Math.min(m[1], h));
          circle
              .attr("cx", d[0])
              .attr("cy", d[1]);
          vis.selectAll("path")
              .attr("d", line);
        });
        d3.event.preventDefault();
        d3.event.stopPropagation();
      });

  circle
      .attr("class", function(d) { return d === selected ? "selected" : null; });

  circle.exit().remove();
}

update();

d3.select(window)
    .on("mouseup", function() {
      d3.select(window).on("mousemove", null);
      update();
    })
    .on("keydown", function() {
      var e = d3.event;
      // code 8 is backspace, code 46 is delete
      if ((e.keyCode == 8 || e.keyCode == 46) && selected !== null) {
        var index = points.indexOf(selected);
        points.splice(index, 1);
        selected = points.length ? points[index > 0 ? index - 1 : 0] : null;
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
  update();
});

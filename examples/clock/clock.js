// Based on http://vis.stanford.edu/protovis/ex/clock.html

var fsec = d3.time.format("%S s"),
    fmin = d3.time.format("%M m"),
    fhou = d3.time.format("%H h"),
    fwee = d3.time.format("%a"),
    fdat = d3.time.format("%d d"),
    fmon = d3.time.format("%b");

// Generate the fields for the current date/time.
function fields() {
  var d = new Date;

  function days() {
    return 32 - new Date(d.getYear(), d.getMonth(), 32).getDate();
  }

  var second = (d.getSeconds() + d.getMilliseconds() / 1000) / 60;
  var minute = (d.getMinutes() + second) / 60;
  var hour = (d.getHours() + minute) / 24;
  var weekday = (d.getDay() + hour) / 7;
  var date = (d.getDate() - 1 + hour) / days();
  var month = (d.getMonth() + date) / 12;

  return [
    { value: second,  index: .7, text: fsec(d) },
    { value: minute,  index: .6, text: fmin(d) },
    { value: hour,    index: .5, text: fhou(d) },
    { value: weekday, index: .3, text: fwee(d) },
    { value: date,    index: .2, text: fdat(d) },
    { value: month,   index: .1, text: fmon(d) },
  ];
}

var radius = 768 / 2;

var vis = d3.select("#clock").append("svg:svg")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
  .append("svg:g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

// Background circle.
vis.append("svg:circle")
    .attr("r", radius * .8 + 2)

// Define reusable arc generator.
var arc = d3.svg.arc()
  .startAngle(0)
  .endAngle(function(d) { return d.value * 2 * Math.PI; })
  .innerRadius(function(d) { return d.index * radius; })
  .outerRadius(function(d) { return (d.index + .08) * radius; });

// Set up initial arcs.
var data = fields();

var wedge = vis.selectAll("path")
    .data(data);

wedge.enter().append("svg:path")
    .attr("fill", function(d) { return "hsl(" + (360 * d.value - 180) + ", 50%, 50%)"; })
    .attr("d", arc);

var text = vis.selectAll("text")
    .data(data);

text.enter().append("svg:text")
    .attr("text-anchor", "end")
    .attr("dy", "-1em")
    .attr("dx", "-.3em")
    .attr("y", function(d) { return -d.index * radius; })
    .text(function(d) { return d.text; });

// Update arcs.
function update() {
  var data = fields();

  var wedge = vis.selectAll("path")
      .data(data)
      .attr("fill", function(d) { return "hsl(" + (360 * d.value - 180) + ", 50%, 50%)"; })
      .attr("d", arc);

  var text = vis.selectAll("text")
      .data(data)
      .text(function(d) { return d.text; });
}

d3.timer(update);

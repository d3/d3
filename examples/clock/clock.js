// Based on http://vis.stanford.edu/protovis/ex/clock.html
// Based on http://blog.pixelbreaker.com/polarclock

var w = 960,
    h = 700,
    r = Math.min(w, h) / 1.8,
    s = .09,
    fsec = d3.time.format("%S s"),
    fmin = d3.time.format("%M m"),
    fhou = d3.time.format("%H h"),
    fwee = d3.time.format("%a"),
    fdat = d3.time.format("%d d"),
    fmon = d3.time.format("%b");

var fill = d3.scale.linear()
    .range(["hsl(-180, 50%, 50%)", "hsl(180, 50%, 50%)"])
    .interpolate(d3.interpolateHsl);

var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) { return d.value * 2 * Math.PI; })
    .innerRadius(function(d) { return d.index * r; })
    .outerRadius(function(d) { return (d.index + s) * r; });

var vis = d3.select("#clock").append("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var g = vis.selectAll("g")
    .data(fields)
  .enter().append("g");

g.append("path")
    .style("fill", function(d) { return fill(d.value); })
    .attr("d", arc);

g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .text(function(d) { return d.text; });


// Update arcs.
d3.timer(function() {
  var g = vis.selectAll("g")
      .data(fields);

  g.select("path")
      .style("fill", function(d) { return fill(d.value); })
      .attr("d", arc);

  g.select("text")
      .attr("dy", function(d) { return d.value < .5 ? "-.5em" : "1em"; })
      .attr("transform", function(d) {
        return "rotate(" + 360 * d.value + ")"
            + "translate(0," + -(d.index + s / 2) * r + ")"
            + "rotate(" + (d.value < .5 ? -90 : 90) + ")"
      })
      .text(function(d) { return d.text; });
});

// Generate the fields for the current date/time.
function fields() {
  var d = new Date;

  function days() {
    return 32 - new Date(d.getYear(), d.getMonth(), 32).getDate();
  }

  var second = (d.getSeconds() + d.getMilliseconds() / 1000) / 60,
      minute = (d.getMinutes() + second) / 60,
      hour = (d.getHours() + minute) / 24,
      weekday = (d.getDay() + hour) / 7,
      date = (d.getDate() - 1 + hour) / days(),
      month = (d.getMonth() + date) / 12;

  return [
    {value: second,  index: .7, text: fsec(d)},
    {value: minute,  index: .6, text: fmin(d)},
    {value: hour,    index: .5, text: fhou(d)},
    {value: weekday, index: .3, text: fwee(d)},
    {value: date,    index: .2, text: fdat(d)},
    {value: month,   index: .1, text: fmon(d)},
  ];
}

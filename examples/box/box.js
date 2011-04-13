var w = 120,
    h = 500,
    m = [10, 40, 20, 40], // top right bottom left
    max = 50;

var chart = d3.chart.box()
    .tickFormat(d3.format(".1"))
    .domain([0, max])
    .whiskers(function(d) { return [1, d.length - 2]; })
    .width(w - m[1] - m[3])
    .height(h - m[0] - m[2]);

d3.json("box.json", function(data) {

  var vis = d3.select("#chart").selectAll("svg")
      .data(data)
    .enter().append("svg:svg")
      .attr("class", "box")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
      .call(chart);
  
  var title = vis.append("svg:g")
      .attr("text-anchor", "end")
      .attr("transform", "translate(" + (w - m[0] - m[2]) / 2 + ")");

  chart.duration(1000);
  window.transition = function() {
    vis.map(randomize).call(chart);
  };
});

function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d = d.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d) * .2;
  return function(d) {
    return Math.min(Math.max(0, d + k * (Math.random() - .5)), max);
  };
}

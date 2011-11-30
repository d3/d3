var w = 960,
    h = 50,
    m = [5, 40, 20, 120]; // top right bottom left

var chart = d3.chart.bullet()
    .width(w - m[1] - m[3])
    .height(h - m[0] - m[2]);

d3.json("bullets.json", function(data) {

  var vis = d3.select("#chart").selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", w)
      .attr("height", h)
    .append("g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
      .call(chart);

  var title = vis.append("g")
      .attr("text-anchor", "end")
      .attr("transform", "translate(-6," + (h - m[0] - m[2]) / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  chart.duration(1000);
  window.transition = function() {
    vis.map(randomize).call(chart);
  };
});

function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}

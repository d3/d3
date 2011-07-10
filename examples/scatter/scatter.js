var w = 280,
    h = 280,
    m = [10, 0, 20, 35], // top right bottom left
    n = 100;

var chart = d3.chart.scatter()
    .width(w)
    .height(h)
    .domain([-.1, 1.1])
    .tickFormat(function(d) { return ~~(d * 100); });

var vis = d3.select("#chart")
  .append("svg:svg")
  .append("svg:g")
    .attr("class", "scatter")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
    .data([{
      x: d3.range(n).map(Math.random),
      y: d3.range(n).map(Math.random),
    }]);

vis.append("svg:rect")
    .attr("class", "box")
    .attr("width", w)
    .attr("height", h);

vis.call(chart);

chart.duration(1000);

window.transition = function() {
  vis.map(randomize).call(chart);
};

function randomize(d) {
  d.x = d3.range(n).map(Math.random);
  d.y = d3.range(n).map(Math.random);
  return d;
}

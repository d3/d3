var r = 250,
    p = 30,
    max = 6,
    data = [
      {a: 1.9, b: 2.7, c: 3.3, d: 1.5, e: 1.3},
      {a: 1.2, b: 2.3, c: 3.4, d: 3.5, e: 2.1}
    ],
    allVariables = d3.keys(data[0]);

var chart = d3.chart.radar()
    .domain([0, max])
    .radius(r);

var vis = d3.select("#chart").selectAll("svg")
    .data([data])
  .enter().append("svg:svg")
    .attr("width", 2 * (r + p))
    .attr("height", 2 * (r + p))
  .append("svg:g")
    .attr("class", "radar")
    .attr("transform", "translate(" + (r + p) + "," + (r + p) + ")")
    .call(chart);

chart.duration(1000);

window.transition = function() {
//   var n = allVariables.length - 2;
//   chart.variables(allVariables.slice(0, 3 + Math.floor(Math.random() * n)));
  vis.map(randomize).call(chart);
};

function randomize(d) {
  return d.map(function(d) {
    var min = 1,
        k = max;
    for (var key in d) {
      d[key] = Math.max(min, Math.min(max, d[key] + k * (Math.random() - .5)));
    }
    return d;
  });
}

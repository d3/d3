var w = 280,
    h = 280,
    m = [10, 0, 20, 35], // top right bottom left
    n = 10000; // number of samples to generate

var chart = d3.chart.qq()
    .width(w)
    .height(h)
    .domain([-.1, 1.1])
    .tickFormat(function(d) { return ~~(d * 100); });

var vis = d3.select("#chart")
  .append("svg")
  .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

d3.json("turkers.json", function(turkers) {
  var tm = science.stats.mean(turkers),
      td = Math.sqrt(science.stats.variance(turkers)),
      dd = [
        [0.10306430789206111, 0.0036139086950272735, 0.30498647327844536],
        [0.5924252668569606, 0.0462763685758622, 0.4340870312025223],
        [0.9847627827855167, 2.352350767874714e-4, 0.2609264955190324]
      ];

  var g = vis.selectAll("g")
      .data([{
        x: d3.range(n).map(Math.random),
        y: turkers,
        label: "Uniform Distribution"
      }, {
        x: d3.range(n).map(normal1(tm, td)),
        y: turkers,
        label: "Gaussian (Normal) Distribution"
      }, {
        x: d3.range(n).map(normal3(dd)),
        y: turkers,
        label: "Mixture of 3 Gaussians"
      }])
    .enter().append("g")
      .attr("class", "qq")
      .attr("transform", function(d, i) { return "translate(" + (w + m[1] + m[3]) * i + ")"; });

  g.append("rect")
      .attr("class", "box")
      .attr("width", w)
      .attr("height", h);

  g.call(chart);

  g.append("text")
      .attr("dy", "1.3em")
      .attr("dx", ".6em")
      .text(function(d) { return d.label; });

  chart.duration(1000);

  window.transition = function() {
    g.map(randomize).call(chart);
  };
});

function randomize(d) {
  d.y = d3.range(n).map(Math.random);
  return d;
}

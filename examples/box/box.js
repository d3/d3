var w = 120,
    h = 500,
    m = [10, 50, 20, 50], // top right bottom left
    min = Number.MAX_VALUE,
    max = Number.MIN_VALUE;

var chart = d3.chart.box()
    .whiskers(function(d, i, quartiles) {
      var q1 = quartiles[0],
          q3 = quartiles[2],
          iqr = q3 - q1,
          w0 = -1,
          w1 = d.length;
      while (d[++w0] < q1 - iqr * 1.5);
      while (d[--w1] > q3 + iqr * 1.5);
      return [w0, w1];
    })
    .width(w - m[1] - m[3])
    .height(h - m[0] - m[2]);

d3.csv("morley.csv", function(csv) {
  var data = [];

  csv.forEach(function(x) {
    var e = ~~x.Expt - 1,
        r = ~~x.Run - 1,
        s = ~~x.Speed,
        d = data[e];
    if (!d) d = data[e] = [s];
    else d.push(s);
    if (s > max) max = s;
    if (s < min) min = s;
  });

  chart.domain([min, max]);

  var vis = d3.select("#chart").selectAll("svg")
      .data(data)
    .enter().append("svg:svg")
      .attr("class", "box")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
      .call(chart);
  
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
    return Math.min(Math.max(min, d + k * (Math.random() - .5)), max);
  };
}

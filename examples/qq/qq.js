/** Sample from a normal distribution with mean 0, stddev 1. */
function normal_sample() {
  var x = 0, y = 0, rds, c;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    rds = x * x + y * y;
  } while (rds == 0 || rds > 1);
  c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
  return x * c; // throw away extra sample y * c
}

// Uniform random distribution
var uniform = function() { return Math.random(); };
uniform.label = "Uniform Distribution";

// Simple 1D Gaussian (normal) distribution
var avg = mean(turkers.percent.values);
var dev = deviation(turkers.percent.values);
var normal1 = function() { return avg + dev * normal_sample(); }
normal1.label = "Gaussian (Normal) Distribution";

// Gaussian Mixture Model (k=3) fit using E-M algorithm
var normal3 = function() {
  var dd = [
        [0.10306430789206111, 0.0036139086950272735, 0.30498647327844536],
        [0.5924252668569606, 0.0462763685758622, 0.4340870312025223],
        [0.9847627827855167, 2.352350767874714E-4, 0.2609264955190324]],
      r = Math.random(),
      i = r < dd[0][2] ? 0 : r < dd[0][2] + dd[1][2] ? 1 : 2,
      d = dd[i];
  return d[0] + Math.sqrt(d[1]) * normal_sample();
}
normal3.label = "Mixture of 3 Gaussians";

var w = 270,
    h = 270,
    m = [10, 50, 20, 30], // top right bottom left
    min = Infinity,
    max = -Infinity;

var chart = d3.chart.qq()
    .width(w).height(h)
    .domain([-.5, 1.5])
    .distribution(function(d) { return d.dist; });

/* Distributions for comparison. */
var dists = [uniform, normal1, normal3];

var wrapper = d3.select("#chart").append("svg:svg")
    .attr("class", "qq");

var vis = wrapper.selectAll("g")
    .data(dists.map(function(d) { return {dist: d3.range(10000).map(d), values: turkers.percent.values, label: d.label}; }))
  .enter().append("svg:g")
    .attr("transform", function(d, i) { return "translate(" + ((w + m[3]) * i + m[3]) + "," + m[0] + ")"; })
    .call(chart);

wrapper.append("svg:text")
    .attr("transform", "rotate(-90)translate(" + -(h / 2 + m[0]) + ", 20)")
    .attr("text-anchor", "middle")
    .text("Turker Task Group Completion %");

vis.append("svg:text")
    .attr("dy", "1em")
    .attr("dx", ".3em")
    .text(function(d, i) { return d.label; });

function sum(array) {
  var s = 0, i = -1, n = array.length;
  while (++i < n) s += array[i];
  return s;
}

function mean(array) {
  return sum(array) / array.length;
}

function variance(array) {
  if (array.length < 1) return NaN;
  if (array.length === 1) return 0;
  var m = mean(array), sum = 0;
  for (var i = 0; i < array.length; i++) {
    var d = array[i] - m;
    sum += d * d;
  }
  return sum;
}

function deviation(array) {
  return Math.sqrt(variance(array) / (array.length - 1));
}

chart.duration(1000);
window.transition = function() {
  vis.map(randomize).call(chart);
};

function randomize(d) {
  return {dist: d.dist, values: d.values.map(Math.random)};
}

var data; // loaded asynchronously

var path = d3.geo.path();

var svg = d3.select("#chart")
  .append("svg:svg");

var counties = svg.append("svg:g")
    .attr("id", "counties")
    .attr("class", "Blues");

var states = svg.append("svg:g")
    .attr("id", "states");

d3.json("../data/us-counties.json", function(json) {
  counties.selectAll("path")
      .data(json.features)
    .enter().append("svg:path")
      .attr("class", data ? quantize : null)
      .attr("d", path);
});

d3.json("../data/us-states.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("svg:path")
      .attr("d", path);
});

d3.json("unemployment.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize);
});

function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
}

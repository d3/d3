// Our projection.
var xy = d3.geo.stereographic(),
    path = d3.geo.path().projection(xy);

var states = d3.select("body")
  .append("svg:svg")
  .append("svg:g")
    .attr("id", "states");

var grid = d3.select("svg")
    .append('svg:g');

grid.selectAll('path')
  .data(
    d3.range(0, 90, 10).map(function(lat) { return d3.range(0, 370, 10).map(function(lon) { return [lon, lat] }) }).concat(
      d3.range(0, 360, 10).map(function(lon) { return d3.range(0, 100, 10).map(function(lat) { return [lon, lat] }) }))
  )
  .enter().append("svg:path")
    .attr('class', 'grid')
    .attr("d", d3.svg.line()
        .x(function(d) { return xy(d)[0] })
        .y(function(d) { return xy(d)[1] })
      );

d3.json("../../data/world-countries.json", function(collection) {

  states
    .selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr("d", path)
    .append("svg:title")
      .text(function(d) { return d.properties.name; });

});

function refresh() {
  states
    .selectAll("path")
      .attr("d", path);

  grid
    .selectAll('path')
      .attr("d", d3.svg.line()
        .x(function(d) { return xy(d)[0] })
        .y(function(d) { return xy(d)[1] })
      );

  d3.select("#scale span")
      .text(xy.scale());
  d3.select("#translate-x span")
      .text(xy.translate()[0]);
  d3.select("#translate-y span")
      .text(xy.translate()[1]);
}

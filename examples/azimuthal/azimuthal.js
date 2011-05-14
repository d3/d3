// Our projection.
var xy = d3.geo.azimuthal(),
    path = d3.geo.path().projection(xy);

var geopath = function(d) {
  var c0 = xy([0, 270]), c1 = xy([180, 270]),
      r = Math.abs(c0[0] - c1[0]) / 2,
      arc = " A " + r + "," + r + " 0 0,1 ",
      useArc = false,
      min = 360,
      max = 0,
      i = -1,
      n = d.length;
  while (++i < n) {
    var lon = d[i][0];
    if (lon < min) min = lon;
    if (lon > max) max = lon;
    if (max - min >= 180) {
      useArc = true;
      break;
    }
  }
  return path(d) + (useArc ? " M " + c0.join(",") + arc + c1.join(",") + arc + c0.join(",") + " z" : "");
};

var states = d3.select("body")
  .append("svg:svg")
  .append("svg:g")
    //.attr("fill-rule", "evenodd")
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
      .attr("d", geopath)
    .append("svg:title")
      .text(function(d) { return d.properties.name; });

});

function refresh() {
  states
    .selectAll("path")
      .attr("d", geopath);

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

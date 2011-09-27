var xy = d3.geo.azimuthal().scale(240).mode("stereographic"),
    circle = d3.geo.greatCircle(),
    path = d3.geo.path().projection(xy),
    svg = d3.select("body").append("svg:svg");

d3.json("../data/world-countries.json", function(collection) {
  svg.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr("d", function(d) { return path(circle.clip(d)); })
    .append("svg:title")
      .text(function(d) { return d.properties.name; });
});

function refresh(duration) {
  var p = svg.selectAll("path");
  if (duration) p = p.transition().duration(duration);
  p.attr("d", function(d) { return path(circle.clip(d)); });
  d3.select("#lon span")
      .text(xy.origin()[0]);
  d3.select("#lat span")
      .text(xy.origin()[1]);
  d3.select("#scale span")
      .text(xy.scale());
  d3.select("#translate-x span")
      .text(xy.translate()[0]);
  d3.select("#translate-y span")
      .text(xy.translate()[1]);
}

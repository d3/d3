var xy = d3.geo.azimuthal().scale(240).mode("stereographic"),
    path = d3.geo.path().projection(xy),
    svg = d3.select("body").append("svg:svg");

d3.json("../data/world-countries.json", function(collection) {
  svg.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr("d", path)
    .append("svg:title")
      .text(function(d) { return d.properties.name; });
});

function refresh() {
  svg.selectAll("path")
      .attr("d", path);
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

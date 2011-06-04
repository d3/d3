var w = 3600,
    h = 200;

var chart = d3.chart.impact()
    .duration(1000)
    .width(w)
    .height(h)
    .values(function(d) { return d.i; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("class", "RdBu")
    .attr("width", w)
    .attr("height", h);

// Originally from "https://github.com/mbostock/d3/graphs/impact_data"
d3.json("impact.json", function(data) {
  vis
      .data([data.buckets])
      .call(chart);

  vis.selectAll("path")
      .on("mouseover", function(d, i) {
        var a = data.authors[d.key];
        d3.select("#intro")
            .html("<b>" + a.n + "</b> (" +
              a.c + " commits, " +
              a.a + " additions, " +
              a.d + " deletions)");
        vis.selectAll("path")
            .sort(function(d0, d1) {
              return d0.key === d.key ? 1 : d1.key === d.key ? -1 : 0;
            });
      });
});

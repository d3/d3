var n = 20, // number of layers
    m = 200, // number of samples per layer
    data0 = d3.layout.stack().offset("wiggle")(stream_layers(n, m)),
    data1 = d3.layout.stack().offset("wiggle")(stream_layers(n, m)),
    color = d3.interpolateRgb("#aad", "#556");

var w = 960,
    h = 500,
    mx = m - 1,
    my = d3.max(data0.concat(data1), function(d) {
      return d3.max(d, function(d) {
        return d.y0 + d.y;
      });
    });

var area = d3.svg.area()
    .x(function(d) { return d.x * w / mx; })
    .y0(function(d) { return h - d.y0 * h / my; })
    .y1(function(d) { return h - (d.y + d.y0) * h / my; });

var vis = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

vis.selectAll("path")
    .data(data0)
  .enter().append("svg:path")
    .style("fill", function() { return color(Math.random()); })
    .attr("d", area);

function transition() {
  d3.selectAll("path")
      .data(function() {
        var d = data1;
        data1 = data0;
        return data0 = d;
      })
    .transition()
      .duration(2500)
      .attr("d", area);
}

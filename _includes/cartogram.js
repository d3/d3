// Ratio of Obese (BMI >= 30) in U.S. Adults, CDC 2008
var data = [
  , .187, .198, , .133, .175, .151, , .1, .125, .171, , .172, .133, , .108,
  .142, .167, .201, .175, .159, .169, .177, .141, .163, .117, .182, .153, .195,
  .189, .134, .163, .133, .151, .145, .13, .139, .169, .164, .175, .135, .152,
  .169, , .132, .167, .139, .184, .159, .14, .146, .157, , .139, .183, .16, .143
];

var svg = d3.select("#chart")
  .append("svg:svg");

d3.json("us-states.json", function(json) {
  var path = d3.geo.path();

  // A thick black stroke for the exterior.
  svg.append("svg:g")
      .attr("class", "black")
    .selectAll("path")
      .data(json.features)
    .enter().append("svg:path")
      .attr("d", path);

  // A white overlay to hide interior black strokes.
  svg.append("svg:g")
      .attr("class", "white")
    .selectAll("path")
      .data(json.features)
    .enter().append("svg:path")
      .attr("d", path);

  // The polygons, scaled!
  svg.append("svg:g")
      .attr("class", "grey")
    .selectAll("path")
      .data(json.features)
    .enter().append("svg:path")
      .attr("transform", function(d) {
        var centroid = path.centroid(d),
            x = centroid[0],
            y = centroid[1];
        return "translate(" + x + "," + y + ")"
            + "scale(" + Math.sqrt(data[+d.id] * 5 || 0) + ")"
            + "translate(" + -x + "," + -y + ")";
      })
      .attr("stroke-width", function(d) {
        return 1 / Math.sqrt(data[+d.id] * 5);
      })
      .attr("d", path);

});

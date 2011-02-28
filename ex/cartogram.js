var data; // loaded asynchronously

var svg = d3.select("#chart")
  .append("svg:svg");

d3.json("us-states.json", function(json) {
  var path = d3.geo.path();

  // Synthesize a random data variable to visualize…
  // Note: This has a baked-in sqrt transform!
  json.features.forEach(function(f) {
    f.properties.value = Math.sqrt(.2 + .8 * Math.random());
  });

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
            + "scale(" + d.properties.value + ")"
            + "translate(" + -x + "," + -y + ")";
      })
      .attr("stroke-width", function(d) { return 1 / d.properties.value; })
      .attr("d", path);

});

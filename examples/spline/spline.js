var width = 960,
    height = 500,
    line = d3.svg.line(),
    points = d3.range(1, 5).map(function(i) { return [i * width / 5, 50 + Math.random() * (height - 100)]; }),
    dragged = null,
    selected = points[0];

var vis = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

vis.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("mousedown", function() {
      points.push(selected = dragged = d3.mouse(vis.node()));
      update();
    });

vis.append("path")
    .data([points])
    .attr("class", "line")
    .call(update);

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup)
    .on("keydown", keydown);

// Add interpolator dropdown
d3.select("#interpolate")
    .on("change", function() {
      line.interpolate(this.value);
      update();
    })
  .selectAll("option")
    .data([
      "linear",
      "step-before",
      "step-after",
      "basis",
      "basis-open",
      "basis-closed",
      "cardinal",
      "cardinal-open",
      "cardinal-closed",
      "monotone"
    ])
  .enter().append("option")
    .attr("value", String)
    .text(String);

function update() {
  vis.select("path").attr("d", line);

  var circle = vis.selectAll("circle")
      .data(points, function(d) { return d; });

  circle.enter().append("circle")
      .attr("r", 1e-6)
      .on("mousedown", function(d) {
        selected = dragged = d;
        update();
      })
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 6.5);

  circle
      .classed("selected", function(d) { return d === selected; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; });

  circle.exit().remove();

  if (d3.event) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }
}


function mousemove() {
  if (!dragged) return;
  var m = d3.mouse(vis.node());
  dragged[0] = Math.max(0, Math.min(width, m[0]));
  dragged[1] = Math.max(0, Math.min(height, m[1]));
  update();
}

function mouseup() {
  if (!dragged) return;
  mousemove();
  dragged = null;
}

function keydown() {
  if (!selected) return;
  switch (d3.event.keyCode) {
    case 8: // backspace
    case 46: { // delete
      var i = points.indexOf(selected);
      points.splice(i, 1);
      selected = points.length ? points[i > 0 ? i - 1 : 0] : null;
      update();
      break;
    }
  }
}

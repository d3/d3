var w = 960,
    h = 500,
    line = d3.svg.line(),
    points = d3.range(1, 5).map(function(i) { return [i * w / 5, 50 + Math.random() * (h - 100)]; }),
    dragged = null,
    selected = points[0];

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

vis.append("svg:rect")
    .attr("width", w)
    .attr("height", h)
    .on("mousedown", function() {
      points.push(selected = dragged = d3.svg.mouse(vis.node()));
      update();
    });

vis.append("svg:path")
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
      "basis-closed",
      "cardinal",
      "cardinal-closed"
    ])
  .enter().append("option")
    .attr("value", String)
    .text(String);

function update() {
  vis.select("path").attr("d", line);

  var circle = vis.selectAll("circle")
      .data(points, function(d) { return d; });

  circle.enter().append("svg:circle")
      .attr("class", function(d) { return d === selected ? "selected" : null; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; })
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
      .attr("class", function(d) { return d === selected ? "selected" : null; })
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
  var m = d3.svg.mouse(vis.node());
  dragged[0] = Math.max(0, Math.min(w, m[0]));
  dragged[1] = Math.max(0, Math.min(h, m[1]));
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

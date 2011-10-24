var w = 960,
    h = 500,
    line = d3.svg.line(),
    points = d3.range(1, 5).map(function(i) { return [i * w / 5, 50 + Math.random() * (h - 100)]; }),
    dragged = null,
    selected = {};
selected[null] = points[0];

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

vis.append("svg:rect")
    .attr("width", w)
    .attr("height", h)
    .on("mousedown", addNodes)
    .on("touchstart", addNodes);

vis.append("svg:path")
    .data([points])
    .attr("class", "line")
    .call(update);

d3.select(window)
    .on("mousemove", mousemove)
    .on("touchmove", mousemove)
    .on("mouseup", mouseup)
    .on("touchend", mouseup)
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

  circle.enter().append("svg:circle")
      .attr("class", function(d) { return d3.values(selected).indexOf(d) !== -1 ? "selected" : null; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; })
      .attr("r", 1e-6)
      .on("mousedown", mousedown)
      .on("touchstart", mousedown)
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 6.5);

  circle
      .attr("class", function(d) { return d3.values(selected).indexOf(d) !== -1 ? "selected" : null; })
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; });

  circle.exit().remove();

  if (d3.event) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }
}

function addNodes() {
  var node = vis.node();
  var m = d3.event.touches ? d3.svg.touches(node) : [d3.svg.mouse(node)];
  points.push.apply(points, m);
  selected = dragged = {};
  m.forEach(function(m) {
    var id = m.identifier != null ? m.identifier : null;
    dragged[id] = m;
  });
  update();
}

function mousedown(d) {
  selected = dragged = {};
  selected[d3.event.touches ? d3.event.touches[0].identifier : null] = d;
  update();
}

function mousemove() {
  if (!dragged) return;
  var node = vis.node(),
      m = d3.event.touches ? d3.svg.touches(node) : [d3.svg.mouse(node)];
  m.forEach(function(m) {
    var id = m.identifier != null ? m.identifier : null;
    dragged[id][0] = Math.max(0, Math.min(w, m[0]));
    dragged[id][1] = Math.max(0, Math.min(h, m[1]));
  });
  update();
}

function mouseup() {
  if (!dragged) return;
  mousemove();
  dragged = null;
}

function keydown() {
  if (d3.keys(selected).length === 0) return;
  switch (d3.event.keyCode) {
    case 8: // backspace
    case 46: { // delete
      for (var id in selected) {
        var point = selected[id],
            i = points.indexOf(point);
        points.splice(i, 1);
        delete selected[id];
      }
      update();
      break;
    }
  }
}

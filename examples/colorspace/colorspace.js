var L = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99],
    query = location.search.slice(1),
    step = query ? Math.max(2, ~~query) : 5,
    size = 150, span, a, b;

function cross(a) {
  return function(d) {
    var c = [];
    for (var i = 0, n = a.length; i < n; i++)
      c.push([d, a[i]]);
    return c;
  };
}
function labcross(b) {
  return function(d) {
    var c = [];
    for (var i = 0, n = b.length; i < n; i++)
      c.push(d3.lab(d[0], d[1], b[i]));
    return c;
  };
}

// Populate step size selector widget
d3.select("#select")
    .on("change", function() {
      update(this.options[this.selectedIndex].value)
    })
  .selectAll("option")
    .data([2,3,4,5,10,20,25,50])
  .enter().append("option")
    .property("value", function(d) { return d; })
    .property("selected", function(d) { return d==step; })
    .text(function(d) { return d.toFixed(0); });

// Visualize the color space
update(step);

// Generate L*a*b* color space cross-sections
function update(res) {
  step = res;
  span = ~~(size / (200 / step) + 0.5);
  a = d3.range(-100,+101,   step),
  b = d3.range(+100,-101,-1*step);

  // Remove any previous instantiations
  d3.select("body").selectAll("div.section").remove();

  // One div per L* cross-section
  var div = d3.select("body").selectAll("div.section")
      .data(L)
    .enter().append("div")
      .attr("class", "section");

  // Label the L* value
  div.append("div")
      .text(function(L) { return "L* = " + L; });

  // Add SVG for cross-section
  var svg = div.append("svg:svg")
      .attr("width", span * a.length)
      .attr("height", span * b.length);

  // One column per a* value.
  var column = svg.selectAll("g")
      .data(cross(a))
    .enter().append("svg:g")
      .attr("transform", function(d, i) { return "translate(" + i*span + ",0)"; });

  // One row per b* value.
  column.selectAll("rect")
      .data(labcross(b))
    .enter().append("svg:rect")
      .attr("transform", function(c, i) { return "translate(0," + i*span + ")"; })
      .attr("width", span)
      .attr("height", span)
      .style("fill", function(c) { return c.rgb().clipped ? "#808080" : c; })
    .append("svg:title")
      .text(function(c) {
        return [c.L,c.a,c.b].map(function(d) { return d.toFixed(1); }).join(", ")
               + " -> " + c + (c.rgb().clipped ? " (clipped)" : "");
      });
}
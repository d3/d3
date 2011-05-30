var L = 50,
    step = 5,
    size = 500, 
    span = ~~(size / (200 / step) + 0.5),
    a = d3.range(-100,+101,   step),
    b = d3.range(+100,-101,-1*step);

function cross(b) {
  return function(a) {
    var c = [];
    for (var i = 0, n = b.length; i < n; i++)
      c.push({"a":a, "b":b[i]});
    return c;
  };
}

function color(c) {
  var lab = (c.lab = d3.lab(L, c.a, c.b)),
      rgb = (c.rgb = lab.rgb());
  return rgb.clipped ? "#808080" : rgb;
}

function tooltip(c) {
  return [L,c.a,c.b].map(function(d) { return d.toFixed(1); }).join(", ")
         + " -> " + c.rgb + (c.rgb.clipped ? " (clipped)" : "");
}

var svg = d3.select("body").append("svg:svg")
    .attr("width", span * a.length)
    .attr("height", span * b.length);

// One column per a* value.
var col = svg.selectAll("g")
    .data(a)
  .enter().append("svg:g")
    .attr("transform", function(d, i) { return "translate(" + i*span + ",0)"; });

// One row per b* value.
col.selectAll("rect")
    .data(cross(b))
  .enter().append("svg:rect")
    .attr("transform", function(c, i) { return "translate(0," + i*span + ")"; })
    .attr("width", span)
    .attr("height", span)
    .attr("fill", color)
  .append("svg:title").text(tooltip);


function refresh() {
  var rect = svg.selectAll("g").selectAll("rect")
    .data(cross(b))
    .attr("fill", color);
  rect.select("title").text(tooltip);
}
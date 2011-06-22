var w = 960,
    h = 500,
    fill = d3.scale.ordinal().range(colorbrewer.Greys[9].slice(1, 4)),
    stroke = d3.scale.linear().domain([0, 1e4]).range(["brown", "steelblue"]);

var treemap = d3.layout.treemap()
    .size([w, h])
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");

var line = d3.svg.line()
    .interpolate("basis")
    .beta(.85)
    .x(function(d) { return d.x + d.dx / 2; })
    .y(function(d) { return d.y + d.dy / 2; });

d3.json("dependency-data.json", function(classes) {
  var map = {},
      links = [];

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  // Lazily construct the package hierarchy from class names.
  classes.forEach(function(d) {
    find(d.name, d);
  });

  // Compute the treemap layout, starting at the root node!
  var nodes = treemap(map[""]);

  // Store a reference from class data object to the layout node.
  nodes.forEach(function(d) {
    d.data.node = d;
  });

  // For each import, construct a link from the source to target node.
  classes.forEach(function(d) {
    d.imports.forEach(function(i) {
      links.push({source: map[d.name].node, target: map[i].node});
    });
  });

  div.selectAll("div")
      .data(nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? fill(d.data.key) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.data.key; });

  div.append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .style("position", "absolute")
    .selectAll("path.link")
      .data(bundle(links))
    .enter().append("svg:path")
      .style("stroke", function(d) { return stroke(d[0].value); })
      .attr("class", "link")
      .attr("d", line);
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

var r = 960 / 2,
    splines = [],
    beta = .85;

var cluster = d3.layout.cluster()
    .size([360, r - 120])
    .sort(null)
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("basis")
    .beta(beta)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", r * 2)
    .attr("height", r * 2)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")");

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

  // Compute the cluster layout, starting at the root node!
  var nodes = cluster(map[""]);

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

  vis.selectAll("path.link")
      .data(splines = bundle(links))
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", line);

  vis.selectAll("g.node")
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.data.key; });
});

d3.select(window).on("mousemove", function() {
  beta = Math.min(1, d3.event.clientX / 960);
});

var lastBeta = beta;

function update() {
  if (lastBeta === beta) return;
  vis.selectAll("path.link")
      .data(splines)
      .attr("d", line.beta(lastBeta = beta));
}

d3.timer(update);

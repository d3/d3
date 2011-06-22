var r = 960 / 2,
    splines = [];

var cluster = d3.layout.cluster()
    .size([360, r - 120])
    .sort(null)
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

// From http://www.devmaster.net/forums/showthread.php?t=5784
function sin(x) {
  if (x > Math.PI) x -= 2 * Math.PI;
  var B = 4 / Math.PI,
      C = -4 / (Math.PI * Math.PI),

      y = B * x + C * x * Math.abs(x);

  //#ifdef EXTRA_PRECISION
    var Q = 0.775,
        P = 0.225;

    y = P * (y * Math.abs(y) - y) + y;   // Q * y + P * y * abs(y)
  //#endif
  return y;
}

function cos(x) {
  return sin(x + Math.PI / 2);
}

var line = d3.svg.line()
    .interpolate("basis")
    .beta(.85)
    .x(function(d) {
      var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      return r * cos(a);
    })
    .y(function(d) {
      var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      return r * sin(a);
    });

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

d3.select("svg").on("mousemove", function() {
  vis.selectAll("path.link")
      .data(splines)
      .attr("d", line.beta(d3.svg.mouse(this)[0] / 960));
});

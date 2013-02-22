d3.layout.layer = function () {
  var layer = {},
    level = function(d){return d.level},
    nodes = [],
    links = [],
    vspace = d3_layout_layerVspace,
    width;

  layer.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return layer;
  };

  layer.vspace = function(x) {
    if (!arguments.length) return vspace;
    vspace = x;
    return layer;
  };

  layer.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return layer;
  };

  layer.level = function(x) {
    if (!arguments.length) return level;
    level = x;
    return layer;
  };

  layer.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return layer;
  };

  layer.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return layer;
  };

  layer.relayout = function() {
    var n = nodes.length,
      m = links.length,
      i,
      node,
      link,
      nodesOnLevel = {},
      nodeLevel;

    for (i = 0; i < n; i++) {
      node = nodes[i];
      nodeLevel = level(node);
      if (typeof nodesOnLevel[nodeLevel] === "undefined") nodesOnLevel[nodeLevel] = [];
      nodesOnLevel[nodeLevel].push(node);
    }

    var levelSummary,
      j,
      p;
    for (i in nodesOnLevel) {
      levelSummary = nodesOnLevel[i];
      p = levelSummary.length;
      for (j = 0; j < p; j++) {
        node = levelSummary[j];
        node.x = width * (j + 1) / (p + 1);
        node.y = level(node) * (typeof vspace === "function" ? vspace(node) : vspace);
      }
    }

    for (i = 0; i < m; ++i) {
      link = links[i];
      if (typeof link.source == "number") link.source = nodes[link.source];
      if (typeof link.target == "number") link.target = nodes[link.target];
    }
  };

  return layer;
};

var d3_layout_layerVspace = 15;
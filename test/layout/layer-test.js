require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.layer");

suite.addBatch({
  "layer": {
    topic: d3.layout.layer,

    "vspace": {
      "test layout": function(layer) {
        var graph = sampleGraph();
        var width = 300;

        // general formula for x-coordinate
        //  layer.width() * (index of node on level + 1) / (number of nodes on level + 1)
        // general formula for y-coordinate
        //  node.level * layer.vspace()

        layer.nodes(graph.nodes).links(graph.links).width(width).relayout();
        assert.equal(graph.nodes[0].x, width / 2);
        assert.equal(graph.nodes[0].y, graph.nodes[0].level * layer.vspace());
        assert.equal(graph.nodes[1].x, width / 3);
        assert.equal(graph.nodes[1].y, graph.nodes[1].level * layer.vspace());
        assert.equal(graph.nodes[2].x, width * 2 / 3);
        assert.equal(graph.nodes[2].y, graph.nodes[2].level * layer.vspace());
        assert.equal(graph.nodes[3].x, width / 2);
        assert.equal(graph.nodes[3].y, graph.nodes[3].level * layer.vspace());
      }
    }
  }
});

/*
 * Our sample graph looks something like this
 *    []
 *   / \
 *  [] []
 *   \
 *    []
 */

function sampleGraph() {
  return {
    nodes: [
      {name: "Level1a", level: 1}/*0*/,
      {name: "Level2a", level: 2}/*1*/, {name: "Level2b", level: 2},/*2*/
      {name: "Level3a", level: 3}/*3*/
    ],
    links: [
      {source: 0, target: 1}, // Level1a -> Level2a
      {source: 0, target: 2}, // Level1a -> Level2b
      {source: 1, target: 3} // Level2a -> Level3a
    ]
  };
}

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.cluster");

suite.addBatch({
  "cluster": {
    topic: load("layout/cluster").expression("d3.layout.cluster"),
    "can handle an empty children array": function(cluster) {
      var c = cluster();
      assert.deepEqual(c.nodes({value: 1, children: [{value: 1, children: []}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5,  y: 0},
        {value: 1, depth: 1, x: 0.25, y: 1},
        {value: 1, depth: 1, x: 0.75, y: 1}
      ]);
    },
    "can handle zero-valued nodes": function(cluster) {
      var c = cluster();
      assert.deepEqual(c.nodes({value: 0, children: [{value: 0}, {value: 1}]}).map(layout), [
        {value: 0, depth: 0, x: 0.5,  y: 0},
        {value: 0, depth: 1, x: 0.25, y: 1},
        {value: 1, depth: 1, x: 0.75, y: 1}
      ]);
    },
    "can handle a single node": function(cluster) {
      var c = cluster();
      assert.deepEqual(c.nodes({value: 0}).map(layout), [
        {value: 0, depth: 0, x: 0.5,  y: 0}
      ]);
    }
  }
});

function layout(node) {
  return {
    value: node.value,
    depth: node.depth,
    x: node.x,
    y: node.y
  };
}

suite.export(module);

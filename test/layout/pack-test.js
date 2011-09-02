require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.pack");

suite.addBatch({
  "pack": {
    topic: d3.layout.pack,
    "can handle an empty children array": function(pack) {
      assert.deepEqual(pack.nodes({children: [{children: []}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    },
    "can handle zero-valued nodes": function(pack) {
      assert.deepEqual(pack.nodes({children: [{value: 0}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    }
  }
});

function layout(node) {
  return {
    value: node.value,
    depth: node.depth,
    r: node.r,
    x: node.x,
    y: node.y
  };
}

suite.export(module);

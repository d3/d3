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
    },
    "can handle residual floating point error": function(pack) {
      var result = pack.nodes({children: [
        {value: 0.005348322447389364},
        {value: 0.8065882022492588},
        {value: 0}
      ]}).map(layout);
      assert.deepEqual(result.map(function(d) { return d.depth; }), [0, 1, 1, 1]);
      assert.inDelta(result.map(function(d) { return d.value; }), [0.8119365246966481, 0.005348322447389364, 0.8065882022492588, 0], 1e-6);
      assert.inDelta(result.map(function(d) { return d.x; }), [0.5, 0.9623509026331429, 0.4623509026331429, 0.9247018052662859], 1e-6);
      assert.inDelta(result.map(function(d) { return d.y; }), [0.5, 0.5, 0.5, 0.5], 1e-6);
      assert.inDelta(result.map(function(d) { return d.r; }), [0.5, 0.037649097366857086, 0.46235090263314294, 0], 1e-6);
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

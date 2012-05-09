require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.bundle");

suite.addBatch({
  "bundle": {
    topic: d3.layout.bundle,
    "can handle self-loops": function(bundle) {
      var node = {id: 0};
      assert.deepEqual(bundle([{source: node, target: node}]), [
        [node, node]
      ]);
    },
    "simple": function(bundle) {
      var a = {id: "a"},
          b = {id: "b"},
          root = {id: "root", children: [a, b]};
      a.parent = b.parent = root;
      assert.deepEqual(bundle([
        {source: a, target: b},
        {source: a, target: root},
        {source: root, target: a}
      ]), [
        [a, root, b],
        [a, root],
        [root, a],
      ]);
    }
  }
});

suite.export(module);

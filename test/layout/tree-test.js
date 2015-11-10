var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.tree");

suite.addBatch({
  "tree": {
    topic: load("layout/tree").expression("d3.layout.tree"),
    "computes a simple tree layout": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({
        name: "1",
        children: [
          {name: "1-1"},
          {name: "1-2"},
          {name: "1-3"}
        ]
      }).map(layout), [
        {name: "1", depth: 0, x: 0.5, y: 0},
        {name: "1-1", depth: 1, x: 0.16666666666666666, y: 1},
        {name: "1-2", depth: 1, x: 0.5, y: 1},
        {name: "1-3", depth: 1, x: 0.8333333333333333, y: 1}
      ]);
    },
    "can handle an empty children array": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({children: []}).map(layout), [
        {depth: 0, x: 0.5, y: 0}
      ]);
      assert.deepEqual(t.nodes({children: [
        {children: []},
        {children: [{}]},
        {children: [{}]}
      ]}).map(layout), [
        {depth: 0, x: 0.5,   y: 0},
        {depth: 1, x: 0.125, y: 0.5},
        {depth: 1, x: 0.375, y: 0.5},
        {depth: 2, x: 0.375, y: 1},
        {depth: 1, x: 0.875, y: 0.5},
        {depth: 2, x: 0.875, y: 1}
      ]);
    },
    "can handle a single node": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({}).map(layout), [
        {depth: 0, x: 0.5, y: 0}
      ]);
    }
  }
});

function layout(node) {
  delete node.children;
  delete node.parent;
  return node;
}

suite.export(module);

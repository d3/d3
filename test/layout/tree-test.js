require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.tree");

suite.addBatch({
  "tree": {
    topic: d3.layout.tree,
    "can handle an empty children array": function(tree) {
      assert.deepEqual(tree.nodes({children: []}), [
        {children: [], depth: 0, x: 0.5, y: 0}
      ]);
    }
  }
});

suite.export(module);

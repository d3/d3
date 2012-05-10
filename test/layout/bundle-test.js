require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.bundle");

suite.addBatch({
  "bundle": {
    topic: d3.layout.bundle,
    "simple": function(bundle) {
      var a = {id: "a"},
          b = {id: "b"},
          root = {id: "root", children: [a, b]};
      a.parent = b.parent = root;
      assert.deepEqual(bundle([
        {source: a, target: b},
        {source: a, target: root},
        {source: root, target: a},
        {source: a, target: a}
      ]), [
        [a, root, b],
        [a, root],
        [root, a],
        [a, root, a]
      ]);
    }
  }
});

suite.export(module);

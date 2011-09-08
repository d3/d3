require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.hierarchy");

suite.addBatch({
  "hierarchy": {
    topic: d3.layout.hierarchy,
    "doesn't overwrite the value of a node that has an empty children array": function(hierarchy) {
      var nodes = hierarchy.nodes({value: 1, children: []});
      assert.deepEqual(nodes, [
        {children: [], depth: 0, value: 1}
      ]);
      hierarchy.revalue(nodes[0]);
      assert.deepEqual(nodes, [
        {children: [], depth: 0, value: 1}
      ]);
    },
    "a valueless node that has an empty children array gets a value of 0": function(hierarchy) {
      var nodes = hierarchy.nodes({children: []});
      assert.deepEqual(nodes, [
        {children: [], depth: 0, value: 0}
      ]);
      hierarchy.revalue(nodes[0]);
      assert.deepEqual(nodes, [
        {children: [], depth: 0, value: 0}
      ]);
    }
  }
});

suite.export(module);

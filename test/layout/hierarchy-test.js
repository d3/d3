var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.layout.hierarchy");

suite.addBatch({
  "hierarchy": {
    topic: load("layout/treemap"), // hierarchy is abstract, so test a subclass
    "doesn't overwrite the value of a node that has an empty children array": function(d3) {
      var hierarchy = d3.layout.treemap(),
          nodes = hierarchy.sticky(true).nodes({value: 1, children: []});
      assert.equal(nodes[0].value, 1);
      hierarchy.nodes(nodes[0]);
      assert.equal(nodes[0].value, 1);
    },
    "a valueless node that has an empty children array gets a value of 0": function(d3) {
      var hierarchy = d3.layout.treemap(),
          nodes = hierarchy.sticky(true).nodes({children: []});
      assert.equal(nodes[0].value, 0);
      hierarchy.nodes(nodes[0]);
      assert.equal(nodes[0].value, 0);
    }
  }
});

suite.export(module);

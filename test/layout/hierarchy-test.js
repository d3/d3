var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.hierarchy");

suite.addBatch({
  "hierarchy": {
    topic: load("layout/treemap").expression("d3.layout.treemap"), // hierarchy is abstract, so test a subclass
    "doesn't overwrite the value of a node that has an empty children array": function(hierarchy) {
      var h = hierarchy(),
          nodes = h.sticky(true).nodes({value: 1, children: []});
      assert.equal(nodes[0].value, 1);
      h.nodes(nodes[0]);
      assert.equal(nodes[0].value, 1);
    },
    "a valueless node that has an empty children array gets a value of 0": function(hierarchy) {
      var h = hierarchy(),
          nodes = h.sticky(true).nodes({children: []});
      assert.equal(nodes[0].value, 0);
      h.nodes(nodes[0]);
      assert.equal(nodes[0].value, 0);
    },
    "removes the children array for a node that has no children": function(hierarchy) {
      var h = hierarchy(),
          nodes = h.children(function() { return null; }).nodes({children: [{}]});
      assert.equal(nodes[0].value, 0);
      assert.isUndefined(nodes[0].children);
    }
  }
});

suite.export(module);

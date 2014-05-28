var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.hierarchy");

suite.addBatch({
  "hierarchy": {
    topic: load("layout/treemap").expression("d3.layout.treemap"), // hierarchy is abstract, so test a subclass
    "doesn't overwrite the value of a node that has an empty children array": function(hierarchy) {
      var h = hierarchy().sticky(true).children(function(d) {return d.children;}),
        nodes = h.nodes({"name":"flare","children":[{"name":"analytics","children":[{"name":"cluster","children":[{"name":"AgglomerativeCluster","size":3938},{"name":"CommunityStructure","size":3812},{"name":"MergeEdge","size":743}]},{"name":"graph","children":[{"name":"BetweennessCentrality","size":3534},{"name":"LinkDistance","size":5731}]}]}]});
      assert.equal(nodes[0].name, "flare");
      h(nodes[0]); // calls hierarchy.revalue
      assert.equal(nodes[0].name, "flare");
      assert.equal(nodes[0].children[0].name, "analytics");
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
    },
    "revalue": function(hierarchy) {
      var h = hierarchy().sticky(true),
          nodes = h.nodes({"name":"flare","children":[{"name":"analytics","children":[{"name":"cluster","children":[{"name":"AgglomerativeCluster","size":3938},{"name":"CommunityStructure","size":3812},{"name":"MergeEdge","size":743}]},{"name":"graph","children":[{"name":"BetweennessCentrality","size":3534},{"name":"LinkDistance","size":5731}]}]}]});
      assert.equal(nodes[0].name, "flare");
      h(nodes[0]); // calls hierarchy.revalue
      assert.equal(nodes[0].name, "flare");
    }
  }
});

suite.export(module);

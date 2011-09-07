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
      assert.deepEqual(hierarchy({value: 1, children: []}), [
        {data: {value: 1, children: []}, depth: 0, value: 1}
      ]);
    }
  }
});

suite.export(module);

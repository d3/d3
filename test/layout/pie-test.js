var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.pie");

suite.addBatch({
  "pie": {
    topic: load("layout/pie").expression("d3.layout.pie"),
    "arcs are in same order as original data": function(pie) {
      var p = pie();
      assert.deepEqual(p([5, 30, 15]).map(function(d) { return d.data; }), [
        5, 30, 15
      ]);
      assert.deepEqual(p([
        84, 90, 48, 61, 58, 8, 6, 31, 45, 18
      ]).map(function(d) { return d.data; }), [
        84, 90, 48, 61, 58, 8, 6, 31, 45, 18
      ]);
    }
  }
});

suite.export(module);

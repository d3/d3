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
    },
    "uses start angle when all values are zero": function(pie) {
      var p = pie().startAngle(1.2);
      assert.deepEqual(p([0, 0, 0]), [
        {data: 0, value: 0, startAngle: 1.2, endAngle: 1.2, padAngle: 0},
        {data: 0, value: 0, startAngle: 1.2, endAngle: 1.2, padAngle: 0},
        {data: 0, value: 0, startAngle: 1.2, endAngle: 1.2, padAngle: 0}
      ]);
    }
  }
});

suite.export(module);

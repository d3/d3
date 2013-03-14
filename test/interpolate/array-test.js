var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateArray");

suite.addBatch({
  "interpolateArray": {
    topic: load("interpolate/array").expression("d3.interpolateArray").document(),
    "interpolates defined elements": function(interpolate) {
      assert.deepEqual(interpolate([2, 12], [4, 24])(.5), [3, 18]);
    },
    "interpolates nested objects and arrays": function(interpolate) {
      assert.deepEqual(interpolate([[2, 12]], [[4, 24]])(.5), [[3, 18]]);
      assert.deepEqual(interpolate([{foo: [2, 12]}], [{foo: [4, 24]}])(.5), [{foo: [3, 18]}]);
    },
    "merges non-shared elements": function(interpolate) {
      assert.deepEqual(interpolate([2, 12], [4, 24, 12])(.5), [3, 18, 12]);
      assert.deepEqual(interpolate([2, 12, 12], [4, 24])(.5), [3, 18, 12]);
    }
  }
});

suite.export(module);

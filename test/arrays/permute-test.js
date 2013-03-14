var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.permute");

suite.addBatch({
  "permute": {
    topic: load("arrays/permute"),
    "permutes according to the specified index": function(d3) {
      assert.deepEqual(d3.permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
      assert.deepEqual(d3.permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
      assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
    },
    "does not modify the input array": function(d3) {
      var input = [3, 4, 5];
      d3.permute(input, [2, 1, 0]);
      assert.deepEqual(input, [3, 4, 5]);
    },
    "can duplicate input values": function(d3) {
      assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
      assert.deepEqual(d3.permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
      assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
    },
    "can return more elements": function(d3) {
      assert.deepEqual(d3.permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
      assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
    },
    "can return fewer elements": function(d3) {
      assert.deepEqual(d3.permute([3, 4, 5], [0]), [3]);
      assert.deepEqual(d3.permute([3, 4, 5], [1, 2]), [4, 5]);
      assert.deepEqual(d3.permute([3, 4, 5], []), []);
    },
    "can return undefined elements": function(d3) {
      var v1 = d3.permute([3, 4, 5], [10]);
      assert.equal(v1.length, 1);
      assert.isUndefined(v1[0]);
      var v2 = d3.permute([3, 4, 5], [-1]);
      assert.equal(v2.length, 1);
      assert.isUndefined(v2[0]);
      var v3 = d3.permute([3, 4, 5], [0, -1]);
      assert.equal(v3.length, 2);
      assert.equal(v3[0], 3);
      assert.isUndefined(v3[1]);
    }
  }
});

suite.export(module);

require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.permute");

suite.addBatch({
  "permute": {
    topic: function() {
      return d3.permute;
    },
    "permutes according to the specified index": function(permute) {
      assert.deepEqual(permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
      assert.deepEqual(permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
      assert.deepEqual(permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
    },
    "does not modify the input array": function(permute) {
      var input = [3, 4, 5];
      permute(input, [2, 1, 0]);
      assert.deepEqual(input, [3, 4, 5]);
    },
    "can duplicate input values": function(permute) {
      assert.deepEqual(permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
      assert.deepEqual(permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
      assert.deepEqual(permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
    },
    "can return more elements": function(permute) {
      assert.deepEqual(permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
      assert.deepEqual(permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
    },
    "can return fewer elements": function(permute) {
      assert.deepEqual(permute([3, 4, 5], [0]), [3]);
      assert.deepEqual(permute([3, 4, 5], [1, 2]), [4, 5]);
      assert.deepEqual(permute([3, 4, 5], []), []);
    },
    "can return undefined elements": function(permute) {
      var v1 = permute([3, 4, 5], [10]);
      assert.equal(v1.length, 1);
      assert.isUndefined(v1[0]);
      var v2 = permute([3, 4, 5], [-1]);
      assert.equal(v2.length, 1);
      assert.isUndefined(v2[0]);
      var v3 = permute([3, 4, 5], [0, -1]);
      assert.equal(v3.length, 2);
      assert.equal(v3[0], 3);
      assert.isUndefined(v3[1]);
    }
  }
});

suite.export(module);

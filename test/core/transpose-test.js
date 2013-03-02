require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.transpose");

suite.addBatch({
  "transpose": {
    topic: function() {
      return d3.transpose;
    },
    "transposes a square matrix": function(transpose) {
      assert.deepEqual(d3.transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
    },
    "transposes a non-square matrix": function(transpose) {
      assert.deepEqual(d3.transpose([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
    },
    "transposes a single-row matrix": function(transpose) {
      assert.deepEqual(d3.transpose([[1, 2, 3, 4, 5]]), [[1], [2], [3], [4], [5]]);
    },
    "transposes an empty matrix": function(transpose) {
      assert.deepEqual(d3.transpose([]), []);
    },
    "ignores extra elements given an irregular matrix": function(transpose) {
      assert.deepEqual(d3.transpose([[1, 2], [3, 4], [5, 6, 7]]), [[1, 3, 5], [2, 4, 6]]);
    }
  }
});

suite.export(module);

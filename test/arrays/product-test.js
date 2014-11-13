var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.product");

suite.addBatch({
  "product": {
    topic: load("arrays/product").expression("d3.product"),
    "product with empty array is empty array": function(product) {
      assert.deepEqual(product([], []), []);
      assert.deepEqual(product([], [1,2]), []);
      assert.deepEqual(product([1,2], []), []);
    },
    "product of singletons is singleton": function(product) {
      assert.deepEqual(product([8], [9]), [{x:8, i:0, y:9, j:0}]);
    },
    "product of singleton with longer list": function(product) {
      assert.deepEqual(product([8], [10,11,12]), [
          {x:8, i:0, y:10, j:0},
          {x:8, i:0, y:11, j:1},
          {x:8, i:0, y:12, j:2}
      ]);
      assert.deepEqual(product([7,8,9], [10]), [
          {x:7, i:0, y:10, j:0},
          {x:8, i:1, y:10, j:0},
          {x:9, i:2, y:10, j:0}
      ]);
    },
    "product of long lists": function(product) {
      assert.deepEqual(product([7,8,9], [10,11,12,13]), [
          {x:7, i:0, y:10, j:0},
          {x:7, i:0, y:11, j:1},
          {x:7, i:0, y:12, j:2},
          {x:7, i:0, y:13, j:3},
          {x:8, i:1, y:10, j:0},
          {x:8, i:1, y:11, j:1},
          {x:8, i:1, y:12, j:2},
          {x:8, i:1, y:13, j:3},
          {x:9, i:2, y:10, j:0},
          {x:9, i:2, y:11, j:1},
          {x:9, i:2, y:12, j:2},
          {x:9, i:2, y:13, j:3}
      ]);
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.shuffle");

suite.addBatch({
  "shuffle": {
    topic: load("arrays/shuffle").expression("d3.shuffle"),
    "returns empty array for the empty array": function(shuffle) {
      assert.deepEqual(shuffle([]), []);
    },
    "returns the same array for an array size of one": function(shuffle) {
      assert.deepEqual(shuffle([0]), [0]);
    },
    "should not return an array in the same order twice": function(shuffle) {
      // Theoretically conceivable, but statistically impossible that this could happen randomly.
      // (P = 1 in 100!)
      var a = Array.apply(null, {length: 100}).map(Number.call, Number);
      assert.notDeepEqual(shuffle(a.slice(0)),shuffle(a.slice(0)));
    },
    "returns undefined for negative range parameters": function(shuffle) {
      assert.deepEqual(shuffle([1,2,3,4,5],-1), undefined);
      assert.deepEqual(shuffle([1,2,3,4,5],1,-1), undefined);
    },
    "performs no operation if start step is greater than end step": function(shuffle) {
      assert.deepEqual(shuffle([1,2,3,4,5],3,2), [1,2,3,4,5]);
    },
    "returns the array without while looop if i0 >= array.length": function(shuffle) {
      assert.deepEqual(shuffle([1,2,3,4,5],10,10000), [1,2,3,4,5]);
    },
    "returns a shuffled range for a given start range value": function(shuffle) {
      assert.deepEqual(shuffle([1,2,3,4,5],2).slice(0,2), [1,2]);
      assert.deepEqual(shuffle([1,2,3,4,5],4).slice(0), [1,2,3,4,5]);
    },
    "returns a shuffled range for a given start and end range value": function(shuffle) {
      assert.deepEqual(shuffle([1,2,3,4,5],0,1), [1,2,3,4,5]);
      assert.deepEqual(shuffle([1,2,3,4,5],0,2).slice(2,5), [3,4,5]);
      assert.deepEqual(shuffle([1,2,3,4,5,6],4,6).slice(0,4).concat(shuffle([1,2,3,4,5],0,2).slice(2,5)), [1,2,3,4,3,4,5]);
      assert.deepEqual(shuffle([1,2,3,4,5],0,0), [1,2,3,4,5]);
      assert.deepEqual(shuffle([1,2,3,4,5],1,1), [1,2,3,4,5]);
    }
  }
});

suite.export(module);

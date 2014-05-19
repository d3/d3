var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    _ = require("../../");

var suite = vows.describe("d3.shuffle");

var array = Array(100);
for (var i = 0; i < 100; i++) array[i] = i;

suite.addBatch({
  "shuffle": {
    topic: load("arrays/shuffle").expression("d3.shuffle"),
    "shuffles array completely when given 1 parameter": function (shuffle) {
      var shuffled = shuffle(array.slice(0));
      assert.notDeepEqual(array, shuffled);
      shuffled.sort(function(a, b) { return a - b; });
      assert.deepEqual(array, shuffled);
    },
    "shuffles array from start index to end when given 2 parameters": function (shuffle) {
      var shuffled = shuffle(array.slice(0), 50);
      assert.deepEqual(array.slice(0, 50), shuffled.slice(0, 50));
      assert.notDeepEqual(array.slice(50), shuffled.slice(50));
      shuffled.sort(function(a, b) { return a - b; });
      assert.deepEqual(array, shuffled);
    },
    "shuffles array from start index to end index when given 3 parameters": function (shuffle) {
      var shuffled = shuffle(array.slice(0), 25, 75);
      assert.deepEqual(array.slice(0, 25), shuffled.slice(0, 25));
      assert.deepEqual(array.slice(75), shuffled.slice(75));
      assert.notDeepEqual(array.slice(25, 75), shuffled.slice(25, 75));
      shuffled.sort(function(a, b) { return a - b; });
      assert.deepEqual(array, shuffled);
    }
  }
});

suite.export(module);

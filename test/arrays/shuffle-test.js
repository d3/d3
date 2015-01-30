var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    seedrandom = require("seedrandom");

var suite = vows.describe("d3.shuffle");

var _random;

suite.addBatch({
  "shuffle": {
    topic: load("arrays/shuffle").sandbox({Math: Math}).expression("d3.shuffle"),
    "(using seedrandom)": {
      topic: function(random) {
        _random = Math.random;
        return random;
      },
      "shuffles an array in-place": function(shuffle) {
        Math.seedrandom("a random seed.");
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.strictEqual(shuffle(array), array);
        assert.deepEqual(array, [6, 4, 7, 9, 3, 1, 5, 8, 0, 2]);
      },
      "shuffles a subset of an array from the specified start": function(shuffle) {
        Math.seedrandom("a random seed.");
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.strictEqual(shuffle(array, 4), array);
        assert.deepEqual(array, [0, 1, 2, 3, 9, 7, 6, 8, 4, 5]);
      },
      "shuffles a subset of an array between the specified start and end": function(shuffle) {
        Math.seedrandom("a random seed.");
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        assert.strictEqual(shuffle(array, 3, 8), array);
        assert.deepEqual(array, [0, 1, 2, 5, 7, 6, 3, 4, 8, 9]);
      },
      teardown: function() {
        Math.random = _random;
      }
    }
  }
});

suite.export(module);

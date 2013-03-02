require("../env");

var vows = require("vows"),
    assert = require("../env-assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.seconds");

suite.addBatch({
  "seconds": {
    topic: function() {
      return d3.time.seconds;
    },
    "returns seconds": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2)), [
        local(2010, 11, 31, 23, 59, 59),
        local(2011, 0, 1, 0, 0, 0),
        local(2011, 0, 1, 0, 0, 1)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[0], local(2010, 11, 31, 23, 59, 59));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[2], local(2011, 0, 1, 0, 0, 1));
    },
    "can skip seconds": function(range) {
      assert.deepEqual(range(local(2011, 1, 1, 12, 0, 7), local(2011, 1, 1, 12, 1, 7), 15), [
        local(2011, 1, 1, 12, 0, 15),
        local(2011, 1, 1, 12, 0, 30),
        local(2011, 1, 1, 12, 0, 45),
        local(2011, 1, 1, 12, 1, 0)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(utc(2011, 2, 13, 9, 59, 59), utc(2011, 2, 13, 10, 0, 2)), [
        utc(2011, 2, 13, 9, 59, 59),
        utc(2011, 2, 13, 10, 0, 0),
        utc(2011, 2, 13, 10, 0, 1)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 9, 0, 2)), [
        utc(2011, 10, 6, 8, 59, 59),
        utc(2011, 10, 6, 9, 0, 0),
        utc(2011, 10, 6, 9, 0, 1)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns seconds": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2)), [
          utc(2010, 11, 31, 23, 59, 59),
          utc(2011, 0, 1, 0, 0, 0),
          utc(2011, 0, 1, 0, 0, 1)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2))[0], utc(2010, 11, 31, 23, 59, 59));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2))[2], utc(2011, 0, 1, 0, 0, 1));
      },
      "can skip seconds": function(range) {
        assert.deepEqual(range(utc(2011, 1, 1, 12, 0, 7), utc(2011, 1, 1, 12, 1, 7), 15), [
          utc(2011, 1, 1, 12, 0, 15),
          utc(2011, 1, 1, 12, 0, 30),
          utc(2011, 1, 1, 12, 0, 45),
          utc(2011, 1, 1, 12, 1, 0)
        ]);
      },
      "does not observe the start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 2, 13, 9, 59, 59), utc(2011, 2, 13, 10, 0, 2)), [
          utc(2011, 2, 13, 9, 59, 59),
          utc(2011, 2, 13, 10, 0, 0),
          utc(2011, 2, 13, 10, 0, 1)
        ]);
      },
      "does not observe the end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 9, 0, 2)), [
          utc(2011, 10, 6, 8, 59, 59),
          utc(2011, 10, 6, 9, 0, 0),
          utc(2011, 10, 6, 9, 0, 1)
        ]);
      }
    }
  }
});

suite.export(module);

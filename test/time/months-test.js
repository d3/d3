require("../env");

var vows = require("vows"),
    assert = require("../env-assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.months");

suite.addBatch({
  "months": {
    topic: function() {
      return d3.time.months;
    },
    "returns months": function(range) {
      assert.deepEqual(range(local(2010, 10, 31), local(2011, 2, 1)), [
        local(2010, 11, 1),
        local(2011, 0, 1),
        local(2011, 1, 1)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 10, 31), local(2011, 2, 1))[0], local(2010, 11, 1));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 10, 31), local(2011, 2, 1))[2], local(2011, 1, 1));
    },
    "can skip months": function(range) {
      assert.deepEqual(range(local(2011, 1, 1), local(2012, 1, 1), 3), [
        local(2011, 3, 1),
        local(2011, 6, 1),
        local(2011, 9, 1),
        local(2012, 0, 1)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 0, 1), local(2011, 4, 1)), [
        local(2011, 0, 1),
        local(2011, 1, 1),
        local(2011, 2, 1),
        local(2011, 3, 1)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 9, 1), local(2012, 1, 1)), [
        local(2011, 9, 1),
        local(2011, 10, 1),
        local(2011, 11, 1),
        local(2012, 0, 1)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns months": function(range) {
        assert.deepEqual(range(utc(2010, 10, 31), utc(2011, 2, 1)), [
          utc(2010, 11, 1),
          utc(2011, 0, 1),
          utc(2011, 1, 1)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 10, 31), utc(2011, 2, 1))[0], utc(2010, 11, 1));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 10, 31), utc(2011, 2, 1))[2], utc(2011, 1, 1));
      },
      "can skip months": function(range) {
        assert.deepEqual(range(utc(2011, 1, 1), utc(2012, 1, 1), 3), [
          utc(2011, 3, 1),
          utc(2011, 6, 1),
          utc(2011, 9, 1),
          utc(2012, 0, 1)
        ]);
      },
      "does not observe the start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 0, 1), utc(2011, 4, 1)), [
          utc(2011, 0, 1),
          utc(2011, 1, 1),
          utc(2011, 2, 1),
          utc(2011, 3, 1)
        ]);
      },
      "does not observe the end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 9, 1), utc(2012, 1, 1)), [
          utc(2011, 9, 1),
          utc(2011, 10, 1),
          utc(2011, 11, 1),
          utc(2012, 0, 1)
        ]);
      }
    }
  }
});

suite.export(module);

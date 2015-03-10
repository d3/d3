var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.weeks");

suite.addBatch({
  "weeks": {
    topic: load("time/week").expression("d3.time.weeks"),
    "returns sundays": function(range) {
      assert.deepEqual(range(local(2010, 11, 21), local(2011, 0, 12)), [
        local(2010, 11, 26),
        local(2011, 0, 2),
        local(2011, 0, 9)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 21), local(2011, 0, 12))[0], local(2010, 11, 26));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 21), local(2011, 0, 12))[2], local(2011, 0, 9));
    },
    "can skip weeks": function(range) {
      assert.deepEqual(range(local(2011, 0, 1), local(2011, 3, 1), 4), [
        local(2011, 0, 2),
        local(2011, 0, 30),
        local(2011, 1, 27),
        local(2011, 2, 27)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 2, 1), local(2011, 2, 28)), [
        local(2011, 2, 6),
        local(2011, 2, 13),
        local(2011, 2, 20),
        local(2011, 2, 27)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 10, 1), local(2011, 10, 30)), [
        local(2011, 10, 6),
        local(2011, 10, 13),
        local(2011, 10, 20),
        local(2011, 10, 27)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns sundays": function(range) {
        assert.deepEqual(range(utc(2010, 11, 21), utc(2011, 0, 12)), [
          utc(2010, 11, 26),
          utc(2011, 0, 2),
          utc(2011, 0, 9)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 21), utc(2011, 0, 12))[0], utc(2010, 11, 26));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 21), utc(2011, 0, 12))[2], utc(2011, 0, 9));
      },
      "can skip weeks": function(range) {
        assert.deepEqual(range(utc(2011, 0, 1), utc(2011, 3, 1), 4), [
          utc(2011, 0, 2),
          utc(2011, 0, 30),
          utc(2011, 1, 27),
          utc(2011, 2, 27)
        ]);
      },
      "does not observe the start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 2, 1), utc(2011, 2, 28)), [
          utc(2011, 2, 6),
          utc(2011, 2, 13),
          utc(2011, 2, 20),
          utc(2011, 2, 27)
        ]);
      },
      "does not observe the end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 10, 1), utc(2011, 10, 30)), [
          utc(2011, 10, 6),
          utc(2011, 10, 13),
          utc(2011, 10, 20),
          utc(2011, 10, 27)
        ]);
      }
    }
  }
});

suite.export(module);

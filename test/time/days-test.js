var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.days");

suite.addBatch({
  "days": {
    topic: load("time/day").expression("d3.time.days"),
    "returns midnights": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 12), local(2011, 0, 3, 12)), [
        local(2011, 0, 1),
        local(2011, 0, 2),
        local(2011, 0, 3)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31), local(2011, 0, 3))[0], local(2010, 11, 31));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31), local(2011, 0, 3))[2], local(2011, 0, 2));
    },
    "can skip days": function(range) {
      assert.deepEqual(range(local(2010, 11, 29), local(2011, 0, 14), 5), [
        local(2010, 11, 31),
        local(2011, 0, 1),
        local(2011, 0, 6),
        local(2011, 0, 11)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 2, 12), local(2011, 2, 16)), [
        local(2011, 2, 12),
        local(2011, 2, 13),
        local(2011, 2, 14),
        local(2011, 2, 15)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 10, 5), local(2011, 10, 9)), [
        local(2011, 10, 5),
        local(2011, 10, 6),
        local(2011, 10, 7),
        local(2011, 10, 8)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns midnights": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 12), utc(2011, 0, 3, 12)), [
          utc(2011, 0, 1),
          utc(2011, 0, 2),
          utc(2011, 0, 3)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31), utc(2011, 0, 3))[0], utc(2010, 11, 31));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31), utc(2011, 0, 3))[2], utc(2011, 0, 2));
      },
      "can skip days": function(range) {
        assert.deepEqual(range(utc(2010, 11, 29), utc(2011, 0, 14), 5), [
          utc(2010, 11, 31),
          utc(2011, 0, 1),
          utc(2011, 0, 6),
          utc(2011, 0, 11)
        ]);
      },
      "does not observe the start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 2, 12), utc(2011, 2, 16)), [
          utc(2011, 2, 12),
          utc(2011, 2, 13),
          utc(2011, 2, 14),
          utc(2011, 2, 15)
        ]);
      },
      "does not observe the end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 10, 5), utc(2011, 10, 9)), [
          utc(2011, 10, 5),
          utc(2011, 10, 6),
          utc(2011, 10, 7),
          utc(2011, 10, 8)
        ]);
      }
    }
  }
});

suite.export(module);

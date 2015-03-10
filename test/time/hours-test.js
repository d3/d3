var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.hours");

suite.addBatch({
  "hours": {
    topic: load("time/hour").expression("d3.time.hours"),
    "returns hours": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 12, 30), local(2010, 11, 31, 15, 30)), [
        local(2010, 11, 31, 13),
        local(2010, 11, 31, 14),
        local(2010, 11, 31, 15)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23), local(2011, 0, 1, 2))[0], local(2010, 11, 31, 23));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23), local(2011, 0, 1, 2))[2], local(2011, 0, 1, 1));
    },
    "can skip hours": function(range) {
      assert.deepEqual(range(local(2011, 1, 1, 1), local(2011, 1, 1, 13), 3), [
        local(2011, 1, 1, 3),
        local(2011, 1, 1, 6),
        local(2011, 1, 1, 9),
        local(2011, 1, 1, 12)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 2, 13, 1), local(2011, 2, 13, 5)), [
        utc(2011, 2, 13, 9),
        utc(2011, 2, 13, 10),
        utc(2011, 2, 13, 11)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(local(2011, 10, 6, 0), local(2011, 10, 6, 2)), [
        utc(2011, 10, 6, 7),
        utc(2011, 10, 6, 8),
        utc(2011, 10, 6, 9)
      ]);
    },
    "NPT": {
      "observes 15-minute offset": time.zone(345, function(range) {
        assert.deepEqual(range(local(2011, 10, 7, 0), local(2011, 10, 7, 3)), [
          utc(2011, 10, 6, 18, 15),
          utc(2011, 10, 6, 19, 15),
          utc(2011, 10, 6, 20, 15)
        ]);
      })
    },
    "IST": {
      "observes 30-minute offset": time.zone(330, function(range) {
        assert.deepEqual(range(local(2011, 10, 7, 0), local(2011, 10, 7, 3)), [
          utc(2011, 10, 6, 18, 30),
          utc(2011, 10, 6, 19, 30),
          utc(2011, 10, 6, 20, 30)
        ]);
      })
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns hours": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 12, 30), utc(2010, 11, 31, 15, 30)), [
          utc(2010, 11, 31, 13),
          utc(2010, 11, 31, 14),
          utc(2010, 11, 31, 15)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23), utc(2011, 0, 1, 2))[0], utc(2010, 11, 31, 23));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23), utc(2011, 0, 1, 2))[2], utc(2011, 0, 1, 1));
      },
      "can skip hours": function(range) {
        assert.deepEqual(range(utc(2011, 1, 1, 1), utc(2011, 1, 1, 13), 3), [
          utc(2011, 1, 1, 3),
          utc(2011, 1, 1, 6),
          utc(2011, 1, 1, 9),
          utc(2011, 1, 1, 12)
        ]);
      },
      "observes start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 2, 13, 9), utc(2011, 2, 13, 12)), [
          utc(2011, 2, 13, 9),
          utc(2011, 2, 13, 10),
          utc(2011, 2, 13, 11)
        ]);
      },
      "observes end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 10, 6, 7), utc(2011, 10, 6, 10)), [
          utc(2011, 10, 6, 7),
          utc(2011, 10, 6, 8),
          utc(2011, 10, 6, 9)
        ]);
      }
    }
  }
});

suite.export(module);

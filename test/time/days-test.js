require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.days");

suite.addBatch({
  "days": {
    topic: function() {
      return d3.time.days;
    },
    "returns midnights in local time": function(range) {
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
    "utc": {
      topic: function(range) {
        return range.utc;
      },
      "returns midnights in local time": function(range) {
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

function local(year, month, day, hours, minutes, seconds) {
  return new Date(year, month, day, hours || 0, minutes || 0, seconds || 0);
}

function utc(year, month, day, hours, minutes, seconds) {
  return new Date(Date.UTC(year, month, day, hours || 0, minutes || 0, seconds || 0));
}

suite.export(module);

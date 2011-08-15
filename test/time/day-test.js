require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.day");

suite.addBatch({
  "day": {
    topic: function() {
      return d3.time.day;
    },
    "returns midnights": function(floor) {
      assert.deepEqual(floor(local(2010, 11, 31, 23)), local(2010, 11, 31));
      assert.deepEqual(floor(local(2011, 0, 1, 0)), local(2011, 0, 1));
      assert.deepEqual(floor(local(2011, 0, 1, 1)), local(2011, 0, 1));
    },
    "observes start of daylight savings time": function(floor) {
      assert.deepEqual(floor(utc(2011, 2, 13, 7)), local(2011, 2, 12));
      assert.deepEqual(floor(utc(2011, 2, 13, 8)), local(2011, 2, 13));
      assert.deepEqual(floor(utc(2011, 2, 13, 9)), local(2011, 2, 13));
      assert.deepEqual(floor(utc(2011, 2, 13, 10)), local(2011, 2, 13));
    },
    "observes end of daylight savings time": function(floor) {
      assert.deepEqual(floor(utc(2011, 10, 6, 7)), local(2011, 10, 6));
      assert.deepEqual(floor(utc(2011, 10, 6, 8)), local(2011, 10, 6));
      assert.deepEqual(floor(utc(2011, 10, 6, 9)), local(2011, 10, 6));
      assert.deepEqual(floor(utc(2011, 10, 6, 10)), local(2011, 10, 6));
    },
    "UTC": {
      topic: function(floor) {
        return floor.utc;
      },
      "returns midnights": function(floor) {
        assert.deepEqual(floor(utc(2010, 11, 31, 23)), utc(2010, 11, 31));
        assert.deepEqual(floor(utc(2011, 0, 1, 0)), utc(2011, 0, 1));
        assert.deepEqual(floor(utc(2011, 0, 1, 1)), utc(2011, 0, 1));
      },
      "does not observe the start of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 2, 13, 7)), utc(2011, 2, 13));
        assert.deepEqual(floor(utc(2011, 2, 13, 8)), utc(2011, 2, 13));
        assert.deepEqual(floor(utc(2011, 2, 13, 9)), utc(2011, 2, 13));
        assert.deepEqual(floor(utc(2011, 2, 13, 10)), utc(2011, 2, 13));
      },
      "does not observe the end of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 10, 6, 5)), utc(2011, 10, 6));
        assert.deepEqual(floor(utc(2011, 10, 6, 6)), utc(2011, 10, 6));
        assert.deepEqual(floor(utc(2011, 10, 6, 7)), utc(2011, 10, 6));
        assert.deepEqual(floor(utc(2011, 10, 6, 8)), utc(2011, 10, 6));
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

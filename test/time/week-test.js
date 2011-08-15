require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.week");

suite.addBatch({
  "week": {
    topic: function() {
      return d3.time.week;
    },
    "returns weeks": function(floor) {
      assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 11, 26));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 0)), local(2010, 11, 26));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 1)), local(2010, 11, 26));
      assert.deepEqual(floor(local(2011, 0, 1, 23, 59, 59)), local(2010, 11, 26));
      assert.deepEqual(floor(local(2011, 0, 2, 0, 0, 0)), local(2011, 0, 2));
      assert.deepEqual(floor(local(2011, 0, 2, 0, 0, 1)), local(2011, 0, 2));
    },
    "observes the start of daylight savings time": function(floor) {
      assert.deepEqual(floor(local(2011, 2, 13, 1)), local(2011, 2, 13));
    },
    "observes the end of the daylight savings time": function(floor) {
      assert.deepEqual(floor(local(2011, 10, 6, 1)), local(2011, 10, 6));
    },
    "UTC": {
      topic: function(floor) {
        return floor.utc;
      },
      "returns weeks": function(floor) {
        assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 26));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 0, 0)), utc(2010, 11, 26));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 0, 1)), utc(2010, 11, 26));
        assert.deepEqual(floor(utc(2011, 0, 1, 23, 59, 59)), utc(2010, 11, 26));
        assert.deepEqual(floor(utc(2011, 0, 2, 0, 0, 0)), utc(2011, 0, 2));
        assert.deepEqual(floor(utc(2011, 0, 2, 0, 0, 1)), utc(2011, 0, 2));
      },
      "does not observe the start of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 2, 13, 1)), utc(2011, 2, 13));
      },
      "does not observe the end of the daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 10, 6, 1)), utc(2011, 10, 6));
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

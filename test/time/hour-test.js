require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.hour");

suite.addBatch({
  "hour": {
    topic: function() {
      return d3.time.hour;
    },
    "returns hours": function(floor) {
      assert.deepEqual(floor(local(2010, 11, 31, 23, 59)), local(2010, 11, 31, 23));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 0)), local(2011, 0, 1, 0));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 1)), local(2011, 0, 1, 0));
    },
    "observes start of daylight savings time": function(floor) {
      assert.deepEqual(floor(utc(2011, 2, 13, 8, 59)), utc(2011, 2, 13, 8));
      assert.deepEqual(floor(utc(2011, 2, 13, 9, 0)), utc(2011, 2, 13, 9));
      assert.deepEqual(floor(utc(2011, 2, 13, 9, 1)), utc(2011, 2, 13, 9));
      assert.deepEqual(floor(utc(2011, 2, 13, 9, 59)), utc(2011, 2, 13, 9));
      assert.deepEqual(floor(utc(2011, 2, 13, 10, 0)), utc(2011, 2, 13, 10));
      assert.deepEqual(floor(utc(2011, 2, 13, 10, 1)), utc(2011, 2, 13, 10));
    },
    "observes end of daylight savings time": function(floor) {
      assert.deepEqual(floor(utc(2011, 10, 6, 7, 59)), utc(2011, 10, 6, 7));
      assert.deepEqual(floor(utc(2011, 10, 6, 8, 0)), utc(2011, 10, 6, 8));
      assert.deepEqual(floor(utc(2011, 10, 6, 8, 1)), utc(2011, 10, 6, 8));
      assert.deepEqual(floor(utc(2011, 10, 6, 8, 59)), utc(2011, 10, 6, 8));
      assert.deepEqual(floor(utc(2011, 10, 6, 9, 0)), utc(2011, 10, 6, 9));
      assert.deepEqual(floor(utc(2011, 10, 6, 9, 1)), utc(2011, 10, 6, 9));
    },
    "NPT": {
      "observes 15-minute offset": tz("Asia/Kathmandu", function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 15));
        assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 0)), utc(2010, 11, 31, 18, 15));
        assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 1)), utc(2010, 11, 31, 18, 15));
      })
    },
    "IST": {
      "observes 30-minute offset": tz("Asia/Calcutta", function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 30));
        assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 0)), utc(2010, 11, 31, 18, 30));
        assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 1)), utc(2010, 11, 31, 18, 30));
      })
    },
    "UTC": {
      topic: function(floor) {
        return floor.utc;
      },
      "returns hours": function(floor) {
        assert.deepEqual(floor(utc(2010, 11, 31, 23, 59)), utc(2010, 11, 31, 23));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 0)), utc(2011, 0, 1, 0));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 1)), utc(2011, 0, 1, 0));
      },
      "does not observe the start of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 2, 13, 8, 59)), utc(2011, 2, 13, 8));
        assert.deepEqual(floor(utc(2011, 2, 13, 9, 0)), utc(2011, 2, 13, 9));
        assert.deepEqual(floor(utc(2011, 2, 13, 9, 1)), utc(2011, 2, 13, 9));
        assert.deepEqual(floor(utc(2011, 2, 13, 9, 59)), utc(2011, 2, 13, 9));
        assert.deepEqual(floor(utc(2011, 2, 13, 10, 0)), utc(2011, 2, 13, 10));
        assert.deepEqual(floor(utc(2011, 2, 13, 10, 1)), utc(2011, 2, 13, 10));
      },
      "does not observe the end of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 10, 6, 7, 59)), utc(2011, 10, 6, 7));
        assert.deepEqual(floor(utc(2011, 10, 6, 8, 0)), utc(2011, 10, 6, 8));
        assert.deepEqual(floor(utc(2011, 10, 6, 8, 1)), utc(2011, 10, 6, 8));
        assert.deepEqual(floor(utc(2011, 10, 6, 8, 59)), utc(2011, 10, 6, 8));
        assert.deepEqual(floor(utc(2011, 10, 6, 9, 0)), utc(2011, 10, 6, 9));
        assert.deepEqual(floor(utc(2011, 10, 6, 9, 1)), utc(2011, 10, 6, 9));
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

function tz(tz, scope) {
  return function() {
    var o = process.env.TZ;
    try {
      process.env.TZ = tz;
      new Date(0).toString(); // invalidate node's dst cache
      new Date().toString();
      scope.apply(this, arguments);
    } finally {
      process.env.TZ = o;
      new Date(0).toString(); // invalidate node's dst cache
      new Date().toString();
    }
  };
}

suite.export(module);

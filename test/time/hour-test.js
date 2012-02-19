require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.hour");

suite.addBatch({
  "hour": {
    topic: function() {
      return d3.time.hour;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns hours": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59)), local(2010, 11, 31, 23));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00)), local(2011, 00, 01, 00));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 01)), local(2011, 00, 01, 00));
      },
      "observes start of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 02, 13, 08, 59)), utc(2011, 02, 13, 08));
        assert.deepEqual(floor(utc(2011, 02, 13, 09, 00)), utc(2011, 02, 13, 09));
        assert.deepEqual(floor(utc(2011, 02, 13, 09, 01)), utc(2011, 02, 13, 09));
        assert.deepEqual(floor(utc(2011, 02, 13, 09, 59)), utc(2011, 02, 13, 09));
        assert.deepEqual(floor(utc(2011, 02, 13, 10, 00)), utc(2011, 02, 13, 10));
        assert.deepEqual(floor(utc(2011, 02, 13, 10, 01)), utc(2011, 02, 13, 10));
      },
      "observes end of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 10, 06, 07, 59)), utc(2011, 10, 06, 07));
        assert.deepEqual(floor(utc(2011, 10, 06, 08, 00)), utc(2011, 10, 06, 08));
        assert.deepEqual(floor(utc(2011, 10, 06, 08, 01)), utc(2011, 10, 06, 08));
        assert.deepEqual(floor(utc(2011, 10, 06, 08, 59)), utc(2011, 10, 06, 08));
        assert.deepEqual(floor(utc(2011, 10, 06, 09, 00)), utc(2011, 10, 06, 09));
        assert.deepEqual(floor(utc(2011, 10, 06, 09, 01)), utc(2011, 10, 06, 09));
      },
      "NPT": {
        "observes 15-minute offset": tz("Asia/Kathmandu", function(floor) {
          assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 15));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 18, 15));
        })
      },
      "IST": {
        "observes 30-minute offset": tz("Asia/Calcutta", function(floor) {
          assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 30));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 18, 30));
        })
      },
      "UTC": {
        topic: function(floor) {
          return floor.utc;
        },
        "returns hours": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59)), utc(2010, 11, 31, 23));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00)), utc(2011, 00, 01, 00));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 01)), utc(2011, 00, 01, 00));
        },
        "does not observe the start of daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 02, 13, 08, 59)), utc(2011, 02, 13, 08));
          assert.deepEqual(floor(utc(2011, 02, 13, 09, 00)), utc(2011, 02, 13, 09));
          assert.deepEqual(floor(utc(2011, 02, 13, 09, 01)), utc(2011, 02, 13, 09));
          assert.deepEqual(floor(utc(2011, 02, 13, 09, 59)), utc(2011, 02, 13, 09));
          assert.deepEqual(floor(utc(2011, 02, 13, 10, 00)), utc(2011, 02, 13, 10));
          assert.deepEqual(floor(utc(2011, 02, 13, 10, 01)), utc(2011, 02, 13, 10));
        },
        "does not observe the end of daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 10, 06, 07, 59)), utc(2011, 10, 06, 07));
          assert.deepEqual(floor(utc(2011, 10, 06, 08, 00)), utc(2011, 10, 06, 08));
          assert.deepEqual(floor(utc(2011, 10, 06, 08, 01)), utc(2011, 10, 06, 08));
          assert.deepEqual(floor(utc(2011, 10, 06, 08, 59)), utc(2011, 10, 06, 08));
          assert.deepEqual(floor(utc(2011, 10, 06, 09, 00)), utc(2011, 10, 06, 09));
          assert.deepEqual(floor(utc(2011, 10, 06, 09, 01)), utc(2011, 10, 06, 09));
        }
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns hours": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 31, 23, 59)), local(2011, 00, 01, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00)), local(2011, 00, 01, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 01)), local(2011, 00, 01, 01));
      },
      "observes start of daylight savings time": function(ceil) {
        assert.deepEqual(ceil(utc(2011, 02, 13, 08, 59)), utc(2011, 02, 13, 09));
        assert.deepEqual(ceil(utc(2011, 02, 13, 09, 00)), utc(2011, 02, 13, 09));
        assert.deepEqual(ceil(utc(2011, 02, 13, 09, 01)), utc(2011, 02, 13, 10));
        assert.deepEqual(ceil(utc(2011, 02, 13, 09, 59)), utc(2011, 02, 13, 10));
        assert.deepEqual(ceil(utc(2011, 02, 13, 10, 00)), utc(2011, 02, 13, 10));
        assert.deepEqual(ceil(utc(2011, 02, 13, 10, 01)), utc(2011, 02, 13, 11));
      },
      "observes end of daylight savings time": function(ceil) {
        assert.deepEqual(ceil(utc(2011, 10, 06, 07, 59)), utc(2011, 10, 06, 08));
        assert.deepEqual(ceil(utc(2011, 10, 06, 08, 00)), utc(2011, 10, 06, 08));
        assert.deepEqual(ceil(utc(2011, 10, 06, 08, 01)), utc(2011, 10, 06, 09));
        assert.deepEqual(ceil(utc(2011, 10, 06, 08, 59)), utc(2011, 10, 06, 09));
        assert.deepEqual(ceil(utc(2011, 10, 06, 09, 00)), utc(2011, 10, 06, 09));
        assert.deepEqual(ceil(utc(2011, 10, 06, 09, 01)), utc(2011, 10, 06, 10));
      },
      "NPT": {
        "observes 15-minute offset": tz("Asia/Kathmandu", function(ceil) {
          assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 19, 15));
        })
      },
      "IST": {
        "observes 30-minute offset": tz("Asia/Calcutta", function(ceil) {
          assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 19, 30));
        })
      },
      "UTC": {
        topic: function(ceil) {
          return ceil.utc;
        },
        "returns hours": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59)), utc(2011, 00, 01, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00)), utc(2011, 00, 01, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 01)), utc(2011, 00, 01, 01));
        },
        "does not observe the start of daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 02, 13, 08, 59)), utc(2011, 02, 13, 09));
          assert.deepEqual(ceil(utc(2011, 02, 13, 09, 00)), utc(2011, 02, 13, 09));
          assert.deepEqual(ceil(utc(2011, 02, 13, 09, 01)), utc(2011, 02, 13, 10));
          assert.deepEqual(ceil(utc(2011, 02, 13, 09, 59)), utc(2011, 02, 13, 10));
          assert.deepEqual(ceil(utc(2011, 02, 13, 10, 00)), utc(2011, 02, 13, 10));
          assert.deepEqual(ceil(utc(2011, 02, 13, 10, 01)), utc(2011, 02, 13, 11));
        },
        "does not observe the end of daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 10, 06, 07, 59)), utc(2011, 10, 06, 08));
          assert.deepEqual(ceil(utc(2011, 10, 06, 08, 00)), utc(2011, 10, 06, 08));
          assert.deepEqual(ceil(utc(2011, 10, 06, 08, 01)), utc(2011, 10, 06, 09));
          assert.deepEqual(ceil(utc(2011, 10, 06, 08, 59)), utc(2011, 10, 06, 09));
          assert.deepEqual(ceil(utc(2011, 10, 06, 09, 00)), utc(2011, 10, 06, 09));
          assert.deepEqual(ceil(utc(2011, 10, 06, 09, 01)), utc(2011, 10, 06, 10));
        }
      }
    }
  }
});

function local(year, month, day, hours, minutes, seconds) {
  return new Date(year, month, day, hours || 00, minutes || 00, seconds || 00);
}

function utc(year, month, day, hours, minutes, seconds) {
  return new Date(Date.UTC(year, month, day, hours || 00, minutes || 00, seconds || 00));
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

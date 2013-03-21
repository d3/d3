var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.hour");

suite.addBatch({
  "hour": {
    topic: load("time/hour").expression("d3.time.hour"),
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
        "observes 15-minute offset": time.zone(345, function(floor) {
          assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 15));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 18, 15));
        })
      },
      "IST": {
        "observes 30-minute offset": time.zone(330, function(floor) {
          assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 17, 30));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 18, 30));
        })
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
        "observes 15-minute offset": time.zone(345, function(ceil) {
          assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 15));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 19, 15));
        })
      },
      "IST": {
        "observes 30-minute offset": time.zone(330, function(ceil) {
          assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), utc(2010, 11, 31, 18, 30));
          assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), utc(2010, 11, 31, 19, 30));
        })
      }
    },
    "offset": {
      topic: function(interval) {
        return interval.offset;
      },
      "does not modify the passed-in date": function(offset) {
        var date = local(2010, 11, 31, 23, 59, 59, 999);
        offset(date, +1);
        assert.deepEqual(date, local(2010, 11, 31, 23, 59, 59, 999));
      },
      "does not round the passed-in-date": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011, 00, 01, 00, 59, 59, 999));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 21, 59, 59, 456));
      },
      "allows negative offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 12), -1), local(2010, 11, 31, 11));
        assert.deepEqual(offset(local(2011, 00, 01, 01), -2), local(2010, 11, 31, 23));
        assert.deepEqual(offset(local(2011, 00, 01, 00), -1), local(2010, 11, 31, 23));
      },
      "allows positive offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 11), +1), local(2010, 11, 31, 12));
        assert.deepEqual(offset(local(2010, 11, 31, 23), +2), local(2011, 00, 01, 01));
        assert.deepEqual(offset(local(2010, 11, 31, 23), +1), local(2011, 00, 01, 00));
      },
      "allows zero offset": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 58, 000), 0), local(2010, 11, 31, 23, 59, 58, 000));
      }
    },
    "UTC": {
      topic: function(interval) {
        return interval.utc;
      },
      "defaults to floor": function(interval) {
        assert.strictEqual(interval, interval.floor);
      },
      "floor": {
        topic: function(interval) {
          return interval.floor;
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
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
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
      },
      "offset": {
        topic: function(interval) {
          return interval.offset;
        },
        "does not modify the passed-in date": function(offset) {
          var date = utc(2010, 11, 31, 23, 59, 59, 999);
          offset(date, +1);
          assert.deepEqual(date, utc(2010, 11, 31, 23, 59, 59, 999));
        },
        "does not round the passed-in-date": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011, 00, 01, 00, 59, 59, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 21, 59, 59, 456));
        },
        "allows negative offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 12), -1), utc(2010, 11, 31, 11));
          assert.deepEqual(offset(utc(2011, 00, 01, 01), -2), utc(2010, 11, 31, 23));
          assert.deepEqual(offset(utc(2011, 00, 01, 00), -1), utc(2010, 11, 31, 23));
        },
        "allows positive offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 11), +1), utc(2010, 11, 31, 12));
          assert.deepEqual(offset(utc(2010, 11, 31, 23), +2), utc(2011, 00, 01, 01));
          assert.deepEqual(offset(utc(2010, 11, 31, 23), +1), utc(2011, 00, 01, 00));
        },
        "allows zero offset": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 58, 000), 0), utc(2010, 11, 31, 23, 59, 58, 000));
        }
      }
    }
  }
});

suite.export(module);

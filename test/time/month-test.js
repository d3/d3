require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.month");

suite.addBatch({
  "month": {
    topic: function() {
      return d3.time.month;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns months": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 11, 01));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), local(2011, 00, 01));
      },
      "observes the start of daylight savings time": function(floor) {
        assert.deepEqual(floor(local(2011, 02, 13, 01)), local(2011, 02, 01));
      },
      "observes the end of the daylight savings time": function(floor) {
        assert.deepEqual(floor(local(2011, 10, 06, 01)), local(2011, 10, 01));
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns months": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), local(2011, 00, 01));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), local(2011, 01, 01));
      },
      "observes the start of daylight savings time": function(ceil) {
        assert.deepEqual(ceil(local(2011, 02, 13, 01)), local(2011, 03, 01));
      },
      "observes the end of the daylight savings time": function(ceil) {
        assert.deepEqual(ceil(local(2011, 10, 06, 01)), local(2011, 11, 01));
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
        "returns months": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 01)), utc(2011, 00, 01));
        },
        "does not observe the start of daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 02, 13, 01)), utc(2011, 02, 01));
        },
        "does not observe the end of the daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 10, 06, 01)), utc(2011, 10, 01));
        }
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
        },
        "returns months": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 01)), utc(2011, 01, 01));
        },
        "does not observe the start of daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 02, 13, 01)), utc(2011, 03, 01));
        },
        "does not observe the end of the daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 10, 06, 01)), utc(2011, 11, 01));
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

suite.export(module);

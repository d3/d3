require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.day");

suite.addBatch({
  "day": {
    topic: function() {
      return d3.time.day;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns midnights": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23)), local(2010, 11, 31));
        assert.deepEqual(floor(local(2011, 00, 01, 00)), local(2011, 00, 01));
        assert.deepEqual(floor(local(2011, 00, 01, 01)), local(2011, 00, 01));
      },
      "observes start of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 02, 13, 07)), local(2011, 02, 12));
        assert.deepEqual(floor(utc(2011, 02, 13, 08)), local(2011, 02, 13));
        assert.deepEqual(floor(utc(2011, 02, 13, 09)), local(2011, 02, 13));
        assert.deepEqual(floor(utc(2011, 02, 13, 10)), local(2011, 02, 13));
      },
      "observes end of daylight savings time": function(floor) {
        assert.deepEqual(floor(utc(2011, 10, 06, 07)), local(2011, 10, 06));
        assert.deepEqual(floor(utc(2011, 10, 06, 08)), local(2011, 10, 06));
        assert.deepEqual(floor(utc(2011, 10, 06, 09)), local(2011, 10, 06));
        assert.deepEqual(floor(utc(2011, 10, 06, 10)), local(2011, 10, 06));
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns midnights": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 30, 23)), local(2010, 11, 31));
        assert.deepEqual(ceil(local(2010, 11, 31, 00)), local(2010, 11, 31));
        assert.deepEqual(ceil(local(2010, 11, 31, 01)), local(2011, 00, 01));
      },
      "observes start of daylight savings time": function(ceil) {
        assert.deepEqual(ceil(utc(2011, 02, 13, 07)), local(2011, 02, 13));
        assert.deepEqual(ceil(utc(2011, 02, 13, 08)), local(2011, 02, 13));
        assert.deepEqual(ceil(utc(2011, 02, 13, 09)), local(2011, 02, 14));
        assert.deepEqual(ceil(utc(2011, 02, 13, 10)), local(2011, 02, 14));
      },
      "observes end of daylight savings time": function(ceil) {
        assert.deepEqual(ceil(utc(2011, 10, 06, 07)), local(2011, 10, 06));
        assert.deepEqual(ceil(utc(2011, 10, 06, 08)), local(2011, 10, 07));
        assert.deepEqual(ceil(utc(2011, 10, 06, 09)), local(2011, 10, 07));
        assert.deepEqual(ceil(utc(2011, 10, 06, 10)), local(2011, 10, 07));
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
        "returns midnights": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23)), utc(2010, 11, 31));
          assert.deepEqual(floor(utc(2011, 00, 01, 00)), utc(2011, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 01)), utc(2011, 00, 01));
        },
        "does not observe the start of daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 02, 13, 07)), utc(2011, 02, 13));
          assert.deepEqual(floor(utc(2011, 02, 13, 08)), utc(2011, 02, 13));
          assert.deepEqual(floor(utc(2011, 02, 13, 09)), utc(2011, 02, 13));
          assert.deepEqual(floor(utc(2011, 02, 13, 10)), utc(2011, 02, 13));
        },
        "does not observe the end of daylight savings time": function(floor) {
          assert.deepEqual(floor(utc(2011, 10, 06, 05)), utc(2011, 10, 06));
          assert.deepEqual(floor(utc(2011, 10, 06, 06)), utc(2011, 10, 06));
          assert.deepEqual(floor(utc(2011, 10, 06, 07)), utc(2011, 10, 06));
          assert.deepEqual(floor(utc(2011, 10, 06, 08)), utc(2011, 10, 06));
        }
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
        },
        "returns midnights": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 30, 23)), utc(2010, 11, 31));
          assert.deepEqual(ceil(utc(2010, 11, 31, 00)), utc(2010, 11, 31));
          assert.deepEqual(ceil(utc(2010, 11, 31, 01)), utc(2011, 00, 01));
        },
        "does not observe the start of daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 02, 13, 07)), utc(2011, 02, 14));
          assert.deepEqual(ceil(utc(2011, 02, 13, 08)), utc(2011, 02, 14));
          assert.deepEqual(ceil(utc(2011, 02, 13, 09)), utc(2011, 02, 14));
          assert.deepEqual(ceil(utc(2011, 02, 13, 10)), utc(2011, 02, 14));
        },
        "does not observe the end of daylight savings time": function(ceil) {
          assert.deepEqual(ceil(utc(2011, 10, 06, 05)), utc(2011, 10, 07));
          assert.deepEqual(ceil(utc(2011, 10, 06, 06)), utc(2011, 10, 07));
          assert.deepEqual(ceil(utc(2011, 10, 06, 07)), utc(2011, 10, 07));
          assert.deepEqual(ceil(utc(2011, 10, 06, 08)), utc(2011, 10, 07));
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

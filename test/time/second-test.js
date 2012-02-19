require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.second");

suite.addBatch({
  "second": {
    topic: function() {
      return d3.time.second;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns seconds": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59, 999)), local(2010, 11, 31, 23, 59, 59));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00, 000)), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00, 001)), local(2011, 00, 01, 00, 00, 00));
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns seconds": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59, 999)), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00, 000)), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00, 001)), local(2011, 00, 01, 00, 00, 01));
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
        "returns seconds": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2010, 11, 31, 23, 59, 59));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00, 000)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00, 001)), utc(2011, 00, 01, 00, 00, 00));
        }
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
        },
        "returns seconds": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00, 000)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00, 001)), utc(2011, 00, 01, 00, 00, 01));
        }
      }
    }
  }
});

function local(year, month, day, hours, minutes, seconds, milliseconds) {
  return new Date(year, month, day, hours || 00, minutes || 00, seconds || 00, milliseconds || 00);
}

function utc(year, month, day, hours, minutes, seconds, milliseconds) {
  return new Date(Date.UTC(year, month, day, hours || 00, minutes || 00, seconds || 00, milliseconds || 00));
}

suite.export(module);

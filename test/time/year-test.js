require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.year");

suite.addBatch({
  "year": {
    topic: function() {
      return d3.time.year;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns years": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 00, 01));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 01)), local(2011, 00, 01));
      },
      "UTC": {
        topic: function(floor) {
          return floor.utc;
        },
        "returns years": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 01)), utc(2011, 00, 01));
        }
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns years": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), local(2011, 00, 01));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 01)), local(2012, 00, 01));
      },
      "UTC": {
        topic: function(ceil) {
          return ceil.utc;
        },
        "returns years": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 01)), utc(2012, 00, 01));
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

require("../env");

var vows = require("vows"),
    assert = require("assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

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
    "round": {
      topic: function(interval) {
        return interval.round;
      },
      "returns seconds": function(round) {
        assert.deepEqual(round(local(2010, 11, 31, 23, 59, 59, 999)), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(round(local(2011, 00, 01, 00, 00, 00, 499)), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(round(local(2011, 00, 01, 00, 00, 00, 500)), local(2011, 00, 01, 00, 00, 01));
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
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011, 00, 01, 00, 00, 00, 999));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 23, 59, 57, 456));
      },
      "allows negative offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59), -1), local(2010, 11, 31, 23, 59, 58));
        assert.deepEqual(offset(local(2011, 00, 01, 00, 00, 00), -2), local(2010, 11, 31, 23, 59, 58));
        assert.deepEqual(offset(local(2011, 00, 01, 00, 00, 00), -1), local(2010, 11, 31, 23, 59, 59));
      },
      "allows positive offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 58), +1), local(2010, 11, 31, 23, 59, 59));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 58), +2), local(2011, 00, 01, 00, 00, 00));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59), +1), local(2011, 00, 01, 00, 00, 00));
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
        "returns seconds": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2010, 11, 31, 23, 59, 59));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00, 000)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00, 001)), utc(2011, 00, 01, 00, 00, 00));
        }
      },
      "round": {
        topic: function(interval) {
          return interval.round;
        },
        "returns seconds": function(round) {
          assert.deepEqual(round(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(round(utc(2011, 00, 01, 00, 00, 00, 499)), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(round(utc(2011, 00, 01, 00, 00, 00, 500)), utc(2011, 00, 01, 00, 00, 01));
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
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011, 00, 01, 00, 00, 00, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 23, 59, 57, 456));
        },
        "allows negative offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59), -1), utc(2010, 11, 31, 23, 59, 58));
          assert.deepEqual(offset(utc(2011, 00, 01, 00, 00, 00), -2), utc(2010, 11, 31, 23, 59, 58));
          assert.deepEqual(offset(utc(2011, 00, 01, 00, 00, 00), -1), utc(2010, 11, 31, 23, 59, 59));
        },
        "allows positive offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 58), +1), utc(2010, 11, 31, 23, 59, 59));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 58), +2), utc(2011, 00, 01, 00, 00, 00));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59), +1), utc(2011, 00, 01, 00, 00, 00));
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

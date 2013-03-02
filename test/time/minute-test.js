require("../env");

var vows = require("vows"),
    assert = require("../env-assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.minute");

suite.addBatch({
  "minute": {
    topic: function() {
      return d3.time.minute;
    },
    "defaults to floor": function(interval) {
      assert.strictEqual(interval, interval.floor);
    },
    "floor": {
      topic: function(interval) {
        return interval.floor;
      },
      "returns minutes": function(floor) {
        assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 11, 31, 23, 59));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01, 00, 00));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 00, 59)), local(2011, 00, 01, 00, 00));
        assert.deepEqual(floor(local(2011, 00, 01, 00, 01, 00)), local(2011, 00, 01, 00, 01));
      }
    },
    "ceil": {
      topic: function(interval) {
        return interval.ceil;
      },
      "returns minutes": function(ceil) {
        assert.deepEqual(ceil(local(2010, 11, 31, 23, 59, 59)), local(2011, 00, 01, 00, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 00)), local(2011, 00, 01, 00, 00));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 00, 59)), local(2011, 00, 01, 00, 01));
        assert.deepEqual(ceil(local(2011, 00, 01, 00, 01, 00)), local(2011, 00, 01, 00, 01));
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
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011, 00, 01, 00, 00, 59, 999));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 23, 57, 59, 456));
      },
      "allows negative offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 12), -1), local(2010, 11, 31, 23, 11));
        assert.deepEqual(offset(local(2011, 00, 01, 00, 01), -2), local(2010, 11, 31, 23, 59));
        assert.deepEqual(offset(local(2011, 00, 01, 00, 00), -1), local(2010, 11, 31, 23, 59));
      },
      "allows positive offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 31, 23, 11), +1), local(2010, 11, 31, 23, 12));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59), +2), local(2011, 00, 01, 00, 01));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59), +1), local(2011, 00, 01, 00, 00));
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
        "returns minutes": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 23, 59));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01, 00, 00));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 59)), utc(2011, 00, 01, 00, 00));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 01, 00)), utc(2011, 00, 01, 00, 01));
        }
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
        },
        "returns minutes": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011, 00, 01, 00, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01, 00, 00));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 59)), utc(2011, 00, 01, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 01, 00)), utc(2011, 00, 01, 00, 01));
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
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011, 00, 01, 00, 00, 59, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 23, 57, 59, 456));
        },
        "allows negative offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 12), -1), utc(2010, 11, 31, 23, 11));
          assert.deepEqual(offset(utc(2011, 00, 01, 00, 01), -2), utc(2010, 11, 31, 23, 59));
          assert.deepEqual(offset(utc(2011, 00, 01, 00, 00), -1), utc(2010, 11, 31, 23, 59));
        },
        "allows positive offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 11), +1), utc(2010, 11, 31, 23, 12));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59), +2), utc(2011, 00, 01, 00, 01));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59), +1), utc(2011, 00, 01, 00, 00));
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

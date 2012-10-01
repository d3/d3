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
      "correctly handles years in the first century": function(floor) {
        assert.deepEqual(floor(local(0011, 10, 06, 07)), local(0011, 00, 01));
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
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011, 11, 31, 23, 59, 59, 999));
        assert.deepEqual(offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2008, 11, 31, 23, 59, 59, 456));
      },
      "allows negative offsets": function(offset) {
        assert.deepEqual(offset(local(2010, 11, 01), -1), local(2009, 11, 01));
        assert.deepEqual(offset(local(2011, 00, 01), -2), local(2009, 00, 01));
        assert.deepEqual(offset(local(2011, 00, 01), -1), local(2010, 00, 01));
      },
      "allows positive offsets": function(offset) {
        assert.deepEqual(offset(local(2009, 11, 01), +1), local(2010, 11, 01));
        assert.deepEqual(offset(local(2009, 00, 01), +2), local(2011, 00, 01));
        assert.deepEqual(offset(local(2010, 00, 01), +1), local(2011, 00, 01));
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
        "returns years": function(floor) {
          assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(floor(utc(2011, 00, 01, 00, 00, 01)), utc(2011, 00, 01));
        }
      },
      "ceil": {
        topic: function(interval) {
          return interval.ceil;
        },
        "returns years": function(ceil) {
          assert.deepEqual(ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 00)), utc(2011, 00, 01));
          assert.deepEqual(ceil(utc(2011, 00, 01, 00, 00, 01)), utc(2012, 00, 01));
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
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011, 11, 31, 23, 59, 59, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2008, 11, 31, 23, 59, 59, 456));
        },
        "allows negative offsets": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 01), -1), utc(2009, 11, 01));
          assert.deepEqual(offset(utc(2011, 00, 01), -2), utc(2009, 00, 01));
          assert.deepEqual(offset(utc(2011, 00, 01), -1), utc(2010, 00, 01));
        },
        "allows positive offsets": function(offset) {
          assert.deepEqual(offset(utc(2009, 11, 01), +1), utc(2010, 11, 01));
          assert.deepEqual(offset(utc(2009, 00, 01), +2), utc(2011, 00, 01));
          assert.deepEqual(offset(utc(2010, 00, 01), +1), utc(2011, 00, 01));
        },
        "allows zero offset": function(offset) {
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
          assert.deepEqual(offset(utc(2010, 11, 31, 23, 59, 58, 000), 0), utc(2010, 11, 31, 23, 59, 58, 000));
        }
      }
    }
  }
});

function local(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  return date;
}

function utc(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setUTCFullYear(year, month, day);
  date.setUTCHours(hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  return date;
}

suite.export(module);

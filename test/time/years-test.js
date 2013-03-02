require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.time.years");

suite.addBatch({
  "years": {
    topic: function() {
      return d3.time.years;
    },
    "returns years": function(range) {
      assert.deepEqual(range(local(2010, 0, 1), local(2013, 0, 1)), [
        local(2010, 0, 1),
        local(2011, 0, 1),
        local(2012, 0, 1)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 0, 1), local(2013, 0, 1))[0], local(2010, 0, 1));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 0, 1), local(2013, 0, 1))[2], local(2012, 0, 1));
    },
    "can skip years": function(range) {
      assert.deepEqual(range(local(2009, 0, 1), local(2029, 0, 1), 5), [
        local(2010, 0, 1),
        local(2015, 0, 1),
        local(2020, 0, 1),
        local(2025, 0, 1)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns years": function(range) {
        assert.deepEqual(range(utc(2010, 0, 1), utc(2013, 0, 1)), [
          utc(2010, 0, 1),
          utc(2011, 0, 1),
          utc(2012, 0, 1)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 0, 1), utc(2013, 0, 1))[0], utc(2010, 0, 1));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 0, 1), utc(2013, 0, 1))[2], utc(2012, 0, 1));
      },
      "can skip years": function(range) {
        assert.deepEqual(range(utc(2009, 0, 1), utc(2029, 0, 1), 5), [
          utc(2010, 0, 1),
          utc(2015, 0, 1),
          utc(2020, 0, 1),
          utc(2025, 0, 1)
        ]);
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

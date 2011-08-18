require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.second");

suite.addBatch({
  "second": {
    topic: function() {
      return d3.time.second;
    },
    "returns seconds": function(floor) {
      assert.deepEqual(floor(local(2010, 11, 31, 23, 59, 59, 999)), local(2010, 11, 31, 23, 59, 59));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 0, 0)), local(2011, 0, 1, 0, 0, 0));
      assert.deepEqual(floor(local(2011, 0, 1, 0, 0, 0, 1)), local(2011, 0, 1, 0, 0, 0));
    },
    "UTC": {
      topic: function(floor) {
        return floor.utc;
      },
      "returns seconds": function(floor) {
        assert.deepEqual(floor(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2010, 11, 31, 23, 59, 59));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 0, 0, 0)), utc(2011, 0, 1, 0, 0, 0));
        assert.deepEqual(floor(utc(2011, 0, 1, 0, 0, 0, 1)), utc(2011, 0, 1, 0, 0, 0));
      }
    }
  }
});

function local(year, month, day, hours, minutes, seconds, milliseconds) {
  return new Date(year, month, day, hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
}

function utc(year, month, day, hours, minutes, seconds, milliseconds) {
  return new Date(Date.UTC(year, month, day, hours || 0, minutes || 0, seconds || 0, milliseconds || 0));
}

suite.export(module);

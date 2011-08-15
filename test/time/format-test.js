require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.format");

suite.addBatch({
  "format": {
    topic: function() {
      return d3.time.format;
    },
    "ISO": {
      topic: function(format) {
        return format.iso;
      },
      "formats as ISO 8601": function(format) {
        assert.equal(format(utc(1990, 0, 1, 0, 0, 0)), "1990-01-01T00:00:00Z");
        assert.equal(format(utc(2011, 11, 31, 23, 59, 59)), "2011-12-31T23:59:59Z");
      }
    }
  }
});

function local(year, month, day, hours, minutes, seconds) {
  return new Date(year, month, day, hours || 0, minutes || 0, seconds || 0);
}

function utc(year, month, day, hours, minutes, seconds) {
  return new Date(Date.UTC(year, month, day, hours || 0, minutes || 0, seconds || 0));
}

suite.export(module);

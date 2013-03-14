var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    utc = time.utc;

var suite = vows.describe("d3.time.format");

suite.addBatch({
  "format.iso": {
    topic: load("time/format-iso").expression("d3.time.format.iso"),

    "toString is %Y-%m-%dT%H:%M:%S.%LZ": function(format) {
      assert.equal(format + "", "%Y-%m-%dT%H:%M:%S.%LZ");
    },

    "formats as ISO 8601": function(format) {
      assert.equal(format(utc(1990, 0, 1, 0, 0, 0)), "1990-01-01T00:00:00.000Z");
      assert.equal(format(utc(2011, 11, 31, 23, 59, 59)), "2011-12-31T23:59:59.000Z");
    },

    "parse": {
      "parses as ISO 8601": function(format) {
        var p = format.parse;
        assert.deepEqual(p("1990-01-01T00:00:00.000Z"), utc(1990, 0, 1, 0, 0, 0));
        assert.deepEqual(p("2011-12-31T23:59:59.000Z"), utc(2011, 11, 31, 23, 59, 59));
        assert.isNull(p("1990-01-01T00:00:00.000X"));
      }
    }
  }
});

suite.export(module);

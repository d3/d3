var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.milliseconds");

suite.addBatch({
  "milliseconds": {
    topic: load("time/millisecond").expression("d3.time.milliseconds"),
    "returns milliseconds": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59, 998), local(2011, 0, 1, 0, 0, 0)), [
        local(2010, 11, 31, 23, 59, 59, 998),
        local(2010, 11, 31, 23, 59, 59, 999)
      ]);
    },
    "has an inclusive lower bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[0], local(2010, 11, 31, 23, 59, 59));
    },
    "has an exclusive upper bound": function(range) {
      assert.deepEqual(range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[2], local(2010, 11, 31, 23, 59, 59, 002));
    },
    "can skip milliseconds": function(range) {
      assert.deepEqual(range(local(2011, 1, 1, 12, 0, 7,000), local(2011, 1, 1, 12, 0, 8,500), 500), [
      local(2011, 1, 1, 12, 0, 7,000),
      local(2011, 1, 1, 12, 0, 7,500),
      local(2011, 1, 1, 12, 0, 8,000)
      ]);
    },
    "observes start of daylight savings time": function(range) {
      assert.deepEqual(range(utc(2011, 2, 13, 9, 59, 59, 000), utc(2011, 2, 13, 9, 59, 59, 003)), [
      utc(2011, 2, 13, 9, 59, 59, 000),
      utc(2011, 2, 13, 9, 59, 59, 001),
      utc(2011, 2, 13, 9, 59, 59, 002)
      ]);
    },
    "observes end of daylight savings time": function(range) {
      assert.deepEqual(range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 8, 59, 59, 003)), [
      utc(2011, 10, 6, 8, 59, 59),
      utc(2011, 10, 6, 8, 59, 59, 001),
      utc(2011, 10, 6, 8, 59, 59, 002)
      ]);
    },
    "UTC": {
      topic: function(range) {
        return range.utc;
      },
      "returns milliseconds": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59,998), utc(2011, 0, 1, 0, 0, 0)), [
          utc(2010, 11, 31, 23, 59, 59,998),
          utc(2010, 11, 31, 23, 59, 59,999)
        ]);
      },
      "has an inclusive lower bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2))[0], utc(2010, 11, 31, 23, 59, 59));
      },
      "has an exclusive upper bound": function(range) {
        assert.deepEqual(range(utc(2010, 11, 31, 23, 59, 59, 000), utc(2010, 11, 31, 23, 59, 59, 003))[2], utc(2010, 11, 31, 23, 59, 59, 002));
      },
      "can skip milliseconds": function(range) {
        assert.deepEqual(range(utc(2011, 1, 1, 12, 0, 7), utc(2011, 1, 1, 12, 0, 8, 500), 500), [
        utc(2011, 1, 1, 12, 0, 7, 000),
        utc(2011, 1, 1, 12, 0, 7, 500),
        utc(2011, 1, 1, 12, 0, 8, 000)
        ]);
      },
      "does not observe the start of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 2, 13, 9, 59, 59), utc(2011, 2, 13, 9, 59, 59, 003)), [
        utc(2011, 2, 13, 9, 59, 59, 000),
        utc(2011, 2, 13, 9, 59, 59, 001),
        utc(2011, 2, 13, 9, 59, 59, 002)
        ]);
      },
      "does not observe the end of daylight savings time": function(range) {
        assert.deepEqual(range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 8, 59, 59, 003)), [
        utc(2011, 10, 6, 8, 59, 59, 000),
        utc(2011, 10, 6, 8, 59, 59, 001),
        utc(2011, 10, 6, 8, 59, 59, 002)
        ]);
      }
    }
  }
});

suite.export(module);

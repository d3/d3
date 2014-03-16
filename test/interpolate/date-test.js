var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateNumber");

suite.addBatch({
  "interpolateDate": {
    topic: load("interpolate/date").expression("d3.interpolateDate"),
    "interpolates dates": function(interpolate) {
      assert.strictEqual(interpolate(new Date(1000), new Date(2000))(.4).valueOf(), new Date(1400).valueOf());
      assert.strictEqual(interpolate(new Date(100), new Date(200))(.6).valueOf(), new Date(160).valueOf());
    },
  }
});

suite.export(module);

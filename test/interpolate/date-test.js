var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateDate");

suite.addBatch({
  "interpolateDate": {
    topic: load("interpolate/date").expression("d3.interpolateDate"),
    "interpolates dates": function(interpolate) {
      assert.strictEqual(+interpolate(new Date(1000), new Date(2000))(.4), +(new Date(1400)));
      assert.strictEqual(+interpolate(new Date(100), new Date(200))(.6), +(new Date(160)));
    },
  }
});

suite.export(module);

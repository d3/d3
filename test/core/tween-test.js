require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.tween");

suite.addBatch({
  "tween": {
    "coerces constants to strings before interpolating": function() {
      var t = d3.tween({toString: function() { return "#fff"; }}, d3.interpolate),
          i = t(null, 0, "red");
      assert.strictEqual(i(0), "#ff0000");
      assert.strictEqual(i(.5), "#ff8080");
      assert.strictEqual(i(1), "#ffffff");
    },
    "coerces function return values to strings before interpolating": function() {
      var t = d3.tween(function(d) { return {toString: function() { return d; }}; }, d3.interpolate),
          i = t("#fff", 0, "red");
      assert.strictEqual(i(0), "#ff0000");
      assert.strictEqual(i(.5), "#ff8080");
      assert.strictEqual(i(1), "#ffffff");
    }
  }
});

suite.export(module);

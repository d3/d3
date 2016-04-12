var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateTransform");

suite.addBatch({
  "interpolateTransform": {
    topic: load("interpolate/transform").document(),
    "interpolation of a decomposed transform": {
      topic: function(d3) {
        // Use a custom d3.transform to parse a decomposed transform, since
        // JSDOM doesn't support consolidating SVG transform strings.
        d3.transform = function(s) {
          var m = s.split(/,/g).map(Number);
          return {
            translate: [m[0], m[1]],
            rotate: m[2],
            skew: m[3],
            scale: [m[4], m[5]]
          };
        };
        return d3;
      },
      "identity": function(d3) {
        assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [0, 0, 0, 0, 1, 1] + "")(0.4), "");
      },
      "translate": {
        "x": function(d3) {
          assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [10, 0, 0, 0, 1, 1] + "")(0.4), "translate(4,0)");
        },
        "y": function(d3) {
          assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [0, 10, 0, 0, 1, 1] + "")(0.4), "translate(0,4)");
        },
        "x and y": function(d3) {
          assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [1, 10, 0, 0, 1, 1] + "")(0.4), "translate(0.4,4)");
        }
      },
      "rotate": {
        "simple": function(d3) {
          assert.strictEqual(d3.interpolateTransform([0, 0, -10, 0, 1, 1] + "", [0, 0, 30, 0, 1, 1] + "")(0.4), "rotate(6)");
        },
        "with constant translate": function(d3) {
          assert.strictEqual(d3.interpolateTransform([5, 6, -10, 0, 1, 1] + "", [5, 6, 30, 0, 1, 1] + "")(0.4), "translate(5,6),rotate(6)");
        }
      },
      "skew": function(d3) {
        assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [0, 0, 0, 40, 1, 1] + "")(0.4), "skewX(16)");
      },
      "scale": function(d3) {
        assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [0, 0, 0, 0, 10, 1] + "")(0.5), "scale(5.5,1)");
      },
      "translate and rotate": function(d3) {
        assert.strictEqual(d3.interpolateTransform([0, 0, 0, 0, 1, 1] + "", [100, 0, 90, 0, 1, 1] + "")(0.5), "translate(50,0),rotate(45)");
      }
    }
  }
});

suite.export(module);

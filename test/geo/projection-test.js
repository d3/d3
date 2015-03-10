var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.projection");

suite.addBatch({
  "projection": {
    topic: load("geo/projection").expression("d3.geo.projection"),
    "a custom invertible projection": {
      topic: function(projection) {
        function forward(λ, φ) { return [λ, φ]; }
        forward.invert = function(x, y) {};
        return projection(forward);
      },

      "invert": {
        "can return undefined": function(projection) {
          assert.isUndefined(projection.invert([0, 0]));
        }
      },

      "scale": {
        "defaults to 150": function(projection) {
          assert.equal(projection.scale(), 150);
        },
        "is coerced to a number": function(projection) {
          assert.strictEqual(projection.scale("400"), projection);
          assert.strictEqual(projection.scale(), 400);
        }
      },

      "translate": {
        "defaults to [480, 250]": function(projection) {
          assert.deepEqual(projection.translate(), [480, 250]);
        },
        "is coerced to two numbers": function(projection) {
          assert.strictEqual(projection.translate(["23", "141"]), projection);
          assert.strictEqual(projection.translate()[0], 23);
          assert.strictEqual(projection.translate()[1], 141);
        }
      },

      "rotate": {
        "defaults to [0, 0, 0]": function(projection) {
          assert.deepEqual(projection.rotate(), [0, 0, 0]);
        },
        "is coerced to three numbers": function(projection) {
          assert.strictEqual(projection.rotate(["23", "41"]), projection);
          assert.strictEqual(projection.rotate()[0], 23);
          assert.strictEqual(projection.rotate()[1], 41);
        }
      }
    }
  }
});

suite.export(module);

require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.equirectangular");

suite.addBatch({
  "equirectangular": {
    topic: function() {
      return d3.geo.equirectangular();
    },

    "scale": {
      "defaults to 500 / 2π": function(projection) {
        assert.equal(projection.scale(), 500 / (2 * Math.PI));
      },
      "is coerced to a number": function(projection) {
        assert.strictEqual(projection.scale("400"), projection);
        assert.strictEqual(projection.scale(), 400);
        projection.scale(500 / (2 * Math.PI));
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
        projection.translate([480, 250]);
      }
    },

    "of San Francisco, CA": {
      "is at location [-122.446, 37.767]": function(projection) {
        assert.inDelta(projection.invert([310, 198]), [-122.446, 37.767], .5);
      },
      "is at point [310, 198]": function(projection) {
        assert.inDelta(projection([-122.446, 37.767]), [310, 198], .5);
      }
    }
  }
});

suite.export(module);

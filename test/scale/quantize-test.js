var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.scale.quantize");

suite.addBatch({
  "quantize": {
    topic: load("scale/quantize", "arrays/range"),
    "has the default domain [0, 1]": function(d3) {
      var x = d3.scale.quantize();
      assert.deepEqual(x.domain(), [0, 1]);
      assert.equal(x(.25), 0);
    },
    "has the default range [0, 1]": function(d3) {
      var x = d3.scale.quantize();
      assert.deepEqual(x.range(), [0, 1]);
      assert.equal(x(.75), 1);
    },
    "maps a number to a discrete value in the range": function(d3) {
      var x = d3.scale.quantize().range([0, 1, 2]);
      assert.equal(x(0), 0);
      assert.equal(x(.2), 0);
      assert.equal(x(.4), 1);
      assert.equal(x(.6), 1);
      assert.equal(x(.8), 2);
      assert.equal(x(1), 2);
    },
    "coerces domain to numbers": function(d3) {
      var x = d3.scale.quantize().domain(["0", "100"]);
      assert.strictEqual(x.domain()[0], 0);
      assert.strictEqual(x.domain()[1], 100);
    },
    "only considers the extent of the domain": function(d3) {
      var x = d3.scale.quantize().domain([-1, 0, 100]);
      assert.deepEqual(x.domain(), [-1, 100]);
    },
    "clamps input values to the domain": function(d3) {
      var a = {}, b = {}, c = {}, x = d3.scale.quantize().range([a, b, c]);
      assert.equal(x(-.5), a);
      assert.equal(x(1.5), c);
    },
    "range cardinality determines the degree of quantization": function(d3) {
      var x = d3.scale.quantize();
      assert.inDelta(x.range(d3.range(0, 1.001, .001))(1/3), .333, 1e-6);
      assert.inDelta(x.range(d3.range(0, 1.01, .01))(1/3), .33, 1e-6);
      assert.inDelta(x.range(d3.range(0, 1.1, .1))(1/3), .3, 1e-6);
      assert.inDelta(x.range(d3.range(0, 1.2, .2))(1/3), .4, 1e-6);
      assert.inDelta(x.range(d3.range(0, 1.25, .25))(1/3), .25, 1e-6);
      assert.inDelta(x.range(d3.range(0, 1.5, .5))(1/3), .5, 1e-6);
      assert.inDelta(x.range(d3.range(1))(1/3), 0, 1e-6);
    },
    "range values are arbitrary": function(d3) {
      var a = {}, b = {}, c = {}, x = d3.scale.quantize().range([a, b, c]);
      assert.equal(x(0), a);
      assert.equal(x(.2), a);
      assert.equal(x(.4), b);
      assert.equal(x(.6), b);
      assert.equal(x(.8), c);
      assert.equal(x(1), c);
    }
  }
});

suite.export(module);

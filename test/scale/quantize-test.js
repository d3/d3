var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.scale.quantize");

suite.addBatch({
  "quantize": {
    topic: load("scale/quantize").expression("d3.scale.quantize"),
    "has the default domain [0, 1]": function(quantize) {
      var x = quantize();
      assert.deepEqual(x.domain(), [0, 1]);
      assert.equal(x(.25), 0);
    },
    "has the default range [0, 1]": function(quantize) {
      var x = quantize();
      assert.deepEqual(x.range(), [0, 1]);
      assert.equal(x(.75), 1);
    },
    "maps a number to a discrete value in the range": function(quantize) {
      var x = quantize().range([0, 1, 2]);
      assert.equal(x(0), 0);
      assert.equal(x(.2), 0);
      assert.equal(x(.4), 1);
      assert.equal(x(.6), 1);
      assert.equal(x(.8), 2);
      assert.equal(x(1), 2);
    },
    "coerces domain to numbers": function(quantize) {
      var x = quantize().domain(["0", "100"]);
      assert.strictEqual(x.domain()[0], 0);
      assert.strictEqual(x.domain()[1], 100);
    },
    "only considers the extent of the domain": function(quantize) {
      var x = quantize().domain([-1, 0, 100]);
      assert.deepEqual(x.domain(), [-1, 100]);
    },
    "clamps input values to the domain": function(quantize) {
      var a = {}, b = {}, c = {}, x = quantize().range([a, b, c]);
      assert.equal(x(-.5), a);
      assert.equal(x(1.5), c);
    },
    "range cardinality determines the degree of quantization": function(quantize) {
      var x = quantize();
      assert.inDelta(x.range(_.range(0, 1.001, .001))(1/3), .333, 1e-6);
      assert.inDelta(x.range(_.range(0, 1.01, .01))(1/3), .33, 1e-6);
      assert.inDelta(x.range(_.range(0, 1.1, .1))(1/3), .3, 1e-6);
      assert.inDelta(x.range(_.range(0, 1.2, .2))(1/3), .4, 1e-6);
      assert.inDelta(x.range(_.range(0, 1.25, .25))(1/3), .25, 1e-6);
      assert.inDelta(x.range(_.range(0, 1.5, .5))(1/3), .5, 1e-6);
      assert.inDelta(x.range(_.range(1))(1/3), 0, 1e-6);
    },
    "range values are arbitrary": function(quantize) {
      var a = {}, b = {}, c = {}, x = quantize().range([a, b, c]);
      assert.equal(x(0), a);
      assert.equal(x(.2), a);
      assert.equal(x(.4), b);
      assert.equal(x(.6), b);
      assert.equal(x(.8), c);
      assert.equal(x(1), c);
    },
    "invertExtent": {
      "maps a value in the range to a domain extent": function(quantize) {
        var x = quantize().range([0, 1, 2, 3]);
        assert.deepEqual(x.invertExtent(0), [0, .25]);
        assert.deepEqual(x.invertExtent(1), [.25, .5]);
        assert.deepEqual(x.invertExtent(2), [.5, .75]);
        assert.deepEqual(x.invertExtent(3), [.75, 1]);
      },
      "allows arbitrary range values": function(quantize) {
        var a = {}, b = {}, x = quantize().range([a, b]);
        assert.deepEqual(x.invertExtent(a), [0, .5]);
        assert.deepEqual(x.invertExtent(b), [.5, 1]);
      },
      "returns [NaN, NaN] when the given value is not in the range": function(quantize) {
        var x = quantize();
        assert.ok(x.invertExtent(-1).every(isNaN));
        assert.ok(x.invertExtent(.5).every(isNaN));
        assert.ok(x.invertExtent(2).every(isNaN));
        assert.ok(x.invertExtent('a').every(isNaN));
      },
      "returns the first match if duplicate values exist in the range": function(quantize) {
        var x = quantize().range([0, 1, 2, 0]);
        assert.deepEqual(x.invertExtent(0), [0, .25]);
        assert.deepEqual(x.invertExtent(1), [.25, .5]);
      }
    }
  }
});

suite.export(module);

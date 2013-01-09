require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.transform");

suite.addBatch({
  "transform": {
    topic: function() {
      return d3.svg.transform;
    },

    "basic transform properties": function(transform) {
      var a = transform().translate([0, 1]).rotate(45).scale(5);
      var b = transform().translateX(0).translateY(1).rotate(45).scale(5);
      assert.equal(a, "translate(0,1) rotate(45) scale(5)");
      assert.equal(b.toString(), a.toString());
    },

    "single argument to translateX, translateY work as expected": function(transform) {
      var a = transform().translate([2, 1]).rotate(45).scale(5);
      var b = transform().translateX(2).translateY(1).rotate(45).scale(5);
      var c = transform().rotate(45).scale(5).translateY(1).translateX(2);
      assert.equal(a, "translate(2,1) rotate(45) scale(5)");
      assert.equal(a.toString(), b.toString());
      assert.equal(c.toString(), b.toString());
    },

    "empty transform produces an empty string": function(transform) {
      var a = transform();
      assert.equal(a, "");
    },
    
    "one of each of scale, rotate, skew work as expected": function(transform) {
      var t = transform().rotate(45);
      assert.equal(t, "rotate(45)");
      t = transform().scale(5);
      assert.equal(t, "scale(5)");
      t = transform().skewX(1);
      assert.equal(t, "skewX(1)");
    }
  }
});

suite.export(module);

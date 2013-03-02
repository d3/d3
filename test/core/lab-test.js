require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.lab");

suite.addBatch({
  "lab": {
    topic: function() {
      return d3.lab;
    },
    "converts string channel values to numbers": function(lab) {
      assertLabEqual(lab("50", "-4", "-32"), 50, -4, -32);
    },
    "converts null channel values to zero": function(lab) {
      assertLabEqual(lab(null, null, null), 0, 0, 0);
    },
    "exposes l, a and b properties": function(lab) {
      var color = lab(50, -4, -32);
      assert.equal(color.l, 50);
      assert.equal(color.a, -4);
      assert.equal(color.b, -32);
    },
    "changing l, a or b affects the string format": function(lab) {
      var color = lab(50, -4, -32);
      assert.equal(color + "", "#3f7cad");
      color.l++;
      assert.equal(color + "", "#427eb0");
      color.a++;
      assert.equal(color + "", "#467eb0");
      color.b++;
      assert.equal(color + "", "#487eae");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(lab) {
      assertLabEqual(lab("#abc"), 75.10497524893663, -2.292114632248876, -10.528266458853786);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(lab) {
      assertLabEqual(lab("#abcdef"), 81.04386565274363, -3.6627002800885267, -20.442705201854984);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(lab) {
      assertLabEqual(lab("hsl(210, 64.7058%, 13.33333%)"), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
    },
    "parses color names (e.g., \"moccasin\")": function(lab) {
      assertLabEqual(lab("moccasin"), 91.72317744746022, 2.4393469358685027, 26.359832514614844);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(lab) {
      assertLabEqual(lab("rgb(102, 102, 0)"), 41.73251953866431, -10.998411255098816, 48.21006600604577);
    },
    "can convert from RGB": function(lab) {
      assertLabEqual(lab(d3.rgb(12, 34, 56)), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
    },
    "can convert from HSL": function(lab) {
      assertLabEqual(lab(d3.lab(20, .8, .3)), 20, 0.8, 0.3);
    },
    "can convert to RGB": function(lab) {
      assert.rgbEqual(lab("steelblue").rgb(), 70, 130, 180);
    },
    "can derive a brighter color": function(lab) {
      assertLabEqual(lab("steelblue").brighter(), 70.46551718768575, -4.0774710123572255, -32.19186122981343);
      assertLabEqual(lab("steelblue").brighter(.5), 61.46551718768575, -4.0774710123572255, -32.19186122981343);
    },
    "can derive a darker color": function(lab) {
      assertLabEqual(lab("lightsteelblue").darker(), 60.45157936968134, -1.2815839134120433, -15.210996213841522);
      assertLabEqual(lab("lightsteelblue").darker(.5), 69.45157936968134, -1.2815839134120433, -15.210996213841522);
    },
    "string coercion returns RGB format": function(lab) {
      assert.strictEqual(lab("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(lab(d3.lab(60, -4, -32)) + "", "#5d95c8");
    },
    "roundtrip to HSL is idempotent": function(lab) {
      assert.hslEqual(d3.hsl(lab("steelblue")), d3.hsl("steelblue"));
    },
    "roundtrip to RGB is idempotent": function(lab) {
      assert.hslEqual(d3.rgb(lab("steelblue")), d3.rgb("steelblue"));
    },
    "roundtrip to HCL is idempotent": function(lab) {
      assert.hslEqual(d3.hcl(lab("steelblue")), d3.hcl("steelblue"));
    }
  }
});

suite.export(module);

function assertLabEqual(actual, l, a, b, message) {
  if (Math.abs(actual.l - l) > 1e-6 || Math.abs(actual.a - a) > 1e-6 || Math.abs(actual.b - b) > 1e-6) {
    assert.fail("lab(" + actual.l + ", " + actual.a + ", " + actual.b + ")", "lab(" + l + ", " + a + ", " + b + ")", message || "expected {expected}, got {actual}", null, assertLabEqual);
  }
}

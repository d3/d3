var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.lab");

suite.addBatch({
  "lab": {
    topic: load("color/lab", "color/hcl", "color/rgb").expression("d3"),
    "converts string channel values to numbers": function(d3) {
      assert.labEqual(d3.lab("50", "-4", "-32"), 50, -4, -32);
    },
    "converts null channel values to zero": function(d3) {
      assert.labEqual(d3.lab(null, null, null), 0, 0, 0);
    },
    "exposes l, a and b properties": function(d3) {
      var color = d3.lab(50, -4, -32);
      assert.equal(color.l, 50);
      assert.equal(color.a, -4);
      assert.equal(color.b, -32);
    },
    "changing l, a or b affects the string format": function(d3) {
      var color = d3.lab(50, -4, -32);
      assert.equal(color + "", "#3f7cad");
      color.l++;
      assert.equal(color + "", "#427eb0");
      color.a++;
      assert.equal(color + "", "#467eb0");
      color.b++;
      assert.equal(color + "", "#487eae");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(d3) {
      assert.labEqual(d3.lab("#abc"), 75.10497524893663, -2.292114632248876, -10.528266458853786);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(d3) {
      assert.labEqual(d3.lab("#abcdef"), 81.04386565274363, -3.6627002800885267, -20.442705201854984);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(d3) {
      assert.labEqual(d3.lab("hsl(210, 64.7058%, 13.33333%)"), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
    },
    "parses color names (e.g., \"moccasin\")": function(d3) {
      assert.labEqual(d3.lab("moccasin"), 91.72317744746022, 2.4393469358685027, 26.359832514614844);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(d3) {
      assert.labEqual(d3.lab("rgb(102, 102, 0)"), 41.73251953866431, -10.998411255098816, 48.21006600604577);
    },
    "can convert from RGB": function(d3) {
      assert.labEqual(d3.lab(d3.rgb(12, 34, 56)), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
    },
    "can convert from HSL": function(d3) {
      assert.labEqual(d3.lab(d3.lab(20, .8, .3)), 20, 0.8, 0.3);
    },
    "can convert to RGB": function(d3) {
      assert.rgbEqual(d3.lab("steelblue").rgb(), 70, 130, 180);
    },
    "can convert from HCL": function(d3) {
      assert.labEqual(d3.lab(d3.hcl(-79.96, 40.25, 59.93)), 59.93, 7.02, -39.63);
    },
    "can derive a brighter color": function(d3) {
      assert.labEqual(d3.lab("steelblue").brighter(), 70.46551718768575, -4.0774710123572255, -32.19186122981343);
      assert.labEqual(d3.lab("steelblue").brighter(.5), 61.46551718768575, -4.0774710123572255, -32.19186122981343);
    },
    "can derive a darker color": function(d3) {
      assert.labEqual(d3.lab("lightsteelblue").darker(), 60.45157936968134, -1.2815839134120433, -15.210996213841522);
      assert.labEqual(d3.lab("lightsteelblue").darker(.5), 69.45157936968134, -1.2815839134120433, -15.210996213841522);
    },
    "string coercion returns RGB format": function(d3) {
      assert.strictEqual(d3.lab("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(d3.lab(d3.lab(60, -4, -32)) + "", "#5d95c8");
    },
    "roundtrip to HSL is idempotent": function(d3) {
      assert.deepEqual(d3.hsl(d3.lab("steelblue")), d3.hsl("steelblue"));
    },
    "roundtrip to RGB is idempotent": function(d3) {
      assert.deepEqual(d3.rgb(d3.lab("steelblue")), d3.rgb("steelblue"));
    },
    "roundtrip to HCL is idempotent": function(d3) {
      assert.deepEqual(d3.hcl(d3.lab("steelblue")), d3.hcl("steelblue"));
    }
  }
});

suite.export(module);

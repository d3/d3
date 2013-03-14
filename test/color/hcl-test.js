var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.hcl");

suite.addBatch({
  "hcl": {
    topic: load("color/hcl"),
    "converts string channel values to numbers": function(d3) {
      assertHclEqual(d3.hcl("50", "-4", "32"), 50, -4, 32);
    },
    "converts null channel values to zero": function(d3) {
      assertHclEqual(d3.hcl(null, null, null), 0, 0, 0);
    },
    "exposes h, c and l properties": function(d3) {
      var color = d3.hcl(50, -4, 32);
      assert.equal(color.h, 50);
      assert.equal(color.c, -4);
      assert.equal(color.l, 32);
    },
    "changing h, c or l affects the string format": function(d3) {
      var color = d3.hcl(50, -4, 32);
      assert.equal(color + "", "#444d50");
      color.h++;
      assert.equal(color + "", "#444d50");
      color.c++;
      assert.equal(color + "", "#464c4f");
      color.l++;
      assert.equal(color + "", "#494f51");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(d3) {
      assertHclEqual(d3.hcl("#abc"), -102.28223831811077, 10.774886733325554, 75.10497524893663);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(d3) {
      assertHclEqual(d3.hcl("#abcdef"), -100.15785184209284, 20.768234621934273, 81.04386565274363);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(d3) {
      assertHclEqual(d3.hcl("hsl(210, 64.7058%, 13.33333%)"), -89.58282792342067, 16.833655998102003, 12.65624852526134);
    },
    "parses color names (e.g., \"moccasin\")": function(d3) {
      assertHclEqual(d3.hcl("moccasin"), 84.71288921124494, 26.472460854104156, 91.72317744746022);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(d3) {
      assertHclEqual(d3.hcl("rgb(102, 102, 0)"), 102.85124420310271, 49.44871600399321, 41.73251953866431);
    },
    "can convert from RGB": function(d3) {
      assertHclEqual(d3.hcl(d3.rgb(12, 34, 56)), -89.58282792342067, 16.833655998102003, 12.65624852526134);
    },
    "can convert from HSL": function(d3) {
      assertHclEqual(d3.hcl(d3.hcl(20, .8, .3)), 20, 0.8, 0.3);
    },
    "can convert to RGB": function(d3) {
      assert.rgbEqual(d3.hcl("steelblue").rgb(), 70, 130, 180);
    },
    "can derive a brighter color": function(d3) {
      assertHclEqual(d3.hcl("steelblue").brighter(), -97.21873224090723, 32.44906314974561, 70.46551718768575);
      assertHclEqual(d3.hcl("steelblue").brighter(.5), -97.21873224090723, 32.44906314974561, 61.46551718768575);
    },
    "can derive a darker color": function(d3) {
      assertHclEqual(d3.hcl("lightsteelblue").darker(), -94.8160116310511, 15.26488988314746, 60.45157936968134);
      assertHclEqual(d3.hcl("lightsteelblue").darker(.5), -94.8160116310511, 15.26488988314746, 69.45157936968134);
    },
    "string coercion returns RGB format": function(d3) {
      assert.strictEqual(d3.hcl("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(d3.hcl(d3.hcl(60, -4, 32)) + "", "#454c51");
    },
    "roundtrip to HSL is idempotent": function(d3) {
      assert.hslEqual(d3.hsl(d3.hcl("steelblue")), d3.hsl("steelblue"));
    },
    "roundtrip to RGB is idempotent": function(d3) {
      assert.hslEqual(d3.rgb(d3.hcl("steelblue")), d3.rgb("steelblue"));
    },
    "roundtrip to Lab is idempotent": function(d3) {
      assert.hslEqual(d3.lab(d3.hcl("steelblue")), d3.lab("steelblue"));
    }
  }
});

suite.export(module);

function assertHclEqual(actual, h, c, l, message) {
  if (Math.abs(actual.h - h) > 1e-6 || Math.abs(actual.c - c) > 1e-6 || Math.abs(actual.l - l) > 1e-6) {
    assert.fail("hcl(" + actual.h + ", " + actual.c + ", " + actual.l + ")", "hcl(" + h + ", " + c + ", " + l + ")", message || "expected {expected}, got {actual}", null, assertHclEqual);
  }
}

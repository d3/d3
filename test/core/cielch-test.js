require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.cielch");

suite.addBatch({
  "cielch": {
    topic: function() {
      return d3.cielch;
    },
    "exposes l, c, and h properties": function(lch) {
      var color = lch("#048F07");
      assert.equal(color.l, 51.480406534539185);
      assert.equal(color.c, 76.67961238453204);
      assert.equal(color.h, 136.39481492184387);
    },
    "can convert from Cielch": function(lch) {
      assert.lchEqual(lch(d3.cielch(40, 50, 60)), 40, 50, 60);
    },
    "can convert from RGB": function(lch) {
      assert.lchEqual(d3.rgb("#048F07").cielch(), 51.480406534539185, 76.67961238453204, 136.39481492184387);
    },
    "can convert from HSL": function(lch) {
      assert.lchEqual(d3.hsl("#048F07").cielch(), 51.480406534539185, 76.67961238453204, 136.39481492184387);
    },
    "can convert from XYZ": function(lch) {
      assert.lchEqual(d3.xyz("#048F07").cielch(), 51.480406534539185, 76.67961238453204, 136.39481492184387);
    },
    "can convert from CIELab": function(lch) {
      assert.lchEqual(d3.cielab("#048F07").cielch(), 51.480406534539185, 76.67961238453204, 136.39481492184387);
    },
    "can initialize with RGB": function(lch) {
      assert.lchEqual(lch(d3.rgb("#048F07")), 51.480406534539185, 76.67961238453204, 136.39481492184387);
    },
    "can convert to RGB": function(lch) {
      assert.rgbEqual(lch(d3.rgb(30, 40, 50)).rgb(), 30, 40, 50);
    },
    "can convert to HSL": function(lch) {
      assert.hslEqual(lch("red").hsl(), 0, 1, .5);
    },
    "can convert to XYZ": function(lch) {
      assert.xyzEqual(lch("#abc").xyz(), 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can convert to CIELab": function(lab) {
      assert.labEqual(lch(d3.cielab("#048F07")), 51.480406534539185, -55.524431964471155, 52.88478430006963);
    },
    "can derive a brighter color": function(lch) {
      var brown = lch("brown");
      assert.equal(brown.brighter().l, brown.l + 18);
      assert.equal(brown.brighter(2).l, brown.l + 36);
    },
    "can derive a darker color": function(lch) {
      var brown = lch("brown");
      assert.equal(brown.darker().l, brown.l - 18);
      assert.equal(brown.darker(2).l, brown.l - 36);
    },
    "string coercion returns hexadecimal format": function(lch) {
      assert.strictEqual(lch("#abcdef") + "", "#abcdef");
      assert.strictEqual(lch("moccasin") + "", "#ffe4b5");
      assert.strictEqual(lch("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(lch("rgb(12, 34, 56)") + "", "#0c2238");
      assert.strictEqual(lch(d3.rgb(12, 34, 56)) + "", "#0c2238");
      assert.strictEqual(lch(d3.hsl(60, 1, .2)) + "", "#666600");
    }
  }
});

suite.export(module);

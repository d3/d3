require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.lab");

suite.addBatch({
  "lab": {
    topic: function() {
      return d3.lab;
    },
    "exposes l, a, and b properties": function(lab) {
      var color = lab("#048F07");
      assert.equal(color.l, 51.480406534539185);
      assert.equal(color.a, -55.524431964471155);
      assert.equal(color.b, 52.88478430006963);
    },
    "can convert from CieLAB": function(lab) {
      assert.labEqual(lab(d3.lab(40, 50, 60)), 40, 50, 60);
    },
    "can convert from RGB": function(lab) {
      assert.labEqual(d3.rgb("#048F07").lab(), 51.480406534539185, -55.524431964471155, 52.88478430006963);
    },
    "can initialize with RGB": function(lab) {
      assert.labEqual(lab(d3.rgb("#048F07")), 51.480406534539185, -55.524431964471155, 52.88478430006963);
    },
    "can convert to RGB": function(lab) {
      assert.rgbEqual(lab(d3.rgb(30, 40, 50)).rgb(), 30, 40, 50);
    },
    "can derive a brighter color": function(lab) {
      var brown = lab("brown");
      assert.equal(brown.brighter().l, brown.l + 18);
      assert.equal(brown.brighter(2).l, brown.l + 36);
    },
    "can derive a darker color": function(lab) {
      var brown = lab("brown");
      assert.equal(brown.darker().l, brown.l - 18);
      assert.equal(brown.darker(2).l, brown.l - 36);
    },
    "can get chroma value": function(lab) {
      assert.equal(lab("#048F07").chroma(), 76.67961238453204);
    },
    "can get hue value": function(lab) {
      assert.equal(lab("#048F07").hue(), 136.39481492184387);
    },
    "can set chroma value": function(lab) {
      assert.equal(lab("red").chroma(14).chroma(), 14);
    },
    "can set hue value": function(lab) {
      assert.equal(lab("red").hue(14).hue(), 14);
    },
    "string coercion returns hexadecimal format": function(lab) {
      assert.strictEqual(lab("#abcdef") + "", "#abcdef");
      assert.strictEqual(lab("moccasin") + "", "#ffe4b5");
      assert.strictEqual(lab("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(lab("rgb(12, 34, 56)") + "", "#0c2238");
      assert.strictEqual(lab(d3.rgb(12, 34, 56)) + "", "#0c2238");
      assert.strictEqual(lab(d3.hsl(60, 1, .2)) + "", "#666600");
    }
  }
});

suite.export(module);

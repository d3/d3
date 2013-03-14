var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.gnomonic");

suite.addBatch({
  "gnomonic": {
    topic: load("geo/gnomonic").expression("d3.geo.gnomonic"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 422.38246174, -992.89637169]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 323.76600022, -691.84169545]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 488.22815397,  -27.28558622]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 372.51942626,  573.42957804]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 578.85832181, -718.85305295]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000, 1964.50784541]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,-1464.50784541]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.38411692,   -8.28597600]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -1.04156000,   -6.27894464]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.05485436,   -1.84857057]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.71653716,    2.15619719]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.65905548,   -6.45902035]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,   11.43005230]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,  -11.43005230]]
    })
  }
});

suite.export(module);

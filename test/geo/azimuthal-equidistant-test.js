var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.azimuthalEquidistant");

suite.addBatch({
  "azimuthalEquidistant": {
    topic: load("geo/azimuthal-equidistant").expression("d3.geo.azimuthalEquidistant"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 469.92237700,   32.61061747]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 445.26741926,   40.61796552]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 484.78328535,   88.80514528]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 425.30773539,  414.57947189]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 501.59066113,   38.40245747]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  472.52947963]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   27.47052037]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.06718415,   -1.44926255]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.23155054,   -1.39588023]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.03188857,   -1.07463236]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.36461510,    1.09719648]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.14393774,   -1.41065028]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    1.48352986]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.48352986]]
    })
  }
});

suite.export(module);

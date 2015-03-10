var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.equirectangular");

suite.addBatch({
  "equirectangular": {
    topic: load("geo/equirectangular").expression("d3.geo.equirectangular"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 424.98907000,   33.66602637]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 359.13715001,   48.28497214]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 488.21991600,   88.85615375]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 386.73919199,  407.84716262]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 567.40721901,   41.88153382]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  472.52947963]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   27.47052037]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.36673953,   -1.44222649]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.80575233,   -1.34476685]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.05479944,   -1.07429231]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.62173872,    1.05231442]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.58271479,   -1.38745644]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    1.48352986]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.48352986]]
    })
  }
});

suite.export(module);

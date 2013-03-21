var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.stereographic");

suite.addBatch({
  "stereographic": {
    topic: load("geo/stereographic").expression("d3.geo.stereographic"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 473.84094732,  117.14003304]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 459.00877672,  123.45642208]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 482.65216217,  160.62316700]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 449.13660231,  342.87385937]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 493.06074697,  121.99919699]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  387.44967610]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,  112.55032390]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.04106035,   -0.88573312]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.13994149,   -0.84362385]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.01768108,   -0.59584555]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.20575598,    0.61915906]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.08707165,   -0.85333869]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    0.91633117]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -0.91633117]]
    })
  }
});

suite.export(module);

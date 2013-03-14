var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.conicEqualArea");

suite.addBatch({
  "conicEqualArea": {
    topic: load("geo/conic-equal-area").expression("d3.geo.conicEqualArea"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 459.42118984,   32.08581547]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 433.22520615,   32.16847746]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 484.01431255,   72.73240059]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 358.03569713,  345.61858148]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 513.32546288,   32.84960593]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  376.37688344]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   31.93472588]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.13719207,   -1.45276123]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.31183196,   -1.45221015]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.02676208,   -1.18178400]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.81309535,    0.63745721]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.22216975,   -1.44766929]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    0.84251256]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.45376849]]
    })
  }
});

suite.export(module);

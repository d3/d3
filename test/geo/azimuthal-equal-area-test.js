var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.azimuthalEqualArea");

suite.addBatch({
  "azimuthalEqualArea": {
    topic: load("geo/azimuthal-equal-area").expression("d3.geo.azimuthalEqualArea"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 470.78325089,   51.18095336]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 448.09318291,   57.65281089]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 484.55622556,   96.45697185]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 428.30355841,  405.56446813]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 499.82677711,   55.68926131]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  452.67706228]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   47.32293772]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.06144499,   -1.32546031]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.21271211,   -1.28231459]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.03037484,   -1.02362019]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.34464294,    1.03709645]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.13217851,   -1.29540492]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    1.35118042]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.35118042]]
    })
  }
});

suite.export(module);

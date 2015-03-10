var vows = require("vows"),
    assert = require("../assert"),
    load = require("../load"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.orthographic");

suite.addBatch({
  "orthographic": {
    topic: load("geo/orthographic").expression("d3.geo.orthographic"),
    "default": projectionTestSuite(function(projection) { return projection(); }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 473.10377192,  101.23805835]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 455.75069916,  103.81541376]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 483.91363537,  118.11201123]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 436.70402041,  380.28587327]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 495.04895132,  102.51395975]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  399.42920471]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,  100.57079529]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite(function(projection) { return projection().translate([0, 0]).scale(1); }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.04597485,   -0.99174628]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.16166201,   -0.97456391]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.02609090,   -0.87925326]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.28863986,    0.86857249]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.10032634,   -0.98324027]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    0.99619470]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -0.99619470]]
    })
  }
});

suite.export(module);

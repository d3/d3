var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.transverseMercator");

suite.addBatch({
  "transverseMercator": {
    topic: load("geo/transverse-mercator").expression("d3.geo.transverseMercator"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 473.09890692,   32.39629813]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 455.53607488,   38.07095444]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 483.91452378,   88.76181349]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 435.43771875,  420.48139861]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 495.09974957,   37.42095689]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  472.52947963]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   27.47052037]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.04600729,   -1.45069135]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.16309283,   -1.41286030]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.02609683,   -1.07492124]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.29708188,    1.13654266]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.10066500,   -1.41719362]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    1.48352986]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.48352986]]
    })
  }
});

suite.export(module);

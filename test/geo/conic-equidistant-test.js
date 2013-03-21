var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.conicEquidistant");

suite.addBatch({
  "conicEquidistant": {
    topic: load("geo/conic-equidistant").expression("d3.geo.conicEquidistant"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 462.95768394,   32.17010277]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 437.79988730,   40.06576540]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 484.00316185,   88.80377979]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 341.92988745,  387.20169005]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 509.12411912,   37.80365327]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [ 480.00000000,  472.52947963]],
      "the North Pole":    [[   0.00000000,   85.00000000], [ 480.00000000,   27.47052037]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.11361544,   -1.45219932]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.28133408,   -1.39956156]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.02668775,   -1.07464147]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -0.92046742,    0.91467793]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.19416079,   -1.41464231]],
      "the South Pole":    [[   0.00000000,  -85.00000000], [   0.00000000,    1.48352986]],
      "the North Pole":    [[   0.00000000,   85.00000000], [   0.00000000,   -1.48352986]]
    })
  }
});

suite.export(module);

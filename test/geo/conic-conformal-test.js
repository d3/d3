var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.conicConformal");

suite.addBatch({
  "conicConformal": {
    topic: load("geo/conic-conformal").expression("d3.geo.conicConformal"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 467.09545781,   31.02694219]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 442.69098342,   47.64115003]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 483.99106549,  103.34182093]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 295.79559728,  507.67642324]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 504.49928992,   42.36530945]],
      "the South Pole":    [[   0.00000000,  -90.00000000], [ 480.00000000,      Infinity]],
      "the North Pole":    [[   0.00000000,   90.00000000], [ 480.00000000,  -34.99529321]]
    }),
    "parallels([0°, -60°])": projectionTestSuite({
      topic: function(projection) { return projection().parallels([0, -60]); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 248.39124508, -649.96173174]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 111.38073983, -281.46645354]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 496.92487516,  -51.64965196]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 434.44451342,  400.78745879]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 782.19072440, -419.22243596]],
      "the South Pole":    [[   0.00000000,  -90.00000000], [ 480.00000000,  534.99529404]],
      "the North Pole":    [[   0.00000000,   90.00000000], [ 480.00000000, -97309246408.21453857]] // ≈∞
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349120], [  -0.08603028,   -1.45982039]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [  -0.24872678,   -1.34905900]],
      "Svalbard":          [[   3.13977663,   61.55241523], [   0.02660710,   -0.97772119]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [  -1.22802935,    1.71784282]],
      "Tokyo":             [[  33.38709832,   79.49539834], [   0.16332860,   -1.38423127]],
      "the South Pole":    [[   0.00000000,  -90.00000000], [   0.00000000,      Infinity]],
      "the North Pole":    [[   0.00000000,   90.00000000], [   0.00000000,   -1.89996862]]
    })
  }
});

suite.export(module);

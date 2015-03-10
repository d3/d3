var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.mercator");

suite.addBatch({
  "mercator": {
    topic: load("geo/mercator").expression("d3.geo.mercator"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [ 480.00000000,  250.00000000]],
      "Honolulu, HI":      [[ -21.01262744,   82.63349103], [ 424.98907000, -161.45770791]],
      "San Francisco, CA": [[ -46.16620803,   77.04946507], [ 359.13715001,  -76.39503103]],
      "Svalbard":          [[   3.13977663,   61.55241523], [ 488.21991600,   44.12991498]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317484], [ 386.73919199,  449.08559401]],
      "Tokyo":             [[  33.38709832,   79.49539834], [ 567.40721901, -108.01311493]],
      "west antimeridian": [[-180.00000000,    0.00000000], [   8.76110196,  250.00000000]],
      "east antimeridian": [[ 180.00000000,    0.00000000], [ 951.23889804,  250.00000000]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Null Island":       [[   0.00000000,    0.00000000], [   0.00000000,    0.00000000]],
      "Honolulu, HI":      [[ -21.01262725,   82.63349099], [  -0.36673953,   -2.74305138]],
      "San Francisco, CA": [[ -46.16620841,   77.04946502], [  -0.80575234,   -2.17596687]],
      "Svalbard":          [[   3.13977663,   61.55241514], [   0.05479944,   -1.37246723]],
      "Tierra del Fuego":  [[ -35.62300462,  -60.29317474], [  -0.62173872,    1.32723729]],
      "Tokyo":             [[  33.38709813,   79.49539834], [   0.58271479,   -2.38675410]],
      "west antimeridian": [[-180.00000000,    0.00000000], [  -3.14159265,    0.00000000]],
      "east antimeridian": [[ 180.00000000,    0.00000000], [   3.14159265,    0.00000000]]
    })
  }
});

suite.export(module);

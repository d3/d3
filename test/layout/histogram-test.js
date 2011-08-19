require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.histogram");

suite.addBatch({
  "histogram": {
    topic: function() {
      return d3.layout.histogram;
    },
    "defaults to frequencies": function(histogram) {
      var h = histogram();
      assert.deepEqual(h([0,0,0,1,2,2]).map(elements), [[0, 0, 0], [], [1], [2, 2]]);
    },
    "each bin contains the matching source elements": function(histogram) {
      var h = histogram();
      assert.deepEqual(h([0,0,0,1,2,2]).map(elements), [[0, 0, 0], [], [1], [2, 2]]);
    },
    "each bin also has defined x, y and dx properties": function(histogram) {
      var h = histogram();
      assert.deepEqual(h([0,0,0,1,2,2]).map(metadata), [
        {x:   0, y: 3, dx: 0.5},
        {x: 0.5, y: 0, dx: 0.5},
        {x:   1, y: 1, dx: 0.5},
        {x: 1.5, y: 2, dx: 0.5}
      ]);
    },
    "can output frequencies": function(histogram) {
      var h = histogram().frequency(true);
      assert.deepEqual(h([0,0,0,1,2,2]).map(metadata), [
        {x:   0, y: 3, dx: 0.5},
        {x: 0.5, y: 0, dx: 0.5},
        {x:   1, y: 1, dx: 0.5},
        {x: 1.5, y: 2, dx: 0.5}
      ]);
    },
    "can output probabilities": function(histogram) {
      var h = histogram().frequency(false);
      assert.deepEqual(h([0,0,0,1,2,2]).map(metadata), [
        {x:   0, y: 3/6, dx: 0.5},
        {x: 0.5, y:   0, dx: 0.5},
        {x:   1, y: 1/6, dx: 0.5},
        {x: 1.5, y: 2/6, dx: 0.5}
      ]);
    },
    "can specify number of bins": function(histogram) {
      var h = histogram().bins(2);
      assert.deepEqual(h([0,0,0,1,2,2]).map(elements), [
        [0, 0, 0],
        [1, 2, 2]
      ]);
      assert.deepEqual(h([0,0,0,1,2,2]).map(metadata), [
        {x: 0, y: 3, dx: 1},
        {x: 1, y: 3, dx: 1}
      ]);
    },
    "can specify bin thresholds": function(histogram) {
      var h = histogram().bins([0,1,2,3]);
      assert.deepEqual(h([0,0,0,1,2,2]).map(elements), [
        [0, 0, 0],
        [1],
        [2, 2]
      ]);
      assert.deepEqual(h([0,0,0,1,2,2]).map(metadata), [
        {x: 0, y: 3, dx: 1},
        {x: 1, y: 1, dx: 1},
        {x: 2, y: 2, dx: 1}
      ]);
    }
  }
});

function elements(bin) {
  var array = [], i = -1, n = bin.length;
  while (++i < n) array.push(bin[i]);
  return array;
}

function metadata(bin) {
  var metadata = {};
  if ("x" in bin) metadata.x = bin.x;
  if ("y" in bin) metadata.y = bin.y;
  if ("dx" in bin) metadata.dx = bin.dx;
  return metadata;
}

suite.export(module);

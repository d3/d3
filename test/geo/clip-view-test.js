var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.clipView");

suite.addBatch({
  "clipView": {
    topic: load("../test/geo/clip-view-mock").expression("d3.geo.clipView"),
    "100⨯100": {
      topic: function(clipView) {
        return clipView(0, 0, 100, 100);
      },
      "invisible segments are dropped": function(clip) {
        _.geo.stream({type: "LineString", coordinates: [
          [-100, 50],
          [-50, 50],
          [50, 50]
        ]}, clip(testContext));
        assert.deepEqual(testContext.buffer(), [
          {type: "lineStart"},
          {type: "point", x: 0, y: 50},
          {type: "point", x: 50, y: 50},
          {type: "lineEnd"}
        ]);
      }
    }
  }
});

suite.export(module);

var testBuffer = [];

var testContext = {
  point: function(x, y) { testBuffer.push({type: "point", x: Math.round(x), y: Math.round(y)}); },
  lineStart: function() { testBuffer.push({type: "lineStart"}); },
  lineEnd: function() { testBuffer.push({type: "lineEnd"}); },
  polygonStart: function() { testBuffer.push({type: "polygonStart"}); },
  polygonEnd: function() { testBuffer.push({type: "polygonEnd"}); },
  sphere: function() { testBuffer.push({type: "sphere"}); },
  buffer: function() { var result = testBuffer; testBuffer = []; return result; }
};

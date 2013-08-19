var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.clipExtent");

suite.addBatch({
  "clipExtent": {
    topic: load("geo/clip-extent"),

    "extent": {
      "defaults to [[0, 0], [960, 500]]": function(d3) {
        var clip = d3.geo.clipExtent();
        assert.deepEqual(clip.extent(), [[0, 0], [960, 500]]);
      },
      "coerces input values to numbers": function(d3) {
        var clip = d3.geo.clipExtent().extent([["1", "2"], ["3", "4"]]),
            extent = clip.extent();
        assert.strictEqual(extent[0][0], 1);
        assert.strictEqual(extent[0][1], 2);
        assert.strictEqual(extent[1][0], 3);
        assert.strictEqual(extent[1][1], 4);
      },
      "with no arguments, returns the current extent": function(d3) {
        var clip = d3.geo.clipExtent();
        assert.deepEqual(clip.extent(), [[0, 0], [960, 500]]);
        clip.extent([[1, 2], [3, 4]]);
        assert.deepEqual(clip.extent(), [[1, 2], [3, 4]]);
      },
      "with an argument, sets the current extent and returns this": function(d3) {
        var clip = d3.geo.clipExtent();
        assert.strictEqual(clip.extent([[1, 2], [3, 4]]), clip);
      }
    },

    "stream": {
      "returns a stream that clips to the current extent": function(d3) {
        var clip = d3.geo.clipExtent().extent([[100, 200], [300, 400]]),
            stream = clip.stream(testContext);
        stream.lineStart();
        stream.point(0, 0);
        stream.point(500, 500);
        stream.lineEnd();
        assert.deepEqual(testContext.buffer(), [
          {type: "lineStart"},
          {type: "point", x: 200, y: 200},
          {type: "point", x: 300, y: 300},
          {type: "lineEnd"}
        ]);
      },
      "can clip points": function(d3) {
        var clip = d3.geo.clipExtent(),
            stream = clip.stream(testContext);
        stream.point(-100, -100);
        stream.point(0, 0);
        stream.point(480, 250);
        stream.point(960, 500);
        stream.point(1060, 6000);
        assert.deepEqual(testContext.buffer(), [
          {type: "point", x: 0, y: 0},
          {type: "point", x: 480, y: 250},
          {type: "point", x: 960, y: 500}
        ]);
      },
      "can clip lines": function(d3) {
        var clip = d3.geo.clipExtent(),
            stream = clip.stream(testContext);
        stream.lineStart();
        stream.point(-100, -100);
        stream.point(1060, 600);
        stream.lineEnd();
        assert.deepEqual(testContext.buffer(), [
          {type: "lineStart"},
          {type: "point", x: 66, y: 0},
          {type: "point", x: 894, y: 500},
          {type: "lineEnd"}
        ]);
      },
      "can clip polygons": function(d3) {
        var clip = d3.geo.clipExtent(),
            stream = clip.stream(testContext);
        stream.polygonStart();
        stream.lineStart();
        stream.point(-100, -100);
        stream.point(1060, -100);
        stream.point(1060, 600);
        stream.point(-100, 600);
        stream.lineEnd();
        stream.polygonEnd();
        assert.deepEqual(testContext.buffer(), [
          {type: "polygonStart"},
          {type: "lineStart"},
          {type: "point", x: 0, y: 0},
          {type: "point", x: 960, y: 0},
          {type: "point", x: 960, y: 500},
          {type: "point", x: 0, y: 500},
          {type: "lineEnd"},
          {type: "polygonEnd"}
        ]);
      },
      "the returned stream is cacheable": function(d3) {
        var clip = d3.geo.clipExtent().extent([[100, 200], [300, 400]]),
            stream = clip.stream(testContext);
        assert.isTrue(stream.valid);
      },
      "the returned stream is invalidated when the extent changes": function(d3) {
        var clip = d3.geo.clipExtent().extent([[100, 200], [300, 400]]),
            stream = clip.stream(testContext);
        assert.isTrue(stream.valid);
        clip.extent([[0, 0], [960, 500]]);
        assert.isFalse(stream.valid);
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

require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.path");

suite.addBatch({
  "path": {
    topic: function() {
      return d3.geo.path()
          .context(testContext)
          .projection(d3.geo.equirectangular()
            .scale(900 / Math.PI)
            .precision(0));
    },

    "LineString": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[-63, 18], [-62, 18], [-62, 17]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165}
      ]);
    },

    "Polygon": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165},
        {type: "closePath"}
      ]);
    },

    "returns null when passed null or undefined": function(path) {
      assert.isNull(path(null));
      assert.isNull(path(undefined));
      assert.isNull(path());
    },
    "bogus type name": function(path) {
      assert.isNull(path({
        type: "Feature",
        geometry: {
          type: "__proto__",
          coordinates: [[[-63.03, 18.02], [-63.14, 18.06], [-63.01, 18.07], [-63.03, 18.02]]]
        },
      }));
    },

    "projection": {
      "returns the current projection when called with no arguments": function() {
        var path = d3.geo.path(), projection = d3.geo.albers();
        path.projection(projection);
        assert.strictEqual(path.projection(), projection);
      }
    },

    "pointRadius": {
      "returns the current point radius when called with no arguments": function() {
        var path = d3.geo.path(), radius = function() { return 5; };
        assert.strictEqual(path.pointRadius(), 4.5);
        assert.strictEqual(path.pointRadius(radius).pointRadius(), radius);
      }
    }
  }
});

var testBuffer = [];

var testContext = {
  point: function(x, y) { testBuffer.push({type: "point", x: Math.round(x), y: Math.round(y)}); },
  moveTo: function(x, y) { testBuffer.push({type: "moveTo", x: Math.round(x), y: Math.round(y)}); },
  lineTo: function(x, y) { testBuffer.push({type: "lineTo", x: Math.round(x), y: Math.round(y)}); },
  closePath: function() { testBuffer.push({type: "closePath"}); },
  buffer: function() { var result = testBuffer; testBuffer = []; return result; }
};

suite.export(module);

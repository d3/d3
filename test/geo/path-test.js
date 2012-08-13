require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.path");

suite.addBatch({
  "path": {
    topic: d3.geo.path,
    "Polygon": function(path) {
      assert.equal(path({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-63.03, 18.02], [-63.14, 18.06], [-63.01, 18.07], [-63.03, 18.02]]]
        },
      }), "M984.5652086349427,468.99159422596244L981.8396467935554,467.9114977057422L985.0785139575695,467.688661596079Z");
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
    "centroid": {
      topic: function(path) {
        return path.centroid;
      },
      "Point": function(centroid) {
        assert.inDelta(centroid({type: "Point", coordinates: [-122.41964, 37.77712]}), [150.064535, 211.308172], 1e-6);
        assert.inDelta(centroid({type: "Point", coordinates: [ -74.00712, 40.71455]}), [791.367648, 162.665364], 1e-6);
      },
      "MultiPoint": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "MultiPoint", coordinates: []}));
        },
        "single point": function(centroid) {
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[-122.41964, 37.77712]]}), [150.064535, 211.308172], 1e-6);
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[ -74.00712, 40.71455]]}), [791.367648, 162.665364], 1e-6);
        },
        "multiple points": function(centroid) {
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
        }
      },
      "LineString": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "LineString", coordinates: []}));
        },
        "single point": function(centroid) {
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[-122.41964, 37.77712]]}), [150.064535, 211.308172], 1e-6);
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[ -74.00712, 40.71455]]}), [791.367648, 162.665364], 1e-6);
        },
        "two points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
        },
        "three points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455], [-71.05670, 42.358630]]}),
              [493.975964, 183.981004], 1e-6);
        }
      }
    }
  }
});

suite.export(module);

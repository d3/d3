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
        "two points": function(centroid) {
          assert.inDelta(centroid({type: "MultiPoint", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
        }
      },
      "LineString": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "LineString", coordinates: []}));
        },
        "two points; one unique": function(centroid) {
          assert.isNull(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-122.41964, 37.77712]]}));
          assert.isNull(centroid({type: "LineString", coordinates: [[ -74.00712, 40.71455], [ -74.00712, 40.71455]]}));
        },
        "two points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
        },
        "three points; two unique": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455], [-74.00712, 40.71455]]}),
              [470.716091, 186.986768], 1e-6);
        },
        "three points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455], [-71.05670, 42.358630]]}),
              [493.975964, 183.981004], 1e-6);
        }
      },
      "Polygon": {
        "single ring with three vertices": function(centroid) {
          assert.inDelta(centroid({type: "Polygon", coordinates: [[[-122.41964, 37.77712], [-74.00712, 40.71455], [-71.05670, 42.358630], [-122.41964, 37.77712]]]}),
              [587.342810, 166.210688], 1e-6);
        }
      },
      "MultiPolygon": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "MultiPolygon", coordinates: []}));
        },
        "single polygon with three vertices": function(centroid) {
          assert.inDelta(centroid({type: "MultiPolygon", coordinates: [[[[-122.41964, 37.77712], [-74.00712, 40.71455], [-71.05670, 42.358630], [-122.41964, 37.77712]]]]}),
              [587.342810, 166.210688], 1e-6);
        }
      },
      "GeometryCollection": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "GeometryCollection", geometries: []}));
        },
        "collection containing an empty geometry": function(centroid) {
          assert.inDelta(centroid({type: "GeometryCollection", geometries: [
            {type: "MultiPoint", coordinates: []},
            {type: "Point", coordinates: [-122.41964, 37.77712]}
          ]}), [150.064535, 211.308172], 1e-6);
        },
        "repeated geometries": function(centroid) {
          var lineString = {type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]};
          assert.inDelta(centroid({type: "GeometryCollection", geometries: [lineString]}), [470.716091, 186.986768], 1e-6);
          assert.inDelta(centroid({type: "GeometryCollection", geometries: [lineString, lineString]}), [470.716091, 186.986768], 1e-6);
          assert.inDelta(centroid({type: "GeometryCollection", geometries: [lineString, lineString, lineString]}), [470.716091, 186.986768], 1e-6);
        }
      },
      "FeatureCollection": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "FeatureCollection", features: []}));
        },
        "collection containing a feature with an empty geometry": function(centroid) {
          assert.inDelta(centroid({type: "FeatureCollection", features: [
            feature({type: "MultiPoint", coordinates: []}),
            feature({type: "Point", coordinates: [-122.41964, 37.77712]})
          ]}), [150.064535, 211.308172], 1e-6);
        },
        "repeated geometries": function(centroid) {
          var lineString = {type: "LineString", coordinates: [[-122.41964, 37.77712], [-74.00712, 40.71455]]};
          assert.inDelta(centroid({type: "FeatureCollection", features: [lineString].map(feature)}), [470.716091, 186.986768], 1e-6);
          assert.inDelta(centroid({type: "FeatureCollection", features: [lineString, lineString].map(feature)}), [470.716091, 186.986768], 1e-6);
          assert.inDelta(centroid({type: "FeatureCollection", features: [lineString, lineString, lineString].map(feature)}), [470.716091, 186.986768], 1e-6);
        }
      }
    }
  }
});

function feature(o) {
  return {type: "Feature", geometry: o};
}

suite.export(module);

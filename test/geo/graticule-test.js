require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.graticule");

var ε = 1e-6;

suite.addBatch({
  "graticule": {

    "extent": {
      "sets minorExtent and majorExtent": function() {
        var graticule = d3.geo.graticule().extent([[-90, -45], [90, 45]]);
        assert.deepEqual(graticule.minorExtent(), [[-90, -45], [90, 45]]);
        assert.deepEqual(graticule.majorExtent(), [[-90, -45], [90, 45]]);
      },
      "gets minorExtent": function() {
        var graticule = d3.geo.graticule().minorExtent([[-90, -45], [90, 45]]);
        assert.deepEqual(graticule.extent(), [[-90, -45], [90, 45]]);
      }
    },

    "majorExtent": {
      "default longitude ranges from 180°W (inclusive) to 180°E (exclusive)": function() {
        var extent = d3.geo.graticule().majorExtent();
        assert.equal(extent[0][0], -180);
        assert.equal(extent[1][0], +180);
      },
      "default latitude ranges from 90°S (exclusive) to 90°N (exclusive)": function() {
        var extent = d3.geo.graticule().majorExtent();
        assert.equal(extent[0][1], -90 + ε);
        assert.equal(extent[1][1], +90 - ε);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().majorExtent([["-90", "-45"], ["+90", "+45"]]),
            extent = graticule.majorExtent();
        assert.strictEqual(extent[0][0], -90);
        assert.strictEqual(extent[0][1], -45);
        assert.strictEqual(extent[1][0], +90);
        assert.strictEqual(extent[1][1], +45);
      }
    },

    "minorExtent": {
      "default longitude ranges from 180°W (inclusive) to 180°E (exclusive)": function() {
        var extent = d3.geo.graticule().minorExtent();
        assert.equal(extent[0][0], -180);
        assert.equal(extent[1][0], +180);
      },
      "default latitude ranges from 80°S (inclusive) to 80°N (inclusive)": function() {
        var extent = d3.geo.graticule().minorExtent();
        assert.equal(extent[0][1], -80 - ε);
        assert.equal(extent[1][1], +80 + ε);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().minorExtent([["-90", "-45"], ["+90", "+45"]]),
            extent = graticule.minorExtent();
        assert.strictEqual(extent[0][0], -90);
        assert.strictEqual(extent[0][1], -45);
        assert.strictEqual(extent[1][0], +90);
        assert.strictEqual(extent[1][1], +45);
      }
    },

    "step": {
      "sets minorStep and majorStep": function() {
        var graticule = d3.geo.graticule().step([22.5, 22.5]);
        assert.deepEqual(graticule.minorStep(), [22.5, 22.5]);
        assert.deepEqual(graticule.majorStep(), [22.5, 22.5]);
      },
      "gets minorStep": function() {
        var graticule = d3.geo.graticule().minorStep([22.5, 22.5]);
        assert.deepEqual(graticule.step(), [22.5, 22.5]);
      }
    },

    "minorStep": {
      "defaults to 10°, 10°": function() {
        assert.deepEqual(d3.geo.graticule().minorStep(), [10, 10]);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().minorStep(["45", "11.25"]),
            step = graticule.minorStep();
        assert.strictEqual(step[0], 45);
        assert.strictEqual(step[1], 11.25);
      }
    },

    "majorStep": {
      "defaults to 90°, 360°": function() {
        assert.deepEqual(d3.geo.graticule().majorStep(), [90, 360]);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().majorStep(["45", "11.25"]),
            step = graticule.majorStep();
        assert.strictEqual(step[0], 45);
        assert.strictEqual(step[1], 11.25);
      }
    },

    "lines": {
      "default longitude ranges from 180°W (inclusive) to 180°E (exclusive)": function() {
        var lines = d3.geo.graticule().lines()
            .filter(function(line) { return line.coordinates[0][0] === line.coordinates[1][0]; })
            .sort(function(a, b) { return a.coordinates[0][0] - b.coordinates[0][0]; });
        assert.equal(lines[0].coordinates[0][0], -180);
        assert.equal(lines[lines.length - 1].coordinates[0][0], +170);
      },
      "default latitude ranges from 90°S (exclusive) to 90°N (exclusive)": function() {
        var lines = d3.geo.graticule().lines()
            .filter(function(line) { return line.coordinates[0][1] === line.coordinates[1][1]; })
            .sort(function(a, b) { return a.coordinates[0][1] - b.coordinates[0][1]; });
        assert.equal(lines[0].coordinates[0][1], -80);
        assert.equal(lines[lines.length - 1].coordinates[0][1], +80);
      },
      "default minor longitude lines extend from 80°S to 80°N": function() {
        var lines = d3.geo.graticule().lines()
            .filter(function(line) { return line.coordinates[0][0] === line.coordinates[1][0]; })
            .filter(function(line) { return Math.abs(line.coordinates[0][0] % 90) > ε; });
        lines.forEach(function(line) {
          assert.deepEqual(d3.extent(line.coordinates, function(p) { return p[1]; }), [-80 - ε, +80 + ε]);
        });
      },
      "default major longitude lines extend from 90°S to 90°N": function() {
        var lines = d3.geo.graticule().lines()
            .filter(function(line) { return line.coordinates[0][0] === line.coordinates[1][0]; })
            .filter(function(line) { return Math.abs(line.coordinates[0][0] % 90) < ε; });
        lines.forEach(function(line) {
          assert.deepEqual(d3.extent(line.coordinates, function(p) { return p[1]; }), [-90 + ε, +90 - ε]);
        });
      },
      "default latitude lines extend from 180°W to 180°E": function() {
        var lines = d3.geo.graticule().lines()
            .filter(function(line) { return line.coordinates[0][1] === line.coordinates[1][1]; });
        lines.forEach(function(line) {
          assert.deepEqual(d3.extent(line.coordinates, function(p) { return p[0]; }), [-180, +180]);
        });
      },
      "returns an array of LineStrings": function() {
        assert.deepEqual(d3.geo.graticule()
            .extent([[-90, -45], [90, 45]])
            .step([45, 45])
            .precision(3)
            .lines(), [
          {type: "LineString", coordinates: [[-90,-45],[-90,45]]}, // meridian
          {type: "LineString", coordinates: [[-45,-45],[-45,45]]}, // meridian
          {type: "LineString", coordinates: [[0,-45],[0,45]]}, // meridian
          {type: "LineString", coordinates: [[45,-45],[45,45]]}, // meridian
          {type: "LineString", coordinates: [[-90,-45],[-87,-45],[-84,-45],[-81,-45],[-78,-45],[-75,-45],[-72,-45],[-69,-45],[-66,-45],[-63,-45],[-60,-45],[-57,-45],[-54,-45],[-51,-45],[-48,-45],[-45,-45],[-42,-45],[-39,-45],[-36,-45],[-33,-45],[-30,-45],[-27,-45],[-24,-45],[-21,-45],[-18,-45],[-15,-45],[-12,-45],[-9,-45],[-6,-45],[-3,-45],[0,-45],[3,-45],[6,-45],[9,-45],[12,-45],[15,-45],[18,-45],[21,-45],[24,-45],[27,-45],[30,-45],[33,-45],[36,-45],[39,-45],[42,-45],[45,-45],[48,-45],[51,-45],[54,-45],[57,-45],[60,-45],[63,-45],[66,-45],[69,-45],[72,-45],[75,-45],[78,-45],[81,-45],[84,-45],[87,-45],[90,-45]]},
          {type: "LineString", coordinates: [[-90,0],[-87,0],[-84,0],[-81,0],[-78,0],[-75,0],[-72,0],[-69,0],[-66,0],[-63,0],[-60,0],[-57,0],[-54,0],[-51,0],[-48,0],[-45,0],[-42,0],[-39,0],[-36,0],[-33,0],[-30,0],[-27,0],[-24,0],[-21,0],[-18,0],[-15,0],[-12,0],[-9,0],[-6,0],[-3,0],[0,0],[3,0],[6,0],[9,0],[12,0],[15,0],[18,0],[21,0],[24,0],[27,0],[30,0],[33,0],[36,0],[39,0],[42,0],[45,0],[48,0],[51,0],[54,0],[57,0],[60,0],[63,0],[66,0],[69,0],[72,0],[75,0],[78,0],[81,0],[84,0],[87,0],[90,0]]}
        ]);
      }
    },

    "returns a MultiLineString of all lines": function() {
      var graticule = d3.geo.graticule()
          .extent([[-90, -45], [90, 45]])
          .step([45, 45])
          .precision(3);
      assert.deepEqual(graticule(), {
        type: "MultiLineString",
        coordinates: graticule.lines().map(function(line) { return line.coordinates; })
      });
    },

    "outline": {
      "returns a Polygon encompassing the major extent": function() {
        assert.deepEqual(d3.geo.graticule()
            .majorExtent([[-90, -45], [90, 45]])
            .precision(3)
            .outline(), {
          type: "Polygon",
          coordinates: [[
            [-90,-45],[-90,45], // meridian
            [-87,45],[-84,45],[-81,45],[-78,45],[-75,45],[-72,45],[-69,45],[-66,45],[-63,45],[-60,45],[-57,45],[-54,45],[-51,45],[-48,45],[-45,45],[-42,45],[-39,45],[-36,45],[-33,45],[-30,45],[-27,45],[-24,45],[-21,45],[-18,45],[-15,45],[-12,45],[-9,45],[-6,45],[-3,45],[0,45],[3,45],[6,45],[9,45],[12,45],[15,45],[18,45],[21,45],[24,45],[27,45],[30,45],[33,45],[36,45],[39,45],[42,45],[45,45],[48,45],[51,45],[54,45],[57,45],[60,45],[63,45],[66,45],[69,45],[72,45],[75,45],[78,45],[81,45],[84,45],[87,45],
            [90,45],[90,-45], // meridian
            [87,-45],[84,-45],[81,-45],[78,-45],[75,-45],[72,-45],[69,-45],[66,-45],[63,-45],[60,-45],[57,-45],[54,-45],[51,-45],[48,-45],[45,-45],[42,-45],[39,-45],[36,-45],[33,-45],[30,-45],[27,-45],[24,-45],[21,-45],[18,-45],[15,-45],[12,-45],[9,-45],[6,-45],[3,-45],[0,-45],[-3,-45],[-6,-45],[-9,-45],[-12,-45],[-15,-45],[-18,-45],[-21,-45],[-24,-45],[-27,-45],[-30,-45],[-33,-45],[-36,-45],[-39,-45],[-42,-45],[-45,-45],[-48,-45],[-51,-45],[-54,-45],[-57,-45],[-60,-45],[-63,-45],[-66,-45],[-69,-45],[-72,-45],[-75,-45],[-78,-45],[-81,-45],[-84,-45],[-87,-45],[-90,-45]
          ]]
        });
      }
    }
  }
});

suite.export(module);

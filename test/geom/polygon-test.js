var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geom.polygon");

suite.addBatch({
  "polygon": {
    topic: load("geom/polygon").expression("d3.geom.polygon"),
    "closed counterclockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]);
      },
      "preserves input coordinates": function(p) {
        assertPolygonInDelta(p, [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), 1);
      },
      "has centroid ⟨0.5,0.5⟩": function(p) {
        assertPointInDelta(p.centroid(), [0.5, 0.5]);
      },
      "can clip an open counterclockwise triangle": function(p) {
        assertPolygonInDelta(p.clip([[0.9, 0.5], [2, -1], [0.5, 0.1]]), [[0.9, 0.5], [1, 0.363636], [1, 0], [0.636363, 0], [0.5, 0.1]], 1e-4);
      },
      "can clip a closed counterclockwise triangle": function(p) {
        assertPolygonInDelta(p.clip([[0.9, 0.5], [2, -1], [0.5, 0.1], [0.9, 0.5]]), [[0.9, 0.5], [1, 0.363636], [1, 0], [0.636363, 0], [0.5, 0.1], [0.9, 0.5]], 1e-4);
      }
    },
    "closed clockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
      },
      "preserves input coordinates": function(p) {
        assertPolygonInDelta(p, [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), -1);
      },
      "has centroid ⟨0.5,0.5⟩": function(p) {
        assertPointInDelta(p.centroid(), [0.5, 0.5]);
      },
      "is not currently supported for clipping": function(p) {
        // because clipping requires a counterclockwise source polygon
      }
    },
    "closed clockwise triangle": {
      topic: function(polygon) {
        return polygon([[1, 1], [3, 2], [2, 3], [1, 1]]);
      },
      "preserves input coordinates": function(p) {
        assertPolygonInDelta(p, [[1, 1], [3, 2], [2, 3], [1, 1]]);
      },
      "has area 1.5": function(p) {
        assert.equal(p.area(), -1.5);
      },
      "has centroid ⟨2,2⟩": function(p) {
        assertPointInDelta(p.centroid(), [2, 2]);
      },
      "is not currently supported for clipping": function(p) {
        // because clipping requires a counterclockwise source polygon
      }
    },
    "open counterclockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
      },
      "remains an open polygon": function(p) {
        assertPolygonInDelta(p, [[0, 0], [0, 1], [1, 1], [1, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), 1);
      },
      "has centroid ⟨0.5,0.5⟩": function(p) {
        assertPointInDelta(p.centroid(), [0.5, 0.5]);
      },
      "can clip an open counterclockwise triangle": function(p) {
        assertPolygonInDelta(p.clip([[0.9, 0.5], [2, -1], [0.5, 0.1]]), [[0.9, 0.5], [1, 0.363636], [1, 0], [0.636363, 0], [0.5, 0.1]], 1e-4);
      },
      "can clip an closed counterclockwise triangle": function(p) {
        assertPolygonInDelta(p.clip([[0.9, 0.5], [2, -1], [0.5, 0.1], [0.9, 0.5]]), [[0.9, 0.5], [1, 0.363636], [1, 0], [0.636363, 0], [0.5, 0.1], [0.9, 0.5]], 1e-4);
      }
    },
    "open clockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
      },
      "remains an open polygon": function(p) {
        assertPolygonInDelta(p, [[0, 0], [1, 0], [1, 1], [0, 1]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), -1);
      },
      "has centroid ⟨0.5,0.5⟩": function(p) {
        assertPointInDelta(p.centroid(), [0.5, 0.5]);
      },
      "is not currently supported for clipping": function(p) {
        // because clipping requires a counterclockwise source polygon
      }
    },
    "open clockwise triangle": {
      topic: function(polygon) {
        return polygon([[1, 1], [3, 2], [2, 3]]);
      },
      "remains an open polygon": function(p) {
        assertPolygonInDelta(p, [[1, 1], [3, 2], [2, 3]]);
      },
      "has area 1.5": function(p) {
        assert.equal(p.area(), -1.5);
      },
      "has centroid ⟨2,2⟩": function(p) {
        assertPointInDelta(p.centroid(), [2, 2]);
      }
    },
    "large square": {
      topic: function(polygon) {
        var r = 1e8,
            d = _.range(0, r, r / 1e4);
        return polygon(
            d.map(function(y) { return [0, y]; }).concat(
            d.map(function(x) { return [x, r]; })).concat(
            d.map(function(y) { return [r, y]; }).reverse()).concat(
            d.map(function(x) { return [x, 0]; }).reverse()));
      },
      "has area 1e16 - 5e7": function(p) {
        assert.equal(p.area(), 1e16 - 5e7);
      }
    }
  }
});

function assertPointInDelta(expected, actual, δ, message) {
  if (!δ) δ = 0;
  if (!pointInDelta(expected, actual, δ)) {
    assert.fail(JSON.stringify(actual), JSON.stringify(expected), message || "expected {expected}, got {actual}", "===", assertPointInDelta);
  }
}

function assertPolygonInDelta(expected, actual, δ, message) {
  if (!δ) δ = 0;
  if (expected.length !== actual.length || expected.some(function(e, i) { return !pointInDelta(e, actual[i], δ); })) {
    assert.fail(JSON.stringify(actual), JSON.stringify(expected), message || "expected {expected}, got {actual}", "===", assertPolygonInDelta);
  }
}

function pointInDelta(a, b, δ) {
  return !(Math.abs(a[0] - b[0]) > δ || Math.abs(a[1] - b[1]) > δ);
}

suite.export(module);

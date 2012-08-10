require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.line");

suite.addBatch({
  "line": {
    topic: function() {
      return d3.svg.line;
    },

    "x defaults to a function accessor": function(line) {
      var l = line();
      assert.pathEqual(l([[1, 2], [4, 3]]), "M1,2L4,3");
      assert.typeOf(l.x(), "function");
    },
    "x can be defined as a constant": function(line) {
      var l = line().x(0);
      assert.pathEqual(l([[1, 2], [4, 3]]), "M0,2L0,3");
      assert.equal(l.x(), 0);
    },
    "x can be defined as a function": function(line) {
      var l = line().x(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 0; }
      assert.pathEqual(l.call(t, [[1, 2], [4, 3]]), "M0,2L0,3");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "y defaults to a function accessor": function(line) {
      var l = line();
      assert.pathEqual(l([[1, 2], [4, 3]]), "M1,2L4,3");
      assert.typeOf(l.y(), "function");
    },
    "y can be defined as a constant": function(line) {
      var l = line().y(0);
      assert.pathEqual(l([[1, 2], [4, 3]]), "M1,0L4,0");
      assert.equal(l.y(), 0);
    },
    "y can be defined as a function": function(line) {
      var l = line().y(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 0; }
      assert.pathEqual(l.call(t, [[1, 2], [4, 3]]), "M1,0L4,0");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "interpolate defaults to linear": function(line) {
      assert.equal(line().interpolate(), "linear");
    },
    "interpolate can be defined as a constant": function(line) {
      var l = line().interpolate("step-before");
      assert.pathEqual(l([[0, 0], [1, 1]]), "M0,0V1H1");
      assert.equal(l.interpolate(), "step-before");
    },
    "interpolate can be defined as a function": function(line) {
      var l = line().interpolate(interpolate);
      assert.pathEqual(l([[0, 0], [1, 1]]), "M0,0T1,1");
      assert.equal(l.interpolate(), interpolate);

      function interpolate(points) {
        return points.join("T");
      }
    },
    "invalid interpolates fallback to linear": function(line) {
      assert.equal(line().interpolate("__proto__").interpolate(), "linear");
    },

    "tension defaults to .7": function(line) {
      assert.equal(line().tension(), .7);
    },
    "tension can be specified as a constant": function(line) {
      var l = line().tension(.5);
      assert.equal(l.tension(), .5);
    },

    "returns null if input points array is empty": function(line) {
      assert.isNull(line()([]));
    },

    "interpolate(linear)": {
      "supports linear interpolation": function(line) {
        var l = line().interpolate("linear");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0L1,1L2,0L3,1L4,0");
      }
    },

    "interpolate(step)": {
      "supports step-before interpolation": function(line) {
        var l = line().interpolate("step-before");
        assert.pathEqual(l([[0, 0]]), "M0,0");
        assert.pathEqual(l([[0, 0], [1, 1]]), "M0,0V1H1");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0]]), "M0,0V1H1V0H2");
      },
      "supports step-after interpolation": function(line) {
        var l = line().interpolate("step-after");
        assert.pathEqual(l([[0, 0]]), "M0,0");
        assert.pathEqual(l([[0, 0], [1, 1]]), "M0,0H1V1");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0]]), "M0,0H1V1H2V0");
      }
    },

    "interpolate(basis)": {
      "supports basis interpolation": function(line) {
        var l = line().interpolate("basis");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0C0,0,0,0,0.16666666666666666,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,2,0.3333333333333333C2.333333333333333,0.3333333333333333,2.6666666666666665,0.6666666666666666,3,0.6666666666666666C3.333333333333333,0.6666666666666666,3.6666666666666665,0.3333333333333333,3.833333333333333,0.16666666666666666C4,0,4,0,3.9999999999999996,0");
      },
      "supports basis-open interpolation": function(line) {
        var l = line().interpolate("basis-open");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,2,0.3333333333333333C2.333333333333333,0.3333333333333333,2.6666666666666665,0.6666666666666666,3,0.6666666666666666");
      },
      "supports basis-closed interpolation": function(line) {
        var l = line().interpolate("basis-closed");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M2,0.3333333333333333C2.333333333333333,0.3333333333333333,2.6666666666666665,0.6666666666666666,3,0.6666666666666666C3.333333333333333,0.6666666666666666,3.6666666666666665,0.3333333333333333,3.1666666666666665,0.16666666666666666C2.6666666666666665,0,1.3333333333333333,0,0.8333333333333333,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,2,0.3333333333333333");
      },
      "basis interpolation reverts to linear with fewer than three points": function(line) {
        var l = line().interpolate("basis"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
      },
      "basis-open interpolation reverts to linear with fewer than four points": function(line) {
        var l = line().interpolate("basis-open"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0]]), d([[0, 0], [1, 1], [2, 0]]));
      },
      "basis-closed interpolation reverts to linear with fewer than three points": function(line) {
        var l = line().interpolate("basis-open"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
      }
    },

    "interpolate(bundle)": {
      "supports bundle interpolation": function(line) {
        var l = line().interpolate("bundle");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0C0,0,0,0,0.16666666666666666,0.11666666666666665C0.3333333333333333,0.2333333333333333,0.6666666666666666,0.4666666666666666,1,0.4666666666666666C1.3333333333333333,0.4666666666666666,1.6666666666666665,0.2333333333333333,2,0.2333333333333333C2.333333333333333,0.2333333333333333,2.6666666666666665,0.4666666666666666,3,0.4666666666666666C3.333333333333333,0.4666666666666666,3.6666666666666665,0.2333333333333333,3.833333333333333,0.11666666666666665C4,0,4,0,4,0");
      },
      "observes the specified tension": function(line) {
        var l = line().interpolate("bundle").tension(1);
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), line().interpolate("basis")([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]));
      },
      "supports a single-element array": function(line) {
        var l = line().interpolate("bundle").tension(1);
        assert.pathEqual(l([[0, 0]]), "M0,0");
      }
    },

    "interpolate(cardinal)": {
      "supports cardinal interpolation": function(line) {
        var l = line().interpolate("cardinal");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0Q0.8,1,1,1C1.3,1,1.7,0,2,0S2.7,1,3,1Q3.2,1,4,0");
      },
      "supports cardinal-open interpolation": function(line) {
        var l = line().interpolate("cardinal-open");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M1,1C1.3,1,1.7,0,2,0S2.7,1,3,1");
      },
      "supports cardinal-closed interpolation": function(line) {
        var l = line().interpolate("cardinal-closed");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0C-0.45,0.15,0.7,1,1,1S1.7,0,2,0S2.7,1,3,1S4.45,0.15,4,0S0.45,-0.15,0,0");
      },
      "cardinal interpolation reverts to linear with fewer than three points": function(line) {
        var l = line().interpolate("cardinal"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
      },
      "cardinal-open interpolation reverts to linear with fewer than four points": function(line) {
        var l = line().interpolate("cardinal-open"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
        assert.pathEqual(l([[0, 0], [1, 1], [2, 0]]), d([[0, 0], [1, 1], [2, 0]]));
      },
      "cardinal-closed interpolation reverts to linear with fewer than three points": function(line) {
        var l = line().interpolate("cardinal-open"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
      },
      "observes the specified tension": function(line) {
        var l = line().tension(.5);
        assert.pathEqual(l.interpolate("cardinal")([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0Q0.6666666666666667,1,1,1C1.5,1,1.5,0,2,0S2.5,1,3,1Q3.3333333333333335,1,4,0");
        assert.pathEqual(l.interpolate("cardinal-open")([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M1,1C1.5,1,1.5,0,2,0S2.5,1,3,1");
        assert.pathEqual(l.interpolate("cardinal-closed")([[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]), "M0,0C-0.75,0.25,0.5,1,1,1S1.5,0,2,0S2.5,1,3,1S4.75,0.25,4,0S0.75,-0.25,0,0");
      }
    },

    "interpolate(monotone)": {
      "supports monotone interpolation": function(line) {
        var l = line().interpolate("monotone");
        assert.pathEqual(l([[0, 0], [1, 1], [2, 1], [3, 0], [4, 0]]), "M0,0C0.08333333333333333,0.08333333333333333,0.6666666666666667,1,1,1S1.6666666666666667,1,2,1S2.6666666666666665,0,3,0S3.8333333333333335,0,4,0");
      },
      "monotone interpolation reverts to linear with fewer than three points": function(line) {
        var l = line().interpolate("monotone"), d = line();
        assert.pathEqual(l([[0, 0]]), d([[0, 0]]));
        assert.pathEqual(l([[0, 0], [1, 1]]), d([[0, 0], [1, 1]]));
      }
    }
  }
});

suite.export(module);

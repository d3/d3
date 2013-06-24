var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.svg.diagonal");

suite.addBatch({
  "diagonal": {
    topic: load("svg/diagonal").expression("d3.svg.diagonal"),

    "source defaults to a function accessor": function(diagonal) {
      var d = diagonal().target({x:5, y:5});
      assert.pathEqual(d({source: {x:1, y:1}}), "M1,1C1,3 5,3 5,5");
      assert.pathEqual(d({source: {x:5, y:1}}), "M5,1C5,3 5,3 5,5");
    },
    "source can be defined as a constant": function(diagonal) {
      var d = diagonal().target({x:5, y:5});
      assert.pathEqual(d.source({x:1, y:1})(), "M1,1C1,3 5,3 5,5");
      assert.pathEqual(d.source({x:5, y:1})(), "M5,1C5,3 5,3 5,5");
    },
    "source can be defined as a function of data or index": function(diagonal) {
      var d = diagonal().source(f).target({x:5, y:5}), o = {}, t = {}, dd, ii, tt;
      function f(d,i) { dd = d; ii = i; tt = this; return {x:42, y:42}; }
      assert.pathEqual(d.call(t, o, 2), "M42,42C42,23.500000 5,23.500000 5,5");

      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected data, got {actual}");
      assert.equal(tt, t, "expected data, got {actual}");
    },
    "target defaults to a function accessor": function(diagonal) {
      var d = diagonal().source({x:1, y:1});
      assert.pathEqual(d({target: {x:5, y:5}}), "M1,1C1,3 5,3 5,5");
      assert.pathEqual(d({target: {x:5, y:1}}), "M1,1C1,1 5,1 5,1");
    },
    "target can be defined as a constant": function(diagonal) {
      var d = diagonal().source({x:1, y:1});
      assert.pathEqual(d.target({x:5, y:5})(), "M1,1C1,3 5,3 5,5");
      assert.pathEqual(d.target({x:5, y:1})(), "M1,1C1,1 5,1 5,1");
    },
    "target can be defined as a function of data or index": function(diagonal) {
      var d = diagonal().source({x:1, y:1}).target(f), o = {}, t = {}, dd, ii, tt;
      function f(d,i) { dd = d; ii = i; tt = this; return {x:42, y:42}; }
      assert.pathEqual(d.call(t, o, 2), "M1,1C1,21.500000 42,21.500000 42,42");

      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected data, got {actual}");
      assert.equal(tt, t, "expected data, got {actual}");
    },
    "projection defaults to identity": function(diagonal) {
      var d = diagonal();
      assert.deepEqual(d.projection()({x:1, y:1}),[1, 1]);
    },
    "custom projection function can be set": function(diagonal) {
      var d = diagonal().source({x:1, y:1}).target({x:5, y:5});
      assert.pathEqual(d.projection(function(d) { 
        return [d.x * 2, d.y * 2]; 
      })(),"M2,2C2,6 10,6 10,10");
    }
  }
});

suite.export(module);

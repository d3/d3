require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.ordinal");

suite.addBatch({
  "ordinal": {
    topic: function() {
      return d3.scale.ordinal;
    },

    "domain": {
      "defaults to the empty array": function(ordinal) {
        assert.isEmpty(ordinal().domain());
      },
      "new input values are added to the domain": function(ordinal) {
        var x = ordinal().range(["foo", "bar"]);
        assert.equal(x(0), "foo");
        assert.deepEqual(x.domain(), ["0"]);
        assert.equal(x(1), "bar");
        assert.deepEqual(x.domain(), ["0", "1"]);
        assert.equal(x(0), "foo");
        assert.deepEqual(x.domain(), ["0", "1"]);
      },
      "setting the domain forgets previous values": function(ordinal) {
        var x = ordinal().range(["foo", "bar"]);
        assert.equal(x(1), "foo");
        assert.equal(x(0), "bar");
        assert.deepEqual(x.domain(), [1, 0]);
        x.domain(["0", "1"]);
        assert.equal(x(0), "foo"); // it changed!
        assert.equal(x(1), "bar");
        assert.deepEqual(x.domain(), ["0", "1"]);
      },
      "uniqueness is based on string coercion": function(ordinal) {
        var x = ordinal().domain(["foo"]).range([42, 43, 44]);
        assert.equal(x(new String("foo")), 42);
        assert.equal(x({toString: function() { return "foo"; }}), 42);
        assert.equal(x({toString: function() { return "bar"; }}), 43);
      },
      "orders domain values by the order in which they are seen": function(ordinal) {
        var x = ordinal();
        x("foo");
        x("bar");
        x("baz");
        assert.deepEqual(x.domain(), ["foo", "bar", "baz"]);
        x.domain(["baz", "bar"]);
        x("foo");
        assert.deepEqual(x.domain(), ["baz", "bar", "foo"]);
        x.domain(["baz", "foo"]);
        assert.deepEqual(x.domain(), ["baz", "foo"]);
        x.domain([]);
        x("foo");
        x("bar");
        assert.deepEqual(x.domain(), ["foo", "bar"]);
      },
      "does not coerce domain values to strings": function(ordinal) {
        var x = ordinal().domain([0, 1]);
        assert.deepEqual(x.domain(), [0, 1]);
        assert.typeOf(x.domain()[0], "number");
        assert.typeOf(x.domain()[1], "number");
      },
      "does not barf on object built-ins": function(ordinal) {
        var x = ordinal().domain(["__proto__", "hasOwnProperty"]).range([42, 43]);
        assert.equal(x("__proto__"), 42);
        assert.equal(x("hasOwnProperty"), 43);
        assert.deepEqual(x.domain(), ["__proto__", "hasOwnProperty"]);
      }
    },

    "range": {
      "defaults to the empty array": function(ordinal) {
        var x = ordinal();
        assert.isEmpty(x.range());
        assert.isUndefined(x(0));
      },
      "setting the range remembers previous values": function(ordinal) {
        var x = ordinal();
        assert.isUndefined(x(0));
        assert.isUndefined(x(1));
        x.range(["foo", "bar"]);
        assert.equal(x(0), "foo");
        assert.equal(x(1), "bar");
      },
      "recycles values when exhausted": function(ordinal) {
        var x = ordinal().range(["a", "b", "c"]);
        assert.equal(x(0), "a");
        assert.equal(x(1), "b");
        assert.equal(x(2), "c");
        assert.equal(x(3), "a");
        assert.equal(x(4), "b");
        assert.equal(x(5), "c");
        assert.equal(x(2), "c");
        assert.equal(x(1), "b");
        assert.equal(x(0), "a");
      }
    },

    "maps distinct values to discrete values": function(ordinal) {
      var x = ordinal().range(["a", "b", "c"]);
      assert.equal(x(0), "a");
      assert.equal(x("0"), "a");
      assert.equal(x([0]), "a");
      assert.equal(x(1), "b");
      assert.equal(x(2.0), "c");
      assert.equal(x(new Number(2)), "c");
    },

    "rangePoints": {
      "computes discrete points in a continuous range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([0, 120]);
        assert.deepEqual(x.range(), [0, 60, 120]);
        assert.equal(x.rangeBand(), 0);
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([0, 120], 1);
        assert.deepEqual(x.range(), [20, 60, 100]);
        assert.equal(x.rangeBand(), 0);
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([0, 120], 2);
        assert.deepEqual(x.range(), [30, 60, 90]);
        assert.equal(x.rangeBand(), 0);
      },
      "correctly handles singleton domains": function(ordinal) {
        var x = ordinal().domain(["a"]).rangePoints([0, 120]);
        assert.deepEqual(x.range(), [60]);
        assert.equal(x.rangeBand(), 0);
      },
      "can be set to a descending range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([120, 0]);
        assert.deepEqual(x.range(), [120, 60,0]);
        assert.equal(x.rangeBand(), 0);
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([120, 0], 1);
        assert.deepEqual(x.range(), [100, 60, 20]);
        assert.equal(x.rangeBand(), 0);
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([120, 0], 2);
        assert.deepEqual(x.range(), [90, 60, 30]);
        assert.equal(x.rangeBand(), 0);
      }
    },

    "rangeBands": {
      "computes discrete bands in a continuous range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([0, 120]);
        assert.deepEqual(x.range(), [0, 40, 80]);
        assert.equal(x.rangeBand(), 40);
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([0, 120], .2);
        assert.deepEqual(x.range(), [7.5, 45, 82.5]);
        assert.equal(x.rangeBand(), 30);
      },
      "setting domain recomputes range bands": function(ordinal) {
        var x = ordinal().rangeRoundBands([0, 100]).domain(["a", "b", "c"]);
        assert.deepEqual(x.range(), [1, 34, 67]);
        assert.equal(x.rangeBand(), 33);
        x.domain(["a", "b", "c", "d"]);
        assert.deepEqual(x.range(), [0, 25, 50, 75]);
        assert.equal(x.rangeBand(), 25);
      },
      "can be set to a descending range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([120, 0]);
        assert.deepEqual(x.range(), [80, 40, 0]);
        assert.equal(x.rangeBand(), 40);
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([120, 0], .2);
        assert.deepEqual(x.range(), [82.5, 45, 7.5]);
        assert.equal(x.rangeBand(), 30);
      },
      "can specify a different outer padding": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([120, 0], .2, .1);
        assert.deepEqual(x.range(), [84, 44, 4]);
        assert.equal(x.rangeBand(), 32);
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([120, 0], .2, 1);
        assert.deepEqual(x.range(), [75, 50, 25]);
        assert.equal(x.rangeBand(), 20);
      }
    },

    "rangeRoundBands": {
      "computes discrete rounded bands in a continuous range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 100]);
        assert.deepEqual(x.range(), [1, 34, 67]);
        assert.equal(x.rangeBand(), 33);
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 100], .2);
        assert.deepEqual(x.range(), [7, 38, 69]);
        assert.equal(x.rangeBand(), 25);
      },
      "can be set to a descending range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([100, 0]);
        assert.deepEqual(x.range(), [67, 34, 1]);
        assert.equal(x.rangeBand(), 33);
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([100, 0], .2);
        assert.deepEqual(x.range(), [69, 38, 7]);
        assert.equal(x.rangeBand(), 25);
      },
      "can specify a different outer padding": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([120, 0], .2, .1);
        assert.deepEqual(x.range(), [84, 44, 4]);
        assert.equal(x.rangeBand(), 32);
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([120, 0], .2, 1);
        assert.deepEqual(x.range(), [75, 50, 25]);
        assert.equal(x.rangeBand(), 20);
      }
    },

    "rangeExtent": {
      "returns the continuous range": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangePoints([20, 120]);
        assert.deepEqual(x.rangeExtent(), [20, 120]);
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([10, 110]);
        assert.deepEqual(x.rangeExtent(), [10, 110]);
        var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 100]);
        assert.deepEqual(x.rangeExtent(), [0, 100]);
        var x = ordinal().domain(["a", "b", "c"]).range([0, 20, 100]);
        assert.deepEqual(x.rangeExtent(), [0, 100]);
      },
      "can handle descending ranges": function(ordinal) {
        var x = ordinal().domain(["a", "b", "c"]).rangeBands([100, 0]);
        assert.deepEqual(x.rangeExtent(), [0, 100]);
      }
    },

    "copy": {
      "changes to the domain are isolated": function(ordinal) {
        var x = ordinal().range(["foo", "bar"]), y = x.copy();
        x.domain([1, 2]);
        assert.deepEqual(y.domain(), []);
        assert.equal(x(1), "foo");
        assert.equal(y(1), "foo");
        y.domain([2, 3]);
        assert.equal(x(2), "bar");
        assert.equal(y(2), "foo");
        assert.deepEqual(x.domain(), ["1", "2"]);
        assert.deepEqual(y.domain(), ["2", "3"]);
      },
      "changes to the range are isolated": function(ordinal) {
        var x = ordinal().range(["foo", "bar"]), y = x.copy();
        x.range(["bar", "foo"]);
        assert.equal(x(1), "bar");
        assert.equal(y(1), "foo");
        assert.deepEqual(y.range(), ["foo", "bar"]);
        y.range(["foo", "baz"]);
        assert.equal(x(2), "foo");
        assert.equal(y(2), "baz");
        assert.deepEqual(x.range(), ["bar", "foo"]);
        assert.deepEqual(y.range(), ["foo", "baz"]);
      },
      "changes to the range type are isolated": function(ordinal) {
        var x = ordinal().domain([0, 1]).rangeBands([0, 1], .2), y = x.copy();
        x.rangePoints([1, 2]);
        assert.inDelta(x(0), 1, 1e-6);
        assert.inDelta(x(1), 2, 1e-6);
        assert.inDelta(x.rangeBand(), 0, 1e-6);
        assert.inDelta(y(0), 1/11, 1e-6);
        assert.inDelta(y(1), 6/11, 1e-6);
        assert.inDelta(y.rangeBand(), 4/11, 1e-6);
        y.rangeBands([0, 1]);
        assert.inDelta(x(0), 1, 1e-6);
        assert.inDelta(x(1), 2, 1e-6);
        assert.inDelta(x.rangeBand(), 0, 1e-6);
        assert.inDelta(y(0), 0, 1e-6);
        assert.inDelta(y(1), 1/2, 1e-6);
        assert.inDelta(y.rangeBand(), 1/2, 1e-6);
      }
    }
  }
});

suite.export(module);

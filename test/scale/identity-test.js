require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.scale.identity");

suite.addBatch({
  "identity": {
    topic: function() {
      return d3.scale.identity;
    },

    "domain and range": {
      "are identical": function(identity) {
        var x = identity();
        assert.strictEqual(x.domain, x.range);
        assert.strictEqual(x.domain(), x.range());
        var x = identity().domain([-10, 0, 100]);
        assert.deepEqual(x.range(), [-10, 0, 100]);
        var x = identity().range([-10, 0, 100]);
        assert.deepEqual(x.domain(), [-10, 0, 100]);
      },
      "default to [0, 1]": function(identity) {
        var x = identity();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.deepEqual(x.range(), [0, 1]);
        assert.strictEqual(x(.5), .5);
      },
      "coerce values to numbers": function(identity) {
        var x = identity().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.typeOf(x.domain()[0], "number");
        assert.typeOf(x.domain()[1], "number");
        assert.strictEqual(x.domain()[0], +new Date(1990, 0, 1));
        assert.strictEqual(x.domain()[1], +new Date(1991, 0, 1));
        assert.typeOf(x(new Date(1989, 09, 20)), "number");
        assert.strictEqual(x(new Date(1989, 09, 20)), +new Date(1989, 09, 20));
        var x = identity().domain(["0", "1"]);
        assert.typeOf(x.domain()[0], "number");
        assert.typeOf(x.domain()[1], "number");
        assert.strictEqual(x(.5), .5);
        var x = identity().domain([new Number(0), new Number(1)]);
        assert.typeOf(x.domain()[0], "number");
        assert.typeOf(x.domain()[1], "number");
        assert.strictEqual(x(.5), .5);

        var x = identity().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.typeOf(x.range()[0], "number");
        assert.typeOf(x.range()[1], "number");
        assert.strictEqual(x.range()[0], +new Date(1990, 0, 1));
        assert.strictEqual(x.range()[1], +new Date(1991, 0, 1));
        assert.typeOf(x(new Date(1989, 09, 20)), "number");
        assert.strictEqual(x(new Date(1989, 09, 20)), +new Date(1989, 09, 20));
        var x = identity().range(["0", "1"]);
        assert.typeOf(x.range()[0], "number");
        assert.typeOf(x.range()[1], "number");
        assert.strictEqual(x(.5), .5);
        var x = identity().range([new Number(0), new Number(1)]);
        assert.typeOf(x.range()[0], "number");
        assert.typeOf(x.range()[1], "number");
        assert.strictEqual(x(.5), .5);
      },
      "can specify a polyidentity domain and range": function(identity) {
        var x = identity().domain([-10, 0, 100]);
        assert.deepEqual(x.domain(), [-10, 0, 100]);
        assert.strictEqual(x(-5), -5);
        assert.strictEqual(x(50), 50);
        assert.strictEqual(x(75), 75);

        var x = identity().range([-10, 0, 100]);
        assert.deepEqual(x.range(), [-10, 0, 100]);
        assert.strictEqual(x(-5), -5);
        assert.strictEqual(x(50), 50);
        assert.strictEqual(x(75), 75);
      },
      "do not affect the identity function": function(identity) {
        var x = identity().domain([Infinity, NaN]);
        assert.strictEqual(x(42), 42);
        assert.strictEqual(x.invert(-42), -42);
      }
    },

    "is the identity function": function(identity) {
      var x = identity().domain([1, 2]);
      assert.strictEqual(x(.5), .5);
      assert.strictEqual(x(1), 1);
      assert.strictEqual(x(1.5), 1.5);
      assert.strictEqual(x(2), 2);
      assert.strictEqual(x(2.5), 2.5);
    },
    "coerces input to a number": function(identity) {
      var x = identity().domain([1, 2]);
      assert.strictEqual(x("2"), 2);
    },

    "invert": {
      "is the identity function": function(identity) {
        var x = identity().domain([1, 2]);
        assert.strictEqual(x.invert(.5), .5);
        assert.strictEqual(x.invert(1), 1);
        assert.strictEqual(x.invert(1.5), 1.5);
        assert.strictEqual(x.invert(2), 2);
        assert.strictEqual(x.invert(2.5), 2.5);
      },
      "coerces range value to numbers": function(identity) {
        var x = identity().range(["0", "2"]);
        assert.strictEqual(x.invert("1"), 1);
        var x = identity().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.strictEqual(x.invert(new Date(1990, 6, 2, 13)), +new Date(1990, 6, 2, 13));
        var x = identity().range(["#000", "#fff"]);
        assert.isNaN(x.invert("#999"));
      },
      "coerces input to a number": function(identity) {
        var x = identity().domain([1, 2]);
        assert.strictEqual(x.invert("2"), 2);
      }
    },

    "ticks": {
      "generates ticks of varying degree": function(identity) {
        var x = identity();
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
        var x = identity().domain([1, 0]);
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
      },
      "formats ticks with the appropriate precision": function(identity) {
        var x = identity().domain([.123456789, 1.23456789]);
        assert.strictEqual(x.tickFormat(1)(x.ticks(1)[0]), "1");
        assert.strictEqual(x.tickFormat(2)(x.ticks(2)[0]), "0.5");
        assert.strictEqual(x.tickFormat(4)(x.ticks(4)[0]), "0.2");
        assert.strictEqual(x.tickFormat(8)(x.ticks(8)[0]), "0.2");
        assert.strictEqual(x.tickFormat(16)(x.ticks(16)[0]), "0.2");
        assert.strictEqual(x.tickFormat(32)(x.ticks(32)[0]), "0.15");
        assert.strictEqual(x.tickFormat(64)(x.ticks(64)[0]), "0.14");
        assert.strictEqual(x.tickFormat(128)(x.ticks(128)[0]), "0.13");
        assert.strictEqual(x.tickFormat(256)(x.ticks(256)[0]), "0.125");
      }
    },

    "copy": {
      "changes to the domain or range are isolated": function(identity) {
        var x = identity(), y = x.copy();
        x.domain([1, 2]);
        assert.deepEqual(y.domain(), [0, 1]);
        y.domain([2, 3]);
        assert.deepEqual(x.domain(), [1, 2]);
        assert.deepEqual(y.domain(), [2, 3]);

        var x = identity(), y = x.copy();
        x.range([1, 2]);
        assert.deepEqual(y.range(), [0, 1]);
        y.range([2, 3]);
        assert.deepEqual(x.range(), [1, 2]);
        assert.deepEqual(y.range(), [2, 3]);
      }
    }
  }
});

suite.export(module);

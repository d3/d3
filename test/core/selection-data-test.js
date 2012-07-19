require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.data");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "assigns data as an array": function(body) {
      var data = new Object();
      body.data([data]);
      assert.strictEqual(document.body.__data__, data);
    },
    "assigns data as a function": function(body) {
      var data = new Object();
      body.data(function() { return [data]; });
      assert.strictEqual(document.body.__data__, data);
    },
    "stores data in the DOM": function(body) {
      var expected = new Object(), actual;
      document.body.__data__ = expected;
      body.each(function(d) { actual = d; });
      assert.strictEqual(actual, expected);
    },
    "returns a new selection": function(body) {
      assert.isFalse(body.data([1]) === body);
    },
    "with no arguments, returns an array of data": function(body) {
      var data = new Object();
      body.data([data]);
      assert.deepEqual(body.data(), [data]);
      assert.strictEqual(body.data()[0], data);
    },
    "throws an error if data is null or undefined": function(body) {
      assert.throws(function() { body.data(null); }, Error);
      assert.throws(function() { body.data(function() {}); }, Error);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "assigns data as an array": function(div) {
      var a = new Object(), b = new Object();
      div.data([a, b]);
      assert.strictEqual(div[0][0].__data__, a);
      assert.strictEqual(div[0][1].__data__, b);
    },
    "assigns data as a function": function(div) {
      var a = new Object(), b = new Object();
      div.data(function() { return [a, b]; });
      assert.strictEqual(div[0][0].__data__, a);
      assert.strictEqual(div[0][1].__data__, b);
    },
    "stores data in the DOM": function(div) {
      var a = new Object(), b = new Object(), actual = [];
      div[0][0].__data__ = a;
      div[0][1].__data__ = b;
      div.each(function(d) { actual.push(d); });
      assert.deepEqual(actual, [a, b]);
    },
    "returns a new selection": function(div) {
      assert.isFalse(div.data([0, 1]) === div);
    },
    "throws an error if data is null or undefined": function(div) {
      assert.throws(function() { div.data(null); }, Error);
      assert.throws(function() { div.data(function() {}); }, Error);
    },
    "with no arguments, returns an array of data": function(div) {
      var a = new Object(), b = new Object(), actual = [];
      div[0][0].__data__ = a;
      div[0][1].__data__ = b;
      assert.deepEqual(div.data(), [a, b]);
    },
    "with no arguments, returned array has undefined for null nodes": function(div) {
      var b = new Object(), actual = [];
      div[0][0] = null;
      div[0][1].__data__ = b;
      var data = div.data();
      assert.isUndefined(data[0]);
      assert.strictEqual(data[1], b);
      assert.equal(data.length, 2);
    }
  }
});

suite.addBatch({
  "selectAll(div).selectAll(span)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div")
          .data(d3.range(2))
        .enter().append("div").selectAll("span")
          .data(d3.range(2))
        .enter().append("span");
    },
    "assigns data as an array": function(span) {
      var a = new Object(), b = new Object();
      span.data([a, b]);
      assert.strictEqual(span[0][0].__data__, a);
      assert.strictEqual(span[0][1].__data__, b);
      assert.strictEqual(span[1][0].__data__, a);
      assert.strictEqual(span[1][1].__data__, b);
    },
    "assigns data as a function": function(span) {
      var a = new Object(), b = new Object(), c = new Object(), d = new Object();
      span.data(function(z, i) { return i ? [c, d] : [a, b]; });
      assert.strictEqual(span[0][0].__data__, a);
      assert.strictEqual(span[0][1].__data__, b);
      assert.strictEqual(span[1][0].__data__, c);
      assert.strictEqual(span[1][1].__data__, d);
    },
    "evaluates the function once per group": function(span) {
      var count = 0;
      span.data(function() { ++count; return [0, 1]; });
      assert.equal(count, 2);
    },
    "defines an update selection for updating data": function(span) {
      var update = span.data(d3.range(4));
      assert.equal(update.length, 2);
      assert.equal(update[0].length, 4);
      assert.equal(update[1].length, 4);
      assert.domEqual(update[0][0], span[0][0]);
      assert.domEqual(update[0][1], span[0][1]);
      assert.domNull(update[0][2]);
      assert.domNull(update[0][3]);
      assert.domEqual(update[1][0], span[1][0]);
      assert.domEqual(update[1][1], span[1][1]);
      assert.domNull(update[1][2]);
      assert.domNull(update[1][3]);
    },
    "defines an enter selection for entering data": function(span) {
      var enter = span.data(d3.range(4)).enter();
      assert.isFalse(enter.empty());
      assert.equal(enter.length, 2);
      assert.equal(enter[0].length, 4);
      assert.equal(enter[1].length, 4);
      assert.domNull(enter[0][0]);
      assert.domNull(enter[0][1]);
      assert.deepEqual(enter[0][2], {__data__: 2});
      assert.deepEqual(enter[0][3], {__data__: 3});
      assert.domNull(enter[1][0]);
      assert.domNull(enter[1][1]);
      assert.deepEqual(enter[1][2], {__data__: 2});
      assert.deepEqual(enter[1][3], {__data__: 3});
    },
    "defines an exit selection for exiting data": function(span) {
      var exit = span.data(d3.range(1)).exit();
      assert.isFalse(exit.empty());
      assert.equal(exit.length, 2);
      assert.equal(exit[0].length, 2);
      assert.equal(exit[1].length, 2);
      assert.domNull(exit[0][0]);
      assert.domEqual(exit[0][1], span[0][1]);
      assert.domNull(exit[1][0]);
      assert.domEqual(exit[1][1], span[1][1]);
    },
    "observes the specified key function": function(span) {
      var update = span.data([1, 2], Number);
      assert.isFalse(update.empty());
      assert.equal(update.length, 2);
      assert.equal(update[0].length, 2);
      assert.equal(update[1].length, 2);
      assert.domEqual(update[0][0], span[0][1]);
      assert.domNull(update[0][1]);
      assert.domEqual(update[1][0], span[1][1]);
      assert.domNull(update[1][1]);

      var enter = update.enter();
      assert.equal(enter.length, 2);
      assert.equal(enter[0].length, 2);
      assert.equal(enter[1].length, 2);
      assert.domNull(enter[0][0]);
      assert.deepEqual(enter[0][1], {__data__: 2});
      assert.domNull(enter[1][0]);
      assert.deepEqual(enter[1][1], {__data__: 2});

      var exit = update.exit();
      assert.equal(exit.length, 2);
      assert.equal(exit[0].length, 2);
      assert.equal(exit[1].length, 2);
      assert.domEqual(exit[0][0], span[0][0]);
      assert.domNull(exit[0][1]);
      assert.domEqual(exit[1][0], span[1][0]);
      assert.domNull(exit[1][1]);
    },
    "handles keys that are in the default object's prototype chain": function(span) {
      // This also applies to the non-standard "watch" and "unwatch" in Mozilla Firefox.
      var update = span.data(["hasOwnProperty", "isPrototypeOf", "toLocaleString", "toString", "valueOf"], String);
      assert.domNull(update[0][0]);
      assert.domNull(update[0][1]);
      assert.domNull(update[0][2]);
      assert.domNull(update[0][3]);
      assert.domNull(update[0][4]);
      // This throws an error if Object.hasOwnProperty isn't used.
      span.data([0], function() { return "hasOwnProperty"; });
    }
  }
});

suite.export(module);

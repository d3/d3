var vows = require("vows"),
    load = require("../load"),
    assert = require("assert");

var suite = vows.describe("d3.set");

suite.addBatch({
  "set": {
    topic: load("arrays/set", "arrays/ascending"),
    "constructor": {
      "set() returns an empty set": function(d3) {
        var set = d3.set();
        assert.deepEqual(set.values(), []);
      },
      "set(null) returns an empty set": function(d3) {
        var set = d3.set(null);
        assert.deepEqual(set.values(), []);
      },
      "set(array) adds array entries": function(d3) {
        var set = d3.set(["foo"]);
        assert.isTrue(set.has("foo"));
        var set = d3.set(["foo", "bar"]);
        assert.isTrue(set.has("foo"));
        assert.isTrue(set.has("bar"));
      }
    },
    "forEach": {
      "empty sets have an empty values array": function(d3) {
        var set = d3.set();
        assert.deepEqual(set.values(), []);
        set.add("foo");
        assert.deepEqual(set.values(), ["foo"]);
        set.remove("foo");
        assert.deepEqual(set.values(), []);
      },
      "values are returned in arbitrary order": function(d3) {
        var set = d3.set(["foo", "bar"]);
        assert.deepEqual(set.values().sort(d3.ascending), ["bar", "foo"]);
        var set = d3.set(["bar", "foo"]);
        assert.deepEqual(set.values().sort(d3.ascending), ["bar", "foo"]);
      },
      "observes changes via add and remove": function(d3) {
        var set = d3.set(["foo", "bar"]);
        assert.deepEqual(set.values().sort(d3.ascending), ["bar", "foo"]);
        set.remove("foo");
        assert.deepEqual(set.values(), ["bar"]);
        set.add("bar");
        assert.deepEqual(set.values(), ["bar"]);
        set.add("foo");
        assert.deepEqual(set.values().sort(d3.ascending), ["bar", "foo"]);
        set.remove("bar");
        assert.deepEqual(set.values(), ["foo"]);
        set.remove("foo");
        assert.deepEqual(set.values(), []);
        set.remove("foo");
        assert.deepEqual(set.values(), []);
      }
    },
    "values": {
      "returns an array of string values": function(d3) {
        var set = d3.set(["foo", "bar"]);
        assert.deepEqual(set.values().sort(), ["bar", "foo"]);
      }
    },
    "has": {
      "empty sets do not have object built-ins": function(d3) {
        var set = d3.set();
        assert.isFalse(set.has("__proto__"));
        assert.isFalse(set.has("hasOwnProperty"));
      },
      "coerces values to strings": function(d3) {
        var set = d3.set(["42", "null", "undefined"]);
        assert.isTrue(set.has(42));
        assert.isTrue(set.has(null));
        assert.isTrue(set.has(undefined));
      },
      "observes changes via add and remove": function(d3) {
        var set = d3.set(["foo"]);
        assert.isTrue(set.has("foo"));
        set.add("foo");
        assert.isTrue(set.has("foo"));
        set.remove("foo");
        assert.isFalse(set.has("foo"));
        set.add("foo");
        assert.isTrue(set.has("foo"));
      },
      "returns undefined for missing values": function(d3) {
        var set = d3.set(["foo"]);
        assert.isFalse(set.has("bar"));
      }
    },
    "add": {
      "returns the set value": function(d3) {
        var set = d3.set();
        assert.equal(set.add("foo"), "foo");
      },
      "can add values using built-in names": function(d3) {
        var set = d3.set();
        set.add("__proto__");
        assert.isTrue(set.has("__proto__"));
      },
      "coerces values to strings": function(d3) {
        var set = d3.set();
        set.add(42);
        assert.isTrue(set.has(42));
        set.add(null);
        assert.isTrue(set.has(null));
        set.add(undefined);
        assert.isTrue(set.has(undefined));
        assert.deepEqual(set.values().sort(), ["42", "null", "undefined"]);
      },
      "can add null, undefined or empty string values": function(d3) {
        var set = d3.set();
        set.add("");
        set.add("null");
        set.add("undefined");
        assert.isTrue(set.has(""));
        assert.isTrue(set.has("null"));
        assert.isTrue(set.has("undefined"));
      }
    },
    "remove": {
      "returns true if the value was removed": function(d3) {
        var set = d3.set(["foo"]);
        assert.isTrue(set.remove("foo"));
      },
      "returns false if the value is not an element": function(d3) {
        var set = d3.set();
        assert.isFalse(set.remove("foo"));
      }
    }
  }
});

suite.export(module);

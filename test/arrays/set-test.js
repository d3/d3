var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("assert");

var suite = vows.describe("d3.set");

suite.addBatch({
  "set": {
    topic: load("arrays/set").expression("d3.set"),
    "constructor": {
      "set() returns an empty set": function(set) {
        var s = set();
        assert.deepEqual(s.values(), []);
      },
      "set(null) returns an empty set": function(set) {
        var s = set(null);
        assert.deepEqual(s.values(), []);
      },
      "set(array) adds array entries": function(set) {
        var s = set(["foo"]);
        assert.isTrue(s.has("foo"));
        var s = set(["foo", "bar"]);
        assert.isTrue(s.has("foo"));
        assert.isTrue(s.has("bar"));
      }
    },
    "size": {
      "returns the number of distinct values": function(set) {
        var s = set();
        assert.deepEqual(s.size(), 0);
        s.add("foo");
        assert.deepEqual(s.size(), 1);
        s.add("foo");
        assert.deepEqual(s.size(), 1);
        s.add("bar");
        assert.deepEqual(s.size(), 2);
        s.remove("foo");
        assert.deepEqual(s.size(), 1);
        s.remove("foo");
        assert.deepEqual(s.size(), 1);
        s.remove("bar");
        assert.deepEqual(s.size(), 0);
      }
    },
    "empty": {
      "returns true only if the set is empty": function(set) {
        var s = set();
        assert.isTrue(s.empty());
        s.add("foo");
        assert.isFalse(s.empty());
        s.add("foo");
        assert.isFalse(s.empty());
        s.add("bar");
        assert.isFalse(s.empty());
        s.remove("foo");
        assert.isFalse(s.empty());
        s.remove("foo");
        assert.isFalse(s.empty());
        s.remove("bar");
        assert.isTrue(s.empty());
      }
    },
    "forEach": {
      "passes value": function(set) {
        var s = set(["foo", "bar"]),
            c = [];
        s.forEach(function(v) { c.push(v); });
        c.sort();
        assert.deepEqual(c, ["bar", "foo"]);
      },
      "uses the set as the context": function(set) {
        var s = set(["foo", "bar"]),
            c = [];
        s.forEach(function() { c.push(this); });
        assert.strictEqual(c[0], s);
        assert.strictEqual(c[1], s);
        assert.equal(c.length, 2);
      },
      "iterates in arbitrary order": function(set) {
        var s1 = set(["foo", "bar"]),
            s2 = set(["bar", "foo"]),
            c1 = [],
            c2 = [];
        s1.forEach(function(v) { c1.push(v); });
        s2.forEach(function(v) { c2.push(v); });
        c1.sort();
        c2.sort();
        assert.deepEqual(c1, c2);
      }
    },
    "values": {
      "returns an array of string values": function(set) {
        var s = set(["foo", "bar"]);
        assert.deepEqual(s.values().sort(), ["bar", "foo"]);
      },
      "empty sets have an empty values array": function(set) {
        var s = set();
        assert.deepEqual(s.values(), []);
        s.add("foo");
        assert.deepEqual(s.values(), ["foo"]);
        s.remove("foo");
        assert.deepEqual(s.values(), []);
      },
      "values are returned in arbitrary order": function(set) {
        var s = set(["foo", "bar"]);
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
        var s = set(["bar", "foo"]);
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
      },
      "properly unescapes zero-prefixed keys": function(set) {
        var s = set(["__proto__", "\0weird"]);
        assert.deepEqual(s.values().sort(_.ascending), ["\0weird", "__proto__"]);
      },
      "observes changes via add and remove": function(set) {
        var s = set(["foo", "bar"]);
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
        s.remove("foo");
        assert.deepEqual(s.values(), ["bar"]);
        s.add("bar");
        assert.deepEqual(s.values(), ["bar"]);
        s.add("foo");
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
        s.remove("bar");
        assert.deepEqual(s.values(), ["foo"]);
        s.remove("foo");
        assert.deepEqual(s.values(), []);
        s.remove("foo");
        assert.deepEqual(s.values(), []);
      }
    },
    "has": {
      "empty sets do not have object built-ins": function(set) {
        var s = set();
        assert.isFalse(s.has("__proto__"));
        assert.isFalse(s.has("hasOwnProperty"));
      },
      "coerces values to strings": function(set) {
        var s = set(["42", "null", "undefined"]);
        assert.isTrue(s.has(42));
        assert.isTrue(s.has(null));
        assert.isTrue(s.has(undefined));
      },
      "observes changes via add and remove": function(set) {
        var s = set(["foo"]);
        assert.isTrue(s.has("foo"));
        s.add("foo");
        assert.isTrue(s.has("foo"));
        s.remove("foo");
        assert.isFalse(s.has("foo"));
        s.add("foo");
        assert.isTrue(s.has("foo"));
      },
      "returns undefined for missing values": function(set) {
        var s = set(["foo"]);
        assert.isFalse(s.has("bar"));
      }
    },
    "add": {
      "returns the set value, coerced to a string": function(set) {
        var s = set();
        assert.equal(s.add("foo"), "foo");
        assert.strictEqual(s.add(2), "2");
        assert.deepEqual(s.values().sort(), ["2", "foo"]);
      },
      "can add values using built-in names": function(set) {
        var s = set();
        s.add("__proto__");
        assert.isTrue(s.has("__proto__"));
      },
      "can add values using zero-prefixed names": function(set) {
        var s = set();
        s.add("\0weird");
        assert.isTrue(s.has("\0weird"));
      },
      "coerces values to strings": function(set) {
        var s = set();
        s.add(42);
        assert.isTrue(s.has(42));
        s.add(null);
        assert.isTrue(s.has(null));
        s.add(undefined);
        assert.isTrue(s.has(undefined));
        assert.deepEqual(s.values().sort(), ["42", "null", "undefined"]);
      },
      "can add null, undefined or empty string values": function(set) {
        var s = set();
        s.add("");
        s.add("null");
        s.add("undefined");
        assert.isTrue(s.has(""));
        assert.isTrue(s.has("null"));
        assert.isTrue(s.has("undefined"));
      }
    },
    "remove": {
      "returns true if the value was removed": function(set) {
        var s = set(["foo"]);
        assert.isTrue(s.remove("foo"));
      },
      "returns false if the value is not an element": function(set) {
        var s = set();
        assert.isFalse(s.remove("foo"));
      }
    }
  }
});

suite.export(module);

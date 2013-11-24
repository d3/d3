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
        assert.isTrue(s.empty());

      },
      "set(null) returns an empty set": function(set) {
        var s = set(null);
        assert.isTrue(s.empty());
      },
      "set(array) adds array entries": function(set) {
        var s = set(["foo"]);
        assert.isTrue(s.has("foo"));
        assert.isFalse(s.empty());
        assert.equal(s.size(), 1);
        var s = set(["foo", "bar"]);
        assert.isTrue(s.has("foo"));
        assert.isTrue(s.has("bar"));
        assert.equal(s.size(), 2);
      }
    },
    "forEach": {
      "iterates over the values in values()": function(set) {
        var s = set(["bar", "foo", "baz", "foobar"]);
        var encountered = [];
        s.forEach(function(val) { encountered.push(val); })
        assert.deepEqual(encountered.sort(), ["bar", "baz", "foo", "foobar"]);
      }
    },
    "values": {
      "empty sets have an empty values array": function(set) {
        var s = set();
        assert.deepEqual(s.values(), []);

        s.add("foo");
        assert.deepEqual(s.values(), ["foo"]);

        s.remove("foo");
        assert.deepEqual(s.values(), []);
      },
      "empty sets have size 0": function(set) {
        var s = set();
        assert.equal(s.size(), 0);
        assert.isTrue(s.empty());

        s.add("foo");
        assert.equal(s.size(), 1);
        assert.isFalse(s.empty());

        s.remove("foo");
        assert.deepEqual(s.values(), []);
        assert.equal(s.size(), 0);
        assert.isTrue(s.empty());
      },
      "values are returned in arbitrary order": function(set) {
        var s = set(["foo", "bar"]);
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
        var s = set(["bar", "foo"]);
        assert.deepEqual(s.values().sort(_.ascending), ["bar", "foo"]);
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
      "returns the set value": function(set) {
        var s = set();
        assert.equal(s.add("foo"), "foo");
      },
      "can add values using built-in names": function(set) {
        var s = set();
        s.add("__proto__");
        assert.isTrue(s.has("__proto__"));
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
      },
      "can add default object attribute values": function(set) {
        var s = set();

        assert.isFalse(s.has("hasOwnProperty"));
        s.add("hasOwnProperty");
        assert.isTrue(s.has("hasOwnProperty"));

        assert.isFalse(s.has("__proto__"));
        s.add("__proto__");
        assert.isTrue(s.has("__proto__"));
      }
    },
    "size": {
      "gives size of set": function(set) {
        var s = set();
        assert.deepEqual(s.size(), 0);
        s.add("foo");
        assert.deepEqual(s.size(), 1);
        s.add("bar");
        assert.deepEqual(s.size(), 2);
        s.remove("foo");
        assert.deepEqual(s.size(), 1);
        s.remove("bar");
        assert.deepEqual(s.size(), 0);
      },
      "counts each element exactly once": function(set) {
        var s = set();
        assert.deepEqual(s.size(), 0);
        s.add("foo");
        assert.deepEqual(s.size(), 1);
        s.add("foo");
        assert.deepEqual(s.size(), 1);
        s.remove("foo");
        assert.deepEqual(s.size(), 0);
      },
      "size unaffected by removing elements not in set": function(set) {
        var s = set(['foo', 'bar']);
        assert.deepEqual(s.size(), 2);
        s.remove('notbar');
        assert.deepEqual(s.size(), 2);
        s.remove('bar');
        assert.deepEqual(s.size(), 1);
      },
      "allows for set element 'size'": function(set) {
        var s = set();
        assert.deepEqual(s.size(), 0);
        s.add('size');
        assert.deepEqual(s.size(), 1);
      }
    },
    "empty": {
      "returns true iff set is empty": function(set) {
        var s = set()
        assert.isTrue(s.empty());
        s.add('foo');
        assert.isFalse(s.empty());
        s.remove('notfoo');
        assert.isFalse(s.empty());
        s.remove('foo');
        assert.isTrue(s.empty());
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

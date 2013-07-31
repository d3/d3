var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.map");

suite.addBatch({
  "map": {
    topic: load("arrays/map").expression("d3.map"),
    "constructor": {
      "map() returns an empty map": function(map) {
        var m = map();
        assert.deepEqual(m.keys(), []);
      },
      "map(null) returns an empty map": function(map) {
        var m = map(null);
        assert.deepEqual(m.keys(), []);
      },
      "map(object) copies enumerable keys": function(map) {
        var m = map({foo: 42});
        assert.isTrue(m.has("foo"));
        assert.equal(m.get("foo"), 42);
        var m = map(Object.create(null, {foo: {value: 42, enumerable: true}}));
        assert.isTrue(m.has("foo"));
        assert.equal(m.get("foo"), 42);
      },
      "map(object) copies inherited keys": function(map) {
        function Foo() {}
        Foo.prototype.foo = 42;
        var m = map(Object.create({foo: 42}));
        assert.isTrue(m.has("foo"));
        assert.equal(m.get("foo"), 42);
        var m = map(new Foo());
        assert.isTrue(m.has("foo"));
        assert.equal(m.get("foo"), 42);
      },
      "map(object) does not copy non-enumerable keys": function(map) {
        var m = map({__proto__: 42}); // because __proto__ isn't enumerable
        assert.isFalse(m.has("__proto__"));
        assert.isUndefined(m.get("__proto__"));
        var m = map(Object.create(null, {foo: {value: 42, enumerable: false}}));
        assert.isFalse(m.has("foo"));
        assert.isUndefined(m.get("foo"));
      },
      "map(map) copies the given map": function(map) {
        var a = map({foo: 42}),
            b = map(a);
        assert.isTrue(b.has("foo"));
        assert.equal(b.get("foo"), 42);
        a.set("bar", true);
        assert.isFalse(b.has("bar"));
      }
    },
    "forEach": {
      "empty maps have an empty keys array": function(map) {
        var m = map();
        assert.deepEqual(m.entries(), []);
        m.set("foo", "bar");
        assert.deepEqual(m.entries(), [{key: "foo", value: "bar"}]);
        m.remove("foo");
        assert.deepEqual(m.entries(), []);
      },
      "keys are returned in arbitrary order": function(map) {
        var m = map({foo: 1, bar: "42"});
        assert.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
        var m = map({bar: "42", foo: 1});
        assert.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
      },
      "observes changes via set and remove": function(map) {
        var m = map({foo: 1, bar: "42"});
        assert.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
        m.remove("foo");
        assert.deepEqual(m.entries(), [{key: "bar", value: "42"}]);
        m.set("bar", "bar");
        assert.deepEqual(m.entries(), [{key: "bar", value: "bar"}]);
        m.set("foo", "foo");
        assert.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "bar"}, {key: "foo", value: "foo"}]);
        m.remove("bar");
        assert.deepEqual(m.entries(), [{key: "foo", value: "foo"}]);
        m.remove("foo");
        assert.deepEqual(m.entries(), []);
        m.remove("foo");
        assert.deepEqual(m.entries(), []);
      }
    },
    "keys": {
      "returns an array of string keys": function(map) {
        var m = map({foo: 1, bar: "42"});
        assert.deepEqual(m.keys().sort(), ["bar", "foo"]);
      }
    },
    "values": {
      "returns an array of arbitrary values": function(map) {
        var m = map({foo: 1, bar: "42"});
        assert.deepEqual(m.values().sort(), [1, "42"]);
      }
    },
    "entries": {
      "returns an array of key-value objects": function(map) {
        var m = map({foo: 1, bar: "42"});
        assert.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
      }
    },
    "has": {
      "empty maps do not have object built-ins": function(map) {
        var m = map();
        assert.isFalse(m.has("__proto__"));
        assert.isFalse(m.has("hasOwnProperty"));
      },
      "can has keys using built-in names": function(map) {
        var m = map();
        m.set("__proto__", 42);
        assert.isTrue(m.has("__proto__"));
      },
      "can has keys with null or undefined properties": function(map) {
        var m = map();
        m.set("", "");
        m.set("null", null);
        m.set("undefined", undefined);
        assert.isTrue(m.has(""));
        assert.isTrue(m.has("null"));
        assert.isTrue(m.has("undefined"));
      },
      "coerces keys to strings": function(map) {
        var m = map({"42": "foo", "null": 1, "undefined": 2});
        assert.isTrue(m.has(42));
        assert.isTrue(m.has(null));
        assert.isTrue(m.has(undefined));
      },
      "returns the latest value": function(map) {
        var m = map({foo: 42});
        assert.isTrue(m.has("foo"));
        m.set("foo", 43);
        assert.isTrue(m.has("foo"));
        m.remove("foo");
        assert.isFalse(m.has("foo"));
        m.set("foo", "bar");
        assert.isTrue(m.has("foo"));
      },
      "returns undefined for missing keys": function(map) {
        var m = map({foo: 42});
        assert.isFalse(m.has("bar"));
      }
    },
    "get": {
      "empty maps do not have object built-ins": function(map) {
        var m = map();
        assert.isUndefined(m.get("__proto__"));
        assert.isUndefined(m.get("hasOwnProperty"));
      },
      "can get keys using built-in names": function(map) {
        var m = map();
        m.set("__proto__", 42);
        assert.equal(m.get("__proto__"), 42);
      },
      "coerces keys to strings": function(map) {
        var m = map({"42": 1, "null": 2, "undefined": 3});
        assert.equal(m.get(42), 1);
        assert.equal(m.get(null), 2);
        assert.equal(m.get(undefined), 3);
      },
      "returns the latest value": function(map) {
        var m = map({foo: 42});
        assert.equal(m.get("foo"), 42);
        m.set("foo", 43);
        assert.equal(m.get("foo"), 43);
        m.remove("foo");
        assert.isUndefined(m.get("foo"));
        m.set("foo", "bar");
        assert.equal(m.get("foo"), "bar");
      },
      "returns undefined for missing keys": function(map) {
        var m = map({foo: 42});
        assert.isUndefined(m.get("bar"));
      }
    },
    "set": {
      "returns the set value": function(map) {
        var m = map();
        assert.equal(m.set("foo", 42), 42);
      },
      "can set keys using built-in names": function(map) {
        var m = map();
        m.set("__proto__", 42);
        assert.equal(m.get("__proto__"), 42);
      },
      "coerces keys to strings": function(map) {
        var m = map();
        m.set(42, 1);
        assert.equal(m.get(42), 1);
        m.set(null, 2);
        assert.equal(m.get(null), 2);
        m.set(undefined, 3);
        assert.equal(m.get(undefined), 3);
        assert.deepEqual(m.keys().sort(), ["42", "null", "undefined"]);
      },
      "can replace values": function(map) {
        var m = map({foo: 42});
        assert.equal(m.get("foo"), 42);
        m.set("foo", 43);
        assert.equal(m.get("foo"), 43);
        m.set("foo", "bar");
        assert.equal(m.get("foo"), "bar");
      },
      "can set null, undefined or empty string values": function(map) {
        var m = map();
        m.set("", "");
        m.set("null", null);
        m.set("undefined", undefined);
        assert.equal(m.get(""), "");
        assert.isNull(m.get("null"));
        assert.isUndefined(m.get("undefined"));
      }
    }
  }
});

function ascendingByKey(a, b) {
  return a.key.localeCompare(b.key);
}

suite.export(module);

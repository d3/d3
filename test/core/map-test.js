require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.map");

suite.addBatch({
  "constructor": {
    "map() returns an empty map": function() {
      var map = d3.map();
      assert.deepEqual(map.keys(), []);
    },
    "map(null) returns an empty map": function() {
      var map = d3.map(null);
      assert.deepEqual(map.keys(), []);
    },
    "map(object) copies enumerable keys": function() {
      var map = d3.map({foo: 42});
      assert.isTrue(map.has("foo"));
      assert.equal(map.get("foo"), 42);
      var map = d3.map(Object.create(null, {foo: {value: 42, enumerable: true}}));
      assert.isTrue(map.has("foo"));
      assert.equal(map.get("foo"), 42);
    },
    "map(object) copies inherited keys": function() {
      function Foo() {}
      Foo.prototype.foo = 42;
      var map = d3.map(Object.create({foo: 42}));
      assert.isTrue(map.has("foo"));
      assert.equal(map.get("foo"), 42);
      var map = d3.map(new Foo());
      assert.isTrue(map.has("foo"));
      assert.equal(map.get("foo"), 42);
    },
    "map(object) does not copy non-enumerable keys": function() {
      var map = d3.map({__proto__: 42}); // because __proto__ isn't enumerable
      assert.isFalse(map.has("__proto__"));
      assert.isUndefined(map.get("__proto__"));
      var map = d3.map(Object.create(null, {foo: {value: 42, enumerable: false}}));
      assert.isFalse(map.has("foo"));
      assert.isUndefined(map.get("foo"));
    }
  },
  "forEach": {
    "empty maps have an empty keys array": function() {
      var map = d3.map();
      assert.deepEqual(map.entries(), []);
      map.set("foo", "bar");
      assert.deepEqual(map.entries(), [{key: "foo", value: "bar"}]);
      map.remove("foo");
      assert.deepEqual(map.entries(), []);
    },
    "keys are returned in arbitrary order": function() {
      var map = d3.map({foo: 1, bar: "42"});
      assert.deepEqual(map.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
      var map = d3.map({bar: "42", foo: 1});
      assert.deepEqual(map.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
    },
    "observes changes via set and remove": function() {
      var map = d3.map({foo: 1, bar: "42"});
      assert.deepEqual(map.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
      map.remove("foo");
      assert.deepEqual(map.entries(), [{key: "bar", value: "42"}]);
      map.set("bar", "bar");
      assert.deepEqual(map.entries(), [{key: "bar", value: "bar"}]);
      map.set("foo", "foo");
      assert.deepEqual(map.entries().sort(ascendingByKey), [{key: "bar", value: "bar"}, {key: "foo", value: "foo"}]);
      map.remove("bar");
      assert.deepEqual(map.entries(), [{key: "foo", value: "foo"}]);
      map.remove("foo");
      assert.deepEqual(map.entries(), []);
      map.remove("foo");
      assert.deepEqual(map.entries(), []);
    }
  },
  "keys": {
    "returns an array of string keys": function() {
      var map = d3.map({foo: 1, bar: "42"});
      assert.deepEqual(map.keys().sort(), ["bar", "foo"]);
    }
  },
  "values": {
    "returns an array of arbitrary values": function() {
      var map = d3.map({foo: 1, bar: "42"});
      assert.deepEqual(map.values().sort(), [1, "42"]);
    }
  },
  "entries": {
    "returns an array of key-value objects": function() {
      var map = d3.map({foo: 1, bar: "42"});
      assert.deepEqual(map.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
    }
  },
  "has": {
    "empty maps do not have object built-ins": function() {
      var map = d3.map();
      assert.isFalse(map.has("__proto__"));
      assert.isFalse(map.has("hasOwnProperty"));
    },
    "can has keys using built-in names": function() {
      var map = d3.map();
      map.set("__proto__", 42);
      assert.isTrue(map.has("__proto__"));
    },
    "can has keys with null or undefined properties": function() {
      var map = d3.map();
      map.set("", "");
      map.set("null", null);
      map.set("undefined", undefined);
      assert.isTrue(map.has(""));
      assert.isTrue(map.has("null"));
      assert.isTrue(map.has("undefined"));
    },
    "coerces keys to strings": function() {
      var map = d3.map({"42": "foo", "null": 1, "undefined": 2});
      assert.isTrue(map.has(42));
      assert.isTrue(map.has(null));
      assert.isTrue(map.has(undefined));
    },
    "returns the latest value": function() {
      var map = d3.map({foo: 42});
      assert.isTrue(map.has("foo"));
      map.set("foo", 43);
      assert.isTrue(map.has("foo"));
      map.remove("foo");
      assert.isFalse(map.has("foo"));
      map.set("foo", "bar");
      assert.isTrue(map.has("foo"));
    },
    "returns undefined for missing keys": function() {
      var map = d3.map({foo: 42});
      assert.isFalse(map.has("bar"));
    }
  },
  "get": {
    "empty maps do not have object built-ins": function() {
      var map = d3.map();
      assert.isUndefined(map.get("__proto__"));
      assert.isUndefined(map.get("hasOwnProperty"));
    },
    "can get keys using built-in names": function() {
      var map = d3.map();
      map.set("__proto__", 42);
      assert.equal(map.get("__proto__"), 42);
    },
    "coerces keys to strings": function() {
      var map = d3.map({"42": 1, "null": 2, "undefined": 3});
      assert.equal(map.get(42), 1);
      assert.equal(map.get(null), 2);
      assert.equal(map.get(undefined), 3);
    },
    "returns the latest value": function() {
      var map = d3.map({foo: 42});
      assert.equal(map.get("foo"), 42);
      map.set("foo", 43);
      assert.equal(map.get("foo"), 43);
      map.remove("foo");
      assert.isUndefined(map.get("foo"));
      map.set("foo", "bar");
      assert.equal(map.get("foo"), "bar");
    },
    "returns undefined for missing keys": function() {
      var map = d3.map({foo: 42});
      assert.isUndefined(map.get("bar"));
    }
  },
  "set": {
    "returns the set value": function() {
      var map = d3.map();
      assert.equal(map.set("foo", 42), 42);
    },
    "can set keys using built-in names": function() {
      var map = d3.map();
      map.set("__proto__", 42);
      assert.equal(map.get("__proto__"), 42);
    },
    "coerces keys to strings": function() {
      var map = d3.map();
      map.set(42, 1);
      assert.equal(map.get(42), 1);
      map.set(null, 2);
      assert.equal(map.get(null), 2);
      map.set(undefined, 3);
      assert.equal(map.get(undefined), 3);
      assert.deepEqual(map.keys().sort(), ["42", "null", "undefined"]);
    },
    "can replace values": function() {
      var map = d3.map({foo: 42});
      assert.equal(map.get("foo"), 42);
      map.set("foo", 43);
      assert.equal(map.get("foo"), 43);
      map.set("foo", "bar");
      assert.equal(map.get("foo"), "bar");
    },
    "can set null, undefined or empty string values": function() {
      var map = d3.map();
      map.set("", "");
      map.set("null", null);
      map.set("undefined", undefined);
      assert.equal(map.get(""), "");
      assert.isNull(map.get("null"));
      assert.isUndefined(map.get("undefined"));
    }
  }
});

function ascendingByKey(a, b) {
  return d3.ascending(a.key, b.key);
}

suite.export(module);

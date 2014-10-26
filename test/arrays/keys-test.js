var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.keys");

suite.addBatch({
  "keys": {
    topic: load("arrays/keys").expression("d3.keys"),
    "is not fooled by sparse arrays": function(keys) {
      var a = []; a[1] = 0;
      assert.deepEqual(keys(a), ['1']);
    },
    "returns an empty array for non-objects": function(keys) {
      assert.deepEqual(keys(null), []);
      assert.deepEqual(keys(void 0), []);
      assert.deepEqual(keys(1), []);
      assert.deepEqual(keys('a'), []);
      assert.deepEqual(keys(true), []);
    },
    "enumerates every defined key": function(keys) {
      assert.deepEqual(keys({a: 1, b: 1}), ["a", "b"]);
    },
    "includes keys defined on prototypes": function(keys) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(keys(new abc()), ["a", "b", "c"]);
    },
    "includes keys with null or undefined values": function(keys) {
      assert.deepEqual(keys({a: undefined, b: null, c: NaN}), ["a", "b", "c"]);
    },
    "includes keys that may be missed if the implementation isn't careful": function(keys) {
      var trouble = {
        'constructor': Object,
        'hasOwnProperty': null,
        'toString': 5,
        'toLocaleString': undefined,
        'propertyIsEnumerable': /a/,
        'isPrototypeOf': this,
        '__defineGetter__': Boolean,
        '__defineSetter__': {},
        '__lookupSetter__': false,
        '__lookupGetter__': []
      };
      var troubleKeys = ['constructor', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                  'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'].sort();
      assert.deepEqual(keys(trouble).sort(), troubleKeys);
    }
  }
});

suite.export(module);

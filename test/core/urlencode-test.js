require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.urlencode");

suite.addBatch({
  "urlencode": {
    topic: function() {
      return d3.urlencode;
    },
    "returns an instanceof d3.urlencode": function(urlencode) {
      assert.instanceOf(urlencode(), d3.urlencode);
    },
    "returns an array": function(urlencode) {
      assert.isArray(urlencode(), d3.urlencode);
      assert.deepEqual(urlencode("foo", 2).and("bar"), ["foo=2", "bar"]);
    },
    "can be empty": function(urlencode) {
      assert.strictEqual(urlencode() + "", "");
    },
    "can be modified via array methods, albeit unsafely": function(urlencode) {
      var u = urlencode("foo", 1).and("bar", 2).and("baz", 3);
      u.splice(1, 1);
      u.push("unsafe=true")
      u.sort();
      assert.strictEqual(u + "", "baz=3&foo=1&unsafe=true");
    },
    "has the type application/x-www-form-urlencoded;charset=utf-8": function(urlencode) {
      assert.strictEqual(urlencode().type, "application/x-www-form-urlencoded;charset=utf-8");
    },
    "encodes the name and value per the HTML 4.01 specification": function(urlencode) {
      assert.strictEqual(urlencode("foo", "bar") + "", "foo=bar");
      assert.strictEqual(urlencode("f o", "b r") + "", "f+o=b+r"); // not %20
      assert.strictEqual(urlencode("foo", "bär") + "", "foo=b%C3%A4r"); // UTF-8 bytes
    },
    "coerces the name and value to strings": function(urlencode) {
      var foo = {toString: function() { return "foo"; }},
          bar = new String("bar");
      assert.strictEqual(urlencode(foo, bar) + "", "foo=bar");
    },
    "and": {
      "modifies the urlencode in-place": function(urlencode) {
        var u = urlencode("foo", "bar");
        assert.strictEqual(u.and("baz"), u);
        assert.strictEqual(u + "", "foo=bar&baz");
      },
      "supports multiple values with the same name": function(urlencode) {
        assert.strictEqual(urlencode("foo", 1).and("foo", 2) + "", "foo=1&foo=2");
      }
    },
    "ignores the value if null or undefined": function(urlencode) {
      assert.strictEqual(urlencode("foo") + "", "foo");
      assert.strictEqual(urlencode("foo", null) + "", "foo");
      assert.strictEqual(urlencode("foo", undefined) + "", "foo");
    },
    "does not ignore the value if the empty string": function(urlencode) {
      assert.strictEqual(urlencode("foo", "") + "", "foo=");
    },
    "does not ignore the value if falsey": function(urlencode) {
      assert.strictEqual(urlencode("foo", 0).and("bar", false) + "", "foo=0&bar=false");
    }
  }
});

suite.export(module);

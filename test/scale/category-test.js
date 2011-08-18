require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.category");

suite.addBatch({
  "category10": category(d3.scale.category10, 10),
  "category20": category(d3.scale.category20, 20),
  "category20b": category(d3.scale.category20b, 20),
  "category20c": category(d3.scale.category20c, 20)
});

function category(category, n) {
  return {
    "is an ordinal scale": function() {
      var x = category();
      assert.length(x.domain(), 0);
      assert.length(x.range(), n);
    },
    "each instance is isolated": function() {
      var a = category(), b = category(), colors = a.range();
      assert.equal(a(1), colors[0]);
      assert.equal(b(2), colors[0]);
      assert.equal(b(1), colors[1]);
      assert.equal(a(1), colors[0]);
    },
    "discrete domain values are remembered": function() {
      var x = category(), colors = x.range();
      assert.equal(x(1), colors[0]);
      assert.equal(x(2), colors[1]);
      assert.equal(x(1), colors[0]);
    },
    "recycles range values when exhausted": function() {
      var x = category();
      for (var i = 0; i < n; ++i) x(i);
      for (; i < 2 * n; ++i) assert.equal(x(i), x(i - n));
    },
    "contains the expected number of values in the range": function() {
      var x = category();
      assert.length(x.range(), n);
    },
    "each range value is distinct": function() {
      var map = {}, count = 0, x = category();
      x.range().forEach(function(v) {
        if (!(v in map)) {
          map[v] = ++count;
        }
      });
      assert.equal(count, x.range().length);
    },
    "each range value is a hexadecimal color": function() {
      var x = category();
      x.range().forEach(function(v) {
        assert.match(v, /#[0-9a-f]{6}/);
        v = d3.rgb(v);
        assert.isFalse(isNaN(v.r));
        assert.isFalse(isNaN(v.g));
        assert.isFalse(isNaN(v.b));
      });
    },
    "no range values are very dark or very light": function() {
      var x = category();
      x.range().forEach(function(v) {
        var c = d3.hsl(v);
        assert.isTrue(c.l >= .34, "expected " + v + " to be lighter (l = " + c.l + ")");
        assert.isTrue(c.l <= .89, "expected " + v + " to be darker (l = " + c.l + ")");
      });
    }
  };
}

suite.export(module);

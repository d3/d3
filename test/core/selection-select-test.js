require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.select");

suite.addBatch({
  "select(body)": {
    topic: function() {
      var body = d3.select("body").html("");
      body.append("div").attr("class", "first");
      body.append("div").attr("class", "second");
      return body;
    },
    "selects the first matching element": function(body) {
      var div = body.select("div");
      assert.isTrue(div[0][0] === document.body.firstChild);
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 1);
      assert.equal(div.attr("class"), "first");
    },
    "propagates parent node to the selected elements": function(body) {
      var div = body.select("div");
      assert.isNotNull(div[0].parentNode);
      assert.isTrue(div[0].parentNode === document.documentElement);
      assert.isTrue(div[0].parentNode === body[0].parentNode);
    },
    "propagates data to the selected elements": function(body) {
      var data = new Object(), div = body.data([data]).select("div");
      assert.strictEqual(div[0][0].__data__, data);
    },
    "does not propagate data if no data was specified": function(body) {
      delete document.body.__data__;
      var data = new Object(), div = body.select("div").data([data]);
      div = body.select("div");
      assert.strictEqual(div[0][0].__data__, data);
      assert.isUndefined(document.body.__data__);
    },
    "returns null if no match is found": function(body) {
      var span = body.select("span");
      assert.equal(span[0][0], null);
      assert.equal(span.length, 1);
      assert.equal(span[0].length, 1);
    },
    "can select via function": function(body) {
      body.append("foo");
      var d = {}, dd = [], ii = [], tt = [],
          s = body.data([d]).select(function(d, i) { dd.push(d); ii.push(i); tt.push(this); return this.firstChild; });
      assert.deepEqual(dd, [d], "expected data, got {actual}");
      assert.deepEqual(ii, [0], "expected index, got {actual}");
      assert.domEqual(tt[0], document.body, "expected this, got {actual}");
      assert.domEqual(s[0][0], document.body.firstChild);
      delete document.body.__data__;
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      var div = d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
      div.append("span").attr("class", "first");
      div.append("span").attr("class", "second");
      return div;
    },
    "selects the first matching element": function(div) {
      var span = div.select("span");
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(span[0][1].parentNode === div[0][1]);
      assert.equal(span.length, 1);
      assert.equal(span[0].length, 2);
      assert.equal(span.attr("class"), "first");
    },
    "propagates parent node to the selected elements": function(div) {
      var span = div.select("span");
      assert.isNotNull(span[0].parentNode);
      assert.isTrue(span[0].parentNode === document.body);
      assert.isTrue(span[0].parentNode === div[0].parentNode);
    },
    "propagates data to the selected elements": function(div) {
      var data = new Object(), span = div.data([data]).select("span");
      assert.strictEqual(span[0][0].__data__, data);
    },
    "does not propagate data if no data was specified": function(div) {
      delete div[0][0].__data__;
      delete div[0][1].__data__;
      var a = new Object(), b = new Object(), span = div.select("span").data([a, b]);
      span = div.select("span");
      assert.strictEqual(span[0][0].__data__, a);
      assert.strictEqual(span[0][1].__data__, b);
      assert.isUndefined(div[0][0].__data__);
      assert.isUndefined(div[0][1].__data__);
    },
    "returns null if no match is found": function(div) {
      var div = div.select("div");
      assert.equal(div[0][0], null);
      assert.equal(div[0][1], null);
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 2);
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][1] = null;
      var span = some.select("span");
      assert.equal(span.length, 1);
      assert.equal(span[0].length, 2);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isNull(span[0][1]);
    },
    "can select via function": function(div) {
      var dd = [], ii = [], tt = [],
          s = div.data(["a", "b"]).select(function(d, i) { dd.push(d); ii.push(i); tt.push(this); return this.firstChild; });
      assert.deepEqual(dd, ["a", "b"], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.domEqual(tt[0], div[0][0], "expected this, got {actual}");
      assert.domEqual(tt[1], div[0][1], "expected this, got {actual}");
      assert.domEqual(s[0][0], div[0][0].firstChild);
      assert.domEqual(s[0][1], div[0][1].firstChild);
    }
  }
});

suite.export(module);

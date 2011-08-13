require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.selectAll");

suite.addBatch({
  "select(body)": {
    topic: function() {
      var body = d3.select("body").html("");
      body.append("div").attr("class", "first");
      body.append("div").attr("class", "second");
      return body;
    },
    "selects all matching elements": function(body) {
      var div = body.selectAll("div");
      assert.isTrue(div[0][0] === document.body.firstChild);
      assert.isTrue(div[0][1] === document.body.lastChild);
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 2);
    },
    "propagates parent node to the selected elements": function(body) {
      var div = body.selectAll("div");
      assert.isNotNull(div[0].parentNode);
      assert.isTrue(div[0].parentNode === document.body);
    },
    "does not propagate data if data was specified": function(body) {
      var div = body.data([new Object()]).selectAll("div");
      assert.isUndefined(div[0][0].__data__);
      assert.isUndefined(div[0][1].__data__);
    },
    "does not propagate data if data was not specified": function(body) {
      var div = body.selectAll("div").data([1, 2]);
      div = body.data([new Object()]).selectAll("div");
      assert.equal(div[0][0].__data__, 1);
      assert.equal(div[0][1].__data__, 2);
    },
    "returns empty array if no match is found": function(body) {
      var span = body.selectAll("span");
      assert.equal(span.length, 1);
      assert.equal(span[0].length, 0);
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
    "selects all matching elements": function(div) {
      var span = div.selectAll("span");
      assert.equal(span.length, 2);
      assert.equal(span[0].length, 2);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(span[0][1].parentNode === div[0][0]);
      assert.isTrue(span[1][0].parentNode === div[0][1]);
      assert.isTrue(span[1][1].parentNode === div[0][1]);
    },
    "propagates parent node to the selected elements": function(div) {
      var span = div.selectAll("span");
      assert.isNotNull(span[0].parentNode);
      assert.isTrue(span[0].parentNode === div[0][0]);
      assert.isTrue(span[1].parentNode === div[0][1]);
    },
    "does not propagate data if data was specified": function(div) {
      var span = div.selectAll("span");
      delete span[0][0].__data__;
      delete span[0][1].__data__;
      span = div.data([new Object(), new Object()]).selectAll("span");
      assert.isUndefined(span[0][0].__data__);
      assert.isUndefined(span[0][1].__data__);
    },
    "does not propagate data if data was not specified": function(div) {
      var a = new Object(), b = new Object(), span = div.selectAll("span").data([a, b]);
      delete div[0][0].__data__;
      delete div[0][1].__data__;
      span = div.selectAll("span");
      assert.equal(span[0][0].__data__, a);
      assert.equal(span[0][1].__data__, b);
    },
    "returns empty array if no match is found": function(div) {
      var div = div.selectAll("div");
      assert.equal(div.length, 2);
      assert.equal(div[0].length, 0);
      assert.equal(div[1].length, 0);
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][1] = null;
      var span = some.selectAll("span");
      assert.equal(span.length, 1);
      assert.equal(span[0].length, 2);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(span[0][1].parentNode === div[0][0]);
    }
  }
});

suite.export(module);

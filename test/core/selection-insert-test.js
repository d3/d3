require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.insert");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "inserts before the specified selector": function(body) {
      var span = body.html("").append("span");
      var div = body.insert("div", "span");
      assert.equal(div[0][0].tagName, "DIV");
      assert.isNull(div[0][0].namespaceURI);
      assert.domEqual(div[0][0], document.body.firstChild);
      assert.domEqual(div[0][0].nextSibling, span[0][0]);
    },
    "appends an HTML element": function(body) {
      var div = body.insert("div");
      assert.equal(div[0][0].tagName, "DIV");
      assert.isNull(div[0][0].namespaceURI);
      assert.domEqual(div[0][0], document.body.lastChild);
    },
    "appends an SVG element": function(body) {
      var svg = body.insert("svg:svg");
      assert.equal(svg[0][0].tagName, "SVG");
      assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
      assert.domEqual(svg[0][0].parentNode, document.body);
      assert.domEqual(svg[0][0], document.body.lastChild);
    },
    "propagates data to new element": function(body) {
      var data = new Object(), div = body.data([data]).insert("div");
      assert.strictEqual(div[0][0].__data__, data);
    },
    "returns a new selection": function(body) {
      assert.isFalse(body.insert("div") === body);
    },
    "inherits namespace from parent node": function(body) {
      var g = body.insert("svg:svg").insert("g");
      assert.equal(g[0][0].namespaceURI, "http://www.w3.org/2000/svg");
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().insert("div");
    },
    "appends an HTML element": function(div) {
      var span = div.insert("span");
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.equal(span[0][1].tagName, "SPAN");
      assert.isNull(span[0][0].namespaceURI);
      assert.isNull(span[0][1].namespaceURI);
      assert.domEqual(span[0][0].parentNode, div[0][0]);
      assert.domEqual(span[0][1].parentNode, div[0][1]);
      assert.domEqual(div[0][0].lastChild, span[0][0]);
      assert.domEqual(div[0][1].lastChild, span[0][1]);
    },
    "appends an SVG element": function(div) {
      var svg = div.insert("svg:svg");
      assert.equal(svg[0].length, 2);
      assert.equal(svg[0][0].tagName, "SVG");
      assert.equal(svg[0][1].tagName, "SVG");
      assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
      assert.equal(svg[0][1].namespaceURI, "http://www.w3.org/2000/svg");
      assert.domEqual(svg[0][0].parentNode, div[0][0]);
      assert.domEqual(svg[0][1].parentNode, div[0][1]);
      assert.domEqual(div[0][0].lastChild, svg[0][0]);
      assert.domEqual(div[0][1].lastChild, svg[0][1]);
    },
    "ignores null nodes": function(div) {
      div.html("");
      var some = d3.selectAll("div");
      some[0][1] = null;
      var span = some.insert("span");
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.domNull(span[0][1]);
      assert.domEqual(span[0][0].parentNode, div[0][0]);
      assert.domEqual(div[0][0].lastChild, span[0][0]);
      assert.domNull(div[0][1].lastChild);
    },
    "propagates data to new elements": function(div) {
      var a = new Object(), b = new Object(), span = div.data([a, b]).insert("span");
      assert.strictEqual(span[0][0].__data__, a);
      assert.strictEqual(span[0][1].__data__, b);
    },
    "returns a new selection": function(div) {
      assert.isFalse(div.insert("div") === div);
    }
  }
});

suite.addBatch({
  "selectAll(div).data(…).enter()": {
    topic: function() {
      return d3.select("body");
    },
    "inserts before the specified selector": function(body) {
      var span = body.html("").append("span");
      var div = body.selectAll("div").data(d3.range(2)).enter().insert("div", "span");
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 2);
      assert.domEqual(div[0][0], document.body.firstChild);
      assert.domEqual(div[0][1].previousSibling, div[0][0]);
      assert.domEqual(div[0][1].nextSibling, span[0][0]);
    },
    "propagates data to new elements": function(body) {
      var a = new Object(), b = new Object(), div = body.html("").selectAll("div").data([a, b]).enter().insert("div");
      assert.strictEqual(div[0][0].__data__, a);
      assert.strictEqual(div[0][1].__data__, b);
    },
    "ignores null nodes": function(body) {
      body.html("").insert("div");
      var div = body.selectAll("div").data(d3.range(3)).enter().insert("div");
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 3);
      assert.domNull(div[0][0]);
      assert.domEqual(div[0][1].parentNode, document.body);
      assert.domEqual(div[0][2].parentNode, document.body);
    },
    "returns a new selection": function(body) {
      var enter = body.html("").selectAll("div").data([0, 1]).enter();
      assert.isFalse(enter.insert("div") === enter);
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.insert");

suite.addBatch({
  "select(body)": {
    topic: load("selection/insert").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "inserts before the specified selector": function(body) {
        var span = body.html("").append("span");
        var div = body.insert("div", "span");
        assert.equal(div[0][0].tagName, "DIV");
        assert.isNull(div[0][0].namespaceURI);
        assert.domEqual(div[0][0], body.node().firstChild);
        assert.domEqual(div[0][0].nextSibling, span[0][0]);
      },
      "inserts before the specified node": function(body) {
        var span = body.html("").append("span");
        var div = body.insert("div", function() { return span.node(); });
        assert.equal(div[0][0].tagName, "DIV");
        assert.isNull(div[0][0].namespaceURI);
        assert.domEqual(div[0][0], body.node().firstChild);
        assert.domEqual(div[0][0].nextSibling, span[0][0]);
      },
      "appends an HTML element": function(body) {
        var div = body.insert("div");
        assert.equal(div[0][0].tagName, "DIV");
        assert.isNull(div[0][0].namespaceURI);
        assert.domEqual(div[0][0], body.node().lastChild);
      },
      "appends an SVG element": function(body) {
        var svg = body.insert("svg:svg");
        assert.equal(svg[0][0].tagName, "SVG");
        assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
        assert.domEqual(svg[0][0].parentNode, body.node());
        assert.domEqual(svg[0][0], body.node().lastChild);
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
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/selection").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().insert("div");
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
      "propagates data to new elements": function(div) {
        var a = new Object(), b = new Object(), span = div.data([a, b]).insert("span");
        assert.strictEqual(span[0][0].__data__, a);
        assert.strictEqual(span[0][1].__data__, b);
      },
      "returns a new selection": function(div) {
        assert.isFalse(div.insert("div") === div);
      },
      "ignores null nodes": function(div) {
        div.html("");
        var node = div[0][1];
        div[0][1] = null;
        var span = div.insert("span");
        assert.equal(span[0].length, 2);
        assert.equal(span[0][0].tagName, "SPAN");
        assert.domNull(span[0][1]);
        assert.domEqual(span[0][0].parentNode, div[0][0]);
        assert.domEqual(div[0][0].lastChild, span[0][0]);
        assert.domNull(node.lastChild);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div).data(…).enter()": {
    topic: load("selection/selection").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "inserts before the specified selector": function(body) {
        var span = body.append("span");
        var div = body.selectAll("div").data([0, 1]).enter().insert("div", "span");
        assert.equal(div.length, 1);
        assert.equal(div[0].length, 2);
        assert.domEqual(div[0][0], body.node().firstChild);
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
        var div = body.selectAll("div").data([0, 1, 2]).enter().insert("div");
        assert.equal(div.length, 1);
        assert.equal(div[0].length, 3);
        assert.domNull(div[0][0]);
        assert.domEqual(div[0][1].parentNode, body.node());
        assert.domEqual(div[0][2].parentNode, body.node());
      },
      "returns a new selection": function(body) {
        var enter = body.html("").selectAll("div").data([0, 1]).enter();
        assert.isFalse(enter.insert("div") === enter);
      }
    }
  }
});

suite.export(module);

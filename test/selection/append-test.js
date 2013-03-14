var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.append");

suite.addBatch({
  "select(body)": {
    topic: load("selection/selection").sandbox({
      document: document,
      window: window
    }).expression("d3.select"),
    "on a simple page": {
      topic: function(select) {
        return select("body").html("");
      },
      "appends an HTML element": function(body) {
        var div = body.append("div");
        assert.equal(div[0][0].tagName, "DIV");
        assert.isNull(div[0][0].namespaceURI);
        assert.isTrue(div[0][0].parentNode === document.body);
        assert.isTrue(div[0][0] === document.body.lastChild);
      },
      "appends an SVG element": function(body) {
        var svg = body.append("svg:svg");
        assert.equal(svg[0][0].tagName, "SVG");
        assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
        assert.isTrue(svg[0][0].parentNode === document.body);
        assert.isTrue(svg[0][0] === document.body.lastChild);
      },
      "propagates data to new element": function(body) {
        var data = new Object(), div = body.data([data]).append("div");
        assert.strictEqual(div[0][0].__data__, data);
      },
      "returns a new selection": function(body) {
        assert.isFalse(body.append("div") === body);
      },
      "inherits namespace from parent node": function(body) {
        var g = body.append("svg:svg").append("g");
        assert.equal(g[0][0].namespaceURI, "http://www.w3.org/2000/svg");
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/selection").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").html("").selectAll("div").data([0, 1]).enter().append("div");
      },
      "appends an HTML element": function(div) {
        var span = div.append("span");
        assert.equal(span[0].length, 2);
        assert.equal(span[0][0].tagName, "SPAN");
        assert.equal(span[0][1].tagName, "SPAN");
        assert.isNull(span[0][0].namespaceURI);
        assert.isNull(span[0][1].namespaceURI);
        assert.isTrue(span[0][0].parentNode === div[0][0]);
        assert.isTrue(span[0][1].parentNode === div[0][1]);
        assert.isTrue(div[0][0].lastChild === span[0][0]);
        assert.isTrue(div[0][1].lastChild === span[0][1]);
      },
      "appends an SVG element": function(div) {
        var svg = div.append("svg:svg");
        assert.equal(svg[0].length, 2);
        assert.equal(svg[0][0].tagName, "SVG");
        assert.equal(svg[0][1].tagName, "SVG");
        assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
        assert.equal(svg[0][1].namespaceURI, "http://www.w3.org/2000/svg");
        assert.isTrue(svg[0][0].parentNode === div[0][0]);
        assert.isTrue(svg[0][1].parentNode === div[0][1]);
        assert.isTrue(div[0][0].lastChild === svg[0][0]);
        assert.isTrue(div[0][1].lastChild === svg[0][1]);
      },
      "propagates data to new elements": function(div) {
        var a = new Object(), b = new Object(), span = div.data([a, b]).append("span");
        assert.strictEqual(span[0][0].__data__, a);
        assert.strictEqual(span[0][1].__data__, b);
      },
      "returns a new selection": function(div) {
        assert.isFalse(div.append("div") === div);
      }
    },
    "ignores null nodes": function(d3) {
      var div = d3.select("body").html("").selectAll("div").data([0, 1]).enter().append("div"),
          some = d3.selectAll("div");
      some[0][1] = null;
      var span = some.append("span");
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.isNull(span[0][1]);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(div[0][0].lastChild === span[0][0]);
      assert.isNull(div[0][1].lastChild);
    }
  }
});

suite.addBatch({
  "selectAll(div).data(…).enter()": {
    topic: load("selection/selection").sandbox({
      document: document,
      window: window
    }).expression("d3.select"),
    "on a simple page": {
      topic: function(select) {
        return select("body");
      },
      "appends to the parent node": function(body) {
        var div = body.html("").selectAll("div").data(d3.range(2)).enter().append("div");
        assert.equal(div.length, 1);
        assert.equal(div[0].length, 2);
        assert.domEqual(div[0][0].parentNode, document.body);
        assert.domEqual(div[0][1].parentNode, document.body);
      },
      "propagates data to new elements": function(body) {
        var a = new Object(), b = new Object(), div = body.html("").selectAll("div").data([a, b]).enter().append("div");
        assert.strictEqual(div[0][0].__data__, a);
        assert.strictEqual(div[0][1].__data__, b);
      },
      "ignores null nodes": function(body) {
        body.html("").append("div");
        var div = body.selectAll("div").data(d3.range(3)).enter().append("div");
        assert.equal(div.length, 1);
        assert.equal(div[0].length, 3);
        assert.domNull(div[0][0]);
        assert.domEqual(div[0][1].parentNode, document.body);
        assert.domEqual(div[0][2].parentNode, document.body);
      }
    }
  }
});

suite.export(module);

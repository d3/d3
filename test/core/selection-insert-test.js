require("../env");

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
    "appends naked DOM nodes": function(body) {
      var span = body.insert(document.createElement("span"));
      assert.equal(span[0][0].tagName, "SPAN");
      assert.domEqual(span[0][0].parentNode, document.body);
      assert.domEqual(span[0][0], document.body.lastChild);
    },
    "inserts before naked nodes": function(body) {
      var span = body.html("").append("span");
      var div  = body.insert("div", span[0][0]);
      assert.equal(div[0][0].tagName, "DIV");
      assert.domEqual(div[0][0].nextSibling, span[0][0]);
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
    "accepts DOM nodes via a function argument": function(div) {
      var span = div.insert(function(data, i) {
        var node = document.createElement("span");
        node.className = "node-" + data + "-" + i;
        return node;
      });
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.equal(span[0][0].className, "node-0-0");
      assert.equal(span[0][1].tagName, "SPAN");
      assert.equal(span[0][1].className, "node-1-1");
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
    "calls function arguments for the node name": function(body) {
      body.html("").append("thing");

      var vals = ["div", "h1", "span", "h2"];
      var div  = body.selectAll("div").data(vals).enter().insert(function(d) {return d;}, "thing");

      assert.equal(div.length, 1);
      assert.equal(div[0].length, 4);
      assert.equal(div[0][0].nodeName, "DIV");
      assert.equal(div[0][1].nodeName, "H1");
      assert.equal(div[0][2].nodeName, "SPAN");
      assert.equal(div[0][3].nodeName, "H2");
    },
    "calls function arguments for insert target node": function(body) {
      var nodes = body.html("").selectAll("*");
      nodes.data([27]).enter().append("node27");

      var moreData = [0,1,12,26,27,99];
      nodes = nodes.data(moreData).enter().insert(
        function(d,i) { return "node" + d; }, function(d,i) { return "node" + moreData[i - 1]; }
      );

      assert.equal(nodes.length, 1);
      assert.equal(nodes[0].length, 6);
      assert.equal(nodes[0][0].nodeName, "NODE0");
      assert.equal(nodes[0][1].nodeName, "NODE1");
      assert.equal(nodes[0][2].nodeName, "NODE12");
      assert.equal(nodes[0][3].nodeName, "NODE26");
      assert.equal(nodes[0][4].nodeName, "NODE27");
      assert.equal(nodes[0][5].nodeName, "NODE99");
    },
    "returns a new selection": function(body) {
      var enter = body.html("").selectAll("div").data([0, 1]).enter();
      assert.isFalse(enter.insert("div") === enter);
    }
  }
});

suite.export(module);

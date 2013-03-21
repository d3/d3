var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.html");

suite.addBatch({
  "select(body)": {
    topic: load("selection/selection").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "sets the inner HTML as a string": function(body) {
        body.html("<h1>Hello, world!</h1>");
        assert.equal(body.node().firstChild.tagName, "H1");
        assert.equal(body.node().firstChild.textContent, "Hello, world!");
      },
      "sets the inner HTML as a number": function(body) {
        body.html(42);
        assert.equal(body.node().innerHTML, "42");
        assert.equal(body.node().firstChild.nodeType, 3);
      },
      "sets the inner HTML as a function": function(body) {
        body.data(["Subject"]).html(function(d, i) { return "<b>" + d + "</b><i>" + i + "</i>"; });
        assert.equal(body.node().firstChild.tagName, "B");
        assert.equal(body.node().firstChild.textContent, "Subject");
        assert.equal(body.node().lastChild.tagName, "I");
        assert.equal(body.node().lastChild.textContent, "0");
      },
      "clears the inner HTML as null": function(body) {
        body.html(null);
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "clears the inner HTML as undefined": function(body) {
        body.html(undefined);
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "clears the inner HTML as the empty string": function(body) {
        body.html("");
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "clears the inner HTML as a function returning the empty string": function(body) {
        body.text(function() { return ""; });
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "clears the inner HTML as a function returning null": function(body) {
        body.text(function() { return null; });
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "clears the inner HTML as a function returning undefined": function(body) {
        body.text(function() { return undefined; });
        assert.equal(body.node().innerHTML, "");
        assert.isNull(body.node().firstChild);
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.html("foo") === body);
      },
      "ignores null nodes": function(body) {
        var node = body.node();
        body[0][0] = null;
        node.innerHTML = "<h1>foo</h1>";
        body.html("bar");
        assert.equal(node.textContent, "foo");
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/selection").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "sets the inner HTML as a string": function(div) {
        div.html("<h1>Hello, world!</h1>");
        assert.equal(div[0][0].firstChild.tagName, "H1");
        assert.equal(div[0][0].firstChild.textContent, "Hello, world!");
        assert.equal(div[0][1].firstChild.tagName, "H1");
        assert.equal(div[0][1].firstChild.textContent, "Hello, world!");
      },
      "sets the inner HTML as a number": function(div) {
        div.html(42);
        assert.equal(div[0][0].innerHTML, "42");
        assert.equal(div[0][0].firstChild.nodeType, 3);
      },
      "sets the inner HTML as a function": function(div) {
        div.data(["foo", "bar"]).html(function(d, i) { return "<b>" + d + "</b><i>" + i + "</i>"; });
        assert.equal(div[0][0].firstChild.tagName, "B");
        assert.equal(div[0][0].firstChild.textContent, "foo");
        assert.equal(div[0][0].lastChild.tagName, "I");
        assert.equal(div[0][0].lastChild.textContent, "0");
        assert.equal(div[0][1].firstChild.tagName, "B");
        assert.equal(div[0][1].firstChild.textContent, "bar");
        assert.equal(div[0][1].lastChild.tagName, "I");
        assert.equal(div[0][1].lastChild.textContent, "1");
      },
      "clears the inner HTML as null": function(div) {
        div.html(null);
        assert.equal(div[0][0].innerHTML, "");
        assert.isNull(div[0][0].firstChild);
        assert.equal(div[0][1].innerHTML, "");
        assert.isNull(div[0][1].firstChild);
      },
      "clears the inner HTML as a function": function(div) {
        div.html(function() { return ""; });
        assert.equal(div[0][0].innerHTML, "");
        assert.isNull(div[0][0].firstChild);
        assert.equal(div[0][1].innerHTML, "");
        assert.isNull(div[0][1].firstChild);
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.html("foo") === div);
      },
      "ignores null nodes": function(div) {
        var node = div[0][0];
        div[0][0] = null;
        node.innerHTML = "<h1>foo</h1>";
        div.html("bar");
        assert.equal(node.textContent, "foo");
        assert.equal(div[0][1].textContent, "bar");
      }
    }
  }
});

suite.export(module);

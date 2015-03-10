var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.text");

suite.addBatch({
  "on select(body)": {
    topic: load("selection/text").document(),
    "on an initially-empty page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "sets the text content as a string": function(body) {
        body.text("Hello, world!");
        assert.equal(body.node().textContent, "Hello, world!");
      },
      "sets the text content as a number": function(body) {
        body.text(42);
        assert.equal(body.node().textContent, "42");
      },
      "sets the text content as a function": function(body) {
        body.data(["Subject"]).text(function(d, i) { return "Hello, " + d + " " + i + "!"; });
        assert.equal(body.node().textContent, "Hello, Subject 0!");
      },
      "escapes html content to text": function(body) {
        body.text("<h1>Hello, world!</h1>");
        assert.equal(body.node().textContent, "<h1>Hello, world!</h1>");
        assert.equal(body.node().firstChild.nodeType, 3);
      },
      "clears the text content as null": function(body) {
        body.text(null);
        assert.equal(body.node().textContent, "");
      },
      "clears the text content as undefined": function(body) {
        body.text(undefined);
        assert.equal(body.node().textContent, "");
      },
      "clears the text content as a function returning null": function(body) {
        body.text(function() { return null; });
        assert.equal(body.node().textContent, "");
      },
      "clears the text content as a function returning undefined": function(body) {
        body.text(function() { return undefined; });
        assert.equal(body.node().textContent, "");
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.text("hello") === body);
      },
      "ignores null nodes": function(body) {
        var node = body.node();
        node.textContent = "foo";
        body[0][0] = null;
        body.text("bar");
        assert.equal(node.textContent, "foo");
      }
    }
  }
});

suite.addBatch({
  "on selectAll(div)": {
    topic: load("selection/text").document(),
    "on a page with a few divs": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "sets the text content as a string": function(div) {
        div.text("Hello, world!");
        assert.equal(div[0][0].textContent, "Hello, world!");
        assert.equal(div[0][1].textContent, "Hello, world!");
      },
      "sets the text content as a number": function(div) {
        div.text(42);
        assert.equal(div[0][0].textContent, "42");
        assert.equal(div[0][1].textContent, "42");
      },
      "sets the text content as a function": function(div) {
        div.data(["foo", "bar"]).text(function(d, i) { return "Hello, " + d + " " + i + "!"; });
        assert.equal(div[0][0].textContent, "Hello, foo 0!");
        assert.equal(div[0][1].textContent, "Hello, bar 1!");
      },
      "escapes html content to text": function(div) {
        div.text("<h1>Hello, world!</h1>");
        assert.equal(div[0][0].textContent, "<h1>Hello, world!</h1>");
        assert.equal(div[0][1].textContent, "<h1>Hello, world!</h1>");
        assert.equal(div[0][0].firstChild.nodeType, 3);
        assert.equal(div[0][1].firstChild.nodeType, 3);
      },
      "clears the text content as null": function(div) {
        div.text(null);
        assert.equal(div[0][0].textContent, "");
        assert.equal(div[0][1].textContent, "");
      },
      "clears the text content as a function": function(div) {
        div.text(function() { return null; });
        assert.equal(div[0][0].textContent, "");
        assert.equal(div[0][1].textContent, "");
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.text("hello") === div);
      },
      "ignores null nodes": function(div) {
        var node = div[0][0];
        node.textContent = "foo";
        div[0][0] = null;
        div.text("bar");
        assert.equal(node.textContent, "foo");
        assert.equal(div[0][1].textContent, "bar");
      }
    }
  }
});

suite.export(module);

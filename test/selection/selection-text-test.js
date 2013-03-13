require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("selection.text");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "sets the text content as a string": function(body) {
      body.text("Hello, world!");
      assert.equal(document.body.textContent, "Hello, world!");
    },
    "sets the text content as a number": function(body) {
      body.text(42);
      assert.equal(document.body.textContent, "42");
    },
    "sets the text content as a function": function(body) {
      body.data(["Subject"]).text(function(d, i) { return "Hello, " + d + " " + i + "!"; });
      assert.equal(document.body.textContent, "Hello, Subject 0!");
    },
    "escapes html content to text": function(body) {
      body.text("<h1>Hello, world!</h1>");
      assert.equal(document.body.textContent, "<h1>Hello, world!</h1>");
      assert.equal(document.body.firstChild.nodeType, document.TEXT_NODE);
    },
    "clears the text content as null": function(body) {
      body.text(null);
      assert.equal(document.body.textContent, "");
    },
    "clears the text content as undefined": function(body) {
      body.text(undefined);
      assert.equal(document.body.textContent, "");
    },
    "clears the text content as a function returning null": function(body) {
      body.text(function() { return null; });
      assert.equal(document.body.textContent, "");
    },
    "clears the text content as a function returning undefined": function(body) {
      body.text(function() { return undefined; });
      assert.equal(document.body.textContent, "");
    },
    "ignores null nodes": function() {
      var body = d3.select("body");
      body[0][0] = null;
      document.body.textContent = "foo";
      body.text("bar");
      assert.equal(document.body.textContent, "foo");
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.text("hello") === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
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
      assert.equal(div[0][0].firstChild.nodeType, document.TEXT_NODE);
      assert.equal(div[0][1].firstChild.nodeType, document.TEXT_NODE);
    },
    /*
    https://github.com/tmpvar/jsdom/issues/276
    "clears the text content as null": function(div) {
      div.text(null);
      assert.equal(div[0][0].textContent, "");
      assert.equal(div[0][1].textContent, "");
    },
    "clears the text content as a function": function(div) {
      div.text(function() { return null; });
      assert.equal(dv[0][0].textContent, "");
      assert.equal(dv[0][1].textContent, "");
    },
    */
    "ignores null nodes": function(div) {
      div[0][0].textContent = "foo";
      var some = d3.selectAll("div");
      some[0][0] = null;
      some.text("bar");
      assert.equal(div[0][0].textContent, "foo");
      assert.equal(div[0][1].textContent, "bar");
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.text("hello") === div);
    }
  }
});

suite.export(module);

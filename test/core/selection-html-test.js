require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.html");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "sets the inner HTML as a string": function(body) {
      body.html("<h1>Hello, world!</h1>");
      assert.equal(document.body.firstChild.tagName, "H1");
      assert.equal(document.body.firstChild.textContent, "Hello, world!");
    },
    "sets the inner HTML as a number": function(body) {
      body.html(42);
      assert.equal(document.body.innerHTML, "42");
      assert.equal(document.body.firstChild.nodeType, document.TEXT_NODE);
    },
    "sets the inner HTML as a function": function(body) {
      body.data(["Subject"]).html(function(d, i) { return "<b>" + d + "</b><i>" + i + "</i>"; });
      assert.equal(document.body.firstChild.tagName, "B");
      assert.equal(document.body.firstChild.textContent, "Subject");
      assert.equal(document.body.lastChild.tagName, "I");
      assert.equal(document.body.lastChild.textContent, "0");
    },
    /*
    https://github.com/tmpvar/jsdom/issues/276
    "clears the inner HTML as null": function(body) {
      body.html(null);
      assert.equal(document.body.innerHTML, "");
      assert.isNull(document.body.firstChild);
    },
    */
    "clears the inner HTML as the empty string": function(body) {
      body.html("");
      assert.equal(document.body.innerHTML, "");
      assert.isNull(document.body.firstChild);
    },
    "clears the inner HTML as a function": function(body) {
      body.text(function() { return ""; });
      assert.equal(document.body.innerHTML, "");
      assert.isNull(document.body.firstChild);
    },
    "ignores null nodes": function() {
      var body = d3.select("body");
      body[0][0] = null;
      document.body.innerHTML = "<h1>foo</h1>";
      body.html("bar");
      assert.equal(document.body.textContent, "foo");
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.html("foo") === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
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
      assert.equal(div[0][0].firstChild.nodeType, document.TEXT_NODE);
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
    /*
    https://github.com/tmpvar/jsdom/issues/276
    "clears the inner HTML as null": function(div) {
      div.html(null);
      assert.equal(div[0][0].innerHTML, "");
      assert.isNull(div[0][0].firstChild);
      assert.equal(div[0][1].innerHTML, "");
      assert.isNull(div[0][1].firstChild);
    },
    */
    "clears the inner HTML as a function": function(div) {
      div.html(function() { return ""; });
      assert.equal(div[0][0].innerHTML, "");
      assert.isNull(div[0][0].firstChild);
      assert.equal(div[0][1].innerHTML, "");
      assert.isNull(div[0][1].firstChild);
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][0] = null;
      div[0][0].innerHTML = "<h1>foo</h1>";
      some.html("bar");
      assert.equal(div[0][0].textContent, "foo");
      assert.equal(div[0][1].textContent, "bar");
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.html("foo") === div);
    }
  }
});

suite.export(module);

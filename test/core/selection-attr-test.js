require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.attr");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body");
    },
    "sets an attribute as a string": function(body) {
      body.attr("bgcolor", "red");
      assert.equal(document.body.getAttribute("bgcolor"), "red");
    },
    "sets an attribute as a number": function(body) {
      body.attr("opacity", 1);
      assert.equal(document.body.getAttribute("opacity"), "1");
    },
    "sets an attribute as a function": function(body) {
      body.attr("bgcolor", function() { return "orange"; });
      assert.equal(document.body.getAttribute("bgcolor"), "orange");
    },
    "sets an attribute as a function of data": function(body) {
      body.data(["cyan"]).attr("bgcolor", String);
      assert.equal(document.body.getAttribute("bgcolor"), "cyan");
    },
    "sets an attribute as a function of index": function(body) {
      body.attr("bgcolor", function(d, i) { return "orange-" + i; });
      assert.equal(document.body.getAttribute("bgcolor"), "orange-0");
    },
    "sets a namespaced attribute as a string": function(body) {
      body.attr("xlink:href", "url");
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "url");
    },
    "sets a namespaced attribute as a function": function(body) {
      body.data(["orange"]).attr("xlink:href", function(d, i) { return d + "-" + i; });
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "orange-0");
    },
    "sets attributes as a map of constants": function(body) {
      body.attr({bgcolor: "white", "xlink:href": "url.png"});
      assert.equal(document.body.getAttribute("bgcolor"), "white");
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "url.png");
    },
    "sets attributes as a map of functions": function(body) {
      body.data(["orange"]).attr({"xlink:href": function(d, i) { return d + "-" + i + ".png"; }});
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "orange-0.png");
    },
    "gets an attribute value": function(body) {
      document.body.setAttribute("bgcolor", "yellow");
      assert.equal(body.attr("bgcolor"), "yellow");
    },
    "gets a namespaced attribute value": function(body) {
      document.body.setAttributeNS("http://www.w3.org/1999/xlink", "foo", "bar");
      assert.equal(body.attr("xlink:foo"), "bar");
    },
    "removes an attribute as null": function(body) {
      body.attr("bgcolor", "red").attr("bgcolor", null);
      assert.equal(body.attr("bgcolor"), "");
    },
    "removes an attribute as a function": function(body) {
      body.attr("bgcolor", "red").attr("bgcolor", function() { return null; });
      assert.equal(body.attr("bgcolor"), "");
    },
    "removes a namespaced attribute as null": function(body) {
      body.attr("xlink:href", "url").attr("xlink:href", null);
      assert.equal(body.attr("bgcolor"), "");
    },
    "removes a namespaced attribute as a function": function(body) {
      body.attr("xlink:href", "url").attr("xlink:href", function() { return null; });
      assert.equal(body.attr("xlink:href"), "");
    },
    "removes attributes as a map of null": function(body) {
      document.body.setAttribute("bgcolor", "white");
      document.body.setAttributeNS("http://www.w3.org/1999/xlink", "href", "foo.png");
      body.attr({bgcolor: null, "xlink:href": null});
      assert.equal(document.body.getAttribute("bgcolor"), "");
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "");
    },
    "removes attribtues as a map of functions that return null": function(body) {
      document.body.setAttribute("bgcolor", "white");
      document.body.setAttributeNS("http://www.w3.org/1999/xlink", "href", "foo.png");
      body.attr({bgcolor: function() {}, "xlink:href": function() {}});
      assert.equal(document.body.getAttribute("bgcolor"), "");
      assert.equal(document.body.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "");
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.attr("foo", "bar") === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "sets an attribute as a string": function(div) {
      div.attr("bgcolor", "red");
      assert.equal(div[0][0].getAttribute("bgcolor"), "red");
      assert.equal(div[0][1].getAttribute("bgcolor"), "red");
    },
    "sets an attribute as a number": function(div) {
      div.attr("opacity", 0.4);
      assert.equal(div[0][0].getAttribute("opacity"), "0.4");
      assert.equal(div[0][1].getAttribute("opacity"), "0.4");
    },
    "sets an attribute as a function": function(div) {
      div.attr("bgcolor", function() { return "coral"; });
      assert.equal(div[0][0].getAttribute("bgcolor"), "coral");
      assert.equal(div[0][1].getAttribute("bgcolor"), "coral");
    },
    "sets an attribute as a function of data": function(div) {
      div.attr("bgcolor", d3.interpolateRgb("brown", "steelblue"));
      assert.equal(div[0][0].getAttribute("bgcolor"), "#a52a2a");
      assert.equal(div[0][1].getAttribute("bgcolor"), "#4682b4");
    },
    "sets an attribute as a function of index": function(div) {
      div.attr("bgcolor", function(d, i) { return "color-" + i; });
      assert.equal(div[0][0].getAttribute("bgcolor"), "color-0");
      assert.equal(div[0][1].getAttribute("bgcolor"), "color-1");
    },
    "sets a namespaced attribute as a string": function(div) {
      div.attr("xlink:href", "url");
      assert.equal(div[0][0].getAttributeNS("http://www.w3.org/1999/xlink", "href"), "url");
      assert.equal(div[0][1].getAttributeNS("http://www.w3.org/1999/xlink", "href"), "url");
    },
    "sets a namespaced attribute as a function": function(div) {
      div.data(["red", "blue"]).attr("xlink:href", function(d, i) { return d + "-" + i; });
      assert.equal(div[0][0].getAttributeNS("http://www.w3.org/1999/xlink", "href"), "red-0");
      assert.equal(div[0][1].getAttributeNS("http://www.w3.org/1999/xlink", "href"), "blue-1");
    },
    "gets an attribute value": function(div) {
      div[0][0].setAttribute("bgcolor", "purple");
      assert.equal(div.attr("bgcolor"), "purple");
    },
    "gets a namespaced attribute value": function(div) {
      div[0][0].setAttributeNS("http://www.w3.org/1999/xlink", "foo", "bar");
      assert.equal(div.attr("xlink:foo"), "bar");
    },
    "removes an attribute as null": function(div) {
      div.attr("href", "url").attr("href", null);
      assert.equal(div[0][0].getAttribute("href"), "");
      assert.equal(div[0][1].getAttribute("href"), "");
    },
    "removes an attribute as a function": function(div) {
      div.attr("href", "url").attr("href", function() { return null; });
      assert.equal(div[0][0].getAttribute("href"), "");
      assert.equal(div[0][1].getAttribute("href"), "");
    },
    "removes a namespaced attribute as null": function(div) {
      div.attr("xlink:foo", "bar").attr("xlink:foo", null);
      assert.equal(div[0][0].getAttributeNS("http://www.w3.org/1999/xlink", "foo"), "");
      assert.equal(div[0][1].getAttributeNS("http://www.w3.org/1999/xlink", "foo"), "");
    },
    "removes a namespaced attribute as a function": function(div) {
      div.attr("xlink:foo", "bar").attr("xlink:foo", function() { return null; });
      assert.equal(div[0][0].getAttributeNS("http://www.w3.org/1999/xlink", "foo"), "");
      assert.equal(div[0][1].getAttributeNS("http://www.w3.org/1999/xlink", "foo"), "");
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][1] = null;
      some.attr("href", null).attr("href", "url");
      assert.equal(div[0][0].getAttribute("href"), "url");
      assert.equal(div[0][1].getAttribute("href"), "");
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.attr("foo", "bar") === div);
    }
  }
});

suite.export(module);

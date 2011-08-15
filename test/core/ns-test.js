require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("ns");

suite.addBatch({
  "prefix": {
    topic: function() {
      return d3.ns.prefix;
    },
    "svg is http://www.w3.org/2000/svg": function(prefix) {
      assert.equal(prefix.svg, "http://www.w3.org/2000/svg");
    },
    "xhtml is http://www.w3.org/1999/xhtml": function(prefix) {
      assert.equal(prefix.xhtml, "http://www.w3.org/1999/xhtml");
    },
    "xlink is http://www.w3.org/1999/xlink": function(prefix) {
      assert.equal(prefix.xlink, "http://www.w3.org/1999/xlink");
    },
    "xml is http://www.w3.org/XML/1998/namespace": function(prefix) {
      assert.equal(prefix.xml, "http://www.w3.org/XML/1998/namespace");
    },
    "xmlns is http://www.w3.org/2000/xmlns/": function(prefix) {
      assert.equal(prefix.xmlns, "http://www.w3.org/2000/xmlns/");
    }
  }
});

suite.addBatch({
  "qualify": {
    topic: function() {
      return d3.ns.qualify;
    },
    "local name returns name": function() {
      assert.equal(d3.ns.qualify("local"), "local");
    },
    "known qualified name returns space and local": function() {
      var name = d3.ns.qualify("svg:path");
      assert.equal(name.space, "http://www.w3.org/2000/svg");
      assert.equal(name.local, "path");
    },
    "unknown qualified name returns undefined and local": function() {
      var name = d3.ns.qualify("foo:bar");
      assert.isUndefined(name.space);
      assert.equal(name.local, "bar");
    }
  }
});

suite.export(module);

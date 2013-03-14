var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("ns");

suite.addBatch({
  "ns": {
    topic: load("core/ns"),
    "prefix": {
      "svg is http://www.w3.org/2000/svg": function(d3) {
        assert.equal(d3.ns.prefix.svg, "http://www.w3.org/2000/svg");
      },
      "xhtml is http://www.w3.org/1999/xhtml": function(d3) {
        assert.equal(d3.ns.prefix.xhtml, "http://www.w3.org/1999/xhtml");
      },
      "xlink is http://www.w3.org/1999/xlink": function(d3) {
        assert.equal(d3.ns.prefix.xlink, "http://www.w3.org/1999/xlink");
      },
      "xml is http://www.w3.org/XML/1998/namespace": function(d3) {
        assert.equal(d3.ns.prefix.xml, "http://www.w3.org/XML/1998/namespace");
      },
      "xmlns is http://www.w3.org/2000/xmlns/": function(d3) {
        assert.equal(d3.ns.prefix.xmlns, "http://www.w3.org/2000/xmlns/");
      }
    },
    "qualify": {
      "local name returns name": function(d3) {
        assert.equal(d3.ns.qualify("local"), "local");
      },
      "known qualified name returns space and local": function(d3) {
        var name = d3.ns.qualify("svg:path");
        assert.equal(name.space, "http://www.w3.org/2000/svg");
        assert.equal(name.local, "path");
      },
      "unknown qualified name returns name": function(d3) {
        assert.equal(d3.ns.qualify("foo:bar"), "bar");
      },
      "known local name returns space and local": function(d3) {
        var name = d3.ns.qualify("svg");
        assert.equal(name.space, "http://www.w3.org/2000/svg");
        assert.equal(name.local, "svg");
      },
      "names that collide with built-ins are ignored": function(d3) {
        assert.equal(d3.ns.qualify("hasOwnProperty:test"), "test");
      }
    }
  }
});

suite.export(module);

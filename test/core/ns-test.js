var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("ns");

suite.addBatch({
  "ns": {
    topic: load("core/ns").expression("d3.ns"),
    "prefix": {
      topic: function(ns) {
        return ns.prefix;
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
    },
    "qualify": {
      topic: function(ns) {
        return ns.qualify;
      },
      "local name returns name": function(qualify) {
        assert.equal(qualify("local"), "local");
      },
      "known qualified name returns space and local": function(qualify) {
        var name = qualify("svg:path");
        assert.equal(name.space, "http://www.w3.org/2000/svg");
        assert.equal(name.local, "path");
      },
      "unknown qualified name returns name": function(qualify) {
        assert.equal(qualify("foo:bar"), "bar");
      },
      "known local name returns space and local": function(qualify) {
        var name = qualify("svg");
        assert.equal(name.space, "http://www.w3.org/2000/svg");
        assert.equal(name.local, "svg");
      },
      "names that collide with built-ins are ignored": function(qualify) {
        assert.equal(qualify("hasOwnProperty:test"), "test");
      }
    }
  }
});

suite.export(module);

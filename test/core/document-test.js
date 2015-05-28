var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("document");

suite.addBatch({
  "d3_documentElement": {
    topic: load("core/document").document().expression("{document:document,window:window,d3_documentElement:d3_documentElement}"),
    "the document element exists": function(_) {
      assert.strictEqual(_.document.documentElement.nodeType, 1);
      assert.strictEqual(_.document.documentElement.nodeName, "HTML");
      assert.strictEqual(_.document.defaultView, _.window);
    },
    "given a node, returns the node’s document element": function(_) {
      assert.strictEqual(_.d3_documentElement(_.document.body), _.document.documentElement);
    },
    "given a document, returns the document’s document element": function(_) {
      assert.strictEqual(_.d3_documentElement(_.document), _.document.documentElement);
    },
    "given a window, returns the window’s document’s document element": function(_) {
      assert.strictEqual(_.d3_documentElement(_.window), _.document.documentElement);
    },
    "returns undefined for anything else": function(_) {
      assert.isUndefined(_.d3_documentElement({}));
    }
  },
  "d3_window": {
    topic: load("core/document").document().expression("{document:document,window:window,d3_window:d3_window}"),
    "the document element exists": function(_) {
      assert.strictEqual(_.document.documentElement.nodeType, 1);
      assert.strictEqual(_.document.documentElement.nodeName, "HTML");
      assert.strictEqual(_.document.defaultView, _.window);
    },
    "given a node, returns its owner document’s default view": function(_) {
      assert.strictEqual(_.d3_window(_.document.body), _.window);
    },
    "given a document, returns its default view": function(_) {
      assert.strictEqual(_.d3_window(_.document), _.window);
    },
    "given a window, returns the window": function(_) {
      assert.strictEqual(_.d3_window(_.window), _.window);
    },
    "returns undefined for anything else": function(_) {
      assert.isUndefined(_.d3_window({}));
    }
  }
});

suite.export(module);

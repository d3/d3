var vows = require("vows"),
    load = require("../load"),
    xhr = require("../env-xhr"),
    assert = require("../env-assert"),
    jsdom = require("jsdom").jsdom,
    document = jsdom("<html><head></head><body></body></html>"),
    window = document.createWindow();

// Monkey-patch createRange support to JSDOM.
document.createRange = function() {
  return {
    selectNode: function() {},
    createContextualFragment: jsdom
  };
};

var suite = vows.describe("d3.html");

suite.addBatch({
  "html": {
    topic: load("xhr/html").sandbox({
      XMLHttpRequest: xhr,
      document: document,
      window: window
    }),

    "on a sample file": {
      topic: function(d3) {
        var cb = this.callback;
        d3.html("test/data/sample.html", function(error, document) {
          cb(null, document);
        });
      },
      "invokes the callback with the loaded html": function(document) {
        assert.equal(document.getElementsByTagName("H1")[0].textContent, "Hello & world!");
      },
      "override the mime type to text/html": function(xml) {
        assert.equal(xhr._last._info.mimeType, "text/html");
      }
    },

    "on a file that does not exist": {
      topic: function(d3) {
        var cb = this.callback;
        d3.html("//does/not/exist.html", function(error, document) {
          cb(null, document);
        });
      },
      "invokes the callback with undefined when an error occurs": function(document) {
        assert.isUndefined(document);
      }
    }
  }
});

suite.export(module);

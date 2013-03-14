var vows = require("vows"),
    jsdom = require("jsdom").jsdom,
    d3 = require("../../"),
    load = require("../load"),
    xhr = require("../env-xhr"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

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
    topic: load("xhr/html").expression("d3.html").sandbox({
      XMLHttpRequest: xhr,
      document: document,
      window: window
    }),

    "on a sample file": {
      topic: function(html) {
        var cb = this.callback;
        html("test/data/sample.html", function(error, document) {
          cb(null, document);
        });
      },
      "invokes the callback with the loaded html": function(document) {
        assert.equal(document.getElementsByTagName("H1")[0].textContent, "Hello & world!");
      },
      "override the mime type to text/html": function(document) {
        assert.equal(xhr._last._info.mimeType, "text/html");
      }
    },

    "on a file that does not exist": {
      topic: function(html) {
        var cb = this.callback;
        html("//does/not/exist.html", function(error, document) {
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

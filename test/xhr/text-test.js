var vows = require("vows"),
    load = require("../load"),
    xhr = require("../env-xhr"),
    assert = require("../env-assert");

var suite = vows.describe("d3.text");

suite.addBatch({
  "text": {
    topic: load("xhr/text").sandbox({
      XMLHttpRequest: xhr,
      document: {},
      window: {}
    }),

    "on a sample file": {
      topic: function(d3) {
        var cb = this.callback;
        d3.text("test/data/sample.txt", function(error, text) {
          cb(null, text);
        });
      },
      "invokes the callback with the loaded text": function(text) {
        assert.equal(text, "Hello, world!\n");
      },
      "does not override the mime type by default": function(text) {
        assert.isUndefined(xhr._last._info.mimeType);
      }
    },

    "with a custom mime type": {
      topic: function(d3) {
        var cb = this.callback;
        d3.text("test/data/sample.txt", "text/plain+sample", function(error, text) {
          cb(null, text);
        });
      },
      "observes the optional mime type": function(text) {
        assert.equal(xhr._last._info.mimeType, "text/plain+sample");
      }
    },

    "on a file that does not exist": {
      topic: function(d3) {
        var cb = this.callback;
        d3.text("//does/not/exist.txt", function(error, text) {
          cb(null, text);
        });
      },
      "invokes the callback with undefined when an error occurs": function(text) {
        assert.isUndefined(text);
      }
    }
  }
});

suite.export(module);

require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.text");

suite.addBatch({
  "text": {
    topic: function() {
      var cb = this.callback;
      d3.text("test/data/sample.txt", function(error, text) {
        cb(null, text);
      });
    },
    "invokes the callback with the loaded text": function(text) {
      assert.equal(text, "Hello, world!\n");
    },
    "does not override the mime type by default": function(text) {
      assert.isUndefined(XMLHttpRequest._last._info.mimeType);
    },
    "": {
      topic: function() {
        var cb = this.callback;
        d3.text("test/data/sample.txt", "text/plain+sample", function(error, text) {
          cb(null, text);
        });
      },
      "observes the optional mime type": function(text) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "text/plain+sample");
      }
    },
    " ": {
      topic: function() {
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

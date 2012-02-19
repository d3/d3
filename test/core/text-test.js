require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.text");

suite.addBatch({
  "text": {
    topic: function() {
      var cb = this.callback;
      return d3.text("examples/data/sample.txt", function(text) {
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
        return d3.text("examples/data/sample.txt", "text/plain+sample", function(text) {
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
        return d3.text("//does/not/exist.txt", function(text) {
          cb(null, text);
        });
      },
      "invokes the callback with null when an error occurs": function(text) {
        assert.isNull(text);
      }
    }
  }
});

suite.export(module);

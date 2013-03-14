var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.text");

suite.addBatch({
  "text": {
    topic: load("xhr/text").expression("d3.text").document(),

    "on a sample file": {
      topic: function(text) {
        text("test/data/sample.txt", this.callback);
      },
      "invokes the callback with the loaded text": function(text) {
        assert.equal(text, "Hello, world!\n");
      },
      "does not override the mime type by default": function(text) {
        assert.isUndefined(XMLHttpRequest._last._info.mimeType);
      }
    },

    "with a custom mime type": {
      topic: function(text) {
        text("test/data/sample.txt", "text/plain+sample", this.callback);
      },
      "observes the optional mime type": function(text) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "text/plain+sample");
      }
    },

    "on a file that does not exist": {
      topic: function(text) {
        var callback = this.callback;
        text("//does/not/exist.txt", function(error, text) {
          callback(null, text);
        });
      },
      "invokes the callback with undefined when an error occurs": function(text) {
        assert.isUndefined(text);
      }
    }
  }
});

suite.export(module);

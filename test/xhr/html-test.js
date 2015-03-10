var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.html");

suite.addBatch({
  "html": {
    topic: load("xhr/html").expression("d3.html").document(),

    "on a sample file": {
      topic: function(html) {
        html("test/data/sample.html", this.callback);
      },
      "invokes the callback with the loaded html": function(document) {
        assert.equal(document.getElementsByTagName("H1")[0].textContent, "Hello & world!");
      },
      "override the mime type to text/html": function(document) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "text/html");
      }
    },

    "on a file that does not exist": {
      topic: function(html) {
        var callback = this.callback;
        html("//does/not/exist.html", function(error, document) {
          callback(null, document);
        });
      },
      "invokes the callback with undefined when an error occurs": function(document) {
        assert.isUndefined(document);
      }
    }
  }
});

suite.export(module);

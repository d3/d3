require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.html");

suite.addBatch({
  "html": {
    topic: function() {
      var cb = this.callback;
      d3.html("test/data/sample.html", function(error, document) {
        cb(null, document);
      });
    },
    "invokes the callback with the loaded html": function(document) {
      assert.equal(document.getElementsByTagName("H1")[0].textContent, "Hello & world!");
    },
    "override the mime type to text/html": function(xml) {
      assert.equal(XMLHttpRequest._last._info.mimeType, "text/html");
    },
    "": {
      topic: function() {
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

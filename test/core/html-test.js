require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.html");

suite.addBatch({
  "html": {
    topic: function() {
      var cb = this.callback;
      return d3.html("examples/data/sample.html", function(document) {
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
        return d3.html("//does/not/exist.html", function(document) {
          cb(null, document);
        });
      },
      "invokes the callback with null when an error occurs": function(document) {
        assert.isNull(document);
      }
    }
  }
});

suite.export(module);

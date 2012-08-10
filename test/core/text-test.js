require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.text");

suite.addBatch({
  "text": {
    topic: function() {
      var cb = this.callback;
      d3.text("examples/data/sample.txt", function(text) {
        cb(null, text);
      }).send();
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
        d3.text("examples/data/sample.txt", "text/plain+sample", function(text) {
          cb(null, text);
        }).send();
      },
      "observes the optional mime type": function(text) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "text/plain+sample");
      }
    },
    " ": {
      topic: function() {
        var cb = this.callback;
        d3.text("//does/not/exist.txt").on('error', function(text) {
          cb(null, text);
        }).send();
      },
      "triggers error event on unsuccessful status": function(req) {
        assert.isObject(req);
        assert.equal(404, req.status);
      }
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.xhr");

suite.addBatch({
  "xhr": {
    topic: load("xhr/xhr").expression("d3.xhr").document(),

    "on a sample text file": {
      topic: function(xhr) {
        xhr("test/data/sample.txt", this.callback);
      },
      "makes an asynchronous HTTP request": function(req) {
        assert.equal(req._info.url, "test/data/sample.txt");
        assert.isTrue(req._info.async);
      },
      "invokes the callback with the request object": function(req) {
        assert.equal(req.responseText, "Hello, world!\n");
      },
      "does not override the mime type by default": function(req) {
        assert.isUndefined(req._info.mimeType);
      },
      "waits until the request is done": function(req) {
        assert.equal(req.readyState, 4);
        assert.equal(req.status, 200);
      }
    },

    "when a custom mime type is specified": {
      topic: function(xhr) {
        xhr("test/data/sample.txt", "text/plain", this.callback);
      },
      "observes the optional mime type": function(req) {
        assert.equal(req._info.mimeType, "text/plain");
      }
    },

    "on a file that does not exist": {
      topic: function(xhr) {
        var callback = this.callback;
        xhr("//does/not/exist.txt", function(error, req) {
          callback(null, req);
        });
      },
      "invokes the callback with undefined when an error occurs": function(req) {
        assert.isUndefined(req);
      }
    }
  }
});

suite.export(module);

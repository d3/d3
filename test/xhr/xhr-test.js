var vows = require("vows"),
    load = require("../load"),
    xhr = require("../env-xhr"),
    assert = require("../env-assert");

var suite = vows.describe("d3.xhr");

suite.addBatch({
  "xhr": {
    topic: load("xhr/xhr").sandbox({
      XMLHttpRequest: xhr,
      document: {},
      window: {}
    }),

    "on a sample text file": {
      topic: function(d3) {
        var cb = this.callback;
        d3.xhr("test/data/sample.txt", function(error, req) {
          cb(null, req);
        });
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
      topic: function(d3) {
        var cb = this.callback;
        d3.xhr("test/data/sample.txt", "text/plain", function(error, req) {
          cb(null, req);
        });
      },
      "observes the optional mime type": function(req) {
        assert.equal(req._info.mimeType, "text/plain");
      }
    },

    "on a file that does not exist": {
      topic: function(d3) {
        var cb = this.callback;
        d3.xhr("//does/not/exist.txt", function(error, req) {
          cb(null, req);
        });
      },
      "invokes the callback with undefined when an error occurs": function(req) {
        assert.isUndefined(req);
      }
    }
  }
});

suite.export(module);

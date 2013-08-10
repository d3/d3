var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.xhr");

suite.addBatch({
  "xhr": {
    topic: load("xhr/xhr").document(),

    "on a sample text file": {
      topic: function(d3) {
        d3.xhr("test/data/sample.txt", this.callback);
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
        d3.xhr("test/data/sample.txt", "text/plain", this.callback);
      },
      "observes the optional mime type": function(req) {
        assert.equal(req._info.mimeType, "text/plain");
      }
    },

    "when a beforesend listener is specified": {
      topic: function(d3) {
        var callback = this.callback;
        var xhr = d3.xhr("test/data/sample.txt", "text/plain").on("beforesend", function(request) {
          callback(null, {
            that: this,
            xhr: xhr,
            readyState: request.readyState,
            request: request
          });
        });
        xhr.get();
      },
      "invokes the beforesend listener with the xhr object as the context": function(result) {
        assert.equal(result.that, result.xhr);
        assert.ok(result.xhr.get);
      },
      "invokes the beforesend listener with the underlying XMLHttpRequest as an argument": function(result) {
        assert.instanceOf(result.request, XMLHttpRequest);
      },
      "invokes the beforesend listener after open and before send": function(result) {
        assert.equal(result.readyState, 1);
      }
    },

    "on a file that does not exist": {
      topic: function(d3) {
        var callback = this.callback;
        d3.xhr("//does/not/exist.txt", function(error, req) {
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

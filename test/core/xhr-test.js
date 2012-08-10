require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.xhr");

suite.addBatch({
  "xhr": {
    topic: function() {
      var cb = this.callback;
      d3.xhr("examples/data/sample.txt", function(req){
        cb(null, req);
      }).send();
    },
    "makes an asynchronous HTTP request": function(req) {
      assert.equal(req._info.url, "examples/data/sample.txt");
      assert.isTrue(req._info.async);
    },
    "invokes the callback with the request object": function(req) {
      assert.equal(req.responseText, "Hello, world!\n");
    },
    "does not override the mime type by default": function(req) {
      assert.isUndefined(req._info.mimeType);
    },
    "does not override the content type by default": function(req) {
      assert.isUndefined(req._info.contentType);
    },
    "waits until the request is done": function(req) {
      assert.equal(req.readyState, 4);
      assert.equal(req.status, 200);
    },
    "request mimeType": {
      topic: function() {
        var cb = this.callback;
        d3.xhr("examples/data/sample.txt", "text/plain", function(req) {
          cb(null, req);
        }).send();
      },
      "is set": function(req) {
        assert.equal(req._info.mimeType, "text/plain");
      }
    },
    "request contentType": {
      topic: function() {
        var cb = this.callback;
        d3.xhr("examples/data/sample.txt", "text/plain", function(req) {
          cb(null, req);
        }).contentType("application/x-www-form-urlencoded").send();
      },
      "is set": function(req) {
        assert.equal(req._info.contentType, "application/x-www-form-urlencoded");
      }
    },
    "request method": {
      topic:function() {
        var cb = this.callback;

        d3.xhr.post("examples/data/sample.txt", function(req){
          cb(null, req);
        }).send();
      },
      "is set":function(req){
        assert.equal(req._info.method, "POST");
      }
    },
    "request error": {
      topic: function() {
        var cb = this.callback;

        d3.xhr("//does/not/exist.txt").on("error", function(req){
          cb(null, req);
        }).send();
      },
      "is triggered": function(req) {
        assert.isObject(req);
        assert.equal(req.status, 404);
      },
    },
    "cancel":{
      topic:function() {
        var cb = this.callback;

        d3.xhr("//does/not/exist.txt").on("cancel", function(req, xhr){
          cb(null, { req: req, xhr: xhr });
        }).send().cancel();
      },
      "is triggered":function(res){
        assert.isObject(res.req);
        assert.isObject(res.xhr);
      }
    },
    "onerror": {
      topic: function() {
        var cb = this.callback;

        d3.xhr("examples/data/sample.txt").on("error", function(req, xhr){
          cb(null, { req: req, xhr: xhr });
        }).send().request._error();
      },
      "is triggered":function(res){
        assert.isObject(res.req);
        assert.isObject(res.xhr);
      }
    },
    "onprogress": {
      topic: function() {
        var cb = this.callback;

        d3.xhr("examples/data/sample.txt").on("progress", function(req, xhr, ev){
          cb(null, { req: req, xhr: xhr, event: ev });
        }).send().request._progress({ total: 1024 });
      },
      "is triggered":function(res){
        assert.isObject(res.event);
        assert.equal(1024, res.event.total);

        assert.isObject(res.req);
        assert.isObject(res.xhr);
        assert.isTrue(res.xhr.sent);
      }
    }
  }
});

suite.export(module);

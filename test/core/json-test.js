require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.json");

suite.addBatch({
  "json": {
    topic: function() {
      var cb = this.callback;

      d3.json("examples/data/sample.json", function(json) {
        cb(null, json);
      }).send();
    },
    "invokes the callback with the loaded JSON": function(json) {
      assert.deepEqual(json, [{"Hello":42,"World":"\"fish\""}]);
    },
    "overrides the mime type to application/json": function(json) {
      assert.equal(XMLHttpRequest._last._info.mimeType, "application/json");
    },
    "": {
      topic: function() {
        var cb = this.callback;
        d3.json("//does/not/exist.json").on('error', function(json) {
          cb(null, json);
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

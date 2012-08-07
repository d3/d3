require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.csv");

suite.addBatch({
  "csv": {
    topic: function() {
      var cb = this.callback;
      d3.csv("examples/data/sample.csv", function(csv) {
        cb(null, csv);
      }).send();
    },
    "invokes the callback with the parsed CSV": function(csv) {
      assert.deepEqual(csv, [{"Hello":42,"World":"\"fish\""}]);
    },
    "overrides the mime type to text/csv": function(csv) {
      assert.equal(XMLHttpRequest._last._info.mimeType, "text/csv");
    },
    "": {
      topic: function() {
        var cb = this.callback;
        d3.csv("//does/not/exist.csv").on('error', function(csv) {
          cb(null, csv);
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

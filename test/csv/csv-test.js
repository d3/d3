require("../env");
require("../../d3");
require("../../d3.csv");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.csv");

suite.addBatch({
  "csv": {
    topic: function() {
      var cb = this.callback;
      return d3.csv("examples/data/sample.csv", function(csv) {
        cb(null, csv);
      });
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
        return d3.csv("//does/not/exist.csv", function(csv) {
          cb(null, csv);
        });
      },
      "invokes the callback with null when an error occurs": function(csv) {
        assert.isNull(csv);
      }
    }
  }
});

suite.export(module);

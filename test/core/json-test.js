require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.json");

suite.addBatch({
  "json": {
    topic: function() {
      var cb = this.callback;
      return d3.json("examples/data/sample.json", function(json) {
        cb(null, json);
      });
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
        return d3.json("//does/not/exist.json", function(json) {
          cb(null, json);
        });
      },
      "invokes the callback with null when an error occurs": function(json) {
        assert.isNull(json);
      }
    }
  }
});

suite.export(module);

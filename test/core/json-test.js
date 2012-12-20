require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.json");

suite.addBatch({
  "json": {
    topic: function() {
      var cb = this.callback;
      d3.json("test/data/sample.json", function(error, json) {
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
        d3.json("//does/not/exist.json", function(error, json) {
          cb(null, json);
        });
      },
      "invokes the callback with undefined when an error occurs": function(json) {
        assert.isUndefined(json);
      }
    }
  }
});

suite.export(module);

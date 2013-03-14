var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.json");

suite.addBatch({
  "json": {
    topic: load("xhr/json").expression("d3.json").document(),

    "on a sample file": {
      topic: function(json) {
        json("test/data/sample.json", this.callback);
      },
      "invokes the callback with the loaded JSON": function(json) {
        assert.deepEqual(json, [{"Hello":42,"World":"\"fish\""}]);
      },
      "overrides the mime type to application/json": function(json) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "application/json");
      }
    },

    "on a file that does not exist": {
      topic: function(json) {
        var callback = this.callback;
        json("//does/not/exist.json", function(error, json) {
          callback(null, json);
        });
      },
      "invokes the callback with undefined when an error occurs": function(json) {
        assert.isUndefined(json);
      }
    }
  }
});

suite.export(module);

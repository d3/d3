var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.xml");

suite.addBatch({
  "xml": {
    topic: load("xhr/xml").expression("d3.xml").document(),

    "on a sample file": {
      topic: function(xml) {
        xml("test/data/sample.xml", this.callback);
      },
      "invokes the callback with the loaded xml": function(xml) {
        assert.deepEqual(xml, {_xml: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<hello>\n  <world name=\"Earth\"/>\n</hello>\n"});
      },
      "does not override the mime type by default": function(xml) {
        assert.isUndefined(XMLHttpRequest._last._info.mimeType);
      }
    },

    "with a custom mime type": {
      topic: function(xml) {
        xml("test/data/sample.txt", "application/xml+sample", this.callback);
      },
      "observes the optional mime type": function(xml) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "application/xml+sample");
      }
    },

    "on a file that does not exist": {
      topic: function(xml) {
        var callback = this.callback;
        xml("//does/not/exist.xml", function(error, xml) {
          callback(null, xml);
        });
      },
      "invokes the callback with undefined when an error occurs": function(xml) {
        assert.isUndefined(xml);
      }
    }
  }
});

suite.export(module);

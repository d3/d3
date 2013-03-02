require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.xml");

suite.addBatch({
  "xml": {
    topic: function() {
      var cb = this.callback;
      d3.xml("test/data/sample.xml", function(error, xml) {
        cb(null, xml);
      });
    },
    "invokes the callback with the loaded xml": function(xml) {
      assert.deepEqual(xml, {_xml: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<hello>\n  <world name=\"Earth\"/>\n</hello>\n"});
    },
    "does not override the mime type by default": function(xml) {
      assert.isUndefined(XMLHttpRequest._last._info.mimeType);
    },
    "": {
      topic: function() {
        var cb = this.callback;
        d3.xml("test/data/sample.txt", "application/xml+sample", function(error, xml) {
          cb(null, xml);
        });
      },
      "observes the optional mime type": function(xml) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "application/xml+sample");
      }
    },
    " ": {
      topic: function() {
        var cb = this.callback;
        d3.xml("//does/not/exist.xml", function(error, xml) {
          cb(null, xml);
        });
      },
      "invokes the callback with undefined when an error occurs": function(xml) {
        assert.isUndefined(xml);
      }
    }
  }
});

suite.export(module);

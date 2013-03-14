var vows = require("vows"),
    load = require("../load"),
    xhr = require("../env-xhr"),
    assert = require("../env-assert");

var suite = vows.describe("d3.xml");

suite.addBatch({
  "xml": {
    topic: load("xhr/xml").sandbox({
      XMLHttpRequest: xhr,
      document: {},
      window: {}
    }),

    "on a sample file": {
      topic: function(d3) {
        var cb = this.callback;
        d3.xml("test/data/sample.xml", function(error, xml) {
          cb(null, xml);
        });
      },
      "invokes the callback with the loaded xml": function(xml) {
        assert.deepEqual(xml, {_xml: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<hello>\n  <world name=\"Earth\"/>\n</hello>\n"});
      },
      "does not override the mime type by default": function(xml) {
        assert.isUndefined(xhr._last._info.mimeType);
      }
    },

    "with a custom mime type": {
      topic: function(d3) {
        var cb = this.callback;
        d3.xml("test/data/sample.txt", "application/xml+sample", function(error, xml) {
          cb(null, xml);
        });
      },
      "observes the optional mime type": function(xml) {
        assert.equal(xhr._last._info.mimeType, "application/xml+sample");
      }
    },

    "on a file that does not exist": {
      topic: function(d3) {
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

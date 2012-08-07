require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.xml");

suite.addBatch({
  "xml": {
    topic: function() {
      var cb = this.callback;
      d3.xml("examples/data/sample.xml", function(xml) {
        cb(null, xml);
      }).send();
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
        d3.xml("examples/data/sample.txt", "application/xml+sample", function(xml) {
          cb(null, xml);
        }).send();
      },
      "observes the optional mime type": function(xml) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "application/xml+sample");
      }
    },
    " ": {
      topic: function() {
        var cb = this.callback;
        d3.xml("//does/not/exist.xml").on('error', function(xml) {
          cb(null, xml);
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

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.parent");

suite.addBatch({
  "select(body)": {
    topic: load("selection/parent").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "parent node of body": function(body) {
        var html = body.parent( );
        assert.equal(html[0][0].tagName, "HTML");
        assert.equal(html[0][0].namespaceURI, "http://www.w3.org/1999/xhtml");
        assert.isTrue(html[0][0] === body.node().parentNode);
      },
      "parent node of an appended SVG element": function(body) {
        var svgParent = body.append("svg:svg").parent( );
        assert.equal(svgParent[0][0].tagName, "BODY");
        assert.equal(svgParent[0][0].namespaceURI, "http://www.w3.org/1999/xhtml");
        assert.isTrue(svgParent[0][0] === body.node());
      }
    }
  }
});

suite.export(module);

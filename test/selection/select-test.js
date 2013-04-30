var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.select");

suite.addBatch({
  "select": {
    topic: load("selection/select").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("span").attr("class", "f00").attr("id", "b4r").attr("name", "b4z");
        body.append("div").attr("class", "foo").attr("id", "bar").attr("name", "baz");
        return d3;
      },
      "selects by element name": function(d3) {
        var div = d3.select("div");
        assert.equal(div[0][0].tagName, "DIV");
      },
      "selects by class name": function(d3) {
        var div = d3.select(".foo");
        assert.equal(div[0][0].className, "foo");
      },
      "selects by id": function(d3) {
        var div = d3.select("div#bar");
        assert.equal(div[0][0].id, "bar");
      },
      "selects by attribute value": function(d3) {
        var div = d3.select("[name=baz]");
        assert.equal(div[0][0].getAttribute("name"), "baz");
      },
      "selects by node": function(d3) {
        var body = d3.select("body").node(),
            div = d3.select(body.lastChild);
        assert.isTrue(div[0][0] === body.lastChild);
        assert.lengthOf(div, 1);
        assert.lengthOf(div[0], 1);
      },
      "sets the parentNode to the document element": function(d3) {
        var selection = d3.select("body"),
            document = d3.selection().node().ownerDocument;
        assert.strictEqual(selection[0].parentNode, document.documentElement);
      },
      "does not propagate data from the document": function(d3) {
        var document = d3.selection().node().ownerDocument;
        document.__data__ = 42;
        delete document.body.__data__;
        try {
          assert.isUndefined(d3.select("body").datum());
        } finally {
          delete document.__data__;
        }
      },
      "does not propagate data from the document element": function(d3) {
        var document = d3.selection().node().ownerDocument;
        document.documentElement.__data__ = 42;
        delete document.body.__data__;
        try {
          assert.isUndefined(d3.select("body").datum());
        } finally {
          delete document.documentElement.__data__;
        }
      }
    }
  }
});

suite.export(module);

var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("d3.select");

suite.addBatch({
  "select": {
    topic: load("selection/select").sandbox({
      document: document,
      window: window
    }).expression("d3.select"),

    "on a simple page": {
      topic: function(select) {
        var body = select("body").html("");
        body.append("span").attr("class", "f00").attr("id", "b4r").attr("name", "b4z");
        body.append("div").attr("class", "foo").attr("id", "bar").attr("name", "baz");
        return select;
      },
      "selects by element name": function(select) {
        var div = select("div");
        assert.equal(div[0][0].tagName, "DIV");
      },
      "selects by class name": function(select) {
        var div = select(".foo");
        assert.equal(div[0][0].className, "foo");
      },
      "selects by id": function(select) {
        var div = select("div#bar");
        assert.equal(div[0][0].id, "bar");
      },
      "selects by attribute value": function(select) {
        var div = select("[name=baz]");
        assert.equal(div[0][0].getAttribute("name"), "baz");
      },
      "selects by node": function(select) {
        var div = select(document.body.lastChild);
        assert.isTrue(div[0][0] === document.body.lastChild);
        assert.lengthOf(div, 1);
        assert.lengthOf(div[0], 1);
      }
    }
  }
});

suite.export(module);

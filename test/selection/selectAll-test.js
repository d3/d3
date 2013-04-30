var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.selectAll");

suite.addBatch({
  "selectAll": {
    topic: load("selection/selectAll").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("span").attr("class", "f00").attr("id", "b4r").attr("name", "b4z");
        body.append("div").attr("class", "foo").attr("id", "bar").attr("name", "baz");
        return d3;
      },
      "selects by element name": function(d3) {
        var div = d3.selectAll("div");
        assert.equal(div[0][0].tagName, "DIV");
      },
      "selects by class name": function(d3) {
        var div = d3.selectAll(".foo");
        assert.equal(div[0][0].className, "foo");
      },
      "selects by id": function(d3) {
        var div = d3.selectAll("div#bar");
        assert.equal(div[0][0].id, "bar");
      },
      "selects by attribute value": function(d3) {
        var div = d3.selectAll("[name=baz]");
        assert.equal(div[0][0].getAttribute("name"), "baz");
      },
      "selects by array": function(d3) {
        var body = d3.select("body").node(), div = d3.selectAll([body.lastChild]);
        assert.isTrue(div[0][0] === body.lastChild);
        assert.lengthOf(div, 1);
        assert.lengthOf(div[0], 1);
      },
      "groups are arrays, not NodeLists": function(d3) {
        var div = d3.select("body").selectAll(function() { return this.getElementsByClassName("div"); });
        assert.isTrue(Array.isArray(div[0]));
      },
      "sets the parentNode to the document element": function(d3) {
        var selection = d3.selectAll("body"),
            document = d3.selection().node().ownerDocument;
        assert.strictEqual(selection[0].parentNode, document.documentElement);
      }
    }
  }
});

suite.export(module);

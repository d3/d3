var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("d3.selectAll");

suite.addBatch({
  "selectAll": {
    topic: load("selection/selectAll").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body").html("");
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
        var div = d3.selectAll([document.body.lastChild]);
        assert.isTrue(div[0][0] === document.body.lastChild);
        assert.lengthOf(div, 1);
        assert.lengthOf(div[0], 1);
      },
      "groups are not instances of NodeList": function(d3) {
        var div = d3.select("body").selectAll(function() { return this.getElementsByClassName("div"); });
        assert.isFalse(div[0] instanceof window.NodeList);
      }
    }
  }
});

suite.export(module);

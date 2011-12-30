require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.select");

suite.addBatch({
  "select": {
    topic: function() {
      var body = d3.select("body").html("");
      body.append("span").attr("class", "f00").attr("id", "b4r").attr("name", "b4z");
      body.append("div").attr("class", "foo").attr("id", "bar").attr("name", "baz");
      return body;
    },
    "selects by element name": function() {
      var div = d3.select("div");
      assert.equal(div[0][0].tagName, "DIV");
    },
    "selects by class name": function() {
      var div = d3.select(".foo");
      assert.equal(div[0][0].className, "foo");
    },
    "selects by id": function() {
      var div = d3.select("div#bar");
      assert.equal(div[0][0].id, "bar");
    },
    "selects by attribute value": function() {
      var div = d3.select("[name=baz]");
      assert.equal(div[0][0].getAttribute("name"), "baz");
    },
    "selects by node": function() {
      var div = d3.select(document.body.lastChild);
      assert.isTrue(div[0][0] === document.body.lastChild);
      assert.lengthOf(div, 1);
      assert.lengthOf(div[0], 1);
    }
  }
});

suite.export(module);

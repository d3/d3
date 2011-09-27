require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.selectAll");

suite.addBatch({
  "selectAll": {
    topic: function() {
      var body = d3.select("body").html("");
      body.append("span").attr("class", "f00").attr("id", "b4r").attr("name", "b4z");
      body.append("div").attr("class", "foo").attr("id", "bar").attr("name", "baz");
      return body;
    },
    "selects by element name": function() {
      var div = d3.selectAll("div");
      assert.equal(div[0][0].tagName, "DIV");
    },
    "selects by class name": function() {
      var div = d3.selectAll(".foo");
      assert.equal(div[0][0].className, "foo");
    },
    "selects by id": function() {
      var div = d3.select("div#bar");
      assert.equal(div[0][0].id, "bar");
    },
    "selects by attribute value": function() {
      var div = d3.selectAll("[name=baz]");
      assert.equal(div[0][0].getAttribute("name"), "baz");
    },
    "selects by array": function() {
      var div = d3.selectAll([document.body.lastChild]);
      assert.isTrue(div[0][0] === document.body.lastChild);
      assert.length(div, 1);
      assert.length(div[0], 1);
    },
    "groups are not instances of NodeList": function() {
      var div = d3.select("body").selectAll(function() { return this.getElementsByClassName("div"); });
      assert.isFalse(div[0] instanceof window.NodeList);
    }
  }
});

suite.export(module);

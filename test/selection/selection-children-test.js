var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.children");

suite.addBatch({
  "select(body)": {
    topic: load("selection/select").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("span")
          .attr("class", "f00")
          .attr("id", "b4r")
          .attr("name", "b4z")
          .datum(42);
        body.append("div")
          .attr("class", "foo")
          .attr("id", "bar")
          .attr("name", "baz")
          .datum(21);
        return d3;
      },
      "selects children by element name": function(d3) {
        var span = d3.select("body").children("span");
        assert.equal(span[0].length, 1);
        assert.equal(span[0][0].tagName, "SPAN");
        assert.equal(span.datum(), 42);
      },
      "selects children by class name": function(d3) {
        var div = d3.select("body").children(".foo");
        assert.equal(div[0].length, 1);
        assert.equal(div[0][0].tagName, "DIV");
        assert.equal(div.datum(), 21);
      },
      "selects children by function": function(d3) {
        var span = d3.select("body").children(function(d) {
          return d === 42;
        });
        assert.equal(span[0].length, 1);
        assert.equal(span[0][0].tagName, "SPAN");
        assert.equal(span.datum(), 42);
      }
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.ancestor");

suite.addBatch({
  "select(body)": {
    topic: load("selection/select").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("div")
          .datum(100)
          .attr("class", "foo")
          .attr("id", "bar")
          .attr("name", "baz")
          .append("ul")
            .datum(42)
            .attr("class", "list")
            .append("li")
              .attr("class", "item");
        return d3;
      },
      "selects ancestor by element name": function(d3) {
        var list = d3.select(".item").ancestor(".list");
        assert.equal(list[0].length, 1);
        assert.equal(list[0][0].tagName, "UL");
        assert.equal(list.datum(), 42);
      },
      "selects ancestor by function": function(d3) {
        var div = d3.select(".item")
          .ancestor(function(d, i) {
            return d === 100;
          });
        assert.isFalse(div.empty());
        assert.equal(div[0][0].tagName, "DIV");
        assert.equal(div.datum(), 42);
      }
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.requote");

suite.addBatch({
  "requote": {
    topic: load("format/requote"),
    "quotes backslashes": function(d3) {
      assert.equal(d3.requote("\\"), "\\\\");
    },
    "quotes carets": function(d3) {
      assert.equal(d3.requote("^"), "\\^");
    },
    "quotes dollar signs": function(d3) {
      assert.equal(d3.requote("$"), "\\$");
    },
    "quotes stars": function(d3) {
      assert.equal(d3.requote("*"), "\\*");
    },
    "quotes plusses": function(d3) {
      assert.equal(d3.requote("+"), "\\+");
    },
    "quotes question marks": function(d3) {
      assert.equal(d3.requote("?"), "\\?");
    },
    "quotes periods": function(d3) {
      assert.equal(d3.requote("."), "\\.");
    },
    "quotes parentheses": function(d3) {
      assert.equal(d3.requote("("), "\\(");
      assert.equal(d3.requote(")"), "\\)");
    },
    "quotes pipes": function(d3) {
      assert.equal(d3.requote("|"), "\\|");
    },
    "quotes curly braces": function(d3) {
      assert.equal(d3.requote("{"), "\\{");
      assert.equal(d3.requote("}"), "\\}");
    },
    "quotes square brackets": function(d3) {
      assert.equal(d3.requote("["), "\\[");
      assert.equal(d3.requote("]"), "\\]");
    }
  }
});

suite.export(module);

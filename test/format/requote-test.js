var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.requote");

suite.addBatch({
  "requote": {
    topic: load("format/requote").expression("d3.requote"),
    "quotes backslashes": function(requote) {
      assert.equal(requote("\\"), "\\\\");
    },
    "quotes carets": function(requote) {
      assert.equal(requote("^"), "\\^");
    },
    "quotes dollar signs": function(requote) {
      assert.equal(requote("$"), "\\$");
    },
    "quotes stars": function(requote) {
      assert.equal(requote("*"), "\\*");
    },
    "quotes plusses": function(requote) {
      assert.equal(requote("+"), "\\+");
    },
    "quotes question marks": function(requote) {
      assert.equal(requote("?"), "\\?");
    },
    "quotes periods": function(requote) {
      assert.equal(requote("."), "\\.");
    },
    "quotes parentheses": function(requote) {
      assert.equal(requote("("), "\\(");
      assert.equal(requote(")"), "\\)");
    },
    "quotes pipes": function(requote) {
      assert.equal(requote("|"), "\\|");
    },
    "quotes curly braces": function(requote) {
      assert.equal(requote("{"), "\\{");
      assert.equal(requote("}"), "\\}");
    },
    "quotes square brackets": function(requote) {
      assert.equal(requote("["), "\\[");
      assert.equal(requote("]"), "\\]");
    }
  }
});

suite.export(module);

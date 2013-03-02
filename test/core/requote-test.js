require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.requote");

suite.addBatch({
  "requote": {
    topic: function() {
      return d3.requote;
    },
    "quotes backslashes": function(quote) {
      assert.equal(quote("\\"), "\\\\");
    },
    "quotes carets": function(quote) {
      assert.equal(quote("^"), "\\^");
    },
    "quotes dollar signs": function(quote) {
      assert.equal(quote("$"), "\\$");
    },
    "quotes stars": function(quote) {
      assert.equal(quote("*"), "\\*");
    },
    "quotes plusses": function(quote) {
      assert.equal(quote("+"), "\\+");
    },
    "quotes question marks": function(quote) {
      assert.equal(quote("?"), "\\?");
    },
    "quotes periods": function(quote) {
      assert.equal(quote("."), "\\.");
    },
    "quotes parentheses": function(quote) {
      assert.equal(quote("("), "\\(");
      assert.equal(quote(")"), "\\)");
    },
    "quotes pipes": function(quote) {
      assert.equal(quote("|"), "\\|");
    },
    "quotes curly braces": function(quote) {
      assert.equal(quote("{"), "\\{");
      assert.equal(quote("}"), "\\}");
    },
    "quotes square brackets": function(quote) {
      assert.equal(quote("["), "\\[");
      assert.equal(quote("]"), "\\]");
    }
  }
});

suite.export(module);

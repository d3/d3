require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.identity");

suite.addBatch({
  "identity": {
    topic: function() {
      return d3.identity;
    },
    "identity function returns value": function(identity) {
      assert.equal(identity(3), 3);
      assert.equal(identity("string"), "string");
    },
    "identity does not return a copy": function(identity) {
      var obj = {dict: ['list']}
      assert.equal(identity(obj), obj);
    }
  }
});

suite.export(module);

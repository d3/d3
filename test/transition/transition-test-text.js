require("../env");

var assert = require("../env-assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").text("foo").transition().text("bar");
  },
  "sets the text tween": function(div) {
    assert.typeOf(div.tween("text"), "function");
  },
  "start": {
    topic: function(div) {
      var cb = this.callback,
          tween = div.tween("text");
      div.tween("text", function() {
        var result = tween.apply(this, arguments);
        cb(null, {transition: div, tween: result});
        return result;
      });
    },
    "sets the text content as a string": function(result) {
      assert.equal(result.transition[0][0].textContent, "bar");
    },
    "does not interpolate text": function(result) {
      assert.isTrue(!result.tween);
    }
  }
};

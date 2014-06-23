var assert = require("../assert");

module.exports = {
  "getter": {
    topic: function(d3) {
      var s = d3.select("body").append("div").text("foo"),
          t = s.transition().text("bar");
      return {selection: s, transition: t};
    },
    "returns the target text content for the first node": function(result) {
      assert.equal(result.transition.text(), "bar");
    },
    "returns the current text content of the first node if the text is not being transitioned": function(result) {
      var t = result.selection.append("span").text("baz").transition();
      assert.equal(t.text(), "baz");
    },
  },
  "tween": {
    topic: function(d3) {
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
  }
};

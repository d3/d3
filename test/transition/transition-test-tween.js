var assert = require("../assert");

module.exports = {
  topic: function(d3) {
    var cb = this.callback,
        dd = [],
        ii = [],
        tt = [],
        fails = 0;

    var s = d3.select("body").append("div").selectAll("div")
        .data(["red", "green"])
      .enter().append("div")
        .text(function(d) { return d3.rgb(d)+""; });

    var t = s.transition()
        .tween("text", function() { ++fails; })
        .tween("text", tween);

    function tween(d, i) {
      dd.push(d);
      ii.push(i);
      if (tt.push(this) >= 2) cb(null, {
        selection: s,
        transition: t,
        data: dd,
        index: ii,
        context: tt,
        fails: fails
      });
      return i && function(t) {
        this.textContent = d3.hsl(230, 0.5, t) + "";
      };
    }
  },

  "defines the corresponding tween": function(result) {
    assert.typeOf(result.transition.tween("text"), "function");
  },
  "the last tween takes precedence": function(result) {
    assert.equal(result.fails, 0);
  },
  "invokes the tween function": function(result) {
    assert.deepEqual(result.data, ["red", "green"], "expected data, got {actual}");
    assert.deepEqual(result.index, [0, 1], "expected data, got {actual}");
    assert.domEqual(result.context[0], result.selection[0][0], "expected this, got {actual}");
    assert.domEqual(result.context[1], result.selection[0][1], "expected this, got {actual}");
  },

  "end": {
    topic: function(result) {
      var cb = this.callback;
      result.transition.each("end", function(d, i) { if (i >= 1) cb(null, result); });
    },
    "uses the returned tweener": function(result) {
      assert.equal(result.selection[0][1].textContent, "#ffffff");
    },
    "does nothing if the tweener is falsey": function(result) {
      assert.equal(result.selection[0][0].textContent, "#ff0000");
    }
  }
};

require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    return d3.select("body").html("").selectAll()
        .data(["foo", "bar"])
      .enter().append("div")
        .attr("class", String);
  },
  "defaults to zero": function(selection) {
    var t = selection.transition();
    assert.strictEqual(t[0][0].delay, 0);
    assert.strictEqual(t[0][1].delay, 0);
  },
  "can specify delay as a number": function(selection) {
    var t = selection.transition().delay(150);
    assert.strictEqual(t[0][0].delay, 150);
    assert.strictEqual(t[0][1].delay, 150);
    t.delay(250);
    assert.strictEqual(t[0][0].delay, 250);
    assert.strictEqual(t[0][1].delay, 250);
  },
  "can specify delay as a function": function(selection) {
    var dd = [], ii = [], tt = [], t = selection.transition().delay(f);
    function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return i * 20; }
    assert.strictEqual(t[0][0].delay, 0);
    assert.strictEqual(t[0][1].delay, 20);
    assert.deepEqual(dd, ["foo", "bar"], "expected data, got {actual}");
    assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
    assert.domEqual(tt[0], t[0][0].node, "expected this, got {actual}");
    assert.domEqual(tt[1], t[0][1].node, "expected this, got {actual}");
  },
  "coerces delay to a number": function(selection) {
    var t = selection.transition().delay("150");
    assert.strictEqual(t[0][0].delay, 150);
    assert.strictEqual(t[0][1].delay, 150);
  }
};

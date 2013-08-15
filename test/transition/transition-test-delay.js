var assert = require("../assert");

module.exports = {
  topic: function(d3) {
    return d3.select("body").html("").selectAll()
        .data(["foo", "bar"])
      .enter().append("div")
        .attr("class", String);
  },
  "defaults to zero": function(selection) {
    var t = selection.transition();
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 0);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 0);
  },
  "can specify delay as a number": function(selection) {
    var t = selection.transition().delay(150);
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 150);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 150);
    t.delay(250);
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 250);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 250);
  },
  "can specify delay as a negative number": function(selection) {
    var t = selection.transition().delay(-250);
    assert.strictEqual(t[0][0].__transition__[t.id].delay, -250);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, -250);
  },
  "delay is coerced to a number": function(selection) {
    var t = selection.transition().delay("520");
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 520);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 520);
  },
  "floating-point durations are not floored to integers": function(selection) {
    var t = selection.transition().delay(14.6);
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 14.6);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 14.6);
    var t = selection.transition().delay("16.99");
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 16.99);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 16.99);
  },
  "can specify delay as a function": function(selection) {
    var dd = [], ii = [], tt = [], t = selection.transition().delay(f);
    function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return i * 20; }
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 0);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 20);
    assert.deepEqual(dd, ["foo", "bar"], "expected data, got {actual}");
    assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
    assert.domEqual(tt[0], t[0][0], "expected this, got {actual}");
    assert.domEqual(tt[1], t[0][1], "expected this, got {actual}");
  },
  "coerces delay to a number": function(selection) {
    var t = selection.transition().delay("150");
    assert.strictEqual(t[0][0].__transition__[t.id].delay, 150);
    assert.strictEqual(t[0][1].__transition__[t.id].delay, 150);
  }
};

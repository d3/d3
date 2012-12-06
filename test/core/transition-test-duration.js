require("../env");

var assert = require("assert");

module.exports = {
  topic: function() {
    return d3.select("body").html("").selectAll()
        .data(["foo", "bar"])
      .enter().append("div")
        .attr("class", String);
  },
  "defaults to 250 milliseconds": function(selection) {
    var t = selection.transition();
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 250);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 250);
  },
  "can specify duration as a number": function(selection) {
    var t = selection.transition().duration(150);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 150);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 150);
    t.duration(50);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 50);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 50);
  },
  "NaN, zero, or negative durations are treated as 1ms": function(selection) {
    var t = selection.transition().duration(NaN);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 1);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 1);
    t.duration(0);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 1);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 1);
    t.duration(-10);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 1);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 1);
    t.duration(-Infinity);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 1);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 1);
  },
  "floating-point durations are floored to integers": function(selection) {
    var t = selection.transition().duration(14.6);
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 14);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 14);
    var t = selection.transition().duration("16.99");
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 16);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 16);
  },
  "can specify duration as a function": function(selection) {
    var dd = [], ii = [], tt = [], t = selection.transition().duration(f);
    function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return i * 20 + 10; }
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 10);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 30);
    assert.deepEqual(dd, ["foo", "bar"], "expected data, got {actual}");
    assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
    assert.domEqual(tt[0], t[0][0], "expected this, got {actual}");
    assert.domEqual(tt[1], t[0][1], "expected this, got {actual}");
  },
  "coerces duration to a number": function(selection) {
    var t = selection.transition().duration("150");
    assert.strictEqual(t[0][0].__transition__[t.id].duration, 150);
    assert.strictEqual(t[0][1].__transition__[t.id].duration, 150);
  }
};

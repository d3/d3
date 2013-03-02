require("../env");

var assert = require("../env-assert");

module.exports = {
  "start": {
    topic: function() {
      var cb = this.callback,
          div = d3.select("body").html("").selectAll().data(["foo", "bar"]).enter().append("div").attr("class", String),
          transition = div.transition().delay(350),
          then = Date.now(),
          n = 0,
          calls = [],
          context = [],
          data = [],
          index = [],
          count = [],
          delay = [];

      // A callback to verify that multiple callbacks are allowed.
      transition.each("start.other", function() {
        ++n;
      });

      // A callback which captures arguments and context.
      transition.each("start", function(d, i) {
        context.push(this);
        data.push(d);
        index.push(i);
        count.push(++n);
        delay.push(Date.now() - then);
        if (n >= 4) cb(null, {
          selection: div,
          delay: delay,
          context: context,
          data: data,
          index: index,
          count: count,
          id: transition.id
        });
      });
    },

    "invokes the listener after the specified delay": function(result) {
      assert.inDelta(result.delay, [350, 350], 20);
    },
    "invokes each listener exactly once, in order": function(result) {
      assert.deepEqual(result.count, [2, 4]);
    },

    // For the same node, listeners will be called back in order, according to
    // the implementation of d3.dispatch. However, the order of callbacks across
    // nodes is not guaranteed; currently, callbacks are in reverse order if
    // they share the same delay, because of the timer queue. I suppose it'd be
    // slightly better if the callbacks were invoked in node order (consistent
    // with selections), but since these callbacks happen asynchronously I don't
    // think the API needs to guarantee the order of callbacks.

    "uses the node as the context": function(result) {
      assert.domEqual(result.context[0], result.selection[0][0]);
      assert.domEqual(result.context[1], result.selection[0][1]);
    },
    "passes the data and index to the function": function(result) {
      assert.deepEqual(result.data, ["foo", "bar"], "expected data, got {actual}");
      assert.deepEqual(result.index, [0, 1], "expected index, got {actual}");
    },

    "sets an exclusive lock on transitioning nodes": function(result) {
      var id = result.id;
      assert.isTrue(id > 0);
      assert.equal(result.selection[0][0].__transition__.count, 1);
      assert.equal(result.selection[0][1].__transition__.count, 1);
      assert.equal(result.selection[0][0].__transition__.active, id);
      assert.equal(result.selection[0][1].__transition__.active, id);
    }
  },

  "end": {
    topic: function() {
      var cb = this.callback,
          div = d3.select("body").html("").selectAll().data(["foo", "bar"]).enter().append("div").attr("class", String),
          transition = div.transition().duration(350),
          then = Date.now(),
          n = 0,
          calls = [],
          context = [],
          data = [],
          index = [],
          count = [],
          delay = [];

      // A callback to verify that multiple callbacks are allowed.
      transition.each("end.other", function() {
        ++n;
      });

      // A callback which captures arguments and context.
      transition.each("end", function(d, i) {
        context.push(this);
        data.push(d);
        index.push(i);
        count.push(++n);
        delay.push(Date.now() - then);
        if (n >= 4) cb(null, {
          selection: div,
          delay: delay,
          context: context,
          data: data,
          index: index,
          count: count,
          id: transition.id
        });
      });
    },

    "invokes the listener after the specified delay": function(result) {
      assert.inDelta(result.delay, [350, 350], 20);
    },
    "invokes each listener exactly once, in order": function(result) {
      assert.deepEqual(result.count, [2, 4]);
    },

    // For the same node, listeners will be called back in order, according to
    // the implementation of d3.dispatch. However, the order of callbacks across
    // nodes is not guaranteed; currently, callbacks are in reverse order if
    // they share the same delay, because of the timer queue. I suppose it'd be
    // slightly better if the callbacks were invoked in node order (consistent
    // with selections), but since these callbacks happen asynchronously I don't
    // think the API needs to guarantee the order of callbacks.

    "uses the node as the context": function(result) {
      assert.domEqual(result.context[0], result.selection[0][0]);
      assert.domEqual(result.context[1], result.selection[0][1]);
    },
    "passes the data and index to the function": function(result) {
      assert.deepEqual(result.data, ["foo", "bar"], "expected data, got {actual}");
      assert.deepEqual(result.index, [0, 1], "expected index, got {actual}");
    },

    "deletes the transition lock after end": function(result) {
      assert.isFalse("__transition__" in result.selection[0][0]);
      assert.isFalse("__transition__" in result.selection[0][1]);
    },

    // I'd like to test d3.timer.flush here, but unfortunately there's a bug in
    // Vows where it really doesn't like to receive multiple callbacks from
    // different tests at the same time!

    "sequenced": {
      topic: function(result) {
        var cb = this.callback,
            node = result.selection[0][0],
            id = result.id;
        d3.select(node).transition().delay(150).each("start", function() {
          cb(null, {id: id, node: this});
        });
      },
      "does not inherit the transition id": function(result) {
        assert.isTrue(result.id > 0);
        assert.equal(result.node.__transition__.count, 1);
        assert.isTrue(result.node.__transition__.active > result.id);
      }
    }
  }
};

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.on");

suite.addBatch({
  "select(body)": {
    topic: load("selection/on").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "registers an event listener for the specified type": function(body) {
        var form = body.append("form"), count = 0;
        form.on("submit", function() { ++count; }); // jsdom has spotty event support
        form.append("input").attr("type", "submit").node().click();
        assert.equal(count, 1);
      },
      "replaces an existing event listener for the same type": function(body) {
        var form = body.append("form"), count = 0, fail = 0;
        form.on("submit", function() { ++fail; });
        form.on("submit", function() { ++count; });
        form.append("input").attr("type", "submit").node().click();
        assert.equal(count, 1);
        assert.equal(fail, 0);
      },
      "removes an existing event listener": function(body) {
        var form = body.append("form"), fail = 0;
        form.on("submit", function() { ++fail; });
        form.on("submit", null);
        form.append("input").attr("type", "submit").node().click();
        assert.equal(fail, 0);
        assert.isUndefined(form.on("submit"));
      },
      /* Regrettably, JSDOM ignores the capture flag, so we can't test this yet…
      "removing a listener doesn't require the capture flag": function(body) {
        var form = body.append("form"), fail = 0;
        form.on("submit", function() { ++fail; }, true);
        form.on("submit", null);
        form.append("input").attr("type", "submit").node().click();
        assert.equal(fail, 0);
        assert.isUndefined(form.on("submit"));
      },
      */
      "ignores removal of non-matching event listener": function(body) {
        body.append("form").on("submit", null);
      },
      "observes the specified namespace": function(body) {
        var form = body.append("form"), foo = 0, bar = 0;
        form.on("submit.foo", function() { ++foo; });
        form.on({"submit.bar": function() { ++bar; }});
        form.append("input").attr("type", "submit").node().click();
        assert.equal(foo, 1);
        assert.equal(bar, 1);
      },
      "can register listeners as a map": function(body) {
        var form = body.append("form"), count = 0, fail = 0;
        form.on({submit: function() { ++fail; }});
        form.on({submit: function() { ++count; }});
        form.append("input").attr("type", "submit").node().click();
        assert.equal(count, 1);
        assert.equal(fail, 0);
        form.on({submit: null});
        assert.isUndefined(form.on("submit"));
      },
      /* Not really sure how to test this one…
      "observes the specified capture flag": function(body) {
      },
      */
      "passes the current data and index to the event listener": function(body) {
        var forms = body.html("").selectAll("form").data(["a", "b"]).enter().append("form"), dd, ii, data = new Object();
        forms.on("submit", function(d, i) { dd = d; ii = i; });
        forms.append("input").attr("type", "submit")[0][1].click();
        assert.equal(dd, "b");
        assert.equal(ii, 1);
        forms[0][1].__data__ = data;
        forms.append("input").attr("type", "submit")[0][1].click();
        assert.equal(dd, data);
        assert.equal(ii, 1);
      },
      "uses the current element as the context": function(body) {
        var forms = body.html("").selectAll("form").data(["a", "b"]).enter().append("form"), context;
        forms.on("submit", function() { context = this; });
        forms.append("input").attr("type", "submit")[0][1].click();
        assert.domEqual(context, forms[0][1]);
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.on("submit", function() {}) === body);
      },
      "returns the assigned listener if called with one argument": function(body) {
        body.on("mouseover", f).on("click.foo", f);
        function f() {}
        assert.equal(body.on("mouseover"), f);
        assert.equal(body.on("click.foo"), f);
        assert.isUndefined(body.on("click"));
        assert.isUndefined(body.on("mouseover.foo"));
      },
      "omitting the event type": {
        "returns undefined when retrieving a listener": function(body) {
          assert.isUndefined(body.on(".foo"));
        },
        "null removes all named event listeners": function(body) {
          body.on("mouseover.foo", f)
              .on("click.foo", f)
              .on("click.foobar", f)
              .on(".foo", null);
          function f() {}
          assert.isUndefined(body.on("mouseover.foo"));
          assert.isUndefined(body.on("click.foo"));
          assert.equal(body.on("click.foobar"), f);
        },
        "no-op when setting a listener": function(body) {
          assert.isTrue(body.on(".foo", function() {}) === body);
          assert.isUndefined(body.on(".foo"));
        }
      }
    },
    "sets the current event as d3.event": function(d3) {
      var form = d3.select("body").append("form"), event;
      form.on("submit", function() { event = d3.event; });
      form.append("input").attr("type", "submit").node().click();
      assert.equal(event.type, "submit");
      assert.domEqual(event.target, form[0][0]);
    },
    "restores the original event after notifying listeners": function(d3) {
      var form = d3.select("body").append("form"), event = d3.event = new Object();
      form.on("submit", function() {});
      form.append("input").attr("type", "submit").node().click();
      assert.equal(d3.event, event);
    }
  }
});

suite.export(module);

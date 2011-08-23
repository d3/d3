require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.on");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
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
    },
    "ignores removal of non-matching event listener": function(body) {
      body.append("form").on("submit", null);
    },
    "observes the specified namespace": function(body) {
      var form = body.append("form"), foo = 0, bar = 0;
      form.on("submit.foo", function() { ++foo; });
      form.on("submit.bar", function() { ++bar; });
      form.append("input").attr("type", "submit").node().click();
      assert.equal(foo, 1);
      assert.equal(bar, 1);
    },
    /*
    Not really sure how to test this one…
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
    "sets the current event as d3.event": function(body) {
      var form = body.append("form"), event;
      form.on("submit", function() { event = d3.event; });
      form.append("input").attr("type", "submit").node().click();
      assert.equal(event.type, "submit");
      assert.domEqual(event.target, form[0][0]);
    },
    "restores the original event after notifying listeners": function(body) {
      var form = body.append("form"), event = d3.event = new Object();
      form.on("submit", function() {});
      form.append("input").attr("type", "submit").node().click();
      assert.equal(d3.event, event);
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
    }
  }
});

suite.export(module);

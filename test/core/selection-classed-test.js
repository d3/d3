require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.call");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "adds a missing class as true": function(body) {
      body.attr("class", null);
      body.classed("foo", true);
      assert.equal(document.body.className, "foo");
      body.classed("bar", true);
      assert.equal(document.body.className, "foo bar");
    },
    "removes an existing class as false": function(body) {
      body.attr("class", "bar foo");
      body.classed("foo", false);
      assert.equal(document.body.className, "bar");
      body.classed("bar", false);
      assert.equal(document.body.className, "");
    },
    "preserves an existing class as true": function(body) {
      body.attr("class", "bar foo");
      body.classed("foo", true);
      assert.equal(document.body.className, "bar foo");
      body.classed("bar", true);
      assert.equal(document.body.className, "bar foo");
    },
    "preserves a missing class as false": function(body) {
      body.attr("class", "baz");
      body.classed("foo", false);
      assert.equal(document.body.className, "baz");
      body.attr("class", null);
      body.classed("bar", false);
      assert.equal(document.body.className, "");
    },
    "gets an existing class": function(body) {
      body.attr("class", " foo\tbar  baz");
      assert.isTrue(body.classed("foo"));
      assert.isTrue(body.classed("bar"));
      assert.isTrue(body.classed("baz"));
    },
    "does not get a missing class": function(body) {
      body.attr("class", " foo\tbar  baz");
      assert.isFalse(body.classed("foob"));
      assert.isFalse(body.classed("bare"));
      assert.isFalse(body.classed("rbaz"));
    },
    "accepts a name with whitespace, collapsing it": function(body) {
      body.attr("class", null);
      body.classed(" foo\t", true);
      assert.equal(document.body.className, "foo");
      body.classed("\tfoo  ", false);
      assert.equal(document.body.className, "");
    },
    "accepts a name with multiple classes separated by whitespace": function(body) {
      body.attr("class", null);
      body.classed("foo bar", true);
      assert.equal(document.body.className, "foo bar");
      assert.isTrue(body.classed("foo bar"));
      assert.isTrue(body.classed("bar foo"));
      assert.isFalse(body.classed("foo bar baz"));
      assert.isFalse(body.classed("foob bar"));
      body.classed("bar foo", false);
      assert.equal(document.body.className, "");
    },
    "accepts a silly class name with unsafe characters": function(body) {
      body.attr("class", null);
      body.classed("foo.bar", true);
      assert.equal(document.body.className, "foo.bar");
      assert.isTrue(body.classed("foo.bar"));
      assert.isFalse(body.classed("foo"));
      assert.isFalse(body.classed("bar"));
      body.classed("bar.foo", false);
      assert.equal(document.body.className, "foo.bar");
      body.classed("foo.bar", false);
      assert.equal(document.body.className, "");
    },
    "accepts a name with duplicate classes, ignoring them": function(body) {
      body.attr("class", null);
      body.classed(" foo\tfoo  ", true);
      assert.equal(document.body.className, "foo");
      body.classed("\tfoo  foo ", false);
      assert.equal(document.body.className, "");
    },
    "accepts a value function returning true or false": function(body) {
      body.attr("class", null);
      body.classed("foo", function() { return true; });
      assert.equal(document.body.className, "foo");
      body.classed("foo bar", function() { return true; });
      assert.equal(document.body.className, "foo bar");
      body.classed("foo", function() { return false; });
      assert.equal(document.body.className, "bar");
    },
    "accepts a name object containing true or false": function(body) {
      body.attr("class", null);
      body.classed({foo: true});
      assert.equal(document.body.className, "foo");
      body.classed({bar: true, foo: false});
      assert.equal(document.body.className, "bar");
    },
    "accepts a name object containing a function returning true or false": function(body) {
      body.attr("class", null);
      body.classed({foo: function() { return true; }});
      assert.equal(document.body.className, "foo");
    },
    "accepts a name object containing a mix of functions and non-functions": function(body) {
      body.attr("class", "foo");
      body.classed({foo: false, bar: function() { return true; }});
      assert.equal(document.body.className, "bar");
    },
    "the value may be truthy or falsey": function(body) {
      body.attr("class", "foo");
      body.classed({foo: null, bar: function() { return 1; }});
      assert.equal(document.body.className, "bar");
    },
    "keys in the name object may contain whitespace": function(body) {
      body.attr("class", null);
      body.classed({" foo\t": function() { return true; }});
      assert.equal(document.body.className, "foo");
      body.attr("class", null);
    },
    "keys in the name object may reference multiple classes": function(body) {
      body.attr("class", null);
      body.classed({"foo bar": function() { return true; }});
      assert.equal(document.body.className, "foo bar");
      body.attr("class", null);
    },
    "keys in the name object may contain duplicates": function(body) {
      body.attr("class", null);
      body.classed({"foo foo": function() { return true; }});
      assert.equal(document.body.className, "foo");
      body.attr("class", null);
    },
    "value functions are only evaluated once when used for multiple classes": function(body) {
      var count = 0;
      body.attr("class", null);
      body.classed({"foo bar": function() { return ++count; }});
      assert.equal(document.body.className, "foo bar");
      assert.equal(count, 1);
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.classed("foo", true) === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "adds a missing class as true": function(div) {
      div.attr("class", null);
      div.classed("foo", true);
      assert.equal(div[0][0].className, "foo");
      assert.equal(div[0][1].className, "foo");
      div.classed("bar", true);
      assert.equal(div[0][0].className, "foo bar");
      assert.equal(div[0][1].className, "foo bar");
    },
    "adds a missing class as a function": function(div) {
      div.data([0, 1]).attr("class", null);
      div.classed("foo", function(d, i) { return d === 0; });
      assert.equal(div[0][0].className, "foo");
      assert.equal(div[0][1].className, "");
      div.classed("bar", function(d, i) { return i === 1; });
      assert.equal(div[0][0].className, "foo");
      assert.equal(div[0][1].className, "bar");
    },
    "removes an existing class as false": function(div) {
      div.attr("class", "bar foo");
      div.classed("foo", false);
      assert.equal(div[0][0].className, "bar");
      assert.equal(div[0][1].className, "bar");
      div.classed("bar", false);
      assert.equal(div[0][0].className, "");
      assert.equal(div[0][1].className, "");
    },
    "removes an existing class as a function": function(div) {
      div.data([0, 1]).attr("class", "bar foo");
      div.classed("foo", function(d, i) { return d === 0; });
      assert.equal(div[0][0].className, "bar foo");
      assert.equal(div[0][1].className, "bar");
      div.classed("bar", function(d, i) { return i === 1; });
      assert.equal(div[0][0].className, "foo");
      assert.equal(div[0][1].className, "bar");
      div.classed("foo", function() { return false; });
      assert.equal(div[0][0].className, "");
      assert.equal(div[0][1].className, "bar");
      div.classed("bar", function() { return false; });
      assert.equal(div[0][0].className, "");
      assert.equal(div[0][1].className, "");
    },
    "preserves an existing class as true": function(div) {
      div.attr("class", "bar foo");
      div.classed("foo", true);
      assert.equal(div[0][0].className, "bar foo");
      assert.equal(div[0][1].className, "bar foo");
      div.classed("bar", true);
      assert.equal(div[0][0].className, "bar foo");
      assert.equal(div[0][1].className, "bar foo");
    },
    "preserves an existing class as a function": function(div) {
      div.attr("class", "bar foo");
      div.classed("foo", function() { return true; });
      assert.equal(div[0][0].className, "bar foo");
      assert.equal(div[0][1].className, "bar foo");
      div.classed("bar", function() { return true; });
      assert.equal(div[0][0].className, "bar foo");
      assert.equal(div[0][1].className, "bar foo");
    },
    "preserves a missing class as false": function(div) {
      div.attr("class", "baz");
      div.classed("foo", false);
      assert.equal(div[0][0].className, "baz");
      assert.equal(div[0][1].className, "baz");
      div.attr("class", null);
      div.classed("bar", false);
      assert.equal(div[0][0].className, "");
      assert.equal(div[0][1].className, "");
    },
    "preserves a missing class as a function": function(div) {
      div.attr("class", "baz");
      div.classed("foo", function() { return false; });
      assert.equal(div[0][0].className, "baz");
      assert.equal(div[0][1].className, "baz");
      div.attr("class", null);
      div.classed("bar", function() { return false; });
      assert.equal(div[0][0].className, "");
      assert.equal(div[0][1].className, "");
    },
    "gets an existing class": function(div) {
      div[0][0].className = " foo\tbar  baz";
      assert.isTrue(div.classed("foo"));
      assert.isTrue(div.classed("bar"));
      assert.isTrue(div.classed("baz"));
    },
    "does not get a missing class": function(div) {
      div[0][0].className = " foo\tbar  baz";
      assert.isFalse(div.classed("foob"));
      assert.isFalse(div.classed("bare"));
      assert.isFalse(div.classed("rbaz"));
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][1] = null;
      some.attr("class", null).classed("foo", true);
      assert.equal(div[0][0].className, "foo");
      assert.equal(div[0][1].className, "");
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.classed("foo", true) === div);
    }
  }
});

suite.export(module);

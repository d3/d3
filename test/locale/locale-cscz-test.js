var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/cs-CZ").expression("d3_locale_csCZ"),

    "numberFormat": {
      topic: function(locale) {
        return locale.numberFormat;
      },
      "formats numbers": function(format) {
        var f = format(",.2f");
        assert.equal(f(12345.67), "12\xa0345,67");
      },
      "formats currencies": function(format) {
        var f = format("$,.2f");
        assert.equal(f(12345.67), "12\xa0345,67\xa0CZK");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k\xa0CZK");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "pondělí, 1.leden 1990, 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "1.1.1990");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "po.");
          assert.equal(f(local(1990, 0, 2)), "út.");
          assert.equal(f(local(1990, 0, 3)), "st.");
          assert.equal(f(local(1990, 0, 4)), "čt.");
          assert.equal(f(local(1990, 0, 5)), "pá.");
          assert.equal(f(local(1990, 0, 6)), "so.");
          assert.equal(f(local(1990, 0, 7)), "ne.");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "pondělí");
          assert.equal(f(local(1990, 0, 2)), "úterý");
          assert.equal(f(local(1990, 0, 3)), "středa");
          assert.equal(f(local(1990, 0, 4)), "čvrtek");
          assert.equal(f(local(1990, 0, 5)), "pátek");
          assert.equal(f(local(1990, 0, 6)), "sobota");
          assert.equal(f(local(1990, 0, 7)), "neděle");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "led");
          assert.equal(f(local(1990, 1, 1)), "úno");
          assert.equal(f(local(1990, 2, 1)), "břez");
          assert.equal(f(local(1990, 3, 1)), "dub");
          assert.equal(f(local(1990, 4, 1)), "kvě");
          assert.equal(f(local(1990, 5, 1)), "čer");
          assert.equal(f(local(1990, 6, 1)), "červ");
          assert.equal(f(local(1990, 7, 1)), "srp");
          assert.equal(f(local(1990, 8, 1)), "zář");
          assert.equal(f(local(1990, 9, 1)), "říj");
          assert.equal(f(local(1990, 10, 1)), "list");
          assert.equal(f(local(1990, 11, 1)), "pros");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "leden");
          assert.equal(f(local(1990, 1, 1)), "únor");
          assert.equal(f(local(1990, 2, 1)), "březen");
          assert.equal(f(local(1990, 3, 1)), "duben");
          assert.equal(f(local(1990, 4, 1)), "květen");
          assert.equal(f(local(1990, 5, 1)), "červen");
          assert.equal(f(local(1990, 6, 1)), "červenec");
          assert.equal(f(local(1990, 7, 1)), "srpen");
          assert.equal(f(local(1990, 8, 1)), "září");
          assert.equal(f(local(1990, 9, 1)), "říjen");
          assert.equal(f(local(1990, 10, 1)), "listopad");
          assert.equal(f(local(1990, 11, 1)), "prosinec");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "AM");
          assert.equal(f(local(1990, 0, 1, 13)), "PM");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("pondělí, 1.leden 1990, 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("1.1.1990"), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/fi-FI").expression("d3.locale.fi_FI"),

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
        assert.equal(f(12345.67), "12\xa0345,67\xa0€");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k\xa0€");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "maanantai, 1. tammikuuta 1990 klo 00:00:00");
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
          assert.equal(f(local(1990, 0, 1)), "Ma");
          assert.equal(f(local(1990, 0, 2)), "Ti");
          assert.equal(f(local(1990, 0, 3)), "Ke");
          assert.equal(f(local(1990, 0, 4)), "To");
          assert.equal(f(local(1990, 0, 5)), "Pe");
          assert.equal(f(local(1990, 0, 6)), "La");
          assert.equal(f(local(1990, 0, 7)), "Su");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "maanantai");
          assert.equal(f(local(1990, 0, 2)), "tiistai");
          assert.equal(f(local(1990, 0, 3)), "keskiviikko");
          assert.equal(f(local(1990, 0, 4)), "torstai");
          assert.equal(f(local(1990, 0, 5)), "perjantai");
          assert.equal(f(local(1990, 0, 6)), "lauantai");
          assert.equal(f(local(1990, 0, 7)), "sunnuntai");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "Tammi");
          assert.equal(f(local(1990, 1, 1)), "Helmi");
          assert.equal(f(local(1990, 2, 1)), "Maalis");
          assert.equal(f(local(1990, 3, 1)), "Huhti");
          assert.equal(f(local(1990, 4, 1)), "Touko");
          assert.equal(f(local(1990, 5, 1)), "Kesä");
          assert.equal(f(local(1990, 6, 1)), "Heinä");
          assert.equal(f(local(1990, 7, 1)), "Elo");
          assert.equal(f(local(1990, 8, 1)), "Syys");
          assert.equal(f(local(1990, 9, 1)), "Loka");
          assert.equal(f(local(1990, 10, 1)), "Marras");
          assert.equal(f(local(1990, 11, 1)), "Joulu");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "tammikuu");
          assert.equal(f(local(1990, 1, 1)), "helmikuu");
          assert.equal(f(local(1990, 2, 1)), "maaliskuu");
          assert.equal(f(local(1990, 3, 1)), "huhtikuu");
          assert.equal(f(local(1990, 4, 1)), "toukokuu");
          assert.equal(f(local(1990, 5, 1)), "kesäkuu");
          assert.equal(f(local(1990, 6, 1)), "heinäkuu");
          assert.equal(f(local(1990, 7, 1)), "elokuu");
          assert.equal(f(local(1990, 8, 1)), "syyskuu");
          assert.equal(f(local(1990, 9, 1)), "lokakuu");
          assert.equal(f(local(1990, 10, 1)), "marraskuu");
          assert.equal(f(local(1990, 11, 1)), "joulukuu");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "a.m.");
          assert.equal(f(local(1990, 0, 1, 13)), "p.m.");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("maanantai, 1. tammikuuta 1990 klo 00:00:00"), local(1990, 0, 1));
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

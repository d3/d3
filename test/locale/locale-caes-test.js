var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/ca-ES").expression("d3.locale.ca_ES"),

    "numberFormat": {
      topic: function(locale) {
        return locale.numberFormat;
      },
      "formats numbers": function(format) {
        var f = format(",.2f");
        assert.equal(f(12345.67), "12.345,67");
      },
      "formats currencies": function(format) {
        var f = format("$,.2f");
        assert.equal(f(12345.67), "12.345,67 €");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k €");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "dilluns,  1 de gener de 1990, 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "01/01/1990");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "dl.");
          assert.equal(f(local(1990, 0, 2)), "dt.");
          assert.equal(f(local(1990, 0, 3)), "dc.");
          assert.equal(f(local(1990, 0, 4)), "dj.");
          assert.equal(f(local(1990, 0, 5)), "dv.");
          assert.equal(f(local(1990, 0, 6)), "ds.");
          assert.equal(f(local(1990, 0, 7)), "dg.");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "dilluns");
          assert.equal(f(local(1990, 0, 2)), "dimarts");
          assert.equal(f(local(1990, 0, 3)), "dimecres");
          assert.equal(f(local(1990, 0, 4)), "dijous");
          assert.equal(f(local(1990, 0, 5)), "divendres");
          assert.equal(f(local(1990, 0, 6)), "dissabte");
          assert.equal(f(local(1990, 0, 7)), "diumenge");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "gen.");
          assert.equal(f(local(1990, 1, 1)), "febr.");
          assert.equal(f(local(1990, 2, 1)), "març");
          assert.equal(f(local(1990, 3, 1)), "abr.");
          assert.equal(f(local(1990, 4, 1)), "maig");
          assert.equal(f(local(1990, 5, 1)), "juny");
          assert.equal(f(local(1990, 6, 1)), "jul.");
          assert.equal(f(local(1990, 7, 1)), "ag.");
          assert.equal(f(local(1990, 8, 1)), "set.");
          assert.equal(f(local(1990, 9, 1)), "oct.");
          assert.equal(f(local(1990, 10, 1)), "nov.");
          assert.equal(f(local(1990, 11, 1)), "des.");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "gener");
          assert.equal(f(local(1990, 1, 1)), "febrer");
          assert.equal(f(local(1990, 2, 1)), "març");
          assert.equal(f(local(1990, 3, 1)), "abril");
          assert.equal(f(local(1990, 4, 1)), "maig");
          assert.equal(f(local(1990, 5, 1)), "juny");
          assert.equal(f(local(1990, 6, 1)), "juliol");
          assert.equal(f(local(1990, 7, 1)), "agost");
          assert.equal(f(local(1990, 8, 1)), "setembre");
          assert.equal(f(local(1990, 9, 1)), "octubre");
          assert.equal(f(local(1990, 10, 1)), "novembre");
          assert.equal(f(local(1990, 11, 1)), "desembre");
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
          assert.deepEqual(p("dilluns, 1 de gener de 1990, 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("01/01/1990"), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);

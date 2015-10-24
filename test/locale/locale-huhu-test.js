var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/hu-HU").expression("d3_locale_huHU"),

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
        assert.equal(f(12345.67), "12\xa0345,67\xa0Ft");
      },
      "formats currencies with currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k\xa0Ft");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "1990. január 1., hétfő 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "1990. 01. 01.");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "H");
          assert.equal(f(local(1990, 0, 2)), "K");
          assert.equal(f(local(1990, 0, 3)), "Sze");
          assert.equal(f(local(1990, 0, 4)), "Cs");
          assert.equal(f(local(1990, 0, 5)), "P");
          assert.equal(f(local(1990, 0, 6)), "Szo");
          assert.equal(f(local(1990, 0, 7)), "V");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "hétfő");
          assert.equal(f(local(1990, 0, 2)), "kedd");
          assert.equal(f(local(1990, 0, 3)), "szerda");
          assert.equal(f(local(1990, 0, 4)), "csütörtök");
          assert.equal(f(local(1990, 0, 5)), "péntek");
          assert.equal(f(local(1990, 0, 6)), "szombat");
          assert.equal(f(local(1990, 0, 7)), "vasárnap");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "jan.");
          assert.equal(f(local(1990, 1, 1)), "feb.");
          assert.equal(f(local(1990, 2, 1)), "már.");
          assert.equal(f(local(1990, 3, 1)), "ápr.");
          assert.equal(f(local(1990, 4, 1)), "máj.");
          assert.equal(f(local(1990, 5, 1)), "jún.");
          assert.equal(f(local(1990, 6, 1)), "júl.");
          assert.equal(f(local(1990, 7, 1)), "aug.");
          assert.equal(f(local(1990, 8, 1)), "szept.");
          assert.equal(f(local(1990, 9, 1)), "okt.");
          assert.equal(f(local(1990, 10, 1)), "nov.");
          assert.equal(f(local(1990, 11, 1)), "dec.");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "január");
          assert.equal(f(local(1990, 1, 1)), "február");
          assert.equal(f(local(1990, 2, 1)), "március");
          assert.equal(f(local(1990, 3, 1)), "április");
          assert.equal(f(local(1990, 4, 1)), "május");
          assert.equal(f(local(1990, 5, 1)), "június");
          assert.equal(f(local(1990, 6, 1)), "július");
          assert.equal(f(local(1990, 7, 1)), "augusztus");
          assert.equal(f(local(1990, 8, 1)), "szeptember");
          assert.equal(f(local(1990, 9, 1)), "október");
          assert.equal(f(local(1990, 10, 1)), "november");
          assert.equal(f(local(1990, 11, 1)), "december");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "de.");
          assert.equal(f(local(1990, 0, 1, 13)), "du.");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("1990. január 1., hétfő 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("1990. 01. 01."), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);

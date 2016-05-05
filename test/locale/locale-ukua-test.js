var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/uk-UA").expression("d3_locale_ukUA"),

    "numberFormat": {
      topic: function(locale) {
        return locale.numberFormat;
      },
      "formats numbers": function(format) {
        var f = format(",.2f");
        assert.equal(f(12345.67), "12 345,67");
      },
      "formats currencies": function(format) {
        var f = format("$,.2f");
        assert.equal(f(12345.67), "12 345,67 ₴.");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k ₴.");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "понеділок, 1 січня 1990 р. 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "01.01.1990");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "пн");
          assert.equal(f(local(1990, 0, 2)), "вт");
          assert.equal(f(local(1990, 0, 3)), "ср");
          assert.equal(f(local(1990, 0, 4)), "чт");
          assert.equal(f(local(1990, 0, 5)), "пт");
          assert.equal(f(local(1990, 0, 6)), "сб");
          assert.equal(f(local(1990, 0, 7)), "нд");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "понеділок");
          assert.equal(f(local(1990, 0, 2)), "вівторок");
          assert.equal(f(local(1990, 0, 3)), "середа");
          assert.equal(f(local(1990, 0, 4)), "четвер");
          assert.equal(f(local(1990, 0, 5)), "п'ятниця");
          assert.equal(f(local(1990, 0, 6)), "субота");
          assert.equal(f(local(1990, 0, 7)), "неділя");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "січ.");
          assert.equal(f(local(1990, 1, 1)), "лют.");
          assert.equal(f(local(1990, 2, 1)), "бер.");
          assert.equal(f(local(1990, 3, 1)), "квіт.");
          assert.equal(f(local(1990, 4, 1)), "трав.");
          assert.equal(f(local(1990, 5, 1)), "черв.");
          assert.equal(f(local(1990, 6, 1)), "лип.");
          assert.equal(f(local(1990, 7, 1)), "серп.");
          assert.equal(f(local(1990, 8, 1)), "вер.");
          assert.equal(f(local(1990, 9, 1)), "жовт.");
          assert.equal(f(local(1990, 10, 1)), "лист.");
          assert.equal(f(local(1990, 11, 1)), "груд.");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "січня");
          assert.equal(f(local(1990, 1, 1)), "лютого");
          assert.equal(f(local(1990, 2, 1)), "березня");
          assert.equal(f(local(1990, 3, 1)), "квітня");
          assert.equal(f(local(1990, 4, 1)), "травня");
          assert.equal(f(local(1990, 5, 1)), "червня");
          assert.equal(f(local(1990, 6, 1)), "липня");
          assert.equal(f(local(1990, 7, 1)), "серпня");
          assert.equal(f(local(1990, 8, 1)), "вересня");
          assert.equal(f(local(1990, 9, 1)), "жовтня");
          assert.equal(f(local(1990, 10, 1)), "листопада");
          assert.equal(f(local(1990, 11, 1)), "грудня");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "дп");
          assert.equal(f(local(1990, 0, 1, 13)), "пп");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("понеділок, 1 січня 1990 р. 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("01.01.1990"), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);

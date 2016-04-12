var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/ru-RU").expression("d3_locale_ruRU"),

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
        assert.equal(f(12345.67), "12 345,67 руб.");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "12,35k руб.");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "понедельник,  1 января 1990 г. 00:00:00");
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
          assert.equal(f(local(1990, 0, 7)), "вс");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "понедельник");
          assert.equal(f(local(1990, 0, 2)), "вторник");
          assert.equal(f(local(1990, 0, 3)), "среда");
          assert.equal(f(local(1990, 0, 4)), "четверг");
          assert.equal(f(local(1990, 0, 5)), "пятница");
          assert.equal(f(local(1990, 0, 6)), "суббота");
          assert.equal(f(local(1990, 0, 7)), "воскресенье");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "янв");
          assert.equal(f(local(1990, 1, 1)), "фев");
          assert.equal(f(local(1990, 2, 1)), "мар");
          assert.equal(f(local(1990, 3, 1)), "апр");
          assert.equal(f(local(1990, 4, 1)), "май");
          assert.equal(f(local(1990, 5, 1)), "июн");
          assert.equal(f(local(1990, 6, 1)), "июл");
          assert.equal(f(local(1990, 7, 1)), "авг");
          assert.equal(f(local(1990, 8, 1)), "сен");
          assert.equal(f(local(1990, 9, 1)), "окт");
          assert.equal(f(local(1990, 10, 1)), "ноя");
          assert.equal(f(local(1990, 11, 1)), "дек");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "января");
          assert.equal(f(local(1990, 1, 1)), "февраля");
          assert.equal(f(local(1990, 2, 1)), "марта");
          assert.equal(f(local(1990, 3, 1)), "апреля");
          assert.equal(f(local(1990, 4, 1)), "мая");
          assert.equal(f(local(1990, 5, 1)), "июня");
          assert.equal(f(local(1990, 6, 1)), "июля");
          assert.equal(f(local(1990, 7, 1)), "августа");
          assert.equal(f(local(1990, 8, 1)), "сентября");
          assert.equal(f(local(1990, 9, 1)), "октября");
          assert.equal(f(local(1990, 10, 1)), "ноября");
          assert.equal(f(local(1990, 11, 1)), "декабря");
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
          assert.deepEqual(p("понедельник,  1 января 1990 г. 00:00:00"), local(1990, 0, 1));
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

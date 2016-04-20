var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("../time/time"),
    local = time.local;

var suite = vows.describe("d3.locale");

suite.addBatch({
  "locale": {
    topic: load("locale/zh-CN").expression("d3_locale_zhCN"),

    "numberFormat": {
      topic: function(locale) {
        return locale.numberFormat;
      },
      "formats numbers": function(format) {
        var f = format(",.2f");
        assert.equal(f(12345.67), "12,345.67");
      },
      "formats currencies": function(format) {
        var f = format("$,.2f");
        assert.equal(f(12345.67), "¥12,345.67");
      },
      "formats currencies with SI-prefix notation and currency suffix": function(format) {
        var f = format("$,.4s");
        assert.equal(f(12345.67), "¥12.35k");
      }
    },

    "timeFormat": {
      topic: function(locale) {
        return locale.timeFormat;
      },

      "format": {
        "formats locale date and time": function(format) {
          var f = format("%c");
          assert.equal(f(local(1990, 0, 1)), "1990年1月1日 星期一 00:00:00");
        },
        "formats locale date": function(format) {
          var f = format("%x");
          assert.equal(f(local(1990, 0, 1)), "1990年1月1日");
        },
        "formats locale time": function(format) {
          var f = format("%X");
          assert.equal(f(local(1990, 0, 1)), "00:00:00");
        },
        "formats abbreviated weekday": function(format) {
          var f = format("%a");
          assert.equal(f(local(1990, 0, 1)), "周一");
          assert.equal(f(local(1990, 0, 2)), "周二");
          assert.equal(f(local(1990, 0, 3)), "周三");
          assert.equal(f(local(1990, 0, 4)), "周四");
          assert.equal(f(local(1990, 0, 5)), "周五");
          assert.equal(f(local(1990, 0, 6)), "周六");
          assert.equal(f(local(1990, 0, 7)), "周日");
        },
        "formats weekday": function(format) {
          var f = format("%A");
          assert.equal(f(local(1990, 0, 1)), "星期一");
          assert.equal(f(local(1990, 0, 2)), "星期二");
          assert.equal(f(local(1990, 0, 3)), "星期三");
          assert.equal(f(local(1990, 0, 4)), "星期四");
          assert.equal(f(local(1990, 0, 5)), "星期五");
          assert.equal(f(local(1990, 0, 6)), "星期六");
          assert.equal(f(local(1990, 0, 7)), "星期日");
        },
        "formats abbreviated month": function(format) {
          var f = format("%b");
          assert.equal(f(local(1990, 0, 1)), "一月");
          assert.equal(f(local(1990, 1, 1)), "二月");
          assert.equal(f(local(1990, 2, 1)), "三月");
          assert.equal(f(local(1990, 3, 1)), "四月");
          assert.equal(f(local(1990, 4, 1)), "五月");
          assert.equal(f(local(1990, 5, 1)), "六月");
          assert.equal(f(local(1990, 6, 1)), "七月");
          assert.equal(f(local(1990, 7, 1)), "八月");
          assert.equal(f(local(1990, 8, 1)), "九月");
          assert.equal(f(local(1990, 9, 1)), "十月");
          assert.equal(f(local(1990, 10, 1)), "十一月");
          assert.equal(f(local(1990, 11, 1)), "十二月");
        },
        "formats month": function(format) {
          var f = format("%B");
          assert.equal(f(local(1990, 0, 1)), "一月");
          assert.equal(f(local(1990, 1, 1)), "二月");
          assert.equal(f(local(1990, 2, 1)), "三月");
          assert.equal(f(local(1990, 3, 1)), "四月");
          assert.equal(f(local(1990, 4, 1)), "五月");
          assert.equal(f(local(1990, 5, 1)), "六月");
          assert.equal(f(local(1990, 6, 1)), "七月");
          assert.equal(f(local(1990, 7, 1)), "八月");
          assert.equal(f(local(1990, 8, 1)), "九月");
          assert.equal(f(local(1990, 9, 1)), "十月");
          assert.equal(f(local(1990, 10, 1)), "十一月");
          assert.equal(f(local(1990, 11, 1)), "十二月");
        },
        "formats AM or PM": function(format) {
          var f = format("%p");
          assert.equal(f(local(1990, 0, 1, 0)), "上午");
          assert.equal(f(local(1990, 0, 1, 13)), "下午");
        }
      },

      "parse": {
        "parses locale date and time": function(format) {
          var p = format("%c").parse;
          assert.deepEqual(p("1990年1月1日 星期一 00:00:00"), local(1990, 0, 1));
        },
        "parses locale date": function(format) {
          var p = format("%x").parse;
          assert.deepEqual(p("1990年1月1日"), local(1990, 0, 1));
        }
      }
    }
  }
});

suite.export(module);

require("../env");
require("../../d3");
require("../../d3.time");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.time.format");

suite.addBatch({
  "format": {
    topic: function() {
      return d3.time.format;
    },
    "formats abbreviated weekday": function(format) {
      var f = format("%a");
      assert.equal(f(local(1990, 0, 1)), "Mon");
      assert.equal(f(local(1990, 0, 2)), "Tue");
      assert.equal(f(local(1990, 0, 3)), "Wed");
      assert.equal(f(local(1990, 0, 4)), "Thu");
      assert.equal(f(local(1990, 0, 5)), "Fri");
      assert.equal(f(local(1990, 0, 6)), "Sat");
      assert.equal(f(local(1990, 0, 7)), "Sun");
    },
    "formats weekday": function(format) {
      var f = format("%A");
      assert.equal(f(local(1990, 0, 1)), "Monday");
      assert.equal(f(local(1990, 0, 2)), "Tuesday");
      assert.equal(f(local(1990, 0, 3)), "Wednesday");
      assert.equal(f(local(1990, 0, 4)), "Thursday");
      assert.equal(f(local(1990, 0, 5)), "Friday");
      assert.equal(f(local(1990, 0, 6)), "Saturday");
      assert.equal(f(local(1990, 0, 7)), "Sunday");
    },
    "formats abbreviated month": function(format) {
      var f = format("%b");
      assert.equal(f(local(1990, 0, 1)), "Jan");
      assert.equal(f(local(1990, 1, 1)), "Feb");
      assert.equal(f(local(1990, 2, 1)), "Mar");
      assert.equal(f(local(1990, 3, 1)), "Apr");
      assert.equal(f(local(1990, 4, 1)), "May");
      assert.equal(f(local(1990, 5, 1)), "Jun");
      assert.equal(f(local(1990, 6, 1)), "Jul");
      assert.equal(f(local(1990, 7, 1)), "Aug");
      assert.equal(f(local(1990, 8, 1)), "Sep");
      assert.equal(f(local(1990, 9, 1)), "Oct");
      assert.equal(f(local(1990, 10, 1)), "Nov");
      assert.equal(f(local(1990, 11, 1)), "Dec");
    },
    "formats locale date and time": function(format) {
      var f = format("%c");
      assert.equal(f(local(1990, 0, 1)), "Mon Jan  1 00:00:00 1990");
    },
    "formats zero-padded date": function(format) {
      var f = format("%d");
      assert.equal(f(local(1990, 0, 1)), "01");
    },
    "formats space-padded date": function(format) {
      var f = format("%e");
      assert.equal(f(local(1990, 0, 1)), " 1");
    },
    "formats zero-padded hour (24)": function(format) {
      var f = format("%H");
      assert.equal(f(local(1990, 0, 1, 0)), "00");
      assert.equal(f(local(1990, 0, 1, 13)), "13");
    },
    "formats zero-padded hour (12)": function(format) {
      var f = format("%I");
      assert.equal(f(local(1990, 0, 1, 0)), "12");
      assert.equal(f(local(1990, 0, 1, 13)), "01");
    },
    "formats zero-padded day of year": function(format) {
      var f = format("%j");
      assert.equal(f(local(1990, 0, 1)), "001");
      assert.equal(f(local(1990, 5, 1)), "151");
    },
    "formats zero-padded month": function(format) {
      var f = format("%m");
      assert.equal(f(local(1990, 0, 1)), "01");
      assert.equal(f(local(1990, 9, 1)), "10");
    },
    "formats zero-padded minute": function(format) {
      var f = format("%M");
      assert.equal(f(local(1990, 0, 1, 0, 0)), "00");
      assert.equal(f(local(1990, 0, 1, 0, 32)), "32");
    },
    "formats AM or PM": function(format) {
      var f = format("%p");
      assert.equal(f(local(1990, 0, 1, 0)), "AM");
      assert.equal(f(local(1990, 0, 1, 13)), "PM");
    },
    "formats zero-padded second": function(format) {
      var f = format("%S");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0)), "00");
      assert.equal(f(local(1990, 0, 1, 0, 0, 32)), "32");
    },
    "formats zero-padded week number": function(format) {
      var f = format("%U");
      assert.equal(f(local(1990, 0, 1)), "00");
      assert.equal(f(local(1990, 5, 1)), "21");
    },
    "formats locale date": function(format) {
      var f = format("%x");
      assert.equal(f(local(1990, 0, 1)), "01/01/90");
      assert.equal(f(local(2010, 5, 1)), "06/01/10");
    },
    "formats locale time": function(format) {
      var f = format("%X");
      assert.equal(f(local(1990, 0, 1)), "00:00:00");
      assert.equal(f(local(1990, 0, 1, 13, 34, 59)), "13:34:59");
    },
    "formats zero-padded two-digit year": function(format) {
      var f = format("%y");
      assert.equal(f(local(1990, 0, 1)), "90");
      assert.equal(f(local(2002, 0, 1)), "02");
    },
    "formats zero-padded four-digit year": function(format) {
      var f = format("%Y");
      assert.equal(f(local(123, 0, 1)), "0123");
      assert.equal(f(local(1990, 0, 1)), "1990");
      assert.equal(f(local(2002, 0, 1)), "2002");
      assert.equal(f(local(10002, 0, 1)), "0002");
    },
    "formats time zone": function(format) {
      var f = format("%Z");
      assert.equal(f(local(1990, 0, 1)), "-0800");
    },
    "formats literal percent sign": function(format) {
      var f = format("%%");
      assert.equal(f(local(1990, 0, 1)), "%");
    },
    "ISO": {
      topic: function(format) {
        return format.iso;
      },
      "formats as ISO 8601": function(format) {
        assert.equal(format(utc(1990, 0, 1, 0, 0, 0)), "1990-01-01T00:00:00Z");
        assert.equal(format(utc(2011, 11, 31, 23, 59, 59)), "2011-12-31T23:59:59Z");
      }
    }
  }
});

// TODO parse

function local(year, month, day, hours, minutes, seconds) {
  return new Date(year, month, day, hours || 0, minutes || 0, seconds || 0);
}

function utc(year, month, day, hours, minutes, seconds) {
  return new Date(Date.UTC(year, month, day, hours || 0, minutes || 0, seconds || 0));
}

suite.export(module);

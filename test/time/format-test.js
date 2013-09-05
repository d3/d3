var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    time = require("./time"),
    local = time.local;

var suite = vows.describe("d3.time.format");

suite.addBatch({
  "format": {
    topic: load("time/format").expression("d3.time.format"),
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
      assert.equal(f(local(1990, 5, 1)), "152");
      assert.equal(f(local(2010, 2, 13)), "072");
      assert.equal(f(local(2010, 2, 14)), "073"); // DST begins
      assert.equal(f(local(2010, 2, 15)), "074");
      assert.equal(f(local(2010, 10, 6)), "310");
      assert.equal(f(local(2010, 10, 7)), "311"); // DST ends
      assert.equal(f(local(2010, 10, 8)), "312");
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
      var f = format("%0S");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0)), "00");
      assert.equal(f(local(1990, 0, 1, 0, 0, 32)), "32");
    },
    "formats space-padded second": function(format) {
      var f = format("%_S");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0)), " 0");
      assert.equal(f(local(1990, 0, 1, 0, 0, 3)), " 3");
      assert.equal(f(local(1990, 0, 1, 0, 0, 32)), "32");
    },
    "formats no-padded second": function(format) {
      var f = format("%-S");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0)), "0");
      assert.equal(f(local(1990, 0, 1, 0, 0, 3)), "3");
      assert.equal(f(local(1990, 0, 1, 0, 0, 32)), "32");
    },
    "formats zero-padded millisecond": function(format) {
      var f = format("%L");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0, 0)), "000");
      assert.equal(f(local(1990, 0, 1, 0, 0, 0, 432)), "432");
    },
    "formats zero-padded week number": function(format) {
      var f = format("%U");
      assert.equal(f(local(1990, 0, 1)), "00");
      assert.equal(f(local(1990, 5, 1)), "21");
      assert.equal(f(local(2010, 2, 13, 23)), "10");
      assert.equal(f(local(2010, 2, 14, 00)), "11"); // DST begins
      assert.equal(f(local(2010, 2, 15, 00)), "11");
      assert.equal(f(local(2010, 10, 6, 23)), "44");
      assert.equal(f(local(2010, 10, 7, 00)), "45"); // DST ends
      assert.equal(f(local(2010, 10, 8, 00)), "45");
    },
    "formats locale date": function(format) {
      var f = format("%x");
      assert.equal(f(local(1990, 0, 1)), "01/01/1990");
      assert.equal(f(local(2010, 5, 1)), "06/01/2010");
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
      assert.equal(f(local(-2, 0, 1)), "-02");
    },
    "formats zero-padded four-digit year": function(format) {
      var f = format("%Y");
      assert.equal(f(local(123, 0, 1)), "0123");
      assert.equal(f(local(1990, 0, 1)), "1990");
      assert.equal(f(local(2002, 0, 1)), "2002");
      assert.equal(f(local(10002, 0, 1)), "0002");
      assert.equal(f(local(-2, 0, 1)), "-0002");
    },
    "formats time zone": function(format) {
      var f = format("%Z");
      assert.equal(f(local(1990, 0, 1)), "-0800");
    },
    "formats literal percent sign": function(format) {
      var f = format("%%");
      assert.equal(f(local(1990, 0, 1)), "%");
    },

    "parse": {
      "parses abbreviated weekday and numeric date": function(format) {
        var p = format("%a %m/%d/%Y").parse;
        assert.deepEqual(p("Sun 01/01/1990"), local(1990, 0, 1));
        assert.deepEqual(p("Wed 02/03/1991"), local(1991, 1, 3));
        assert.isNull(p("XXX 03/10/2010"));
      },
      "parses weekday and numeric date": function(format) {
        var p = format("%A %m/%d/%Y").parse;
        assert.deepEqual(p("Sunday 01/01/1990"), local(1990, 0, 1));
        assert.deepEqual(p("Wednesday 02/03/1991"), local(1991, 1, 3));
        assert.isNull(p("Caturday 03/10/2010"));
      },
     "parses abbreviated weekday, week number (Sunday) and year": function(format) {
       var p = format("%a %U %Y").parse;
       assert.deepEqual(p("Mon 00 1990"), local(1990, 0, 1));
       assert.deepEqual(p("Sun 05 1991"), local(1991, 1, 3));
       assert.deepEqual(p("Sun 01 1995"), local(1995, 0, 1));
       assert.isNull(p("XXX 03 2010"));
     },
     "parses weekday, week number (Sunday) and year": function(format) {
       var p = format("%A %U %Y").parse;
       assert.deepEqual(p("Monday 00 1990"), local(1990, 0, 1));
       assert.deepEqual(p("Sunday 05 1991"), local(1991, 1, 3));
       assert.deepEqual(p("Sunday 01 1995"), local(1995, 0, 1));
       assert.isNull(p("Caturday 03 2010"));
     },
     "parses numeric weekday, week number (Sunday) and year": function(format) {
       var p = format("%w %U %Y").parse;
       assert.deepEqual(p("1 00 1990"), local(1990, 0, 1));
       assert.deepEqual(p("0 05 1991"), local(1991, 1, 3));
       assert.deepEqual(p("0 01 1995"), local(1995, 0, 1));
       assert.isNull(p("X 03 2010"));
     },
     "parses abbreviated weekday, week number (Monday) and year": function(format) {
       var p = format("%a %W %Y").parse;
       assert.deepEqual(p("Mon 01 1990"), local(1990, 0, 1));
       assert.deepEqual(p("Sun 04 1991"), local(1991, 1, 3));
       assert.deepEqual(p("Sun 00 1995"), local(1995, 0, 1));
       assert.isNull(p("XXX 03 2010"));
     },
     "parses weekday, week number (Monday) and year": function(format) {
       var p = format("%A %W %Y").parse;
       assert.deepEqual(p("Monday 01 1990"), local(1990, 0, 1));
       assert.deepEqual(p("Sunday 04 1991"), local(1991, 1, 3));
       assert.deepEqual(p("Sunday 00 1995"), local(1995, 0, 1));
       assert.isNull(p("Caturday 03 2010"));
     },
     "parses numeric weekday, week number (Monday) and year": function(format) {
       var p = format("%w %W %Y").parse;
       assert.deepEqual(p("1 01 1990"), local(1990, 0, 1));
       assert.deepEqual(p("0 04 1991"), local(1991, 1, 3));
       assert.deepEqual(p("0 00 1995"), local(1995, 0, 1));
       assert.isNull(p("X 03 2010"));
     },
      "parses numeric date": function(format) {
        var p = format("%m/%d/%y").parse;
        assert.deepEqual(p("01/01/90"), local(1990, 0, 1));
        assert.deepEqual(p("02/03/91"), local(1991, 1, 3));
        assert.isNull(p("03/10/2010"));
      },
      "parses locale date": function(format) {
        var p = format("%x").parse;
        assert.deepEqual(p("01/01/1990"), local(1990, 0, 1));
        assert.deepEqual(p("02/03/1991"), local(1991, 1, 3));
        assert.deepEqual(p("03/10/2010"), local(2010, 2, 10));
      },
      "parses abbreviated month, date and year": function(format) {
        var p = format("%b %d, %Y").parse;
        assert.deepEqual(p("jan 01, 1990"), local(1990, 0, 1));
        assert.deepEqual(p("feb  2, 2010"), local(2010, 1, 2));
        assert.isNull(p("jan. 1, 1990"));
      },
      "parses month, date and year": function(format) {
        var p = format("%B %d, %Y").parse;
        assert.deepEqual(p("january 01, 1990"), local(1990, 0, 1));
        assert.deepEqual(p("February  2, 2010"), local(2010, 1, 2));
        assert.isNull(p("jan 1, 1990"));
      },
      "parses day of year and numeric date": function(format) {
        var p = format("%j %m/%d/%Y").parse;
        assert.deepEqual(p("001 01/01/1990"), local(1990, 0, 1));
        assert.deepEqual(p("034 02/03/1991"), local(1991, 1, 3));
        assert.isNull(p("2012 03/10/2010"));
      },
      "parses locale date and time": function(format) {
        var p = format("%c").parse;
        assert.deepEqual(p("Mon Jan  1 00:00:00 1990"), local(1990, 0, 1));
        assert.deepEqual(p("Sun Jan  1 00:00:00 1990"), local(1990, 0, 1));
        assert.deepEqual(p("Mon Jan 01 00:00:00 1990"), local(1990, 0, 1));
        assert.deepEqual(p("Mon Jan 1 00:00:00 1990"), local(1990, 0, 1));
        assert.deepEqual(p("Mon Jan 1 0:0:0 1990"), local(1990, 0, 1));
      },
      "parses twenty-four hour, minute and second": function(format) {
        var p = format("%H:%M:%S").parse;
        assert.deepEqual(p("00:00:00"), local(1900, 0, 1, 0, 0, 0));
        assert.deepEqual(p("11:59:59"), local(1900, 0, 1, 11, 59, 59));
        assert.deepEqual(p("12:00:00"), local(1900, 0, 1, 12, 0, 0));
        assert.deepEqual(p("12:00:01"), local(1900, 0, 1, 12, 0, 1));
        assert.deepEqual(p("23:59:59"), local(1900, 0, 1, 23, 59, 59));
      },
      "parses locale time": function(format) {
        var p = format("%X").parse;
        assert.deepEqual(p("00:00:00"), local(1900, 0, 1, 0, 0, 0));
        assert.deepEqual(p("11:59:59"), local(1900, 0, 1, 11, 59, 59));
        assert.deepEqual(p("12:00:00"), local(1900, 0, 1, 12, 0, 0));
        assert.deepEqual(p("12:00:01"), local(1900, 0, 1, 12, 0, 1));
        assert.deepEqual(p("23:59:59"), local(1900, 0, 1, 23, 59, 59));
      },
      "parses twelve hour, minute and second": function(format) {
        var p = format("%I:%M:%S %p").parse;
        assert.deepEqual(p("12:00:00 am"), local(1900, 0, 1, 0, 0, 0));
        assert.deepEqual(p("11:59:59 AM"), local(1900, 0, 1, 11, 59, 59));
        assert.deepEqual(p("12:00:00 pm"), local(1900, 0, 1, 12, 0, 0));
        assert.deepEqual(p("12:00:01 pm"), local(1900, 0, 1, 12, 0, 1));
        assert.deepEqual(p("11:59:59 PM"), local(1900, 0, 1, 23, 59, 59));
      },
      "parses literal %": function(format) {
        var p = format("%% %m/%d/%Y").parse;
        assert.deepEqual(p("% 01/01/1990"), local(1990, 0, 1));
        assert.deepEqual(p("% 02/03/1991"), local(1991, 1, 3));
        assert.isNull(p("%% 03/10/2010"));
      },
      "parses timezone offset": function(format) {
        var p = format("%m/%d/%Y %Z").parse;
        assert.deepEqual(p("01/02/1990 +0000"), local(1990, 0, 1, 16));
        assert.deepEqual(p("01/02/1990 +0100"), local(1990, 0, 1, 17));
        assert.deepEqual(p("01/02/1990 -0100"), local(1990, 0, 1, 15));
      },
      "ignores optional padding modifier, skipping zeroes and spaces": function(format) {
        var p = format("%-m/%0d/%_Y").parse;
        assert.deepEqual(p("01/ 1/1990"), local(1990, 0, 1));
      },
      "doesn't crash when given weird strings": function(format) {
        try {
          Object.prototype.foo = 10;
          var p = format("%b %d, %Y").parse;
          assert.isNull(p("foo 1, 1990"));
        } finally {
          delete Object.prototype.foo;
        }
      }
    }
  }
});

suite.export(module);

import assert from "assert";
import {readFileSync} from "fs";
import {timeFormatLocale, timeParse} from "../src/index.js";
import {local} from "./date.js";

const fiFi = JSON.parse(readFileSync("./locale/fi-FI.json"));

it("parse(string) coerces the specified string to a string", () => {
  const p = timeParse("%c");
  assert.deepStrictEqual(p({toString: function() { return "1/1/1990, 12:00:00 AM"; }}), local(1990, 0, 1));
  assert.deepStrictEqual(p({toString: function() { return "1/2/1990, 12:00:00 AM"; }}), local(1990, 0, 2));
  assert.deepStrictEqual(p({toString: function() { return "1/3/1990, 12:00:00 AM"; }}), local(1990, 0, 3));
  assert.deepStrictEqual(p({toString: function() { return "1/4/1990, 12:00:00 AM"; }}), local(1990, 0, 4));
  assert.deepStrictEqual(p({toString: function() { return "1/5/1990, 12:00:00 AM"; }}), local(1990, 0, 5));
  assert.deepStrictEqual(p({toString: function() { return "1/6/1990, 12:00:00 AM"; }}), local(1990, 0, 6));
  assert.deepStrictEqual(p({toString: function() { return "1/7/1990, 12:00:00 AM"; }}), local(1990, 0, 7));
});

it("timeParse(specifier) coerces the specified specifier to a string", () => {
  const p = timeParse({toString: function() { return "%c"; }});
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), local(1990, 0, 1));
});

it("timeParse(\"%a %m/%d/%Y\")(date) parses abbreviated weekday and date", () => {
  const p = timeParse("%a %m/%d/%Y");
  assert.deepStrictEqual(p("Sun 01/01/1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Wed 02/03/1991"), local(1991, 1, 3));
  assert.strictEqual(p("XXX 03/10/2010"), null);
});

it("timeParse(\"%A %m/%d/%Y\")(date) parses weekday and date", () => {
  const p = timeParse("%A %m/%d/%Y");
  assert.deepStrictEqual(p("Sunday 01/01/1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Wednesday 02/03/1991"), local(1991, 1, 3));
  assert.strictEqual(p("Caturday 03/10/2010"), null);
});

it("timeParse(\"%U %Y\")(date) parses week number (Sunday) and year", () => {
  const p = timeParse("%U %Y");
  assert.deepStrictEqual(p("00 1990"), local(1989, 11, 31));
  assert.deepStrictEqual(p("05 1991"), local(1991,  1,  3));
  assert.deepStrictEqual(p("01 1995"), local(1995,  0,  1));
});

it("timeParse(\"%a %U %Y\")(date) parses abbreviated weekday, week number (Sunday) and year", () => {
  const p = timeParse("%a %U %Y");
  assert.deepStrictEqual(p("Mon 00 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Sun 05 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("Sun 01 1995"), local(1995, 0, 1));
  assert.strictEqual(p("XXX 03 2010"), null);
});

it("timeParse(\"%A %U %Y\")(date) parses weekday, week number (Sunday) and year", () => {
  const p = timeParse("%A %U %Y");
  assert.deepStrictEqual(p("Monday 00 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Sunday 05 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("Sunday 01 1995"), local(1995, 0, 1));
  assert.strictEqual(p("Caturday 03 2010"), null);
});

it("timeParse(\"%w %U %Y\")(date) parses numeric weekday (Sunday), week number (Sunday) and year", () => {
  const p = timeParse("%w %U %Y");
  assert.deepStrictEqual(p("1 00 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("0 05 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("0 01 1995"), local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%w %V %G\")(date) parses numeric weekday, week number (ISO) and corresponding year", () => {
  const p = timeParse("%w %V %G");
  assert.deepStrictEqual(p("1 01 1990"), local(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 1991"), local(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 1992"), local(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 1994"), local(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 1995"), local(1995,  0,  8));
  assert.deepStrictEqual(p("1 01 2018"), local(2018,  0,  1));
  assert.deepStrictEqual(p("1 01 2019"), local(2018,  11,  31));
});

it("timeParse(\"%w %V %g\")(date) parses numeric weekday, week number (ISO) and corresponding two-digits year", () => {
  const p = timeParse("%w %V %g");
  assert.deepStrictEqual(p("1 01 90"), local(1990,  0,  1));
  assert.deepStrictEqual(p("0 05 91"), local(1991,  1,  3));
  assert.deepStrictEqual(p("4 53 92"), local(1992, 11, 31));
  assert.deepStrictEqual(p("0 52 94"), local(1995,  0,  1));
  assert.deepStrictEqual(p("0 01 95"), local(1995,  0,  8));
  assert.deepStrictEqual(p("1 01 18"), local(2018,  0,  1));
  assert.deepStrictEqual(p("1 01 19"), local(2018, 11, 31));
});

it("timeParse(\"%V %g\")(date) parses week number (ISO) and corresponding two-digits year", () => {
  const p = timeParse("%V %g");
  assert.deepStrictEqual(p("01 90"), local(1990,  0,  1));
  assert.deepStrictEqual(p("05 91"), local(1991,  0, 28));
  assert.deepStrictEqual(p("53 92"), local(1992, 11, 28));
  assert.deepStrictEqual(p("52 94"), local(1994, 11, 26));
  assert.deepStrictEqual(p("01 95"), local(1995,  0,  2));
  assert.deepStrictEqual(p("01 18"), local(2018,  0,  1));
  assert.deepStrictEqual(p("01 19"), local(2018, 11, 31));
});

it("timeParse(\"%u %U %Y\")(date) parses numeric weekday (Monday), week number (Monday) and year", () => {
  const p = timeParse("%u %W %Y");
  assert.deepStrictEqual(p("1 00 1990"), local(1989, 11, 25));
  assert.deepStrictEqual(p("1 01 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("1 05 1991"), local(1991, 1, 4));
  assert.deepStrictEqual(p("7 00 1995"), local(1995, 0, 1));
  assert.deepStrictEqual(p("1 01 1995"), local(1995, 0, 2));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%W %Y\")(date) parses week number (Monday) and year", () => {
  const p = timeParse("%W %Y");
  assert.deepStrictEqual(p("01 1990"), local(1990,  0,  1));
  assert.deepStrictEqual(p("04 1991"), local(1991,  0, 28));
  assert.deepStrictEqual(p("00 1995"), local(1994, 11, 26));
});

it("timeParse(\"%a %W %Y\")(date) parses abbreviated weekday, week number (Monday) and year", () => {
  const p = timeParse("%a %W %Y");
  assert.deepStrictEqual(p("Mon 01 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Sun 04 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("Sun 00 1995"), local(1995, 0, 1));
  assert.strictEqual(p("XXX 03 2010"), null);
});

it("timeParse(\"%A %W %Y\")(date) parses weekday, week number (Monday) and year", () => {
  const p = timeParse("%A %W %Y");
  assert.deepStrictEqual(p("Monday 01 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("Sunday 04 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("Sunday 00 1995"), local(1995, 0, 1));
  assert.strictEqual(p("Caturday 03 2010"), null);
});

it("timeParse(\"%w %W %Y\")(date) parses numeric weekday (Sunday), week number (Monday) and year", () => {
  const p = timeParse("%w %W %Y");
  assert.deepStrictEqual(p("1 01 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("0 04 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("0 00 1995"), local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%u %W %Y\")(date) parses numeric weekday (Monday), week number (Monday) and year", () => {
  const p = timeParse("%u %W %Y");
  assert.deepStrictEqual(p("1 01 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("7 04 1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("7 00 1995"), local(1995, 0, 1));
  assert.strictEqual(p("X 03 2010"), null);
});

it("timeParse(\"%m/%d/%y\")(date) parses month, date and two-digit year", () => {
  const p = timeParse("%m/%d/%y");
  assert.deepStrictEqual(p("02/03/69"), local(1969, 1, 3));
  assert.deepStrictEqual(p("01/01/90"), local(1990, 0, 1));
  assert.deepStrictEqual(p("02/03/91"), local(1991, 1, 3));
  assert.deepStrictEqual(p("02/03/68"), local(2068, 1, 3));
  assert.strictEqual(p("03/10/2010"), null);
});

it("timeParse(\"%x\")(date) parses locale date", () => {
  const p = timeParse("%x");
  assert.deepStrictEqual(p("1/1/1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("2/3/1991"), local(1991, 1, 3));
  assert.deepStrictEqual(p("3/10/2010"), local(2010, 2, 10));
});

it("timeParse(\"%b %d, %Y\")(date) parses abbreviated month, date and year", () => {
  const p = timeParse("%b %d, %Y");
  assert.deepStrictEqual(p("jan 01, 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("feb  2, 2010"), local(2010, 1, 2));
  assert.strictEqual(p("jan. 1, 1990"), null);
});

it("timeParse(\"%B %d, %Y\")(date) parses month, date and year", () => {
  const p = timeParse("%B %d, %Y");
  assert.deepStrictEqual(p("january 01, 1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("February  2, 2010"), local(2010, 1, 2));
  assert.strictEqual(p("jan 1, 1990"), null);
});

it("timeParse(\"%j %m/%d/%Y\")(date) parses day of year and date", () => {
  const p = timeParse("%j %m/%d/%Y");
  assert.deepStrictEqual(p("001 01/01/1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("034 02/03/1991"), local(1991, 1, 3));
  assert.strictEqual(p("2012 03/10/2010"), null);
});

it("timeParse(\"%c\")(date) parses locale date and time", () => {
  const p = timeParse("%c");
  assert.deepStrictEqual(p("1/1/1990, 12:00:00 AM"), local(1990, 0, 1));
});

it("timeParse(\"%H:%M:%S\")(date) parses twenty-four hour, minute and second", () => {
  const p = timeParse("%H:%M:%S");
  assert.deepStrictEqual(p("00:00:00"), local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59"), local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00"), local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01"), local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("23:59:59"), local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%X\")(date) parses locale time", () => {
  const p = timeParse("%X");
  assert.deepStrictEqual(p("12:00:00 AM"), local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 PM"), local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 PM"), local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%L\")(date) parses milliseconds", () => {
  const p = timeParse("%L");
  assert.deepStrictEqual(p("432"), local(1900, 0, 1, 0, 0, 0, 432));
});

it("timeParse(\"%f\")(date) parses microseconds", () => {
  const p = timeParse("%f");
  assert.deepStrictEqual(p("432000"), local(1900, 0, 1, 0, 0, 0, 432));
});

it("timeParse(\"%I:%M:%S %p\")(date) parses twelve hour, minute and second", () => {
  const p = timeParse("%I:%M:%S %p");
  assert.deepStrictEqual(p("12:00:00 am"), local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 AM"), local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 pm"), local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 pm"), local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 PM"), local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%I %p\")(date) parses period in non-English locales", () => {
  const p = timeFormatLocale(fiFi).parse("%I:%M:%S %p");
  assert.deepStrictEqual(p("12:00:00 a.m."), local(1900, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(p("11:59:59 A.M."), local(1900, 0, 1, 11, 59, 59));
  assert.deepStrictEqual(p("12:00:00 p.m."), local(1900, 0, 1, 12, 0, 0));
  assert.deepStrictEqual(p("12:00:01 p.m."), local(1900, 0, 1, 12, 0, 1));
  assert.deepStrictEqual(p("11:59:59 P.M."), local(1900, 0, 1, 23, 59, 59));
});

it("timeParse(\"%Y %q\")(date) parses quarters", () => {
  const p = timeParse("%Y %q");
  assert.deepStrictEqual(p("1990 1"), local(1990, 0, 1));
  assert.deepStrictEqual(p("1990 2"), local(1990, 3, 1));
  assert.deepStrictEqual(p("1990 3"), local(1990, 6, 1));
  assert.deepStrictEqual(p("1990 4"), local(1990, 9, 1));
});

it("timeParse(\"%Y %q %m\")(date) gives the month number priority", () => {
  const p = timeParse("%Y %q %m");
  assert.deepStrictEqual(p("1990 1 2"), local(1990, 1, 1));
  assert.deepStrictEqual(p("1990 2 5"), local(1990, 4, 1));
  assert.deepStrictEqual(p("1990 3 8"), local(1990, 7, 1));
  assert.deepStrictEqual(p("1990 4 9"), local(1990, 8, 1));
});

it("timeParse(\"%% %m/%d/%Y\")(date) parses literal %", () => {
  const p = timeParse("%% %m/%d/%Y");
  assert.deepStrictEqual(p("% 01/01/1990"), local(1990, 0, 1));
  assert.deepStrictEqual(p("% 02/03/1991"), local(1991, 1, 3));
  assert.strictEqual(p("%% 03/10/2010"), null);
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset", () => {
  const p = timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +0000"), local(1990, 0, 1, 16));
  assert.deepStrictEqual(p("01/02/1990 +0100"), local(1990, 0, 1, 15));
  assert.deepStrictEqual(p("01/02/1990 +0130"), local(1990, 0, 1, 14, 30));
  assert.deepStrictEqual(p("01/02/1990 -0100"), local(1990, 0, 1, 17));
  assert.deepStrictEqual(p("01/02/1990 -0130"), local(1990, 0, 1, 17, 30));
  assert.deepStrictEqual(p("01/02/1990 -0800"), local(1990, 0, 2, 0));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form '+-hh:mm'", () => {
  const p = timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01:30"), local(1990, 0, 1, 14, 30));
  assert.deepStrictEqual(p("01/02/1990 -01:30"), local(1990, 0, 1, 17, 30));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form '+-hh'", () => {
  const p = timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 +01"), local(1990, 0, 1, 15));
  assert.deepStrictEqual(p("01/02/1990 -01"), local(1990, 0, 1, 17));
});

it("timeParse(\"%m/%d/%Y %Z\")(date) parses timezone offset in the form 'Z'", () => {
  const p = timeParse("%m/%d/%Y %Z");
  assert.deepStrictEqual(p("01/02/1990 Z"), local(1990, 0, 1, 16));
});

it("timeParse(\"%-m/%0d/%_Y\")(date) ignores optional padding modifier, skipping zeroes and spaces", () => {
  const p = timeParse("%-m/%0d/%_Y");
  assert.deepStrictEqual(p("01/ 1/1990"), local(1990, 0, 1));
});

it("timeParse(\"%b %d, %Y\")(date) doesn't crash when given weird strings", () => {
  try {
    Object.prototype.foo = 10;
    const p = timeParse("%b %d, %Y");
    assert.strictEqual(p("foo 1, 1990"), null);
  } finally {
    delete Object.prototype.foo;
  }
});

import assert from "assert";
import {utcSecond, utcMinute, utcHour, utcDay, utcMonth, utcWeek, utcYear} from "d3-time";
import {utcFormat} from "../src/index.js";
import {utc} from "./date.js";

const formatMillisecond = utcFormat(".%L"),
    formatSecond = utcFormat(":%S"),
    formatMinute = utcFormat("%I:%M"),
    formatHour = utcFormat("%I %p"),
    formatDay = utcFormat("%a %d"),
    formatWeek = utcFormat("%b %d"),
    formatMonth = utcFormat("%B"),
    formatYear = utcFormat("%Y");

function multi(d) {
  return (utcSecond(d) < d ? formatMillisecond
      : utcMinute(d) < d ? formatSecond
      : utcHour(d) < d ? formatMinute
      : utcDay(d) < d ? formatHour
      : utcMonth(d) < d ? (utcWeek(d) < d ? formatDay : formatWeek)
      : utcYear(d) < d ? formatMonth
      : formatYear)(d);
}

it("utcFormat(\"%a\")(date) formats abbreviated weekdays", () => {
  const f = utcFormat("%a");
  assert.strictEqual(f(utc(1990, 0, 1)), "Mon");
  assert.strictEqual(f(utc(1990, 0, 2)), "Tue");
  assert.strictEqual(f(utc(1990, 0, 3)), "Wed");
  assert.strictEqual(f(utc(1990, 0, 4)), "Thu");
  assert.strictEqual(f(utc(1990, 0, 5)), "Fri");
  assert.strictEqual(f(utc(1990, 0, 6)), "Sat");
  assert.strictEqual(f(utc(1990, 0, 7)), "Sun");
});

it("utcFormat(\"%A\")(date) formats weekdays", () => {
  const f = utcFormat("%A");
  assert.strictEqual(f(utc(1990, 0, 1)), "Monday");
  assert.strictEqual(f(utc(1990, 0, 2)), "Tuesday");
  assert.strictEqual(f(utc(1990, 0, 3)), "Wednesday");
  assert.strictEqual(f(utc(1990, 0, 4)), "Thursday");
  assert.strictEqual(f(utc(1990, 0, 5)), "Friday");
  assert.strictEqual(f(utc(1990, 0, 6)), "Saturday");
  assert.strictEqual(f(utc(1990, 0, 7)), "Sunday");
});

it("utcFormat(\"%b\")(date) formats abbreviated months", () => {
  const f = utcFormat("%b");
  assert.strictEqual(f(utc(1990,  0, 1)), "Jan");
  assert.strictEqual(f(utc(1990,  1, 1)), "Feb");
  assert.strictEqual(f(utc(1990,  2, 1)), "Mar");
  assert.strictEqual(f(utc(1990,  3, 1)), "Apr");
  assert.strictEqual(f(utc(1990,  4, 1)), "May");
  assert.strictEqual(f(utc(1990,  5, 1)), "Jun");
  assert.strictEqual(f(utc(1990,  6, 1)), "Jul");
  assert.strictEqual(f(utc(1990,  7, 1)), "Aug");
  assert.strictEqual(f(utc(1990,  8, 1)), "Sep");
  assert.strictEqual(f(utc(1990,  9, 1)), "Oct");
  assert.strictEqual(f(utc(1990, 10, 1)), "Nov");
  assert.strictEqual(f(utc(1990, 11, 1)), "Dec");
});

it("utcFormat(\"%B\")(date) formats months", () => {
  const f = utcFormat("%B");
  assert.strictEqual(f(utc(1990,  0, 1)), "January");
  assert.strictEqual(f(utc(1990,  1, 1)), "February");
  assert.strictEqual(f(utc(1990,  2, 1)), "March");
  assert.strictEqual(f(utc(1990,  3, 1)), "April");
  assert.strictEqual(f(utc(1990,  4, 1)), "May");
  assert.strictEqual(f(utc(1990,  5, 1)), "June");
  assert.strictEqual(f(utc(1990,  6, 1)), "July");
  assert.strictEqual(f(utc(1990,  7, 1)), "August");
  assert.strictEqual(f(utc(1990,  8, 1)), "September");
  assert.strictEqual(f(utc(1990,  9, 1)), "October");
  assert.strictEqual(f(utc(1990, 10, 1)), "November");
  assert.strictEqual(f(utc(1990, 11, 1)), "December");
});

it("utcFormat(\"%c\")(date) formats localized dates and times", () => {
  const f = utcFormat("%c");
  assert.strictEqual(f(utc(1990, 0, 1)), "1/1/1990, 12:00:00 AM");
});

it("utcFormat(\"%d\")(date) formats zero-padded dates", () => {
  const f = utcFormat("%d");
  assert.strictEqual(f(utc(1990, 0, 1)), "01");
});

it("utcFormat(\"%e\")(date) formats space-padded dates", () => {
  const f = utcFormat("%e");
  assert.strictEqual(f(utc(1990, 0, 1)), " 1");
});

it("timeFormat(\"%g\")(date) formats zero-padded two-digit ISO 8601 years", () => {
  const f = utcFormat("%g");
  assert.strictEqual(f(utc(2018, 11, 30, 0)), "18"); // Sunday
  assert.strictEqual(f(utc(2018, 11, 31, 0)), "19"); // Monday
  assert.strictEqual(f(utc(2019, 0, 1, 0)), "19");
});

it("utcFormat(\"%G\")(date) formats zero-padded four-digit ISO 8601 years", () => {
  const f = utcFormat("%G");
  assert.strictEqual(f(utc(2018, 11, 30, 0)), "2018"); // Sunday
  assert.strictEqual(f(utc(2018, 11, 31, 0)), "2019"); // Monday
  assert.strictEqual(f(utc(2019, 0, 1, 0)), "2019");
});

it("utcFormat(\"%H\")(date) formats zero-padded hours (24)", () => {
  const f = utcFormat("%H");
  assert.strictEqual(f(utc(1990, 0, 1,  0)), "00");
  assert.strictEqual(f(utc(1990, 0, 1, 13)), "13");
});

it("utcFormat(\"%I\")(date) formats zero-padded hours (12)", () => {
  const f = utcFormat("%I");
  assert.strictEqual(f(utc(1990, 0, 1,  0)), "12");
  assert.strictEqual(f(utc(1990, 0, 1, 13)), "01");
});

it("utcFormat(\"%j\")(date) formats zero-padded day of year numbers", () => {
  const f = utcFormat("%j");
  assert.strictEqual(f(utc(1990,  0,  1)), "001");
  assert.strictEqual(f(utc(1990,  5,  1)), "152");
  assert.strictEqual(f(utc(2010,  2, 13)), "072");
  assert.strictEqual(f(utc(2010,  2, 14)), "073"); // DST begins
  assert.strictEqual(f(utc(2010,  2, 15)), "074");
  assert.strictEqual(f(utc(2010, 10,  6)), "310");
  assert.strictEqual(f(utc(2010, 10,  7)), "311"); // DST ends
  assert.strictEqual(f(utc(2010, 10,  8)), "312");
});

it("utcFormat(\"%m\")(date) formats zero-padded months", () => {
  const f = utcFormat("%m");
  assert.strictEqual(f(utc(1990, 0, 1)), "01");
  assert.strictEqual(f(utc(1990, 9, 1)), "10");
});

it("utcFormat(\"%M\")(date) formats zero-padded minutes", () => {
  const f = utcFormat("%M");
  assert.strictEqual(f(utc(1990, 0, 1, 0,  0)), "00");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 32)), "32");
});

it("utcFormat(\"%p\")(date) formats AM or PM", () => {
  const f = utcFormat("%p");
  assert.strictEqual(f(utc(1990, 0, 1,  0)), "AM");
  assert.strictEqual(f(utc(1990, 0, 1, 13)), "PM");
});

it("utcFormat(\"%q\")(date) formats quarters", () => {
  const f = utcFormat("%q");
  assert.strictEqual(f(utc(1990, 0, 1)), "1");
  assert.strictEqual(f(utc(1990, 3, 1)), "2");
  assert.strictEqual(f(utc(1990, 6, 1)), "3");
  assert.strictEqual(f(utc(1990, 9, 1)), "4");
});

it("utcFormat(\"%Q\")(date) formats UNIX timestamps", () => {
  const f = utcFormat("%Q");
  assert.strictEqual(f(utc(1970, 0, 1,  0,  0,  0)), "0");
  assert.strictEqual(f(utc(1990, 0, 1,  0,  0,  0)), "631152000000");
  assert.strictEqual(f(utc(1990, 0, 1, 12, 34, 56)), "631197296000");
});

it("utcFormat(\"%s\")(date) formats UNIX timetamps in seconds", () => {
  const f = utcFormat("%s");
  assert.strictEqual(f(utc(1970, 0, 1,  0,  0,  0)), "0");
  assert.strictEqual(f(utc(1990, 0, 1,  0,  0,  0)), "631152000");
  assert.strictEqual(f(utc(1990, 0, 1, 12, 34, 56)), "631197296");
});

it("utcFormat(\"%s.%L\")(date) formats UNIX timetamps in seconds and milliseconds", () => {
  const f = utcFormat("%s.%L");
  assert.strictEqual(f(utc(1990, 0, 1,  0,  0,  0, 123)), "631152000.123");
  assert.strictEqual(f(utc(1990, 0, 1, 12, 34, 56, 789)), "631197296.789");
});

it("utcFormat(\"%s.%f\")(date) formats UNIX timetamps in seconds and microseconds", () => {
  const f = utcFormat("%s.%f");
  assert.strictEqual(f(utc(1990, 0, 1,  0,  0,  0, 123)), "631152000.123000");
  assert.strictEqual(f(utc(1990, 0, 1, 12, 34, 56, 789)), "631197296.789000");
});

it("utcFormat(\"%S\")(date) formats zero-padded seconds", () => {
  const f = utcFormat("%S");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0,  0)), "00");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 32)), "32");
  const f2 = utcFormat("%0S");
  assert.strictEqual(f2(utc(1990, 0, 1, 0, 0,  0)), "00");
  assert.strictEqual(f2(utc(1990, 0, 1, 0, 0, 32)), "32");
});

it("utcFormat(\"%_S\")(date) formats space-padded seconds", () => {
  const f = utcFormat("%_S");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0,  0)), " 0");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0,  3)), " 3");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 32)), "32");
});

it("utcFormat(\"-S\")(date) formats no-padded seconds", () => {
  const f = utcFormat("%-S");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0,  0)), "0");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0,  3)), "3");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 32)), "32");
});

it("utcFormat(\"%L\")(date) formats zero-padded milliseconds", () => {
  const f = utcFormat("%L");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 0,   0)), "000");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 0, 432)), "432");
});

it("utcFormat(\"%u\")(date) formats week day numbers", () => {
  const f = utcFormat("%u");
  assert.strictEqual(f(utc(1990,  0,  1,  0)), "1");
  assert.strictEqual(f(utc(1990,  0,  7,  0)), "7");
  assert.strictEqual(f(utc(2010,  2, 13, 23)), "6");
});

it("utcFormat(\"%f\")(date) formats zero-padded microseconds", () => {
  const f = utcFormat("%f");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 0,   0)), "000000");
  assert.strictEqual(f(utc(1990, 0, 1, 0, 0, 0, 432)), "432000");
});

it("utcFormat(\"%U\")(date) formats zero-padded week numbers", () => {
  const f = utcFormat("%U");
  assert.strictEqual(f(utc(1990,  0,  1,  0)), "00");
  assert.strictEqual(f(utc(1990,  5,  1,  0)), "21");
  assert.strictEqual(f(utc(2010,  2, 13, 23)), "10");
  assert.strictEqual(f(utc(2010,  2, 14,  0)), "11"); // DST begins
  assert.strictEqual(f(utc(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(utc(2010, 10,  6, 23)), "44");
  assert.strictEqual(f(utc(2010, 10,  7,  0)), "45"); // DST ends
  assert.strictEqual(f(utc(2010, 10,  8,  0)), "45");
  assert.strictEqual(f(utc(2012,  0,  1,  0)), "01"); // Sunday!
});

it("utcFormat(\"%W\")(date) formats zero-padded week numbers", () => {
  const f = utcFormat("%W");
  assert.strictEqual(f(utc(1990,  0,  1,  0)), "01"); // Monday!
  assert.strictEqual(f(utc(1990,  5,  1,  0)), "22");
  assert.strictEqual(f(utc(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(utc(2010, 10,  8,  0)), "45");
});

it("utcFormat(\"%V\")(date) formats zero-padded ISO 8601 week numbers", () => {
  const f = utcFormat("%V");
  assert.strictEqual(f(utc(1990,  0,  1,  0)), "01");
  assert.strictEqual(f(utc(1990,  5,  1,  0)), "22");
  assert.strictEqual(f(utc(2010,  2, 13, 23)), "10");
  assert.strictEqual(f(utc(2010,  2, 14,  0)), "10"); // DST begins
  assert.strictEqual(f(utc(2010,  2, 15,  0)), "11");
  assert.strictEqual(f(utc(2010, 10,  6, 23)), "44");
  assert.strictEqual(f(utc(2010, 10,  7,  0)), "44"); // DST ends
  assert.strictEqual(f(utc(2010, 10,  8,  0)), "45");
  assert.strictEqual(f(utc(2015, 11,  31, 0)), "53");
  assert.strictEqual(f(utc(2016,  0,  1,  0)), "53");
});

it("utcFormat(\"%x\")(date) formats localized dates", () => {
  const f = utcFormat("%x");
  assert.strictEqual(f(utc(1990, 0, 1)), "1/1/1990");
  assert.strictEqual(f(utc(2010, 5, 1)), "6/1/2010");
});

it("utcFormat(\"%X\")(date) formats localized times", () => {
  const f = utcFormat("%X");
  assert.strictEqual(f(utc(1990, 0, 1,  0,  0,  0)), "12:00:00 AM");
  assert.strictEqual(f(utc(1990, 0, 1, 13, 34, 59)), "1:34:59 PM");
});

it("utcFormat(\"%y\")(date) formats zero-padded two-digit years", () => {
  const f = utcFormat("%y");
  assert.strictEqual(f(utc(+1990, 0, 1)), "90");
  assert.strictEqual(f(utc(+2002, 0, 1)), "02");
  assert.strictEqual(f(utc(-2, 0, 1)), "-02");
});

it("utcFormat(\"%Y\")(date) formats zero-padded four-digit years", () => {
  const f = utcFormat("%Y");
  assert.strictEqual(f(utc(  123, 0, 1)), "0123");
  assert.strictEqual(f(utc( 1990, 0, 1)), "1990");
  assert.strictEqual(f(utc( 2002, 0, 1)), "2002");
  assert.strictEqual(f(utc(10002, 0, 1)), "0002");
  assert.strictEqual(f(utc(   -2, 0, 1)), "-0002");
});

it("utcFormat(\"%Z\")(date) formats time zones", () => {
  const f = utcFormat("%Z");
  assert.strictEqual(f(utc(1990, 0, 1)), "+0000");
});

it("utcFormat(\"%%\")(date) formats literal percent signs", () => {
  const f = utcFormat("%%");
  assert.strictEqual(f(utc(1990, 0, 1)), "%");
});

it("utcFormat(…) can be used to create a conditional multi-format", () => {
  assert.strictEqual(multi(utc(1990, 0, 1, 0, 0, 0, 12)), ".012");
  assert.strictEqual(multi(utc(1990, 0, 1, 0, 0, 1,  0)), ":01");
  assert.strictEqual(multi(utc(1990, 0, 1, 0, 1, 0,  0)), "12:01");
  assert.strictEqual(multi(utc(1990, 0, 1, 1, 0, 0,  0)), "01 AM");
  assert.strictEqual(multi(utc(1990, 0, 2, 0, 0, 0,  0)), "Tue 02");
  assert.strictEqual(multi(utc(1990, 1, 1, 0, 0, 0,  0)), "February");
  assert.strictEqual(multi(utc(1990, 0, 1, 0, 0, 0,  0)), "1990");
});

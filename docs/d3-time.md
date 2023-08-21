# d3-time

When visualizing time series data, analyzing temporal patterns, or working with time in general, the irregularities of conventional time units quickly become apparent. In the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), for example, most months have 31 days but some have 28, 29 or 30; most years have 365 days but [leap years](https://en.wikipedia.org/wiki/Leap_year) have 366; and with [daylight saving](https://en.wikipedia.org/wiki/Daylight_saving_time), most days have 24 hours but some have 23 or 25. Adding to complexity, daylight saving conventions vary around the world.

As a result of these temporal peculiarities, it can be difficult to perform seemingly-trivial tasks. For example, if you want to compute the number of days that have passed between two dates, you can’t simply subtract and divide by 24 hours (86,400,000 ms):

```js
const start = new Date(2015, 02, 01); // 2015-03-01T00:00
const end = new Date(2015, 03, 01); // 2015-04-01T00:00
const days = (end - start) / 864e5; // 30.958333333333332, oops! 🤯
```

You can, however, use [d3.timeDay](#timeDay).[count](#interval_count):

```js
d3.timeDay.count(start, end) // 31 😌
```

The [day](#timeDay) [interval](#timeInterval) is one of several provided by d3-time. Each interval represents a conventional unit of time — [hours](#timeHour), [weeks](#timeWeek), [months](#timeMonth), *etc.* — and has methods to calculate boundary dates. For example, [d3.timeDay](#timeDay) computes midnight (typically 12:00 AM local time) of the corresponding day. In addition to [rounding](#interval_round) and [counting](#interval_count), intervals can also be used to generate arrays of boundary dates. For example, to compute each Sunday in the current month:

```js
const start = d3.timeMonth.floor(new Date(2015, 0, 15)); // 2015-01-01T00:00
const stop = d3.timeMonth.ceil(new Date(2015, 0, 15)); // 2015-02-01T00:00
const weeks = d3.timeWeek.range(start, stop); // [2015-01-04T00:00, 2015-01-11T00:00, 2015-01-18T00:00, 2015-01-25T00:00]
```

The d3-time module does not implement its own calendaring system; it merely implements a convenient API for calendar math on top of ECMAScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Thus, it ignores leap seconds and can only work with the local time zone and [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).

This module is used by D3’s time scales to generate sensible ticks, by D3’s time format, and can also be used directly to do things like [calendar layouts](https://observablehq.com/@d3/calendar/2).

## *interval*(*date*) {#_interval}

```js
d3.utcMonday() // the latest preceding Monday, UTC time
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Equivalent to [*interval*.floor](#interval_floor), except if *date* is not specified, it defaults to the current time. For example, [d3.timeYear](#timeYear)(*date*) and d3.timeYear.floor(*date*) are equivalent.

## *interval*.floor(*date*) {#interval_floor}

```js
d3.utcMonday.floor(new Date()) // the latest preceding Monday, UTC time
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the latest interval boundary date before or equal to *date*. For example, [d3.timeDay](#timeDay).floor(*date*) typically returns 12:00 AM local time on the given *date*.

This method is idempotent: if the specified *date* is already floored to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the minimum expressible value of the associated interval, such that *interval*.floor(*interval*.floor(*date*) - 1) returns the preceeding interval boundary date.

Note that the `==` and `===` operators do not compare by value with [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects, and thus you cannot use them to tell whether the specified *date* has already been floored. Instead, coerce to a number and then compare:

```js
// Returns true if the specified date is a day boundary.
function isDay(date) {
  return +d3.timeDay.floor(date) === +date;
}
```

This is more reliable than testing whether the time is 12:00 AM, as in some time zones midnight may not exist due to daylight saving.

## *interval*.round(*date*) {#interval_round}

```js
d3.utcMonday.round(new Date()) // the previous or following Monday, whichever is closer
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the closest interval boundary date to *date*. For example, [d3.timeDay](#timeDay).round(*date*) typically returns 12:00 AM local time on the given *date* if it is on or before noon, and 12:00 AM of the following day if it is after noon.

This method is idempotent: if the specified *date* is already rounded to the current interval, a new date with an identical time is returned.

## *interval*.ceil(*date*) {#interval_ceil}

```js
d3.utcMonday.ceil(new Date()) // the following Monday
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the earliest interval boundary date after or equal to *date*. For example, [d3.timeDay](#timeDay).ceil(*date*) typically returns 12:00 AM local time on the date following the given *date*.

This method is idempotent: if the specified *date* is already ceilinged to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the maximum expressible value of the associated interval, such that *interval*.ceil(*interval*.ceil(*date*) + 1) returns the following interval boundary date.

## *interval*.offset(*date*, *step*) {#interval_offset}

```js
d3.utcDay.offset(new Date(), 1) // the same time tomorrow
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date equal to *date* plus *step* intervals. If *step* is not specified it defaults to 1. If *step* is negative, then the returned date will be before the specified *date*; if *step* is zero, then a copy of the specified *date* is returned; if *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor). This method does not round the specified *date* to the interval. For example, if *date* is today at 5:34 PM, then [d3.timeDay](#timeDay).offset(*date*, 1) returns 5:34 PM tomorrow (even if daylight saving changes!).

## *interval*.range(*start*, *stop*, *step*) {#interval_range}

```js
d3.utcDay.range(new Date("2014-01-01"), new Date("2015-01-01")) // every day in 2014
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns an array of dates representing every interval boundary after or equal to *start* (inclusive) and before *stop* (exclusive). If *step* is specified, then every *step*th boundary will be returned; for example, for the [d3.timeDay](#timeDay) interval a *step* of 2 will return every other day. If *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

The first date in the returned array is the earliest boundary after or equal to *start*; subsequent dates are [offset](#interval_offset) by *step* intervals and [floored](#interval_floor). Thus, two overlapping ranges may be consistent. For example, this range contains odd days:

```js
d3.timeDay.range(new Date(2015, 0, 1), new Date(2015, 0, 7), 2) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

While this contains even days:

```js
d3.timeDay.range(new Date(2015, 0, 2), new Date(2015, 0, 8), 2) // [2015-01-02T00:00, 2015-01-04T00:00, 2015-01-06T00:00]
```

To make ranges consistent when a *step* is specified, use [*interval*.every](#interval_every) instead.

For convenience, aliases for *interval*.range are also provided as plural forms of the corresponding interval, such as [utcMondays](#utcMondays).

## *interval*.filter(*test*) {#interval_filter}

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new interval that is a filtered subset of this interval using the specified *test* function. The *test* function is passed a date and should return true if and only if the specified date should be considered part of the interval. For example, to create an interval that returns the 1st, 11th, 21th and 31th (if it exists) of each month:

```js
d3.timeDay.filter((d) => (d.getDate() - 1) % 10 === 0)
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.every](#interval_every).

## *interval*.every(*step*) {#interval_every}

```js
d3.unixDay.every(3)
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a [filtered](#interval_filter) view of this interval representing every *step*th date. The meaning of *step* is dependent on this interval’s parent interval as defined by the field function. For example, [d3.timeMinute](#timeMinute).every(15) returns an interval representing every fifteen minutes, starting on the hour: :00, :15, :30, :45, <i>etc.</i> Note that for some intervals, the resulting dates may not be uniformly-spaced; [d3.timeDay](#timeDay)’s parent interval is [d3.timeMonth](#timeMonth), and thus the interval number resets at the start of each month. If *step* is not valid, returns null. If *step* is one, returns this interval.

This method can be used in conjunction with [*interval*.range](#interval_range) to ensure that two overlapping ranges are consistent. For example, this range contains odd days:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 1), new Date(2015, 0, 7)) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

As does this one:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 2), new Date(2015, 0, 8)) // [2015-01-03T00:00, 2015-01-05T00:00, 2015-01-07T00:00]
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.filter](#interval_filter).

## *interval*.count(*start*, *end*) {#interval_count}

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns the number of interval boundaries after *start* (exclusive) and before or equal to *end* (inclusive). Note that this behavior is slightly different than [*interval*.range](#interval_range) because its purpose is to return the zero-based number of the specified *end* date relative to the specified *start* date. For example, to compute the current zero-based day-of-year number:

```js
d3.timeDay.count(d3.timeYear(now), now) // 177
```

Likewise, to compute the current zero-based week-of-year number for weeks that start on Sunday:

```js
d3.timeSunday.count(d3.timeYear(now), now) // 25
```

## timeInterval(*floor*, *offset*, *count*, *field*) {#timeInterval}

```js
const utcDay = d3.timeInterval(
  (date) => date.setUTCHours(0, 0, 0, 0), // floor
  (date, step) => date.setUTCDate(date.getUTCDate() + step), // offset
  (start, end) => (end - start) / 864e5, // count
  (date) => date.getUTCDate() - 1 // field
);
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Constructs a new custom interval given the specified *floor* and *offset* functions and an optional *count* function.

The *floor* function takes a single date as an argument and rounds it down to the nearest interval boundary.

The *offset* function takes a date and an integer step as arguments and advances the specified date by the specified number of boundaries; the step may be positive, negative or zero.

The optional *count* function takes a start date and an end date, already floored to the current interval, and returns the number of boundaries between the start (exclusive) and end (inclusive). If a *count* function is not specified, the returned interval does not expose [*interval*.count](#interval_count) or [*interval*.every](#interval_every) methods. Note: due to an internal optimization, the specified *count* function must not invoke *interval*.count on other time intervals.

The optional *field* function takes a date, already floored to the current interval, and returns the field value of the specified date, corresponding to the number of boundaries between this date (exclusive) and the latest previous parent boundary. For example, for the [d3.timeDay](#timeDay) interval, this returns the number of days since the start of the month. If a *field* function is not specified, it defaults to counting the number of interval boundaries since the UNIX epoch of January 1, 1970 UTC. The *field* function defines the behavior of [*interval*.every](#interval_every).

## timeMillisecond {#timeMillisecond}

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js) · Milliseconds in local time; the shortest available time unit.

## timeSecond {#timeSecond}

[Source](https://github.com/d3/d3-time/blob/main/src/second.js) · Seconds in local time (e.g., 01:23:45.0000 AM); 1,000 milliseconds.

## timeMinute {#timeMinute}

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js) · Minutes in local time (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript [ignores leap seconds](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1).

## timeHour {#timeHour}

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js) · Hours in local time (e.g., 01:00 AM); 60 minutes. Note that advancing time by one hour in local time can return the same hour or skip an hour due to daylight saving.

## timeDay {#timeDay}

[Source](https://github.com/d3/d3-time/blob/main/src/day.js) · Days in local time (e.g., February 7, 2012 at 12:00 AM); typically 24 hours. Days in local time may range from 23 to 25 hours due to daylight saving. d3.unixDay is like [d3.utcDay](#timeDay), except it counts days since the UNIX epoch (January 1, 1970) such that *interval*.every returns uniformly-spaced dates rather than varying based on day-of-month.

## timeWeek {#timeWeek}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Alias for [d3.timeSunday](#timeSunday); 7 days and typically 168 hours. Weeks in local time may range from 167 to 169 hours due to daylight saving.

## timeSunday {#timeSunday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Sunday-based weeks in local time (e.g., February 5, 2012 at 12:00 AM).

## timeMonday {#timeMonday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Monday-based weeks in local time (e.g., February 6, 2012 at 12:00 AM).

## timeTuesday {#timeTuesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Tuesday-based weeks in local time (e.g., February 7, 2012 at 12:00 AM).

## timeWednesday {#timeWednesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Wednesday-based weeks in local time (e.g., February 8, 2012 at 12:00 AM).

## timeThursday {#timeThursday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Thursday-based weeks in local time (e.g., February 9, 2012 at 12:00 AM).

## timeFriday {#timeFriday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Friday-based weeks in local time (e.g., February 10, 2012 at 12:00 AM).

## timeSaturday {#timeSaturday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Saturday-based weeks in local time (e.g., February 11, 2012 at 12:00 AM).

## timeMonth {#timeMonth}

[Source](https://github.com/d3/d3-time/blob/main/src/month.js) · Months in local time (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.

## timeYear {#timeYear}

[Source](https://github.com/d3/d3-time/blob/main/src/year.js) · Years in local time (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.

## utcMillisecond {#utcMillisecond}

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js) · Milliseconds in UTC time; the shortest available time unit.

## utcSecond {#utcSecond}

[Source](https://github.com/d3/d3-time/blob/main/src/second.js) · Seconds in UTC time (e.g., 01:23:45.0000 AM); 1,000 milliseconds.

## utcMinute {#utcMinute}

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js) · Minutes in UTC time (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript [ignores leap seconds](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1).

## utcHour {#utcHour}

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js) · Hours in UTC time (e.g., 01:00 AM); 60 minutes.

## utcDay {#utcDay}

[Source](https://github.com/d3/d3-time/blob/main/src/day.js) · Days in UTC time (e.g., February 7, 2012 at 12:00 AM); 24 hours.

## utcWeek {#utcWeek}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Alias for [d3.timeSunday](#timeSunday); 7 days and 168 hours.

## utcSunday {#utcSunday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Sunday-based weeks in UTC time (e.g., February 5, 2012 at 12:00 AM).

## utcMonday {#utcMonday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Monday-based weeks in UTC time (e.g., February 6, 2012 at 12:00 AM).

## utcTuesday {#utcTuesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Tuesday-based weeks in UTC time (e.g., February 7, 2012 at 12:00 AM).

## utcWednesday {#utcWednesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Wednesday-based weeks in UTC time (e.g., February 8, 2012 at 12:00 AM).

## utcThursday {#utcThursday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Thursday-based weeks in UTC time (e.g., February 9, 2012 at 12:00 AM).

## utcFriday {#utcFriday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Friday-based weeks in UTC time (e.g., February 10, 2012 at 12:00 AM).

## utcSaturday {#utcSaturday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Saturday-based weeks in UTC time (e.g., February 11, 2012 at 12:00 AM).

## utcMonth {#utcMonth}

[Source](https://github.com/d3/d3-time/blob/main/src/month.js) · Months in UTC time (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.

## utcYear {#utcYear}

[Source](https://github.com/d3/d3-time/blob/main/src/year.js) · Years in UTC time (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.

## unixDay {#unixDay}

Like [d3.utcDay](#utcDay), except it counts days since the UNIX epoch (January 1, 1970) such that [*interval*.every](#interval_every) returns uniformly-spaced dates rather than varying based on day-of-month.

## timeMilliseconds(*start*, *stop*, *step*) {#timeMilliseconds}

Alias for [d3.timeMillisecond](#timeMillisecond).[range](#interval_range).

## timeSeconds(*start*, *stop*, *step*) {#timeSeconds}

Alias for [d3.timeSecond](#timeSecond).[range](#interval_range).

## timeMinutes(*start*, *stop*, *step*) {#timeMinutes}

Alias for [d3.timeMinute](#timeMinute).[range](#interval_range).

## timeHours(*start*, *stop*, *step*) {#timeHours}

Alias for [d3.timeHour](#timeHour).[range](#interval_range).

## timeDays(*start*, *stop*, *step*) {#timeDays}

Alias for [d3.timeDay](#timeDay).[range](#interval_range).

## timeWeeks(*start*, *stop*, *step*) {#timeWeeks}

Alias for [d3.timeWeek](#timeWeek).[range](#interval_range).

## timeSundays(*start*, *stop*, *step*) {#timeSundays}

Alias for [d3.timeSunday](#timeSunday).[range](#interval_range).

## timeMondays(*start*, *stop*, *step*) {#timeMondays}

Alias for [d3.timeMonday](#timeMonday).[range](#interval_range).

## timeTuesdays(*start*, *stop*, *step*) {#timeTuesdays}

Alias for [d3.timeTuesday](#timeTuesday).[range](#interval_range).

## timeWednesdays(*start*, *stop*, *step*) {#timeWednesdays}

Alias for [d3.timeWednesday](#timeWednesday).[range](#interval_range).

## timeThursdays(*start*, *stop*, *step*) {#timeThursdays}

Alias for [d3.timeThursday](#timeThursday).[range](#interval_range).

## timeFridays(*start*, *stop*, *step*) {#timeFridays}

Alias for [d3.timeFriday](#timeFriday).[range](#interval_range).

## timeSaturdays(*start*, *stop*, *step*) {#timeSaturdays}

Alias for [d3.timeSaturday](#timeSaturday).[range](#interval_range).

## timeMonths(*start*, *stop*, *step*) {#timeMonths}

Alias for [d3.timeMonth](#timeMonth).[range](#interval_range).

## timeYears(*start*, *stop*, *step*) {#timeYears}

Alias for [d3.timeYear](#timeYear).[range](#interval_range).

## utcMilliseconds(*start*, *stop*, *step*) {#utcMilliseconds}

Alias for [d3.utcMillisecond](#utcMillisecond).[range](#interval_range).

## utcSeconds(*start*, *stop*, *step*) {#utcSeconds}

Alias for [d3.utcSecond](#utcSecond).[range](#interval_range).

## utcMinutes(*start*, *stop*, *step*) {#utcMinutes}

Alias for [d3.utcMinute](#utcMinute).[range](#interval_range).

## utcHours(*start*, *stop*, *step*) {#utcHours}

Alias for [d3.utcHour](#utcHour).[range](#interval_range).

## utcDays(*start*, *stop*, *step*) {#utcDays}

Alias for [d3.utcDay](#utcDay).[range](#interval_range).

## utcWeeks(*start*, *stop*, *step*) {#utcWeeks}

Alias for [d3.utcWeek](#utcWeek).[range](#interval_range).

## utcSundays(*start*, *stop*, *step*) {#utcSundays}

Alias for [d3.utcSunday](#utcSunday).[range](#interval_range).

## utcMondays(*start*, *stop*, *step*) {#utcMondays}

Alias for [d3.utcMonday](#utcMonday).[range](#interval_range).

## utcTuesdays(*start*, *stop*, *step*) {#utcTuesdays}

Alias for [d3.utcTuesday](#utcTuesday).[range](#interval_range).

## utcWednesdays(*start*, *stop*, *step*) {#utcWednesdays}

Alias for [d3.utcWednesday](#utcWednesday).[range](#interval_range).

## utcThursdays(*start*, *stop*, *step*) {#utcThursdays}

Alias for [d3.utcThursday](#utcThursday).[range](#interval_range).

## utcFridays(*start*, *stop*, *step*) {#utcFridays}

Alias for [d3.utcFriday](#utcFriday).[range](#interval_range).

## utcSaturdays(*start*, *stop*, *step*) {#utcSaturdays}

Alias for [d3.utcSaturday](#utcSaturday).[range](#interval_range).

## utcMonths(*start*, *stop*, *step*) {#utcMonths}

Alias for [d3.utcMonth](#utcMonth).[range](#interval_range).

## utcYears(*start*, *stop*, *step*) {#utcYears}

Alias for [d3.utcYear](#utcYear).[range](#interval_range).

## timeTicks(*start*, *stop*, *count*) {#timeTicks}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Equivalent to [d3.utcTicks](#utcTicks), but in local time.

## timeTickInterval(*start*, *stop*, *count*) {#timeTickInterval}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns the time interval that would be used by [d3.timeTicks](#timeTicks) given the same arguments.

## utcTicks(*start*, *stop*, *count*) {#utcTicks}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns an array of approximately *count* dates at regular intervals between *start* and *stop* (inclusive). If *stop* is before *start*, dates are returned in reverse chronological order; otherwise dates are returned in chronological order. The following UTC time intervals are considered:

* 1 second
* 5 seconds
* 15 seconds
* 30 seconds
* 1 minute
* 5 minutes
* 15 minutes
* 30 minutes
* 1 hour
* 3 hours
* 6 hours
* 12 hours
* 1 day
* 2 days
* 1 week
* 1 month
* 3 months
* 1 year

Multiples of milliseconds (for small ranges) and years (for large ranges) are also considered, following the rules of [d3.ticks](./d3-array/ticks.md#ticks). The interval producing the number of dates that is closest to *count* is used. For example:

```js
const start = new Date("1970-03-01");
const stop = new Date("1996-03-19");
const count = 4;
const ticks = d3.utcTicks(start, stop, count); // [1975-01-01, 1980-01-01, 1985-01-01, 1990-01-01, 1995-01-01]
```

If *count* is a time interval, this function behaves similarly to [*interval*.range](#interval_range) except that both *start* and *stop* are inclusive and it may return dates in reverse chronological order if *stop* is before *start*.

## utcTickInterval(*start*, *stop*, *count*) {#utcTickInterval}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns the time interval that would be used by [d3.utcTicks](#utcTicks) given the same arguments. If there is no associated interval, such as when *start* or *stop* is invalid, returns null.

```js
const start = new Date("1970-03-01");
const stop = new Date("1996-03-19");
const count = 4;
const interval = d3.utcTickInterval(start, stop, count); // d3.utcYear.every(5)
```

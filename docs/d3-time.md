# d3-time

When visualizing time series data, analyzing temporal patterns, or working with time in general, the irregularities of conventional time units quickly become apparent. In the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), for example, most months have 31 days but some have 28, 29 or 30; most years have 365 days but [leap years](https://en.wikipedia.org/wiki/Leap_year) have 366; and with [daylight saving](https://en.wikipedia.org/wiki/Daylight_saving_time), most days have 24 hours but some have 23 or 25. Adding to complexity, daylight saving conventions vary around the world.

As a result of these temporal peculiarities, it can be difficult to perform seemingly-trivial tasks. For example, if you want to compute the number of days that have passed between two dates, you can’t simply subtract and divide by 24 hours (86,400,000 ms):

```js
start = new Date(2015, 02, 01) // 2015-03-01T00:00
end = new Date(2015, 03, 01) // 2015-04-01T00:00
(end - start) / 864e5 // 30.958333333333332, oops! 🤯
```

You can, however, use [d3.timeDay](#timeDay).[count](#interval_count):

```js
d3.timeDay.count(start, end) // 31 😌
```

The [day](#day) [interval](#api-reference) is one of several provided by d3-time. Each interval represents a conventional unit of time—[hours](#timeHour), [weeks](#timeWeek), [months](#timeMonth), *etc.*—and has methods to calculate boundary dates. For example, [d3.timeDay](#timeDay) computes midnight (typically 12:00 AM local time) of the corresponding day. In addition to [rounding](#interval_round) and [counting](#interval_count), intervals can also be used to generate arrays of boundary dates. For example, to compute each Sunday in the current month:

```js
start = d3.timeMonth.floor() // 2015-01-01T00:00
stop = d3.timeMonth.ceil() // 2015-02-01T00:00
d3.timeWeek.range(start, stop) // [2015-01-07T00:00, 2015-01-14T00:00, 2015-01-21T00:00, 2015-01-28T00:00]
```

The d3-time module does not implement its own calendaring system; it merely implements a convenient API for calendar math on top of ECMAScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Thus, it ignores leap seconds and can only work with the local time zone and [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).

This module is used by D3’s time scales to generate sensible ticks, by D3’s time format, and can also be used directly to do things like [calendar layouts](http://bl.ocks.org/mbostock/4063318).

## Installing

If you use npm, `npm install d3-time`. You can also download the [latest release on GitHub](https://github.com/d3/d3-time/releases/latest). For vanilla HTML in modern browsers, import d3-time from Skypack:

```html
<script type="module">

import {timeDay} from "https://cdn.skypack.dev/d3-time@3";

const day = timeDay();

</script>
```

For legacy environments, you can load d3-time’s UMD bundle from an npm-based CDN such as jsDelivr; a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3-array@3"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-time@3"></script>
<script>

const day = d3.timeDay();

</script>
```

[Try d3-time in your browser.](https://observablehq.com/collection/@d3/d3-time)

## API Reference

#### interval(date)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Equivalent to [*interval*.floor](#interval_floor), except if *date* is not specified, it defaults to the current time. For example, [d3.timeYear](#timeYear)(*date*) and d3.timeYear.floor(*date*) are equivalent.

```js
monday = d3.timeMonday() // the latest preceeding Monday, local time
```

#### interval.floor(date)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a new date representing the latest interval boundary date before or equal to *date*. For example, [d3.timeDay](#timeDay).floor(*date*) typically returns 12:00 AM local time on the given *date*.

This method is idempotent: if the specified *date* is already floored to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the minimum expressible value of the associated interval, such that *interval*.floor(*interval*.floor(*date*) - 1) returns the preceeding interval boundary date.

Note that the `==` and `===` operators do not compare by value with [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects, and thus you cannot use them to tell whether the specified *date* has already been floored. Instead, coerce to a number and then compare:

```js
// Returns true if the specified date is a day boundary.
function isDay(date) {
  return +d3.timeDay.floor(date) === +date;
}
```

This is more reliable than testing whether the time is 12:00 AM, as in some time zones midnight may not exist due to daylight saving.

#### interval.round(date)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a new date representing the closest interval boundary date to *date*. For example, [d3.timeDay](#timeDay).round(*date*) typically returns 12:00 AM local time on the given *date* if it is on or before noon, and 12:00 AM of the following day if it is after noon.

This method is idempotent: if the specified *date* is already rounded to the current interval, a new date with an identical time is returned.

#### interval.ceil(date)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a new date representing the earliest interval boundary date after or equal to *date*. For example, [d3.timeDay](#timeDay).ceil(*date*) typically returns 12:00 AM local time on the date following the given *date*.

This method is idempotent: if the specified *date* is already ceilinged to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the maximum expressible value of the associated interval, such that *interval*.ceil(*interval*.ceil(*date*) + 1) returns the following interval boundary date.

#### interval.offset(date, step)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a new date equal to *date* plus *step* intervals. If *step* is not specified it defaults to 1. If *step* is negative, then the returned date will be before the specified *date*; if *step* is zero, then a copy of the specified *date* is returned; if *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor). This method does not round the specified *date* to the interval. For example, if *date* is today at 5:34 PM, then [d3.timeDay](#timeDay).offset(*date*, 1) returns 5:34 PM tomorrow (even if daylight saving changes!).

#### interval.range(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns an array of dates representing every interval boundary after or equal to *start* (inclusive) and before *stop* (exclusive). If *step* is specified, then every *step*th boundary will be returned; for example, for the [d3.timeDay](#timeDay) interval a *step* of 2 will return every other day. If *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

The first date in the returned array is the earliest boundary after or equal to *start*; subsequent dates are [offset](#interval_offset) by *step* intervals and [floored](#interval_floor). Thus, two overlapping ranges may be consistent. For example, this range contains odd days:

```js
d3.timeDay.range(new Date(2015, 0, 1), new Date(2015, 0, 7), 2) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

While this contains even days:

```js
d3.timeDay.range(new Date(2015, 0, 2), new Date(2015, 0, 8), 2) // [2015-01-02T00:00, 2015-01-04T00:00, 2015-01-06T00:00]
```

To make ranges consistent when a *step* is specified, use [*interval*.every](#interval_every) instead.

#### interval.filter(test)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a new interval that is a filtered subset of this interval using the specified *test* function. The *test* function is passed a date and should return true if and only if the specified date should be considered part of the interval. For example, to create an interval that returns the 1st, 11th, 21th and 31th (if it exists) of each month:

```js
d3.timeDay.filter(d => (d.getDate() - 1) % 10 === 0)
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.every](#interval_every).

#### interval.every(step)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns a [filtered](#interval_filter) view of this interval representing every *step*th date. The meaning of *step* is dependent on this interval’s parent interval as defined by the field function. For example, [d3.timeMinute](#timeMinute).every(15) returns an interval representing every fifteen minutes, starting on the hour: :00, :15, :30, :45, <i>etc.</i> Note that for some intervals, the resulting dates may not be uniformly-spaced; [d3.timeDay](#timeDay)’s parent interval is [d3.timeMonth](#timeMonth), and thus the interval number resets at the start of each month. If *step* is not valid, returns null. If *step* is one, returns this interval.

This method can be used in conjunction with [*interval*.range](#interval_range) to ensure that two overlapping ranges are consistent. For example, this range contains odd days:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 1), new Date(2015, 0, 7)) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

As does this one:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 2), new Date(2015, 0, 8)) // [2015-01-03T00:00, 2015-01-05T00:00, 2015-01-07T00:00]
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.filter](#interval_filter).

#### interval.count(start, end)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Returns the number of interval boundaries after *start* (exclusive) and before or equal to *end* (inclusive). Note that this behavior is slightly different than [*interval*.range](#interval_range) because its purpose is to return the zero-based number of the specified *end* date relative to the specified *start* date. For example, to compute the current zero-based day-of-year number:

```js
d3.timeDay.count(d3.timeYear(now), now) // 177
```

Likewise, to compute the current zero-based week-of-year number for weeks that start on Sunday:

```js
d3.timeSunday.count(d3.timeYear(now), now) // 25
```

#### d3.timeInterval(floor, offset, count, field)

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js)

Constructs a new custom interval given the specified *floor* and *offset* functions and an optional *count* function.

The *floor* function takes a single date as an argument and rounds it down to the nearest interval boundary.

The *offset* function takes a date and an integer step as arguments and advances the specified date by the specified number of boundaries; the step may be positive, negative or zero.

The optional *count* function takes a start date and an end date, already floored to the current interval, and returns the number of boundaries between the start (exclusive) and end (inclusive). If a *count* function is not specified, the returned interval does not expose [*interval*.count](#interval_count) or [*interval*.every](#interval_every) methods. Note: due to an internal optimization, the specified *count* function must not invoke *interval*.count on other time intervals.

The optional *field* function takes a date, already floored to the current interval, and returns the field value of the specified date, corresponding to the number of boundaries between this date (exclusive) and the latest previous parent boundary. For example, for the [d3.timeDay](#timeDay) interval, this returns the number of days since the start of the month. If a *field* function is not specified, it defaults to counting the number of interval boundaries since the UNIX epoch of January 1, 1970 UTC. The *field* function defines the behavior of [*interval*.every](#interval_every).

### Intervals

The following intervals are provided:

#### d3.timeMillisecond

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js "Source")
<br><a href="#timeMillisecond">#</a> d3.<b>utcMillisecond</b>

Milliseconds; the shortest available time unit.

#### d3.timeSecond

[Source](https://github.com/d3/d3-time/blob/main/src/second.js "Source")
<br><a href="#timeSecond">#</a> d3.<b>utcSecond</b>

Seconds (e.g., 01:23:45.0000 AM); 1,000 milliseconds.

#### d3.timeMinute

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js "Source")
<br><a href="#timeMinute">#</a> d3.<b>utcMinute</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcMinute.js "Source")

Minutes (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript [ignores leap seconds](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1).

#### d3.timeHour

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js "Source")
<br><a href="#timeHour">#</a> d3.<b>utcHour</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcHour.js "Source")

Hours (e.g., 01:00 AM); 60 minutes. Note that advancing time by one hour in local time can return the same hour or skip an hour due to daylight saving.

#### d3.timeDay

[Source](https://github.com/d3/d3-time/blob/main/src/day.js "Source")
<br><a href="#timeDay">#</a> d3.<b>utcDay</b> · [Source](https://github.com/d3/d3-time/blob/main/src/day.js)
<br><a href="#timeDay">#</a> d3.<b>unixDay</b> · [Source](https://github.com/d3/d3-time/blob/main/src/day.js)

Days (e.g., February 7, 2012 at 12:00 AM); typically 24 hours. Days in local time may range from 23 to 25 hours due to daylight saving. d3.unixDay is like [d3.utcDay](#timeDay), except it counts days since the UNIX epoch (January 1, 1970) such that *interval*.every returns uniformly-spaced dates rather than varying based on day-of-month.

#### d3.timeWeek

[Source](https://github.com/d3/d3-time/blob/main/src/week.js "Source")
<br><a href="#timeWeek">#</a> d3.<b>utcWeek</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js "Source")

Alias for [d3.timeSunday](#timeSunday); 7 days and typically 168 hours. Weeks in local time may range from 167 to 169 hours due to daylight saving.

#### d3.timeSunday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeSunday">#</a> d3.<b>utcSunday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Sunday-based weeks (e.g., February 5, 2012 at 12:00 AM).

#### d3.timeMonday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeMonday">#</a> d3.<b>utcMonday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Monday-based weeks (e.g., February 6, 2012 at 12:00 AM).

#### d3.timeTuesday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeTuesday">#</a> d3.<b>utcTuesday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Tuesday-based weeks (e.g., February 7, 2012 at 12:00 AM).

#### d3.timeWednesday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeWednesday">#</a> d3.<b>utcWednesday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Wednesday-based weeks (e.g., February 8, 2012 at 12:00 AM).

#### d3.timeThursday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeThursday">#</a> d3.<b>utcThursday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Thursday-based weeks (e.g., February 9, 2012 at 12:00 AM).

#### d3.timeFriday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeFriday">#</a> d3.<b>utcFriday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Friday-based weeks (e.g., February 10, 2012 at 12:00 AM).

#### d3.timeSaturday

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeSaturday">#</a> d3.<b>utcSaturday</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Saturday-based weeks (e.g., February 11, 2012 at 12:00 AM).

#### d3.timeMonth

[Source](https://github.com/d3/d3-time/blob/main/src/month.js "Source")
<br><a href="#timeMonth">#</a> d3.<b>utcMonth</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcMonth.js "Source")

Months (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.

#### d3.timeYear

[Source](https://github.com/d3/d3-time/blob/main/src/year.js "Source")
<br><a href="#timeYear">#</a> d3.<b>utcYear</b> · [Source](https://github.com/d3/d3-time/blob/main/src/utcYear.js "Source")

Years (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.

### Ranges

For convenience, aliases for [*interval*.range](#interval_range) are also provided as plural forms of the corresponding interval.

#### d3.timeMilliseconds(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js)
<br><a href="#timeMilliseconds">#</a> d3.<b>utcMilliseconds</b>(<i>start</i>, <i>stop</i>[, <i>step</i>])

Aliases for [d3.timeMillisecond](#timeMillisecond).[range](#interval_range) and [d3.utcMillisecond](#timeMillisecond).[range](#interval_range).

#### d3.timeSeconds(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/second.js)
<br><a href="#timeSeconds">#</a> d3.<b>utcSeconds</b>(<i>start</i>, <i>stop</i>[, <i>step</i>])

Aliases for [d3.timeSecond](#timeSecond).[range](#interval_range) and [d3.utcSecond](#timeSecond).[range](#interval_range).

#### d3.timeMinutes(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js)
<br><a href="#timeMinutes">#</a> d3.<b>utcMinutes</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcMinute.js)

Aliases for [d3.timeMinute](#timeMinute).[range](#interval_range) and [d3.utcMinute](#timeMinute).[range](#interval_range).

#### d3.timeHours(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js)
<br><a href="#timeHours">#</a> d3.<b>utcHours</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcHour.js)

Aliases for [d3.timeHour](#timeHour).[range](#interval_range) and [d3.utcHour](#timeHour).[range](#interval_range).

#### d3.timeDays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/day.js)
<br><a href="#timeDays">#</a> d3.<b>utcDays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/day.js)
<br><a href="#timeDays">#</a> d3.<b>unixDays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/day.js)

Aliases for [d3.timeDay](#timeDay).[range](#interval_range), [d3.utcDay](#timeDay).[range](#interval_range), and [d3.unixDay](#timeDay).[range](#interval_range).

#### d3.timeWeeks(start, stop, step)
<br><a href="#timeWeeks">#</a> d3.<b>utcWeeks</b>(<i>start</i>, <i>stop</i>[, <i>step</i>])

Aliases for [d3.timeWeek](#timeWeek).[range](#interval_range) and [d3.utcWeek](#timeWeek).[range](#interval_range).

#### d3.timeSundays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeSundays">#</a> d3.<b>utcSundays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeSunday](#timeSunday).[range](#interval_range) and [d3.utcSunday](#timeSunday).[range](#interval_range).

#### d3.timeMondays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeMondays">#</a> d3.<b>utcMondays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeMonday](#timeMonday).[range](#interval_range) and [d3.utcMonday](#timeMonday).[range](#interval_range).

#### d3.timeTuesdays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeTuesdays">#</a> d3.<b>utcTuesdays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeTuesday](#timeTuesday).[range](#interval_range) and [d3.utcTuesday](#timeTuesday).[range](#interval_range).

#### d3.timeWednesdays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeWednesdays">#</a> d3.<b>utcWednesdays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeWednesday](#timeWednesday).[range](#interval_range) and [d3.utcWednesday](#timeWednesday).[range](#interval_range).

#### d3.timeThursdays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeThursdays">#</a> d3.<b>utcThursdays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeThursday](#timeThursday).[range](#interval_range) and [d3.utcThursday](#timeThursday).[range](#interval_range).

#### d3.timeFridays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeFridays">#</a> d3.<b>utcFridays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeFriday](#timeFriday).[range](#interval_range) and [d3.utcFriday](#timeFriday).[range](#interval_range).

#### d3.timeSaturdays(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/week.js)
<br><a href="#timeSaturdays">#</a> d3.<b>utcSaturdays</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcWeek.js)

Aliases for [d3.timeSaturday](#timeSaturday).[range](#interval_range) and [d3.utcSaturday](#timeSaturday).[range](#interval_range).

#### d3.timeMonths(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/month.js)
<br><a href="#timeMonths">#</a> d3.<b>utcMonths</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcMonth.js)

Aliases for [d3.timeMonth](#timeMonth).[range](#interval_range) and [d3.utcMonth](#timeMonth).[range](#interval_range).

#### d3.timeYears(start, stop, step)

[Source](https://github.com/d3/d3-time/blob/main/src/year.js)
<br><a href="#timeYears">#</a> d3.<b>utcYears</b>(<i>start</i>, <i>stop</i>[, <i>step</i>]) · [Source](https://github.com/d3/d3-time/blob/main/src/utcYear.js)

Aliases for [d3.timeYear](#timeYear).[range](#interval_range) and [d3.utcYear](#timeYear).[range](#interval_range).

### Ticks

#### d3.timeTicks(start, stop, count)

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js)

Equivalent to [d3.utcTicks](#utcTicks), but in local time.

#### d3.timeTickInterval(start, stop, count)

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js)

Returns the time interval that would be used by [d3.timeTicks](#timeTicks) given the same arguments.

#### d3.utcTicks(start, stop, count)

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js)

Returns an array of approximately *count* dates at regular intervals between *start* and *stop* (inclusive). If *stop* is before *start*, dates are returned in reverse chronological order; otherwise dates are returned in chronological order. The following UTC time intervals are considered:

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

Multiples of milliseconds (for small ranges) and years (for large ranges) are also considered, following the rules of [d3.ticks](https://github.com/d3/d3-array/blob/main/README.md#ticks). The interval producing the number of dates that is closest to *count* is used. For example:

```js
start = new Date(Date.UTC(1970, 2, 1))
stop = new Date(Date.UTC(1996, 2, 19))
count = 4
d3.utcTicks(start, stop, count) // [1975-01-01, 1980-01-01, 1985-01-01, 1990-01-01, 1995-01-01]
```

If *count* is a time interval, this function behaves similarly to [*interval*.range](#interval_range) except that both *start* and *stop* are inclusive and it may return dates in reverse chronological order if *stop* is before *start*.

#### d3.utcTickInterval(start, stop, count)

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js)

Returns the time interval that would be used by [d3.utcTicks](#utcTicks) given the same arguments. If there is no associated interval, such as when *start* or *stop* is invalid, returns null.

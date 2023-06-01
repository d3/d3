# d3-scale: Time scales

Time scales are a variant of [linear scales](#linear-scales) that have a temporal domain: domain values are coerced to [dates](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) rather than numbers, and [invert](#continuous_invert) likewise returns a date. Time scales implement [ticks](#time_ticks) based on [calendar intervals](https://github.com/d3/d3-time), taking the pain out of generating axes for temporal domains.

For example, to create a position encoding:

```js
var x = d3.scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
    .range([0, 960]);

x(new Date(2000, 0, 1,  5)); // 200
x(new Date(2000, 0, 1, 16)); // 640
x.invert(200); // Sat Jan 01 2000 05:00:00 GMT-0800 (PST)
x.invert(640); // Sat Jan 01 2000 16:00:00 GMT-0800 (PST)
```

For a valid value *y* in the range, <i>time</i>(<i>time</i>.invert(<i>y</i>)) equals *y*; similarly, for a valid value *x* in the domain, <i>time</i>.invert(<i>time</i>(<i>x</i>)) equals *x*. The invert method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

### d3.scaleTime(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

Constructs a new time scale with the specified [domain](#time_domain) and [range](#time_range), the [default](https://github.com/d3/d3-interpolate/blob/main/README.md#interpolate) [interpolator](#time_interpolate) and [clamping](#time_clamp) disabled. If *domain* is not specified, it defaults to [2000-01-01, 2000-01-02]. If *range* is not specified, it defaults to [0, 1].

### time(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*](#_continuous).

### time.invert(value)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.invert](#continuous_invert).

### time.domain(domain)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.domain](#continuous_domain).

### time.range(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.range](#continuous_range).

### time.rangeRound(range)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.rangeRound](#continuous_rangeRound).

### time.clamp(clamp)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.clamp](#continuous_clamp).

### time.interpolate(interpolate)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.interpolate](#continuous_interpolate).

### time.ticks(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)
<br><a name="time_ticks" href="#time_ticks">#</a> <i>time</i>.<b>ticks</b>([<i>interval</i>])

Returns representative dates from the scale’s [domain](#time_domain). The returned tick values are uniformly-spaced (mostly), have sensible values (such as every day at midnight), and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.

An optional *count* may be specified to affect how many ticks are generated. If *count* is not specified, it defaults to 10. The specified *count* is only a hint; the scale may return more or fewer values depending on the domain. For example, to create ten default ticks, say:

```js
var x = d3.scaleTime();

x.ticks(10);
// [Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 03:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 06:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 09:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 12:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 15:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 18:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 21:00:00 GMT-0800 (PST),
//  Sun Jan 02 2000 00:00:00 GMT-0800 (PST)]
```

The following time intervals are considered for automatic ticks:

* 1-, 5-, 15- and 30-second.
* 1-, 5-, 15- and 30-minute.
* 1-, 3-, 6- and 12-hour.
* 1- and 2-day.
* 1-week.
* 1- and 3-month.
* 1-year.

In lieu of a *count*, a [time *interval*](https://github.com/d3/d3-time/blob/main/README.md#intervals) may be explicitly specified. To prune the generated ticks for a given time *interval*, use [*interval*.every](https://github.com/d3/d3-time/blob/main/README.md#interval_every). For example, to generate ticks at 15-[minute](https://github.com/d3/d3-time/blob/main/README.md#minute) intervals:

```js
var x = d3.scaleTime()
    .domain([new Date(2000, 0, 1, 0), new Date(2000, 0, 1, 2)]);

x.ticks(d3.timeMinute.every(15));
// [Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:15:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:30:00 GMT-0800 (PST),
//  Sat Jan 01 2000 00:45:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:15:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:30:00 GMT-0800 (PST),
//  Sat Jan 01 2000 01:45:00 GMT-0800 (PST),
//  Sat Jan 01 2000 02:00:00 GMT-0800 (PST)]
```

Alternatively, pass a test function to [*interval*.filter](https://github.com/d3/d3-time/blob/main/README.md#interval_filter):

```js
x.ticks(d3.timeMinute.filter(function(d) {
  return d.getMinutes() % 15 === 0;
}));
```

Note: in some cases, such as with day ticks, specifying a *step* can result in irregular spacing of ticks because time intervals have varying length.

### time.tickFormat(count, specifier)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/scale-ticks)
<br><a href="#time_tickFormat">#</a> <i>time</i>.<b>tickFormat</b>([<i>interval</i>[, <i>specifier</i>]])

Returns a time format function suitable for displaying [tick](#time_ticks) values. The specified *count* or *interval* is currently ignored, but is accepted for consistency with other scales such as [*continuous*.tickFormat](#continuous_tickFormat). If a format *specifier* is specified, this method is equivalent to [format](https://github.com/d3/d3-time-format/blob/main/README.md#format). If *specifier* is not specified, the default time format is returned. The default multi-scale time format chooses a human-readable representation based on the specified date as follows:

* `%Y` - for year boundaries, such as `2011`.
* `%B` - for month boundaries, such as `February`.
* `%b %d` - for week boundaries, such as `Feb 06`.
* `%a %d` - for day boundaries, such as `Mon 07`.
* `%I %p` - for hour boundaries, such as `01 AM`.
* `%I:%M` - for minute boundaries, such as `01:23`.
* `:%S` - for second boundaries, such as `:45`.
* `.%L` - milliseconds for all other times, such as `.012`.

Although somewhat unusual, this default behavior has the benefit of providing both local and global context: for example, formatting a sequence of ticks as [11 PM, Mon 07, 01 AM] reveals information about hours, dates, and day simultaneously, rather than just the hours [11 PM, 12 AM, 01 AM]. See [d3-time-format](https://github.com/d3/d3-time-format) if you’d like to roll your own conditional time format.

### time.nice(count)

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)
<br><a name="time_nice" href="#time_nice">#</a> <i>time</i>.<b>nice</b>([<i>interval</i>])

Extends the [domain](#time_domain) so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. See [*continuous*.nice](#continuous_nice) for more.

An optional tick *count* argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned [ticks](#time_ticks) will exactly cover the domain. Alternatively, a [time *interval*](https://github.com/d3/d3-time/blob/main/README.md#intervals) may be specified to explicitly set the ticks. If an *interval* is specified, an optional *step* may also be specified to skip some ticks. For example, `time.nice(d3.timeSecond.every(10))` will extend the domain to an even ten seconds (0, 10, 20, <i>etc.</i>). See [*time*.ticks](#time_ticks) and [*interval*.every](https://github.com/d3/d3-time/blob/main/README.md#interval_every) for further detail.

Nicing is useful if the domain is computed from data, say using [extent](https://github.com/d3/d3-array/blob/main/README.md#extent), and may be irregular. For example, for a domain of [2009-07-13T00:02, 2009-07-13T23:48], the nice domain is [2009-07-13, 2009-07-14]. If the domain has more than two values, nicing the domain only affects the first and last value.

### time.copy()

[Source](https://github.com/d3/d3-scale/blob/main/src/time.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

See [*continuous*.copy](#continuous_copy).

### d3.scaleUtc(domain, range)

[Source](https://github.com/d3/d3-scale/blob/main/src/utcTime.js), [Examples](https://observablehq.com/@d3/d3-scaletime)

Equivalent to [scaleTime](#scaleTime), but the returned time scale operates in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time.

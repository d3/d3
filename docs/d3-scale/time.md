# Time scales

Time scales are a variant of [linear scales](./linear.md) that have a temporal domain: domain values are coerced to [dates](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) rather than numbers, and invert likewise returns a date. Time scales implement [ticks](#time_ticks) based on [calendar intervals](../d3-time.md), taking the pain out of generating axes for temporal domains.

## scaleTime(*domain*, *range*) {#scaleTime}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Constructs a new time scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled. For example, to create a position encoding:

```js
const x = d3.scaleTime([new Date(2000, 0, 1), new Date(2000, 0, 2)], [0, 960]);
x(new Date(2000, 0, 1, 5)); // 200
x(new Date(2000, 0, 1, 16)); // 640
x.invert(200); // Sat Jan 01 2000 05:00:00 GMT-0800 (PST)
x.invert(640); // Sat Jan 01 2000 16:00:00 GMT-0800 (PST)
```

If *domain* is not specified, it defaults to [2000-01-01, 2000-01-02] in local time. If *range* is not specified, it defaults to [0, 1].

## scaleUtc(*domain*, *range*) {#scaleUtc}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/utcTime.js) · Equivalent to [scaleTime](#scaleTime), but the returned time scale operates in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time. For example, to create a position encoding:

```js
const x = d3.scaleUtc([new Date("2000-01-01"), new Date("2000-01-02")], [0, 960]);
x(new Date("2000-01-01T05:00Z")); // 200
x(new Date("2000-01-01T16:00Z")); // 640
x.invert(200); // 2000-01-01T05:00Z
x.invert(640); // 2000-01-01T16:00Z
```

If *domain* is not specified, it defaults to [2000-01-01, 2000-01-02] in UTC time. If *range* is not specified, it defaults to [0, 1].

:::tip
A UTC scale should be preferred when possible as it behaves more predictably: days are always twenty-four hours and the scale does not depend on the browser’s time zone.
:::

## *time*.ticks(*count*) {#time_ticks}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Returns representative dates from the scale’s domain.

```js
const x = d3.scaleTime();
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

The returned tick values are uniformly-spaced (mostly), have sensible values (such as every day at midnight), and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.

An optional *count* may be specified to affect how many ticks are generated. If *count* is not specified, it defaults to 10. The specified *count* is only a hint; the scale may return more or fewer values depending on the domain.

The following time intervals are considered for automatic ticks:

* 1-, 5-, 15- and 30-second.
* 1-, 5-, 15- and 30-minute.
* 1-, 3-, 6- and 12-hour.
* 1- and 2-day.
* 1-week.
* 1- and 3-month.
* 1-year.

In lieu of a *count*, a [time *interval*](../d3-time.md#_interval) may be explicitly specified. To prune the generated ticks for a given time *interval*, use [*interval*.every](../d3-time.md#interval_every). For example, to generate ticks at 15-minute intervals:

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T00:00Z"), new Date("2000-01-01T02:00Z")]);
x.ticks(d3.utcMinute.every(15));
// [2000-01-01T00:00Z,
//  2000-01-01T00:15Z,
//  2000-01-01T00:30Z,
//  2000-01-01T00:45Z,
//  2000-01-01T01:00Z,
//  2000-01-01T01:15Z,
//  2000-01-01T01:30Z,
//  2000-01-01T01:45Z,
//  2000-01-01T02:00Z]
```

Note: in some cases, such as with day ticks, specifying a *step* can result in irregular spacing of ticks because time intervals have varying length.

## *time*.tickFormat(*count*, *specifier*) {#time_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Returns a time format function suitable for displaying [tick](#time_ticks) values.

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T00:00Z"), new Date("2000-01-01T02:00Z")]);
const T = x.ticks(); // [2000-01-01T00:00Z, 2000-01-01T00:15Z, 2000-01-01T00:30Z, …]
const f = x.tickFormat();
T.map(f); // ["2000", "12:15", "12:30", "12:45", "01 AM", "01:15", "01:30", "01:45", "02 AM"]
```

The specified *count* is currently ignored, but is accepted for consistency with other scales such as [*linear*.tickFormat](./linear.md#linear_tickFormat). If a format *specifier* is specified, this method is equivalent to [format](../d3-time-format.md#timeFormat). If *specifier* is not specified, the default time format is returned. The default multi-scale time format chooses a human-readable representation based on the specified date as follows:

* `%Y` - for year boundaries, such as `2011`.
* `%B` - for month boundaries, such as `February`.
* `%b %d` - for week boundaries, such as `Feb 06`.
* `%a %d` - for day boundaries, such as `Mon 07`.
* `%I %p` - for hour boundaries, such as `01 AM`.
* `%I:%M` - for minute boundaries, such as `01:23`.
* `:%S` - for second boundaries, such as `:45`.
* `.%L` - milliseconds for all other times, such as `.012`.

Although somewhat unusual, this default behavior has the benefit of providing both local and global context: for example, formatting a sequence of ticks as [11 PM, Mon 07, 01 AM] reveals information about hours, dates, and day simultaneously, rather than just the hours [11 PM, 12 AM, 01 AM]. See [d3-time-format](../d3-time-format.md) if you’d like to roll your own conditional time format.

## *time*.nice(*count*) {#time_nice}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Extends the domain so that it starts and ends on nice round values.

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T12:34Z"), new Date("2000-01-01T12:59Z")]).nice();
x.domain(); // [2000-01-01T12:30Z, 2000-01-01T13:00Z]
```

This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. See [*linear*.nice](./linear.md#linear_nice) for more.

An optional tick *count* argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned [ticks](#time_ticks) will exactly cover the domain. Alternatively, a [time *interval*](../d3-time.md#timeInterval) may be specified to explicitly set the ticks. If an *interval* is specified, an optional *step* may also be specified to skip some ticks. For example, *time*.nice(d3.utcSecond.every(10)) will extend the domain to an even ten seconds (0, 10, 20, <i>etc.</i>). See [*time*.ticks](#time_ticks) and [*interval*.every](../d3-time.md#interval_every) for further detail.

Nicing is useful if the domain is computed from data, say using [extent](../d3-array/summarize.md#extent), and may be irregular. For example, for a domain of [2009-07-13T00:02, 2009-07-13T23:48], the nice domain is [2009-07-13, 2009-07-14]. If the domain has more than two values, nicing the domain only affects the first and last value.

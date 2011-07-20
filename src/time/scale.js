// TODO nice
function d3_time_scale(methods, format) {
  var linear = d3.scale.linear();

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.ticks = function(m) {
    var extent = d3_time_scaleExtent(scale.domain()),
        span = extent[1] - extent[0],
        target = span / m;
        i = d3.bisect(d3_time_scaleSteps, target, 1, d3_time_scaleSteps.length - 1);
    if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
    return methods[i](extent[0], extent[1]);
  };

  scale.tickFormat = function() {
    return format;
  };

  // TOOD expose d3_scale_linear_rebind?
  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);

  return scale;
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  1728e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  d3.time.seconds,
  function(a, b) { return d3.time.seconds(a, b).filter(function(t) { return !(t.getSeconds() % 5); }); },
  function(a, b) { return d3.time.seconds(a, b).filter(function(t) { return !(t.getSeconds() % 15); }); },
  function(a, b) { return d3.time.seconds(a, b).filter(function(t) { return !(t.getSeconds() % 30); }); },
  d3.time.minutes,
  function(a, b) { return d3.time.minutes(a, b).filter(function(t) { return !(t.getMinutes() % 5); }); },
  function(a, b) { return d3.time.minutes(a, b).filter(function(t) { return !(t.getMinutes() % 15); }); },
  function(a, b) { return d3.time.minutes(a, b).filter(function(t) { return !(t.getMinutes() % 30); }); },
  d3.time.hours,
  function(a, b) { return d3.time.hours(a, b).filter(function(t) { return !(t.getHours() % 3); }); },
  function(a, b) { return d3.time.hours(a, b).filter(function(t) { return !(t.getHours() % 6); }); },
  function(a, b) { return d3.time.hours(a, b).filter(function(t) { return !(t.getHours() % 12); }); },
  d3.time.days,
  function(a, b) { return d3.time.days(a, b).filter(function(t) { return t.getDate() % 2; }); },
  d3.time.weeks,
  d3.time.months,
  function(a, b) { return d3.time.months(a, b).filter(function(t) { return !(t.getMonth() % 3); }); },
  d3.time.years
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds() || d.getMilliseconds(); }]
];

var d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3.time.scale = function() {
  return d3_time_scale(d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};

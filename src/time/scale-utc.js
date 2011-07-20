var d3_time_scaleUTCMethods = [
  d3.time.seconds.utc,
  function(a, b) { return d3.time.seconds.utc(a, b).filter(function(t) { return !(t.getUTCSeconds() % 5); }); },
  function(a, b) { return d3.time.seconds.utc(a, b).filter(function(t) { return !(t.getUTCSeconds() % 15); }); },
  function(a, b) { return d3.time.seconds.utc(a, b).filter(function(t) { return !(t.getUTCSeconds() % 30); }); },
  d3.time.minutes.utc,
  function(a, b) { return d3.time.minutes.utc(a, b).filter(function(t) { return !(t.getUTCMinutes() % 5); }); },
  function(a, b) { return d3.time.minutes.utc(a, b).filter(function(t) { return !(t.getUTCMinutes() % 15); }); },
  function(a, b) { return d3.time.minutes.utc(a, b).filter(function(t) { return !(t.getUTCMinutes() % 30); }); },
  d3.time.hours.utc,
  function(a, b) { return d3.time.hours.utc(a, b).filter(function(t) { return !(t.getUTCHours() % 3); }); },
  function(a, b) { return d3.time.hours.utc(a, b).filter(function(t) { return !(t.getUTCHours() % 6); }); },
  function(a, b) { return d3.time.hours.utc(a, b).filter(function(t) { return !(t.getUTCHours() % 12); }); },
  d3.time.days.utc,
  function(a, b) { return d3.time.days.utc(a, b).filter(function(t) { return t.getUTCDate() % 2; }); },
  d3.time.weeks.utc,
  d3.time.months.utc,
  function(a, b) { return d3.time.months.utc(a, b).filter(function(t) { return !(t.getUTCMonth() % 3); }); },
  d3.time.years.utc
];

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds() || d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

d3.time.scale.utc = function() {
  return d3_time_scale(d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};

import "../core/true";

function d3_locale_timeScaleFormat(localFormat) {
  var utcFormat = localFormat.utc;

  var localFormats = [
    [localFormat("%Y"), d3_true],
    [localFormat("%B"), function(d) { return d.getMonth(); }],
    [localFormat("%b %d"), function(d) { return d.getDate() != 1; }],
    [localFormat("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
    [localFormat("%I %p"), function(d) { return d.getHours(); }],
    [localFormat("%I:%M"), function(d) { return d.getMinutes(); }],
    [localFormat(":%S"), function(d) { return d.getSeconds(); }],
    [localFormat(".%L"), function(d) { return d.getMilliseconds(); }]
  ];

  var utcFormats = [
    [utcFormat("%Y"), d3_true],
    [utcFormat("%B"), function(d) { return d.getUTCMonth(); }],
    [utcFormat("%b %d"), function(d) { return d.getUTCDate() != 1; }],
    [utcFormat("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
    [utcFormat("%I %p"), function(d) { return d.getUTCHours(); }],
    [utcFormat("%I:%M"), function(d) { return d.getUTCMinutes(); }],
    [utcFormat(":%S"), function(d) { return d.getUTCSeconds(); }],
    [utcFormat(".%L"), function(d) { return d.getUTCMilliseconds(); }]
  ];

  var format = d3_locale_timeScaleMultiFormat(localFormats);

  format.utc = d3_locale_timeScaleMultiFormat(utcFormats);

  return format;
}

function d3_locale_timeScaleMultiFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

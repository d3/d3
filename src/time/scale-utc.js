import "../core/true";
import "../scale/linear";
import "format";
import "format-utc";
import "scale";

var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]];
});

var d3_time_scaleUTCFormats = [
  [d3_time_formatUtc("%Y"), d3_true],
  [d3_time_formatUtc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3_time_formatUtc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3_time_formatUtc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3_time_formatUtc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3_time_formatUtc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3_time_formatUtc(":%S"), function(d) { return d.getUTCSeconds(); }],
  [d3_time_formatUtc(".%L"), function(d) { return d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

d3_time_scaleUTCMethods.year = d3_time.year.utc;

d3_time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};

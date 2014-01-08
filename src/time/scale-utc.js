import "../scale/linear";
import "scale";

var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]];
});

d3_time_scaleUtcMethods.year = d3_time.year.utc;

d3_time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_locale_enUS.timeScaleFormat.utc);
};

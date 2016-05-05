import "interval";
import "time";

d3_time.millisecond = d3_time_interval(function(date) {
  return new d3_date(date);
}, function(date, offset) {
  date.setTime(date.getTime() + offset); // DST breaks setSeconds
}, function(date) {
  return date.getTime();
});

d3_time.milliseconds = d3_time.millisecond.range;
d3_time.milliseconds.utc = d3_time.millisecond.utc.range;

import "interval";
import "time";

d3_time.second = d3_time_interval(function(date) {
  return new d3_date(Math.floor(date / 1e3) * 1e3);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
}, function(date) {
  return date.getSeconds();
});

d3_time.seconds = d3_time.second.range;
d3_time.seconds.utc = d3_time.second.utc.range;

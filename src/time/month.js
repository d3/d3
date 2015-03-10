import "day";
import "interval";
import "time";

d3_time.month = d3_time_interval(function(date) {
  date = d3_time.day(date);
  date.setDate(1);
  return date;
}, function(date, offset) {
  date.setMonth(date.getMonth() + offset);
}, function(date) {
  return date.getMonth();
});

d3_time.months = d3_time.month.range;
d3_time.months.utc = d3_time.month.utc.range;

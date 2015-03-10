import "day";
import "interval";
import "time";

d3_time.year = d3_time_interval(function(date) {
  date = d3_time.day(date);
  date.setMonth(0, 1);
  return date;
}, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset);
}, function(date) {
  return date.getFullYear();
});

d3_time.years = d3_time.year.range;
d3_time.years.utc = d3_time.year.utc.range;

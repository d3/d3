import "interval";
import "time";
import "year";

d3_time.day = d3_time_interval(function(date) {
  var day = new d3_date(2000, 0);
  day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return day;
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3_time.days = d3_time.day.range;
d3_time.days.utc = d3_time.day.utc.range;

d3_time.dayOfYear = function(date) {
  var year = d3_time.year(date);
  return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
};

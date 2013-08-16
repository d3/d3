import "interval";
import "time";
import "year";

d3.time.day = d3_time_interval(function(date) {
  var hi = +date,
      day = new d3_time(hi);
  day.setHours(0, 0, 0, 0);
  var lo = +day,
      day0 = new d3_time(lo - 1);
  while (d3_time_dayEqual(day0, day) && lo < hi) {
    var mid = Math.floor(.5 * (lo + hi));
    day.setTime(mid), day0.setTime(mid - 1);
    if (d3_time_dayEqual(day, date)) hi = mid;
    else lo = mid + 1;
  }
  return day;
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days = d3.time.day.range;
d3.time.days.utc = d3.time.day.utc.range;

d3.time.dayOfYear = function(date) {
  var year = d3.time.year(date);
  return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
};

function d3_time_dayEqual(a, b) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

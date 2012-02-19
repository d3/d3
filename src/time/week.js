d3.time.week = d3_time_interval(function(date) {
  (date = d3.time.day(date)).setDate(date.getDate() - date.getDay());
  return date;
}, function(date, offset) {
  date.setDate(date.getDate() + Math.floor(offset) * 7);
}, function(date) {
  return Math.floor((date - new d3_time(date.getFullYear(), 0, 1)) / 6048e5);
});

d3.time.weeks = d3.time.week.range;
d3.time.weeks.utc = d3.time.week.utc.range;

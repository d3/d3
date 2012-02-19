d3.time.year = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), 0, 1);
}, function(date) {
  date.setFullYear(date.getFullYear() + 1);
});

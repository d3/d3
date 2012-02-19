d3.time.month = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), 1);
}, function(date) {
  date.setMonth(date.getMonth() + 1);
});

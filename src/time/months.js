d3.time.months = d3_time_range(d3.time.month, function(date) {
  date.setMonth(date.getMonth() + 1);
}, function(date) {
  return date.getMonth();
});

d3.time.months.utc = d3_time_range(d3.time.month.utc, function(date) {
  date.setUTCMonth(date.getUTCMonth() + 1);
}, function(date) {
  return date.getUTCMonth();
});

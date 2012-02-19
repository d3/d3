d3.time.days = d3_time_range(d3.time.day, function(date) {
  return date.getDate() - 1;
});

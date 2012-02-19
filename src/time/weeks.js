d3.time.weeks = d3_time_range(d3.time.week, function(date) {
  return Math.floor((date - new d3_time(date.getFullYear(), 0, 1)) / 6048e5);
});

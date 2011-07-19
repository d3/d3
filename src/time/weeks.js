d3.time.weeks = d3_time_range(d3.time.week, function(date) {
  date.setDate(date.getDate() + 7);
});

d3.time.weeks.utc = d3_time_range(d3.time.week.utc, function(date) {
  date.setUTCDate(date.getUTCDate() + 7);
});

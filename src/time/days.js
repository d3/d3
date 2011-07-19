d3.time.days = d3_time_range(d3.time.day, function(date) {
  date.setDate(date.getDate() + 1);
});

d3.time.days.utc = d3_time_range(d3.time.day.utc, function(date) {
  date.setUTCDate(date.getUTCDate() + 1);
});

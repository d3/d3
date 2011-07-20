d3.time.years = d3_time_range(d3.time.year, function(date) {
  date.setFullYear(date.getFullYear() + 1);
});

d3.time.years.utc = d3_time_range(d3.time.year.utc, function(date) {
  date.setUTCFullYear(date.getUTCFullYear() + 1);
});

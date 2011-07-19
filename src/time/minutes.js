d3.time.minutes = d3_time_range(d3.time.minute, function(date) {
  date.setTime(date.getTime() + 6e4); // assumes no leap seconds
});

d3.time.minutes.utc = d3.time.minutes;
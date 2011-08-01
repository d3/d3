d3.time.seconds = d3_time_range(d3.time.second, function(date) {
  date.setTime(date.getTime() + 1e3);
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds.utc = d3.time.seconds;

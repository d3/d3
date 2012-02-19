d3.time.minute = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 6e4) * 6e4);
}, function(date) {
  date.setMinutes(date.getMinutes() + 1);
});

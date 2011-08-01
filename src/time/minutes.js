d3.time.minutes = d3_time_range(d3.time.minute, d3_time_minutesStep, function(date) {
  return date.getMinutes();
});

d3.time.minutes.utc = d3_time_range(d3.time.minute, d3_time_minutesStep, function(date) {
  return date.getUTCMinutes();
});

function d3_time_minutesStep(date) {
  date.setTime(date.getTime() + 6e4); // assumes no leap seconds
}

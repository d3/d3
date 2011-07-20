d3.time.hours = d3_time_range(d3.time.hour, d3_time_hoursStep);
d3.time.hours.utc = d3_time_range(d3.time.hour.utc, d3_time_hoursStep);

function d3_time_hoursStep(date) {
  date.setTime(date.getTime() + 36e5);
}

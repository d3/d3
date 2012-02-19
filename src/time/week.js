d3.time.week = d3_time_interval(function(date) {
  (date = d3.time.day(date)).setDate(date.getDate() - date.getDay());
  return date;
});

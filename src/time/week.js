d3.time.week = function(date) {
  (date = d3.time.day(date)).setDate(date.getDate() - date.getDay());
  return date;
};

d3.time.week.utc = function(date) {
  (date = d3.time.day.utc(date)).setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date;
};

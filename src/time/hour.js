d3.time.hour = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
};

d3.time.hour.utc = function(date) {
  return new Date(~~(date / 36e5) * 36e5);
};

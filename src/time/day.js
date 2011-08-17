d3.time.day = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

d3.time.day.utc = function(date) {
  return new Date(~~(date / 864e5) * 864e5);
};

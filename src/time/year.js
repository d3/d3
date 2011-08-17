d3.time.year = function(date) {
  return new Date(date.getFullYear(), 0, 1);
};

d3.time.year.utc = function(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
};

d3.time.second = function(date) {
  return new Date(~~(date / 1e3) * 1e3);
};

d3.time.second.utc = d3.time.second;

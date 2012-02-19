function d3_time_interval(floor) {
  floor.floor = floor;

//   floor.ceil = function(date) { return step(floor(new Date(date - 1))); };

  floor.utc = function(date) {
    try {
      d3_time = d3_time_utc;
      d3_time_interval_utc._ = date;
      return floor(d3_time_interval_utc)._;
    } finally {
      d3_time = Date;
    }
  };

  return floor;
}

var d3_time_interval_utc = new d3_time_utc();

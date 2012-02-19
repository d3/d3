function d3_time_interval(floor, step) {

  function offset(date, offset) {
    step(date, offset);
    return date;
  }

  function ceil(date) {
    return offset(floor(new d3_time(date - 1)), 1);
  }

  floor.floor = floor;
  floor.ceil = ceil;
  floor.offset = offset;

  floor.floor.utc = floor.utc = d3_time_interval_utc(floor);
  floor.ceil.utc = d3_time_interval_utc(ceil);
  floor.offset.utc = d3_time_interval_utc(offset);

  return floor;
}

function d3_time_interval_utc(method) {
  var utc = new d3_time_utc();
  return function(date, offset) {
    try {
      d3_time = d3_time_utc;
      utc._ = date;
      return method(utc, offset)._;
    } finally {
      d3_time = Date;
    }
  };
}

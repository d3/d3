function d3_time_interval(floor, step) {

  function ceil(date) {
    step(date = floor(new d3_time(date - 1)));
    return date;
  }

  floor.floor = floor;
  floor.ceil = ceil;

  floor.utc = d3_time_interval_utc(floor);
  floor.floor.utc = floor.utc;
  floor.ceil.utc = d3_time_interval_utc(ceil);

  return floor;
}

function d3_time_interval_utc(method) {
  var utc = new d3_time_utc();
  return function(date) {
    try {
      d3_time = d3_time_utc;
      utc._ = date;
      return method(utc)._;
    } finally {
      d3_time = Date;
    }
  };
}

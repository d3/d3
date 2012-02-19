function d3_time_range(interval, number) {
  var utc = new d3_time_utc();

  function range(t0, t1, dt) {
    var time = interval.ceil(t0), times = [];
    if (dt > 1) {
      while (time < t1) {
        var date = new d3_time(+time);
        if (!(number(date) % dt)) times.push(date);
        interval.offset(time, 1);
      }
    } else {
      while (time < t1) times.push(new d3_time(+time)), interval.offset(time, 1);
    }
    return times;
  }

  range.utc = function(t0, t1, dt) {
    try {
      d3_time = d3_time_utc;
      utc._ = t0;
      return range(utc, t1, dt).map(function(d) { return d._; });
    } finally {
      d3_time = Date;
    }
  };

  return range;
}

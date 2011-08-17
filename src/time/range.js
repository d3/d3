function d3_time_range(floor, step, number) {
  return function(t0, t1, dt) {
    var time = floor(t0), times = [];
    if (time < t0) step(time);
    if (dt > 1) {
      while (time < t1) {
        var date = new Date(+time);
        if (!(number(date) % dt)) times.push(date);
        step(time);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time);
    }
    return times;
  };
}

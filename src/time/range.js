function d3_time_range(floor, step) {
  return function(t0, t1) {
    var time = floor(t0), times = [];
    if (time < t0) step(time);
    while (time < t1) times.push(new Date(+time)), step(time);
    return times;
  };
}

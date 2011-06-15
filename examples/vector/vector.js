var w = 450,
    h = 275,
    p = 20,
    duration = 2000,
    x = d3.scale.linear().domain([0, 1]).range([0, w]),
    y = d3.scale.linear().domain([0, 1]).range([h, 0]);

var vis = d3.select("#vis")
    .style("-webkit-transform", "matrix3d(" + [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ] + ")")
  .transition()
    .duration(duration)
    .ease("bounce")
    .style("-webkit-transform", "matrix3d(" + [
      1, -1, 0, 0,
      1,  1, 0, 0,
      0,  0, 1, 0,
      0,  0, 0, 1
    ] + ")")

function cross(a) {
  return function(d) {
    var c = [];
    for (var i = 0, n = a.length; i < n; i++) c.push({x: d, y: a[i]});
    return c;
  };
}

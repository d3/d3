d3.line = function() {
  var x = function(d, i) { return d.x; },
      y = function(d, i) { return d.y; };

  function line(d) {
    var a = [],
        i = 0,
        p = d[0];
    a.push("M", x.call(this, p, i), ",", y.call(this, p, i));
    while (p = d[++i]) a.push("L", x.call(this, p, i), ",", y.call(this, p, i));
    return a.join("");
  }

  line.x = function(value) {
    x = value;
    return line;
  };

  line.y = function(value) {
    y = value;
    return line;
  };

  return line;
};

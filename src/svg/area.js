d3.svg.area = function() {
  var x = function(d, i) { return d.x; },
      y0 = 0,
      y1 = function(d, i) { return d.y1; };

  // TODO interpolators
  // TODO variable y0
  // TODO horizontal / vertical orientation

  function area(d) {
    var a = [],
        i = 0,
        p = d[0];
    a.push("M", x.call(this, p, i), "," + y0 + "V", y1.call(this, p, i));
    while (p = d[++i]) a.push("L", x.call(this, p, i), ",", y1.call(this, p, i));
    a.push("V" + y0 + "Z");
    return a.join("");
  }

  area.x = function(value) {
    x = value;
    return area;
  };

  area.y0 = function(value) {
    y0 = value;
    return area;
  };

  area.y1 = function(value) {
    y1 = value;
    return area;
  };

  return area;
};

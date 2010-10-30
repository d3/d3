d3.svg.arc = function() {
  var innerRadius = function(d) { return d.innerRadius; },
      outerRadius = function(d) { return d.outerRadius; },
      startAngle = function(d) { return d.startAngle; },
      endAngle = function(d) { return d.endAngle; };

  function arc(d) {
    var r0 = innerRadius(d),
        r1 = outerRadius(d),
        a0 = startAngle(d) - Math.PI / 2,
        a1 = endAngle(d) - Math.PI / 2,
        da = a1 - a0,
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return "M" + r1 * c0 + "," + r1 * s0
        + "A" + r1 + "," + r1 + " 0 "
        + ((da < Math.PI) ? "0" : "1") + ",1 "
        + r1 * c1 + "," + r1 * s1
        + "L" + r0 * c1 + "," + r0 * s1
        + "A" + r0 + "," + r0 + " 0 "
        + ((da < Math.PI) ? "0" : "1") + ",0 "
        + r0 * c0 + "," + r0 * s0 + "Z";
  }

  arc.innerRadius = function(value) {
    innerRadius = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.outerRadius = function(value) {
    outerRadius = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.startAngle = function(value) {
    startAngle = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.endAngle = function(value) {
    endAngle = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  return arc;
};

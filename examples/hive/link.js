function link() {
  var source = function(d) { return d.source; },
      target = function(d) { return d.target; },
      angle = function(d) { return d.angle; },
      startRadius = function(d) { return d.radius; },
      endRadius = startRadius,
      arcOffset = -Math.PI / 2;

  function link(d, i) {
    var s = node(source, this, d, i),
        t = node(target, this, d, i),
        x;
    if (t.a < s.a) x = t, t = s, s = x;
    if (t.a - s.a > Math.PI) s.a += 2 * Math.PI;
    var a1 = s.a + (t.a - s.a) / 3,
        a2 = t.a - (t.a - s.a) / 3;
    return s.r0 - s.r1 || t.r0 - t.r1
        ? "M" + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0
        + "L" + Math.cos(s.a) * s.r1 + "," + Math.sin(s.a) * s.r1
        + "C" + Math.cos(a1) * s.r1 + "," + Math.sin(a1) * s.r1
        + " " + Math.cos(a2) * t.r1 + "," + Math.sin(a2) * t.r1
        + " " + Math.cos(t.a) * t.r1 + "," + Math.sin(t.a) * t.r1
        + "L" + Math.cos(t.a) * t.r0 + "," + Math.sin(t.a) * t.r0
        + "C" + Math.cos(a2) * t.r0 + "," + Math.sin(a2) * t.r0
        + " " + Math.cos(a1) * s.r0 + "," + Math.sin(a1) * s.r0
        + " " + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0
        : "M" + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0
        + "C" + Math.cos(a1) * s.r1 + "," + Math.sin(a1) * s.r1
        + " " + Math.cos(a2) * t.r1 + "," + Math.sin(a2) * t.r1
        + " " + Math.cos(t.a) * t.r1 + "," + Math.sin(t.a) * t.r1;
  }

  function node(method, thiz, d, i) {
    var node = method.call(thiz, d, i),
        a = +(typeof angle === "function" ? angle.call(thiz, node, i) : angle) + arcOffset,
        r0 = +(typeof startRadius === "function" ? startRadius.call(thiz, node, i) : startRadius),
        r1 = (startRadius === endRadius ? r0 : +(typeof endRadius === "function" ? endRadius.call(thiz, node, i) : endRadius));
    return {r0: r0, r1: r1, a: a};
  }

  link.source = function(_) {
    if (!arguments.length) return source;
    source = _;
    return link;
  };

  link.target = function(_) {
    if (!arguments.length) return target;
    target = _;
    return link;
  };

  link.angle = function(_) {
    if (!arguments.length) return angle;
    angle = _;
    return link;
  };

  link.radius = function(_) {
    if (!arguments.length) return startRadius;
    startRadius = endRadius = _;
    return link;
  };

  link.startRadius = function(_) {
    if (!arguments.length) return startRadius;
    startRadius = _;
    return link;
  };

  link.endRadius = function(_) {
    if (!arguments.length) return endRadius;
    endRadius = _;
    return link;
  };

  return link;
}

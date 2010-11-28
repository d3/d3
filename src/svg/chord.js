d3["svg"]["chord"] = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = source.call(this, d, i),
        t = target.call(this, d, i),
        r0 = radius.call(this, s, i),
        a00 = startAngle.call(this, s, i) + d3_svg_arcOffset,
        a01 = endAngle.call(this, s, i) + d3_svg_arcOffset,
        r1 = radius.call(this, t, i),
        a10 = startAngle.call(this, t, i) + d3_svg_arcOffset,
        a11 = endAngle.call(this, t, i) + d3_svg_arcOffset;
    return (a00 == a10) && (a01 == a11) && (r0 == r1)
      ? chord1(r0, a00, a01)
      : chord2(r0, a00, a01, r1, a10, a11);
  }

  function chord1(r0, a00, a01) {
    var x00 = r0 * Math.cos(a00),
        y00 = r0 * Math.sin(a00),
        x01 = r0 * Math.cos(a01),
        y01 = r0 * Math.sin(a01);
    return "M" + x00 + "," + y00
        + "A" + r0 + "," + r0 + " 0  0,1 " + x01 + "," + y01
        + "Q 0,0 " + x00 + "," + y00
        + "Z";
  }

  function chord2(r0, a00, a01, r1, a10, a11) {
    var x00 = r0 * Math.cos(a00),
        y00 = r0 * Math.sin(a00),
        x01 = r0 * Math.cos(a01),
        y01 = r0 * Math.sin(a01),
        x10 = r1 * Math.cos(a10),
        y10 = r1 * Math.sin(a10),
        x11 = r1 * Math.cos(a11),
        y11 = r1 * Math.sin(a11);
    return "M" + x00 + "," + y00
        + "A" + r0 + "," + r0 + " 0  0,1 " + x01 + "," + y01
        + "Q 0,0 " + x10 + "," + y10
        + "A" + r1 + "," + r1 + " 0  0,1 " + x11 + "," + y11
        + "Q 0,0 " + x00 + "," + y00
        + "Z";
  }

  chord["radius"] = function(v) {
    if (!arguments.length) return radius;
    radius = d3_functor(v);
    return chord;
  };

  chord["source"] = function(v) {
    if (!arguments.length) return source;
    source = d3_functor(v);
    return chord;
  };

  chord["target"] = function(v) {
    if (!arguments.length) return target;
    target = d3_functor(v);
    return chord;
  };

  chord["startAngle"] = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return chord;
  };

  chord["endAngle"] = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d["source"];
}

function d3_svg_chordTarget(d) {
  return d["target"];
}

function d3_svg_chordRadius(d) {
  return d["radius"];
}

function d3_svg_chordStartAngle(d) {
  return d["startAngle"];
}

function d3_svg_chordEndAngle(d) {
  return d["endAngle"];
}

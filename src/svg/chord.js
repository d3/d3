d3["svg"]["chord"] = function() {
  var sourceRadius = d3_svg_chordSourceRadius,
      sourceStartAngle = d3_svg_chordSourceStartAngle,
      sourceEndAngle = d3_svg_chordSourceEndAngle,
      targetRadius = d3_svg_chordTargetRadius,
      targetStartAngle = d3_svg_chordTargetStartAngle,
      targetEndAngle = d3_svg_chordTargetEndAngle;

  // TODO Allow control point to be customized.

  function chord(d) {
    var a00 = sourceStartAngle(d) + d3_svg_arcOffset,
        a01 = sourceEndAngle(d) + d3_svg_arcOffset,
        a10 = targetStartAngle(d) + d3_svg_arcOffset,
        a11 = targetEndAngle(d) + d3_svg_arcOffset,
        r0 = sourceRadius(d),
        r1 = targetRadius(d),
        x00 = r0 * Math.cos(a00),
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

  chord.radius = function(v) {
    sourceRadius = targetRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceRadius = function(v) {
    if (!arguments.length) return sourceRadius;
    sourceRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceStartAngle = function(v) {
    if (!arguments.length) return sourceStartAngle;
    sourceStartAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceEndAngle = function(v) {
    if (!arguments.length) return sourceEndAngle;
    sourceEndAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetRadius = function(v) {
    if (!arguments.length) return targetRadius;
    targetRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetStartAngle = function(v) {
    if (!arguments.length) return targetStartAngle;
    targetStartAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetEndAngle = function(v) {
    if (!arguments.length) return targetEndAngle;
    targetEndAngle = d3_svg_chordValue(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSourceRadius(d) {
  return d["source"]["radius"];
}

function d3_svg_chordSourceStartAngle(d) {
  return d["source"]["startAngle"];
}

function d3_svg_chordSourceEndAngle(d) {
  return d["source"]["endAngle"];
}

function d3_svg_chordTargetRadius(d) {
  return d["target"]["radius"];
}

function d3_svg_chordTargetStartAngle(d) {
  return d["target"]["startAngle"];
}

function d3_svg_chordTargetEndAngle(d) {
  return d["target"]["endAngle"];
}

function d3_svg_chordValue(v) {
  return typeof v == "function" ? v : function() { return v; };
}

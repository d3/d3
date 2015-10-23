import "../math/transform";
import "number";

d3.interpolateTransform = d3_interpolateTransform;

function d3_interpolateTransformPop(s) {
  return s.length ? s.pop() + "," : "";
}

function d3_interpolateTranslate(ta, tb, s, q) {
  if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
    var i = s.push("translate(", null, ",", null, ")");
    q.push({i: i - 4, x: d3_interpolateNumber(ta[0], tb[0])}, {i: i - 2, x: d3_interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  }
}

function d3_interpolateRotate(ra, rb, s, q) {
  if (ra !== rb) {
    if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
    q.push({i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2, x: d3_interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
  }
}

function d3_interpolateSkew(wa, wb, s, q) {
  if (wa !== wb) {
    q.push({i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2, x: d3_interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
  }
}

function d3_interpolateScale(ka, kb, s, q) {
  if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
    var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
    q.push({i: i - 4, x: d3_interpolateNumber(ka[0], kb[0])}, {i: i - 2, x: d3_interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] !== 1 || kb[1] !== 1) {
    s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
  }
}

function d3_interpolateTransform(a, b) {
  var s = [], // string constants and placeholders
      q = []; // number interpolators
  a = d3.transform(a), b = d3.transform(b);
  d3_interpolateTranslate(a.translate, b.translate, s, q);
  d3_interpolateRotate(a.rotate, b.rotate, s, q);
  d3_interpolateSkew(a.skew, b.skew, s, q);
  d3_interpolateScale(a.scale, b.scale, s, q);
  a = b = null; // gc
  return function(t) {
    var i = -1, n = q.length, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
}

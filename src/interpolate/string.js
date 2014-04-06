import "number";

d3.interpolateString = d3_interpolateString;

function d3_interpolateString(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coalescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      sn = [], // filtered s, using s.splice might be slow in some cases
      qn = [], // filtered q, using q.splice might be slow in some cases
      n, // q.length
      r0, // used while removing elements
      rc, // total number of removed elements
      si, // s[i] copy while removing elements
      sl, // s.length while removing elements
      o;

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index > s0) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, replace value with string.
      s[o.i] = o.x;
    } else {
      o.x = d3_interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
      qn.push(o);
    }
  }

  // Replace with strings any numbers in b not found in a.
  for (; i < n; ++i) {
    o = q.pop();
    s[o.i] = o.x;
  }

  // Switch q to the filtered array without unwanted values.
  q = qn;
  n = q.length;

  // Coalesce consecutive strings
  for (i = 0, j = 0, rc = 0, sl = s.length; i < sl; ++i) {
    si = s[i];
    if (si !== null) {
      for (r0 = i + 1; (r0 < sl) && (s[r0] !== null); ++r0) {
        // Still O(n) here, each element of s
        // is taken only once either by this or the parent for.
        si += s[r0];
      }
      r0 -= i + 1;
      i += r0;
      rc += r0;
    } else {
      q[j++].i -= rc;
    }
    sn.push(si);
  }
  s = sn;

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null
        ? (o = q[0].x, function(t) { return o(t) + ""; })
        : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
}

var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

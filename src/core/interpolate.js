d3.interpolate = function(a, b) {
  if (typeof b === "number") return d3.interpolateNumber(+a, b);
  if (typeof b === "string") {
    var ma, mb;
    return (b in d3_rgb_names) || /^(#|rgb\(|hsl\()/.test(b)
        ? d3.interpolateRgb(String(a), b)
        : ((ma = a.match(d3_interpolateMatrixRegex)) &&
           (mb = b.match(d3_interpolateMatrixRegex)))
        ? d3.interpolateMatrix(
            d3_interpolateMatrixParse(ma[1]),
            d3_interpolateMatrixParse(mb[1]))
        : d3.interpolateString(String(a), b);
  }
  if (b instanceof Array) return d3.interpolateArray(a, b);
  return d3.interpolateObject(a, b);
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "rgb(" + Math.round(ar + br * t)
        + "," + Math.round(ag + bg * t)
        + "," + Math.round(ab + bb * t)
        + ")";
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};

var d3_interpolateMatrixRegex = /^matrix3d\(([^\)]+)\)$/;

d3.interpolateMatrix = function(a, b) {
  return d3.interpolateString(
    d3_interpolateMatrixRecompose(d3_interpolateMatrixDecompose(a)),
    d3_interpolateMatrixRecompose(d3_interpolateMatrixDecompose(b)));
}

function d3_interpolateMatrixRecompose(d) {
  return (
    "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, " + d.perspective.join(",") + ")" +
    "translate3d(" + d.translate.join(",") + ")" +
    "rotateX(" + d.rotate[0] + ")" +
    "rotateY(" + d.rotate[1] + ")" +
    "rotateZ(" + d.rotate[2] + ")" +
    "matrix3d(1,0,0,0, 0,1,0,0, 0," + d.skew[2] + ",1,0, 0,0,0,1)" +
    "matrix3d(1,0,0,0, 0,1,0,0, " + d.skew[1] + ",0,1,0, 0,0,0,1)" +
    "matrix3d(1,0,0,0, " + d.skew[0] + ",1,0,0, 0,0,1,0, 0,0,0,1)" +
    "scale3d(" + d.scale.join(",") + ")");
}

function d3_interpolateMatrixParse(s) {
  // TODO cope with 2D transformations
  var numbers = s.split(/[^\d]+/),
      matrix = new Array(4),
      i = -1,
      j,
      k = -1;

  while (++i < 4) {
    matrix[i] = new Array(4);
    j = -1; while (++j < 4) {
      matrix[i][j] = +numbers[++k];
    }
  }
  return matrix;
}

// Based on <http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition>,
// which in turn is based on The "unmatrix" method in "Graphics Gems II, edited
// by Jim Arvo"
function d3_interpolateMatrixDecompose(matrix) {
  var dot = d3.vector.dot,
      cross = d3.vector.cross,
      length = d3.vector.length,
      normalize = d3.vector.normalize,
      combine = d3_interpolateCombine,

      perspective = new Array(4),
      row = new Array(3),
      rotate = new Array(3),
      scale = new Array(3),
      skew = new Array(3);

  // Normalize the matrix.
  if (matrix[3][3] === 0) return false;

  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      matrix[i][j] /= matrix[3][3];

  // perspectiveMatrix is used to solve for perspective, but it also provides
  // an easy way to test for singularity of the upper 3x3 component.
  perspectiveMatrix = matrix.map(function(row) { return row.slice(); });

  for (var i = 0; i < 3; i++) perspectiveMatrix[i][3] = 0;

  perspectiveMatrix[3][3] = 1;

  if (d3.matrix.determinant(perspectiveMatrix) === 0) return false;

  // First, isolate perspective.
  if (matrix[0][3] !== 0 || matrix[1][3] !== 0 || matrix[2][3] !== 0) {
    // rightHandSide is the right hand side of the equation.
    var rightHandSide = new Array(4);
    rightHandSide[0] = matrix[0][3];
    rightHandSide[1] = matrix[1][3];
    rightHandSide[2] = matrix[2][3];
    rightHandSide[3] = matrix[3][3];

    // Solve the equation by inverting perspectiveMatrix and multiplying
    // rightHandSide by the inverse.
    var inversePerspectiveMatrix = d3.matrix.inverse(perspectiveMatrix),
        transposedInversePerspectiveMatrix = d3.matrix.transpose(inversePerspectiveMatrix),
        perspective = d3.matrix.multiply([rightHandSide], transposedInversePerspectiveMatrix);

    // Clear the perspective partition
    matrix[0][3] = matrix[1][3] = matrix[2][3] = 0;
    matrix[3][3] = 1;
  } else {
    // No perspective.
    perspective[0] = perspective[1] = perspective[2] = 0;
    perspective[3] = 1;
  }

  // Next take care of translation
  var translate = new Array(3);
  translate[0] = matrix[3][0];
  matrix[3][0] = 0;
  translate[1] = matrix[3][1];
  matrix[3][1] = 0;
  translate[2] = matrix[3][2];
  matrix[3][2] = 0;

  // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
  for (var i = 0; i < 3; i++) {
    row[i] = matrix[i].slice();
  }

  // Compute X scale factor and normalize first row.
  scale[0] = length(row[0]);
  row[0] = normalize(row[0]);

  // Compute XY shear factor and make 2nd row orthogonal to 1st.
  skew[0] = dot(row[0], row[1]);
  row[1] = combine(row[1], row[0], 1.0, -skew[0]);

  // Now, compute Y scale and normalize 2nd row.
  scale[1] = length(row[1]);
  row[1] = normalize(row[1]);
  skew[0] /= scale[1];

  // Compute XZ and YZ shears, orthogonalize 3rd row
  skew[1] = dot(row[0], row[2]);
  row[2] = combine(row[2], row[0], 1.0, -skew[1]);
  skew[2] = dot(row[1], row[2]);
  row[2] = combine(row[2], row[1], 1.0, -skew[2]);

  // Next, get Z scale and normalize 3rd row.
  scale[2] = length(row[2]);
  row[2] = normalize(row[2]);
  skew[1] /= scale[2];
  skew[2] /= scale[2];

  // At this point, the matrix (in rows) is orthonormal.
  // Check for a coordinate system flip.  If the determinant
  // is -1, then negate the matrix and the scaling factors.
  var pdum3 = cross(row[1], row[2]);
  if (dot(row[0], pdum3) < 0) {
    for (var i = 0; i < 3; i++) {
      scale[0] *= -1;
      row[i][0] *= -1;
      row[i][1] *= -1;
      row[i][2] *= -1;
    }
  }

  // Now, get the rotations ou
  rotate[1] = Math.asin(-row[0][2]);
  if (Math.cos(rotate[1]) !== 0) {
    rotate[0] = Math.atan2(row[1][2], row[2][2]);
    rotate[2] = Math.atan2(row[0][1], row[0][0]);
  } else {
    rotate[0] = Math.atan2(-row[2][0], row[1][1]);
    rotate[2] = 0;
  }

  return {
    translate: translate,
    perspective: perspective,
    rotate: rotate,
    scale: scale,
    skew: skew
  };
};

var d3_interpolate_number = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g,
    d3_interpolate_rgb = {background: 1, fill: 1, stroke: 1};

function d3_interpolateByName(n) {
  return n in d3_interpolate_rgb || /\bcolor\b/.test(n)
      ? d3.interpolateRgb
      : d3.interpolate;
}

function d3_interpolateCombine(a, b, ascl, bscl) {
  return a.map(function(d, i) {
    return ascl * d + bscl * b[i];
  });
}

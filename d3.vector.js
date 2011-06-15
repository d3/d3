(function(){d3.vector = {};
d3.vector.cross = function(a, b) {
  // TODO how to handle non-3D vectors?
  // TODO handle 7D vectors?
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
};
d3.vector.dot = function(a, b) {
  var s = 0,
      i = -1,
      n = Math.min(a.length, b.length);
  while (++i < n) s += a[i] * b[i];
  return s;
};
d3.vector.length = function(p) {
  return Math.sqrt(d3.vector.dot(p, p));
};
d3.vector.normalize = function(p) {
  var length = d3.vector.length(p);
  return p.map(function(d) { return d / length; });
};
// 4x4 matrix determinant.
d3.vector.determinant = function(matrix) {
  var m = matrix[0].concat(matrix[1]).concat(matrix[2]).concat(matrix[3]);
  return (
    m[12] * m[9]  * m[6]  * m[3]  - m[8] * m[13] * m[6]  * m[3]  -
    m[12] * m[5]  * m[10] * m[3]  + m[4] * m[13] * m[10] * m[3]  +
    m[8]  * m[5]  * m[14] * m[3]  - m[4] * m[9]  * m[14] * m[3]  -
    m[12] * m[9]  * m[2]  * m[7]  + m[8] * m[13] * m[2]  * m[7]  +
    m[12] * m[1]  * m[10] * m[7]  - m[0] * m[13] * m[10] * m[7]  -
    m[8]  * m[1]  * m[14] * m[7]  + m[0] * m[9]  * m[14] * m[7]  +
    m[12] * m[5]  * m[2]  * m[11] - m[4] * m[13] * m[2]  * m[11] -
    m[12] * m[1]  * m[6]  * m[11] + m[0] * m[13] * m[6]  * m[11] +
    m[4]  * m[1]  * m[14] * m[11] - m[0] * m[5]  * m[14] * m[11] -
    m[8]  * m[5]  * m[2]  * m[15] + m[4] * m[9]  * m[2]  * m[15] +
    m[8]  * m[1]  * m[6]  * m[15] - m[0] * m[9]  * m[6]  * m[15] -
    m[4]  * m[1]  * m[10] * m[15] + m[0] * m[5]  * m[10] * m[15]);
};
// Performs in-place Gauss-Jordan elimination.
//
// Based on Jarno Elonen's Python version (public domain):
// http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
d3.vector.gaussjordan = function(m, eps) {
  if (!eps) eps = 1e-10;

  var h = m.length,
      w = m[0].length,
      y = -1,
      y2,
      x;

  while (++y < h) {
    var maxrow = y;

    // Find max pivot.
    y2 = y; while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }

    // Swap.
    var tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular?
    if (Math.abs(m[y][y]) <= eps) return false;

    // Eliminate column y.
    y2 = y; while (++y2 < h) {
      var c = m[y2][y] / m[y][y];
      x = y - 1; while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h; while (--y >= 0) {
    var c = m[y][y];
    y2 = -1; while (++y2 < y) {
      x = w; while (--x >= y) {
        m[y2][x] -=  m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;
    // Normalize row y.
    x = h - 1; while (++x < w) {
      m[y][x] /= c;
    }
  }
  return true;
};
// Find matrix inverse using Gauss-Jordan.
d3.vector.inverse = function(m) {
  var n = m.length
      i = -1;

  // Check if the matrix is square.
  if (n !== m[0].length) return;

  // Augment with identity matrix I to get AI.
  m = m.map(function(row, i) {
    var identity = new Array(n),
        j = -1;
    while (++j < n) identity[j] = i === j ? 1 : 0;
    return row.concat(identity);
  });

  // Compute IA^-1.
  d3.vector.gaussjordan(m);

  // Remove identity matrix I to get A^-1.
  while (++i < n) {
    m[i] = m[i].slice(n);
  }

  return m;
};
d3.vector.multiply = function(a, b) {
  var m = a.length,
      n = b[0].length,
      p = b.length,
      i = -1,
      j,
      k;
  if (p !== a[0].length) throw {"error": "columns(a) != rows(b); " + a[0].length + " != " + p};
  var ab = new Array(m);
  while (++i < m) {
    ab[i] = new Array(n);
    j = -1; while(++j < n) {
      var s = 0;
      k = -1; while (++k < p) s += a[i][k] * b[k][j];
      ab[i][j] = s;
    }
  }
  return ab;
};
d3.vector.transpose = function(a) {
  var m = a.length,
      n = a[0].length,
      i = -1,
      j,
      b = new Array(n);
  while (++i < n) {
    b[i] = new Array(m);
    j = -1; while (++j < m) b[i][j] = a[j][i];
  }
  return b;
};
d3.vector.interpolate = function(a, b) {
  a = d3_vectorInterpolateDecompose(a);
  b = d3_vectorInterpolateDecompose(b);
  var perspective = d3.interpolateArray(a.perspective, b.perspective),
      translate = d3.interpolateArray(a.translate, b.translate),
      rotate = d3.interpolateArray(a.rotate, b.rotate),
      skew = d3.interpolateArray(a.skew, b.skew),
      scale = d3.interpolateArray(a.scale, b.scale);
  return function(t) {
    var r = rotate(t),
        s = skew(t);
    return (
      "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, " + perspective(t) + ")" +
      "translate3d(" + translate(t) + ")" +
      "rotateX(" + r[0] + "rad)" +
      "rotateY(" + r[1] + "rad)" +
      "rotateZ(" + r[2] + "rad)" +
      "matrix3d(1,0,0,0, 0,1,0,0, 0," + s[2] + ",1,0, 0,0,0,1)" +
      "matrix3d(1,0,0,0, 0,1,0,0, " + s[1] + ",0,1,0, 0,0,0,1)" +
      "matrix3d(1,0,0,0, " + s[0] + ",1,0,0, 0,0,1,0, 0,0,0,1)" +
      "scale3d(" + scale(t) + ")");
  };
}

// Based on <http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition>,
// which in turn is based on The "unmatrix" method in "Graphics Gems II, edited
// by Jim Arvo".
function d3_vectorInterpolateDecompose(matrix) {
  var dot = d3.vector.dot,
      cross = d3.vector.cross,
      length = d3.vector.length,
      normalize = d3.vector.normalize,
      combine = d3_vectorInterpolateCombine,

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

  if (d3.vector.determinant(perspectiveMatrix) === 0) return false;

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
    var inversePerspectiveMatrix = d3.vector.inverse(perspectiveMatrix),
        transposedInversePerspectiveMatrix = d3.vector.transpose(inversePerspectiveMatrix),
        perspective = d3.vector.multiply([rightHandSide], transposedInversePerspectiveMatrix);

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
  for (var i = 0; i < 3; i++)
    row[i] = matrix[i].slice();

  // Compute X scale factor and normalize first row.
  scale[0] = length(row[0]);
  row[0] = normalize(row[0]);

  // Compute XY shear factor and make 2nd row orthogonal to 1st.
  skew[0] = dot(row[0], row[1]);
  combine(row[1], row[0], 1, -skew[0]);

  // Now, compute Y scale and normalize 2nd row.
  scale[1] = length(row[1]);
  row[1] = normalize(row[1]);
  skew[0] /= scale[1];

  // Compute XZ and YZ shears, orthogonalize 3rd row
  skew[1] = dot(row[0], row[2]);
  combine(row[2], row[0], 1, -skew[1]);
  skew[2] = dot(row[1], row[2]);
  combine(row[2], row[1], 1, -skew[2]);

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

  // Now, get the rotations out.
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

function d3_vectorInterpolateCombine(a, b, ascl, bscl) {
  var n = a.length,
      i = -1;
  while (++i < n) {
    a[i] = ascl * a[i] + bscl * b[i];
  }
}

function d3_vectorInterpolateParse(type, s) {
  // TODO cope with 2D transformations
  var numbers = s.split(/[^\d-]+/),
      matrix = new Array(4),
      i = -1,
      j,
      k = -1,
      side = type === "3d" ? 4 : 2;

  while (++i < 4) {
    matrix[i] = new Array(4);
    j = -1; while (++j < 4) {
      matrix[i][j] = i < side && j < side ? +numbers[++k] : (i === j) & 1;
    }
  }
  return matrix;
}

var d3_vectorInterpolateRegex = /^matrix(3d)?\(([^\)]+)\)$/;

d3.interpolators.push(function(a, b) {
  var ma, mb;
  return (
    (ma = String(a).match(d3_vectorInterpolateRegex)) &&
    (mb = String(b).match(d3_vectorInterpolateRegex)) &&
    d3.vector.interpolate(
      d3_vectorInterpolateParse(ma[1], ma[2]),
      d3_vectorInterpolateParse(mb[1], mb[2])));
});
})()
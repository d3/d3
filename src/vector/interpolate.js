d3.vector.interpolate = function(a, b) {
  return d3.interpolateString(
    d3_vectorInterpolateRecompose(d3_vectorInterpolateDecompose(a)),
    d3_vectorInterpolateRecompose(d3_vectorInterpolateDecompose(b)));
}

function d3_vectorInterpolateRecompose(d) {
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

// Based on <http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition>,
// which in turn is based on The "unmatrix" method in "Graphics Gems II, edited
// by Jim Arvo"
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
  for (var i = 0; i < 3; i++) {
    row[i] = matrix[i].slice();
  }

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

var d3_vectorInterpolateRegex = /^matrix3d\(([^\)]+)\)$/;

function d3_vectorInterpolateParse(s) {
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

d3.interpolators.push(function(a, b) {
  var ma, mb;
  return (
    (ma = a.match(d3_vectorInterpolateRegex)) &&
    (mb = b.match(d3_vectorInterpolateRegex)) &&
    d3.vector.interpolate(
      d3_vectorInterpolateParse(ma[1]),
      d3_vectorInterpolateParse(mb[1])));
});

var π = Math.PI,
    τ = 2 * π,
    halfπ = π / 2,
    ε = 1e-6,
    ε2 = ε * ε,
    d3_radians = π / 180,
    d3_degrees = 180 / π;

function d3_sgn(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

// returns true iff the [x,y] points a, b, c form a counter-clockwise turn in
// the traditional Cartesian coordinate system (i.e. x value grows from left
// to right, y value grows from bottom to top)
function d3_isCCWTurn(a, b, c) {
  return d3_cross2d(a, b, c) > 0;
}

// 2D cross product of OA and OB vectors, i.e. z-component of their 3D cross
// product, in traditional Cartesian coordinate system (x value grows from
// left to right, y value grows from bottom to top). Returns a positive value
// if OAB makes a counter-clockwise turn, negative for clockwise turn, and
// zero if the points are collinear.
function d3_cross2d(o, a, b) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function d3_acos(x) {
  return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
}

function d3_asin(x) {
  return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
}

function d3_sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function d3_cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function d3_tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

function d3_haversin(x) {
  return (x = Math.sin(x / 2)) * x;
}

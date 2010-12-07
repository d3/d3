/**
 * Computes a contour for a given input grid function using the
 * <a href="http://en.wikipedia.org/wiki/Marching_squares">
 * marching squares</a> algorithm. Returns the contour polygon as an
 * array of points [[x1, y1], [x2, y2], ...]
 *
 * @param grid a two input (x,y) function that returns either 0 or 1
 * @param start [x1, y1] an optional starting point on the grid
 */
d3["geom"]["contour"] = function(grid, start) {
  var s = start || d3_geom_contour_start(grid),
      c = [], x = s[0], y = s[1],
      i, dx=0, dy=0, pdx=NaN, pdy=NaN;

  do {
    i = grid(x-1,y-1) + 2*grid(x,y-1) + 4*grid(x-1,y) + 8*grid(x,y);
    if (i == 6) {
      dx = pdy==-1 ? -1 : 1;
      dy = 0;
    } else if (i == 9) {
      dx = 0;
      dy = pdx==1 ? -1 : 1;
    } else {
      dx = d3_geom_contour_dx[i];
      dy = d3_geom_contour_dy[i];
    }
	if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx; pdy = dy;
    }
    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
}

var d3_geom_contour_dx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN];
var d3_geom_contour_dy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN];

function d3_geom_contour_start(grid) {
  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals 
  var x = 0, y = 0;
  while (true) {
    if (grid(x,y)) {
      return [x,y];
    }
    if (x == 0) {
      x = y + 1;
      y = 0;
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
}
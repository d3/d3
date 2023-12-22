/* eslint-disable */

// Look for numerical inconsistencies between the place() and intersects()
// methods from pack/siblings.js

// The place and intersect functions are not exported, so we duplicate them here
function place(a, b, c) {
  var dx = b.x - a.x, x, a2,
      dy = b.y - a.y, y, b2,
      d2 = dx * dx + dy * dy;
  if (d2) {
    a2 = a.r + c.r, a2 *= a2;
    b2 = b.r + c.r, b2 *= b2;
    if (a2 > b2) {
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }

  // This last part is not part of the original function!
  if (intersects(a, c) || intersects(b, c)) {
    console.log(`a = {x: ${a.x}, y: ${a.y}, r: ${a.r}},`);
    console.log(`b = {x: ${b.x}, y: ${b.y}, r: ${b.r}},`);
    console.log(`c = {r: ${c.r}}`);
    console.log();
  }
}

function intersects(a, b) {
  var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

// Create n random circles.
// The first two are placed touching on the x-axis; the rest are unplaced
function randomCircles(n) {
  const r = [];
  for (var i = 0; i < n; i++) {
    r.push({ r: Math.random() * (1 << (Math.random() * 30)) });
  }
  r[0].x = -r[1].r, r[1].x = r[0].r, r[0].y = r[1].y = 0;
  return r;
}

function test() {
  for(;;) {
    const [a,b,c,d] = randomCircles(4);
    place(b, a, c);
    place(a, c, d);
  }
}

test();

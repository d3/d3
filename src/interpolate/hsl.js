import "../color/hsl";

d3.interpolateHsl = d3_interpolateHsl;

// interpolates HSL space, but outputs RGB string (for compatibility)

function d3_interpolateHsl(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var ah = a.h,
      as = a.s,
      al = a.l,
      bh = b.h - ah,
      bs = b.s - as,
      bl = b.l - al;
  if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
  if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t) {
    return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
  };
}

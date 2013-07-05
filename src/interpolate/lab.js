import "../color/lab";

d3.interpolateLab = d3_interpolateLab;

function d3_interpolateLab(a, b) {
  a = d3.lab(a);
  b = d3.lab(b);
  var al = a.l,
      aa = a.a,
      ab = a.b,
      bl = b.l - al,
      ba = b.a - aa,
      bb = b.b - ab;
  return function(t) {
    a.l = al + bl * t;
    a.a = aa + ba * t;
    a.b = ab + bb * t;
    return a;
  };
}

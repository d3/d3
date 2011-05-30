// CIE L*a*b* Color Space and Difference Metrics
// Uses formulae and matrices from http://brucelindbloom.com/

d3.lab = function(L, a, b) {
  if (arguments.length == 1) {
    var rgb = d3.rgb(L);
    return d3_rgb_lab(rgb.r, rgb.g, rgb.b);
  } else {
    return d3_lab(L, a, b);
  }
};

function d3_lab(L, a, b) {
  return new d3_Lab(L, a, b);
}

function d3_Lab(L, a, b) {
  this.L = L;
  this.a = a;
  this.b = b;
}

d3_Lab.prototype.rgb = function() {
  return d3_lab_rgb(this.L, this.a, this.b);
}

d3_Lab.prototype.toString = function() {
  return this.rgb().toString();
};

d3_Lab.prototype.distance = function(c) {
  return d3_cie76(this, c);
}

d3_Lab.prototype.de76 = function(c) {
  return d3_cie76(this, c);
}

d3_Lab.prototype.de94 = function(c) {
  return d3_cie94(this, c);
}

d3_Lab.prototype.de00 = function(c) {
  return d3_ciede2000(this, c);
}

function d3_lab_rgb(L, a, b) {
  // first, map CIE L*a*b* to CIE XYZ
  var y = (L + 16) / 116,
      x = y + a/500,
      z = y - b/200;

  // D50 standard referent
  var X = 0.964221, Y = 1, Z = 0.825211;

  x = X * (x > 0.206893034 ? x*x*x : (x - 4.0/29) / 7.787037);
  y = Y * (y > 0.206893034 ? y*y*y : (y - 4.0/29) / 7.787037);
  z = Z * (z > 0.206893034 ? z*z*z : (z - 4.0/29) / 7.787037);

  // second, map CIE XYZ to sRGB
  var r =  3.1338561*x - 1.6168667*y - 0.4906146*z,
      g = -0.9787684*x + 1.9161415*y + 0.0334540*z,
      b =  0.0719453*x - 0.2289914*y + 1.4052427*z;
  r = r <= 0.00304 ? 12.92*r : 1.055*Math.pow(r,1/2.4) - 0.055,
  g = g <= 0.00304 ? 12.92*g : 1.055*Math.pow(g,1/2.4) - 0.055,
  b = b <= 0.00304 ? 12.92*b : 1.055*Math.pow(b,1/2.4) - 0.055;

  // third, discretize and return RGB values
  var r = Math.round(255*r);
	  g = Math.round(255*g);
	  b = Math.round(255*b),
      c = d3.rgb(
        Math.max(0, Math.min(255, r)),
	    Math.max(0, Math.min(255, g)),
	    Math.max(0, Math.min(255, b))
      );
  if (r<0 || r>255 || g<0 || g>255 || b<0 || b>255)
    c.clipped = true; // out of RGB gamut
  return c;
}

function d3_rgb_lab(r, g, b) {
  // first, normalize RGB values
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  // D50 standard referent
  var X = 0.964221, Y = 1, Z = 0.825211;

  // second, map sRGB to CIE XYZ
  r = r <= 0.04045 ? r/12.92 : Math.pow((r+0.055)/1.055, 2.4);
  g = g <= 0.04045 ? g/12.92 : Math.pow((g+0.055)/1.055, 2.4);
  b = b <= 0.04045 ? b/12.92 : Math.pow((b+0.055)/1.055, 2.4);
  var x = (0.4360747*r + 0.3850649*g + 0.1430804*b) / X,
      y = (0.2225045*r + 0.7168786*g + 0.0606169*b) / Y,
      z = (0.0139322*r + 0.0971045*g + 0.7141733*b) / Z;

  // third, map CIE XYZ to CIE L*a*b* and return
  x = x > 0.008856 ? Math.pow(x, 1/3) : 7.787037*x + 4.0/29;
  y = y > 0.008856 ? Math.pow(y, 1/3) : 7.787037*y + 4.0/29;
  z = z > 0.008856 ? Math.pow(z, 1/3) : 7.787037*z + 4.0/29;

  return d3_lab(116*y - 16, 500*(x-y), 200*(y-z));
}

function d3_cie76(x, y) {
  // distance of ~= 2.3 corresponds to one JND
  var dL = x.L - y.L,
      da = x.a - y.a,
      db = x.b = y.b;
  return Math.sqrt(dL*dL + da*da + db*db);
}

function d3_cie94(x, y) {
  // uses constants for graphic arts (1, 0.045, 0.015)
  // NOT textiles (2, 0.048, 0.014)
  var dL  = x.L - y.L,
      da  = x.a - y.a,
      db  = x.b = y.b,
      C1  = Math.sqrt(x.a*x.a + x.b*x.b),
      C2  = Math.sqrt(y.a*y.a + y.b*y.b),
      dC  = C1 - C2,
      dH  = Math.sqrt(da*da + db*db - dC*dC);
  dC = dC / (1 + 0.045*C1);
  dH = dH / (1 + 0.015*C1);
  return Math.sqrt(dL*dL + dC*dC + dH*dH);
}

function d3_ciede2000(x, y) {
  // adapted from Sharma et al's MATLAB implementation at
  //  http://www.ece.rochester.edu/~gsharma/ciede2000/

  // parametric factors, use defaults
  var kl = 1, kc = 1, kh = 1;

  // compute terms
  var pi = Math.PI,
      L1 = x.L, a1 = x.a, b1 = x.b, Cab1 = Math.sqrt(a1*a1 + b1*b1),
      L2 = y.L, a2 = y.a, b2 = y.b, Cab2 = Math.sqrt(a2*a2 + b2*b2),
      Cab = 0.5*(Cab1 + Cab2),
      G = 0.5*(1 - Math.sqrt(Math.pow(Cab,7)/(Math.pow(Cab,7)+Math.pow(25,7)))),
      ap1 = (1+G) * a1,
      ap2 = (1+G) * a2,
      Cp1 = Math.sqrt(ap1*ap1 + b1*b1),
      Cp2 = Math.sqrt(ap2*ap2 + b2*b2),
      Cpp = Cp1 * Cp2;

  // ensure hue is between 0 and 2pi
  var hp1 = Math.atan2(b1, ap1); if (hp1 < 0) hp1 += 2*pi;
  var hp2 = Math.atan2(b2, ap2); if (hp2 < 0) hp2 += 2*pi;

  var dL = L2 - L1,
      dC = Cp2 - Cp1,
      dhp = hp2 - hp1;

  if (dhp > +pi) dhp -= 2*pi;
  if (dhp < -pi) dhp += 2*pi;
  if (Cpp == 0) dhp = 0;

  // Note that the defining equations actually need
  // signed Hue and chroma differences which is different
  // from prior color difference formulae
  var dH = 2 * Math.sqrt(Cpp) * Math.sin(dhp/2);

  // Weighting functions
  var Lp = 0.5 * (L1 + L2),
      Cp = 0.5 * (Cp1 + Cp2);

  // Average Hue Computation
  // This is equivalent to that in the paper but simpler programmatically.
  // Average hue is computed in radians and converted to degrees where needed
  var hp = 0.5 * (hp1 + hp2);
  // Identify positions for which abs hue diff exceeds 180 degrees 
  if (Math.abs(hp1-hp2) > pi) hp -= pi;
  if (hp < 0) hp += 2*pi;

  // Check if one of the chroma values is zero, in which case set 
  // mean hue to the sum which is equivalent to other value
  if (Cpp == 0) hp = hp1 + hp2;

  var Lpm502 = (Lp-50) * (Lp-50),
      Sl = 1 + 0.015*Lpm502 / Math.sqrt(20+Lpm502),
      Sc = 1 + 0.045*Cp,
      T = 1 - 0.17*Math.cos(hp - pi/6)
            + 0.24*Math.cos(2*hp)
            + 0.32*Math.cos(3*hp+pi/30)
            - 0.20*Math.cos(4*hp - 63*pi/180),
      Sh = 1 + 0.015 * Cp * T,
      ex = (180/pi*hp-275) / 25,
      delthetarad = (30*pi/180) * Math.exp(-1 * (ex*ex)),
      Rc =  2 * Math.sqrt(Math.pow(Cp,7) / (Math.pow(Cp,7) + Math.pow(25,7))),
      RT = -1 * Math.sin(2*delthetarad) * Rc;

  dL = dL / (kl*Sl);
  dC = dC / (kc*Sc);
  dH = dH / (kh*Sh);

  // The CIE 00 color difference
  return Math.sqrt(dL*dL + dC*dC + dH*dH + RT * dC * dH);
}
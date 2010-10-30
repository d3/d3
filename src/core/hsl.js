d3.hsl = function(h, s, l) {
  var c = d3_rgb_hsl(h, s, l);
  return "rgb(" + c.r + "," + c.g + "," + c.b +  ")";
};

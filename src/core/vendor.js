import "document";

var d3_vendor = (function(p) {
  var i = -1, n = p.length, s = d3_documentElement.style;
  while (++i < n) if (p[i] + "Transform" in s) return p[i];
  return "";
})(["webkit", "ms", "Moz", "O"]);

  if (typeof define === "function" && define.amd) define(d3);
  else if (typeof module === "object" && module.exports) module.exports = d3;
  else if (typeof window === "object") window.d3 = d3;
}();

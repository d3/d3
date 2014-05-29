  if (typeof define === "function" && define.amd) {
    define(function () {return d3;});
  } else if (typeof module === "object" && module.exports) {
    module.exports = d3;
  } else {
    this.d3 = d3;
  }
}();

d3.tween = function(v) {
  return {
    bind: typeof v == "function" ? function() {
        var a = this.value,
            n = this.name,
            b = v.apply(this, arguments),
            i = (n in d3_interpolate_rgb || /\bcolor\b/.test(n)
                 ? d3.interpolateRgb
                 : d3.interpolate)(a, b);
        return function() {
          return i(d3.time);
        };
      } : function() {
        var a = this.value,
            n = this.name,
            i = (n in d3_interpolate_rgb || /\bcolor\b/.test(n)
                 ? d3.interpolateRgb
                 : d3.interpolate)(a, v);
        return function() {
          return i(d3.time);
        };
      }
  };
};

d3.geo.identity = function() {
  var clipExtent = null;

  function identity(x) {
    return x;
  }

  identity.invert = identity;

  identity.stream = identity;

  identity.clipExtent = function(_) {
    if (!arguments.length) return clipExtent;
    clipExtent = _;
    identity.stream = _ == null ? identity : d3_geo_clipView(_[0][0], _[0][1], _[1][0], _[1][1]);
    return identity;
  };

  return identity;
};
